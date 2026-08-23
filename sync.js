// Meals4Us — accounts + real cross-device sync.
// Loads after app.js, so it shares the same global scope: it reads/writes
// the same `state`, calls the same `saveState()`, `boot()`, etc. that the
// rest of the app already uses. Local-first: the app always renders from
// localStorage immediately (via app.js's own boot()), and this file layers
// an account on top — once signed in, her data lives in Firestore under her
// own account, and every device signed into that account stays in sync.

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
const db = firebase.firestore();

const MEALS4US_API = "https://the-binder-api.onrender.com";
const TRIAL_DAYS = 7;
const OWNER_EMAIL = "kimberly.schultz1968@gmail.com"; // her own account — always free, same rule as her other apps
let unsubscribeBilling = null;

// Which marketing link brought her here (?src=pinterest, ?src=gads, etc.) — captured
// once on load and kept for the rest of this visit, same pattern as her other apps.
const SIGNUP_SOURCE = (() => {
  const fromUrl = new URLSearchParams(location.search).get("src");
  if (fromUrl) { try { localStorage.setItem("meals4us_src", fromUrl); } catch (e) {} return fromUrl; }
  try { return localStorage.getItem("meals4us_src") || ""; } catch (e) { return ""; }
})();

let currentUser = null;
let unsubscribeSnapshot = null;
let cloudSaveTimer = null;
let applyingRemoteState = false; // true while a snapshot from another device is being applied, so we don't echo it right back up
let lastSyncedJSON = null; // last state we know matches what's in Firestore, so we skip redundant writes/re-renders

function userDocRef(uid) {
  return db.collection("users").doc(uid);
}

// Firestore flatly rejects an array that directly contains another array
// (state.recentWeeksHistory is exactly that — an array of completed weeks,
// each one an array of recipe ids). Encoding just that one field as a JSON
// string at the cloud boundary keeps app.js's in-memory shape untouched.
function toCloudDoc(s) {
  return { ...s, recentWeeksHistory: JSON.stringify(s.recentWeeksHistory || []) };
}
function fromCloudDoc(doc) {
  const s = { ...doc };
  if (typeof s.recentWeeksHistory === "string") {
    try { s.recentWeeksHistory = JSON.parse(s.recentWeeksHistory); } catch (e) { s.recentWeeksHistory = []; }
  }
  return s;
}

// Called from app.js's saveState() every time anything changes locally.
function queueCloudSave() {
  if (!currentUser || applyingRemoteState) return;
  clearTimeout(cloudSaveTimer);
  cloudSaveTimer = setTimeout(pushCloudState, 800);
}

function pushCloudState() {
  if (!currentUser) return;
  const json = JSON.stringify(state);
  if (json === lastSyncedJSON) return;
  lastSyncedJSON = json;
  userDocRef(currentUser.uid).set(toCloudDoc(state)).catch(err => {
    console.error("Meals4Us: cloud save failed", err);
  });
}

function attachRealtimeListener(uid) {
  if (unsubscribeSnapshot) unsubscribeSnapshot();
  unsubscribeSnapshot = userDocRef(uid).onSnapshot(snap => {
    if (!snap.exists) return;
    if (snap.metadata.hasPendingWrites) return; // this is the echo of our own write, not a change from elsewhere
    const incoming = fromCloudDoc(snap.data());
    const json = JSON.stringify(incoming);
    if (json === lastSyncedJSON) return; // already up to date
    lastSyncedJSON = json;
    applyingRemoteState = true;
    try {
      state = hydrateStateDefaults(incoming);
      boot(); // re-renders every screen from the new state, same function used at startup
    } finally {
      applyingRemoteState = false;
    }
  }, err => {
    console.error("Meals4Us: sync listener failed", err);
  });
}

function connectCloud(user) {
  userDocRef(user.uid).get().then(snap => {
    if (snap.exists) {
      applyingRemoteState = true;
      try {
        state = hydrateStateDefaults(fromCloudDoc(snap.data()));
        lastSyncedJSON = JSON.stringify(state);
        boot();
      } finally {
        applyingRemoteState = false;
      }
    } else {
      // First time this account has synced — seed her account with whatever
      // is already on this device instead of starting her over empty.
      pushCloudState();
    }
    attachRealtimeListener(user.uid);
  }).catch(err => {
    console.error("Meals4Us: cloud connect failed", err);
  });
}

// ---------- Billing: 7-day free trial, then $2.99/mo ----------
// The trial clock is just the Firebase account's own creation date — no server call
// needed to know whether she's still inside it. Once it's over, a signed-in listener
// on /billing/{uid} (written by the shared backend after Stripe checkout) decides
// whether the paywall stays up.

function showPaywall() { document.getElementById("paywall-gate").classList.remove("hidden"); }
function hidePaywall() { document.getElementById("paywall-gate").classList.add("hidden"); }
function showPaywallMessage(msg) {
  const el = document.getElementById("paywall-error");
  el.textContent = msg;
  el.classList.remove("hidden");
}

function trialDaysLeft(user) {
  const created = new Date(user.metadata.creationTime).getTime();
  const elapsed = (Date.now() - created) / 86400000;
  return Math.max(0, Math.ceil(TRIAL_DAYS - elapsed));
}

function checkBilling(user) {
  if (unsubscribeBilling) { unsubscribeBilling(); unsubscribeBilling = null; }
  const badge = document.getElementById("trial-badge");
  const manageBtn = document.getElementById("btn-manage-billing");

  if (user.email === OWNER_EMAIL) {
    badge.classList.add("hidden");
    manageBtn.classList.add("hidden");
    hidePaywall();
    return;
  }

  unsubscribeBilling = db.collection("billing").doc(user.uid).onSnapshot(snap => {
    const billing = snap.exists ? snap.data() : null;
    const paid = !!(billing && billing.active);
    manageBtn.classList.toggle("hidden", !paid);

    if (paid) {
      badge.classList.add("hidden");
      hidePaywall();
      return;
    }

    const daysLeft = trialDaysLeft(user);
    if (daysLeft > 0) {
      badge.textContent = daysLeft === 1 ? "Trial: last day" : `Trial: ${daysLeft} days left`;
      badge.classList.remove("hidden");
      hidePaywall();
    } else {
      badge.classList.add("hidden");
      showPaywall();
    }
  }, err => {
    console.error("Meals4Us: billing check failed", err);
  });
}

document.getElementById("btn-subscribe").addEventListener("click", async () => {
  const btn = document.getElementById("btn-subscribe");
  btn.disabled = true;
  try {
    const token = await currentUser.getIdToken();
    const res = await fetch(MEALS4US_API + "/meals4us/checkout", {
      method: "POST",
      headers: { Authorization: "Bearer " + token }
    });
    const data = await res.json();
    if (data.url) { window.location.href = data.url; return; }
    showPaywallMessage(data.error || "Couldn't start checkout — try again in a moment.");
  } catch (e) {
    showPaywallMessage("Couldn't reach the payment page — check your connection and try again.");
  }
  btn.disabled = false;
});

document.getElementById("btn-manage-billing").addEventListener("click", async () => {
  try {
    const token = await currentUser.getIdToken();
    const res = await fetch(MEALS4US_API + "/meals4us/portal", {
      method: "POST",
      headers: { Authorization: "Bearer " + token }
    });
    const data = await res.json();
    if (data.url) window.location.href = data.url;
  } catch (e) {
    console.error("Meals4Us: opening billing portal failed", e);
  }
});

document.getElementById("btn-paywall-sign-out").addEventListener("click", () => {
  auth.signOut();
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

function friendlyAuthError(err) {
  const map = {
    "auth/invalid-email": "That email address doesn't look right.",
    "auth/user-not-found": "No account with that email — tap Create Account instead.",
    "auth/wrong-password": "That password doesn't match this email.",
    "auth/invalid-credential": "Email or password doesn't match.",
    "auth/email-already-in-use": "There's already an account with that email — tap Sign In instead.",
    "auth/weak-password": "Password needs to be at least 6 characters.",
    "auth/too-many-requests": "Too many tries — wait a bit and try again.",
    "auth/network-request-failed": "Couldn't reach the server — check your connection."
  };
  return map[err.code] || "Something went wrong. Try again.";
}

auth.onAuthStateChanged(user => {
  currentUser = user;
  const strip = document.getElementById("account-strip");
  if (user) {
    document.getElementById("account-email").textContent = user.email;
    strip.classList.remove("hidden");
    clearAuthMessage();
    hideAuthGate();
    connectCloud(user);
    checkBilling(user);
  } else {
    strip.classList.add("hidden");
    if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null; }
    if (unsubscribeBilling) { unsubscribeBilling(); unsubscribeBilling = null; }
    hidePaywall();
    showAuthGate();
  }
});

document.getElementById("btn-sign-in").addEventListener("click", () => {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  if (!email || !password) { showAuthMessage("Enter your email and password."); return; }
  clearAuthMessage();
  auth.signInWithEmailAndPassword(email, password).catch(err => showAuthMessage(friendlyAuthError(err)));
});

document.getElementById("btn-sign-up").addEventListener("click", () => {
  const email = document.getElementById("auth-email").value.trim();
  const password = document.getElementById("auth-password").value;
  if (!email || !password) { showAuthMessage("Enter an email and password."); return; }
  if (password.length < 6) { showAuthMessage("Password needs to be at least 6 characters."); return; }
  clearAuthMessage();
  auth.createUserWithEmailAndPassword(email, password)
    .then(cred => {
      // One small companion doc, written once — records which marketing link brought
      // her in, for the Command Center's by-source breakdown (Firebase Auth itself
      // has no room for a custom field like this).
      db.collection("signups").doc(cred.user.uid).set({ source: SIGNUP_SOURCE, email, createdAt: Date.now() })
        .catch(err => console.error("Meals4Us: signup source save failed", err));
    })
    .catch(err => showAuthMessage(friendlyAuthError(err)));
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
    const res = await fetch(MEALS4US_API + "/meals4us/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, consent, source: SIGNUP_SOURCE })
    });
    const data = await res.json();
    if (data.ok) {
      document.getElementById("lead-form").innerHTML = `<p class="auth-error auth-success">Thanks — we'll keep you posted!</p>`;
    } else {
      errEl.textContent = data.error || "Something went wrong. Try again.";
      errEl.classList.remove("hidden");
    }
  } catch (e) {
    errEl.textContent = "Couldn't reach the server — check your connection.";
    errEl.classList.remove("hidden");
  }
  btn.disabled = false;
});

document.getElementById("btn-forgot-password").addEventListener("click", () => {
  const email = document.getElementById("auth-email").value.trim();
  if (!email) { showAuthMessage("Type your email above first, then tap this again."); return; }
  auth.sendPasswordResetEmail(email)
    .then(() => showAuthMessage("Check your email for a reset link.", true))
    .catch(err => showAuthMessage(friendlyAuthError(err)));
});

document.getElementById("btn-sign-out").addEventListener("click", () => {
  if (!confirm("Sign out of this device?")) return;
  auth.signOut();
});
