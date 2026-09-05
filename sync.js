// Meals4Us — accounts + cloud sync, on the same shared Postgres backend as the
// rest of The Binder family (moved off its own separate Firebase project). Loads
// after app.js, so it shares the same global scope: it reads/writes the same
// `state`, calls the same `saveState()`, `boot()`, etc. that the rest of the app
// already uses. Local-first: the app always renders from localStorage immediately
// (via app.js's own boot()), and this file layers an account on top — once signed
// in, her data lives on the server under her own account, and every device signed
// into that account picks it up the next time it signs in or reloads.
//
// Unlike the old Firestore version, there's no live cross-device listener here.
// Instead: every real edit stamps the state with the time it happened
// (state._syncStamp), every open — and every return to the tab/app — pulls the
// cloud copy and adopts it if it's newer than this device's copy ("newest edit
// wins"), and every local change still pushes (debounced) to the cloud.

const MEALS4US_API = "https://the-binder-api.onrender.com";
const TRIAL_DAYS = 7;
const OWNER_EMAIL = "kimberly.schultz1968@gmail.com"; // her own account — always free, same rule as her other apps

// Which marketing link brought her here (?src=pinterest, ?src=gads, etc.) — captured
// once on load and kept for the rest of this visit, same pattern as her other apps.
const SIGNUP_SOURCE = (() => {
  const fromUrl = new URLSearchParams(location.search).get("src");
  if (fromUrl) { try { localStorage.setItem("meals4us_src", fromUrl); } catch (e) {} return fromUrl; }
  try { return localStorage.getItem("meals4us_src") || ""; } catch (e) { return ""; }
})();

// ---------- Session + API (same pattern as the other Binder apps) ----------

function getSession() { try { return JSON.parse(localStorage.getItem("meals4us.session") || "null"); } catch (e) { return null; } }
function setSession(s) { s ? localStorage.setItem("meals4us.session", JSON.stringify(s)) : localStorage.removeItem("meals4us.session"); }
function isSignedIn() { const s = getSession(); return !!(s && s.token); }

async function api(path, opts) {
  opts = opts || {};
  const headers = Object.assign({ "Content-Type": "application/json" }, opts.headers || {});
  const s = getSession();
  if (s && s.token) headers.Authorization = "Bearer " + s.token;
  const r = await fetch(MEALS4US_API + path, Object.assign({}, opts, { headers }));
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(d.error || "Something went wrong");
  return d;
}

// Owner hub: ?owner=1 + a saved owner email/password (set once on the hub page) signs
// Kimberly straight into any app — logging in if the account exists here already,
// signing up on the spot if it doesn't. Only fires for that URL flag; everyone else
// sees the normal sign-in screen exactly as before.
async function tryOwnerAutoLogin() {
  if (isSignedIn()) return;
  if (new URLSearchParams(location.search).get("owner") !== "1") return;
  let creds; try { creds = JSON.parse(localStorage.getItem("binder_owner_auth") || "null"); } catch (e) { creds = null; }
  if (!creds || !creds.email || !creds.password) return;
  try {
    const r = await api("/meals4us/auth/login", { method: "POST", body: JSON.stringify({ email: creds.email, password: creds.password }) });
    setSession({ token: r.token, email: r.email });
  } catch (e) {
    try {
      const r = await api("/meals4us/auth/signup", { method: "POST", body: JSON.stringify({ email: creds.email, password: creds.password, source: "owner" }) });
      setSession({ token: r.token, email: r.email });
    } catch (e2) { return; } // couldn't sign in or create the account — falls through to the normal sign-in screen
  }
}

// ---------- Data sync ----------
// Local-first: on sign-in, adopt whatever's on the server if this device is
// starting from nothing; otherwise push this device's copy up. After that,
// every local save (via saveState() in app.js) queues a debounced push.

let cloudSaveTimer = null;
let applyingRemoteState = false; // true while a just-downloaded cloud state is being applied, so we don't immediately re-push it
let initialCloudSyncDone = false; // true once connectCloud() has done its first pull for this sign-in

function hasMeaningfulLocalData() {
  return !!(state.familyText || state.weekPlan || state.groceryList ||
    (state.customRecipes && state.customRecipes.length) || (state.recentWeeksHistory && state.recentWeeksHistory.length));
}

// "Newest edit wins" needs to know when this copy was last really edited.
// Boot-time saves never reach queueCloudSave (app.js boots before this file
// loads, and adoption of a cloud copy is guarded by applyingRemoteState), so
// every stamp here corresponds to an actual user edit on this device.
function stampState() {
  state._syncStamp = Date.now();
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

function queueCloudSave() {
  if (applyingRemoteState) return;
  stampState();
  if (!isSignedIn()) return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(pushCloudState, 800);
}

function pushCloudState() {
  if (!isSignedIn()) return;
  if (!initialCloudSyncDone) { cloudSaveTimer = setTimeout(pushCloudState, 400); return; }
  if (!state._syncStamp) stampState(); // pre-stamp-era data being seeded up for the first time
  api("/meals4us/data", { method: "PUT", body: JSON.stringify({ data: state }) })
    .catch(err => console.error("Meals4Us: cloud save failed", err));
}

async function connectCloud() {
  try {
    const { data } = await api("/meals4us/data");
    const cloudHas = data && Object.keys(data).length > 0;
    initialCloudSyncDone = true;
    const cloudStamp = (cloudHas && data._syncStamp) || 0;
    const localStamp = state._syncStamp || 0;
    if (cloudHas && (!hasMeaningfulLocalData() || cloudStamp > localStamp)) {
      // The cloud copy is newer (another device edited more recently) — adopt it.
      applyingRemoteState = true;
      try {
        state = hydrateStateDefaults(data);
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
        boot();
      } finally { applyingRemoteState = false; }
    } else {
      pushCloudState(); // seed her account with what's on this device, or push a newer local edit up
    }
  } catch (err) {
    console.error("Meals4Us: cloud connect failed", err);
    initialCloudSyncDone = true; // don't block local saves forever if the initial pull failed
  }
}

// Coming back to the app (switching back to the tab, reopening it on a phone)
// re-checks the cloud, so another device's changes show up without needing a
// full page reload.
document.addEventListener("visibilitychange", () => {
  if (!document.hidden && isSignedIn()) connectCloud();
});

// "Lock It In" — a save she can see and trust, unlike the silent background
// sync. Waits for the server to confirm the write before saying it's done.
// If she has a lock password set, this also freezes Week 1 against further
// changes until she enters it again (see requireUnlockedWeek in app.js).
function lockItIn() {
  const btn = document.getElementById("btn-lock-in");
  if (!isSignedIn()) {
    btn.textContent = "⚠️ Not signed in";
    setTimeout(() => { btn.textContent = "🔒 Lock It In"; }, 2500);
    return;
  }

  const proceed = () => {
    clearTimeout(cloudSaveTimer);
    if (state.lockPasswordHash) state.weekLocked = true;
    stampState(); // a real, deliberate save — this one SHOULD win a sync conflict
    btn.disabled = true;
    btn.textContent = "Saving…";
    api("/meals4us/data", { method: "PUT", body: JSON.stringify({ data: state }) })
      .then(() => {
        btn.textContent = "✓ Locked in!";
        renderWeek(state.weekPlan);
      })
      .catch(err => {
        console.error("Meals4Us: Lock It In failed", err);
        btn.textContent = "⚠️ Couldn't save — tap to retry";
      })
      .finally(() => {
        btn.disabled = false;
        setTimeout(() => { btn.textContent = "🔒 Lock It In"; }, 3500);
      });
  };

  // First time locking in with no password yet — offer to set one. Skipping
  // still saves normally, just without the lock (nothing to unlock it with).
  if (!state.lockPasswordHash) {
    openSetPasswordModal(() => proceed());
  } else {
    proceed();
  }
}
document.getElementById("btn-lock-in").addEventListener("click", lockItIn);

// ---------- Billing: 7-day free trial, then $2.99/mo ----------
// The trial clock is the account's own creation date (from the server, not the
// browser). Once it's over, her plan (kept current via /meals4us/me — checked at
// sign-in and again right after returning from Stripe checkout) decides whether
// the paywall stays up.

function showPaywall() { document.getElementById("paywall-gate").classList.remove("hidden"); }
function hidePaywall() { document.getElementById("paywall-gate").classList.add("hidden"); }
function showPaywallMessage(msg) {
  const el = document.getElementById("paywall-error");
  el.textContent = msg;
  el.classList.remove("hidden");
}

function trialDaysLeft(createdAt) {
  const created = new Date(createdAt).getTime();
  const elapsed = (Date.now() - created) / 86400000;
  return Math.max(0, Math.ceil(TRIAL_DAYS - elapsed));
}

async function checkBilling() {
  const badge = document.getElementById("trial-badge");
  const manageBtn = document.getElementById("btn-manage-billing");
  const session = getSession();
  if (!session) return;

  if (session.email === OWNER_EMAIL) {
    badge.classList.add("hidden");
    manageBtn.classList.add("hidden");
    hidePaywall();
    return;
  }

  let me;
  try { me = await api("/meals4us/me"); } catch (e) { console.error("Meals4Us: billing check failed", e); return; }
  const paid = me.plan === "meals4us";
  manageBtn.classList.toggle("hidden", !paid);

  if (paid) {
    badge.classList.add("hidden");
    hidePaywall();
    return;
  }

  const daysLeft = trialDaysLeft(me.created_at);
  if (daysLeft > 0) {
    badge.textContent = daysLeft === 1 ? "Trial: last day" : `Trial: ${daysLeft} days left`;
    badge.classList.remove("hidden");
    hidePaywall();
  } else {
    badge.classList.add("hidden");
    showPaywall();
  }
}

document.getElementById("btn-subscribe").addEventListener("click", async () => {
  const btn = document.getElementById("btn-subscribe");
  btn.disabled = true;
  try {
    const data = await api("/meals4us/checkout", { method: "POST" });
    if (data.url) { window.location.href = data.url; return; }
    showPaywallMessage(data.error || "Couldn't start checkout — try again in a moment.");
  } catch (e) {
    showPaywallMessage(e.message || "Couldn't reach the payment page — check your connection and try again.");
  }
  btn.disabled = false;
});

document.getElementById("btn-manage-billing").addEventListener("click", async () => {
  try {
    const data = await api("/meals4us/portal", { method: "POST" });
    if (data.url) window.location.href = data.url;
  } catch (e) {
    console.error("Meals4Us: opening billing portal failed", e);
  }
});

document.getElementById("btn-paywall-sign-out").addEventListener("click", () => {
  signOut();
});

// ---------- Auth gate UI ----------

function showAuthGate() { document.getElementById("auth-gate").classList.remove("hidden"); }
function hideAuthGate() { document.getElementById("auth-gate").classList.add("hidden"); }

function showAuthMessage(msg, isSuccess) {
  const el = document.getElementById("auth-error");
  el.textContent = msg;
  el.classList.remove("hidden");
  el.classList.toggle("auth-success", !!isSuccess);
}
function clearAuthMessage() {
  const el = document.getElementById("auth-error");
  el.classList.add("hidden");
  el.classList.remove("auth-success");
}

function onSignedIn(session) {
  setSession(session);
  document.getElementById("account-email").textContent = session.email;
  document.getElementById("account-strip").classList.remove("hidden");
  clearAuthMessage();
  hideAuthGate();
  initialCloudSyncDone = false;
  // After the cloud pull, greet her with the branded splash (every sign-in).
  connectCloud().then(() => {
    checkBilling();
    if (typeof showWelcomeSplash === "function") showWelcomeSplash();
  });
}

function signOut() {
  if (!confirm("Sign out of this device?")) return;
  setSession(null);
  document.getElementById("account-strip").classList.add("hidden");
  initialCloudSyncDone = false;
  hidePaywall();
  showAuthGate();
}
document.getElementById("btn-sign-out").addEventListener("click", signOut);

document.getElementById("btn-sign-in").addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  if (!email || !password) { showAuthMessage("Enter your email and password."); return; }
  clearAuthMessage();
  try {
    const r = await api("/meals4us/auth/login", { method: "POST", body: JSON.stringify({ email, password }) });
    onSignedIn({ token: r.token, email: r.email });
  } catch (e) { showAuthMessage(e.message); }
});

document.getElementById("btn-sign-up").addEventListener("click", async () => {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  if (!email || !password) { showAuthMessage("Enter an email and password."); return; }
  if (password.length < 6) { showAuthMessage("Password needs to be at least 6 characters."); return; }
  clearAuthMessage();
  try {
    const r = await api("/meals4us/auth/signup", { method: "POST", body: JSON.stringify({ email, password, source: SIGNUP_SOURCE }) });
    onSignedIn({ token: r.token, email: r.email });
  } catch (e) { showAuthMessage(e.message); }
});

// ---------- Lead capture: visitors who aren't ready to sign up yet ----------

document.getElementById("btn-show-lead-form").addEventListener("click", () => {
  document.getElementById("lead-form").classList.toggle("hidden");
});

document.getElementById("btn-submit-lead").addEventListener("click", async () => {
  const email = document.getElementById("lead-email").value.trim();
  const consent = document.getElementById("lead-consent").checked;
  const errEl = document.getElementById("lead-error");
  errEl.classList.add("hidden");
  if (!email) { errEl.textContent = "Enter your email address."; errEl.classList.remove("hidden"); return; }
  if (!consent) { errEl.textContent = "Please tick the box so we know it's OK to email you."; errEl.classList.remove("hidden"); return; }
  const btn = document.getElementById("btn-submit-lead");
  btn.disabled = true;
  try {
    const data = await api("/meals4us/lead", { method: "POST", body: JSON.stringify({ email, consent, source: SIGNUP_SOURCE }) });
    if (data.ok) {
      document.getElementById("lead-form").innerHTML = `<p class="auth-error auth-success">Thanks — we'll keep you posted!</p>`;
    } else {
      errEl.textContent = data.error || "Something went wrong. Try again.";
      errEl.classList.remove("hidden");
    }
  } catch (e) {
    errEl.textContent = e.message || "Couldn't reach the server — check your connection.";
    errEl.classList.remove("hidden");
  }
  btn.disabled = false;
});

// ---------- Boot ----------
// Back from Stripe checkout: confirm the plan server-side (never trust the URL alone).
if (new URLSearchParams(location.search).has("upgraded")) {
  history.replaceState(null, "", location.pathname);
}

(async () => {
  await tryOwnerAutoLogin();
  if (isSignedIn()) {
    const s = getSession();
    document.getElementById("account-email").textContent = s.email;
    document.getElementById("account-strip").classList.remove("hidden");
    hideAuthGate();
    await connectCloud();
    await checkBilling();
    if (typeof showWelcomeSplash === "function") showWelcomeSplash();
  } else {
    showAuthGate();
  }
})();
