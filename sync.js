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
  } else {
    strip.classList.add("hidden");
    if (unsubscribeSnapshot) { unsubscribeSnapshot(); unsubscribeSnapshot = null; }
    if (sessionStorage.getItem("meals4us_skip_auth") !== "1") showAuthGate();
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
  auth.createUserWithEmailAndPassword(email, password).catch(err => showAuthMessage(friendlyAuthError(err)));
});

document.getElementById("btn-forgot-password").addEventListener("click", () => {
  const email = document.getElementById("auth-email").value.trim();
  if (!email) { showAuthMessage("Type your email above first, then tap this again."); return; }
  auth.sendPasswordResetEmail(email)
    .then(() => showAuthMessage("Check your email for a reset link.", true))
    .catch(err => showAuthMessage(friendlyAuthError(err)));
});

document.getElementById("btn-skip-auth").addEventListener("click", () => {
  sessionStorage.setItem("meals4us_skip_auth", "1");
  hideAuthGate();
});

document.getElementById("btn-sign-out").addEventListener("click", () => {
  if (!confirm("Sign out of this device?")) return;
  auth.signOut();
});
