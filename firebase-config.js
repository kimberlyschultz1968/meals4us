// Meals4Us — Firebase project config. Public by design (this is meant to be
// visible in browser dev tools; it's not a secret — access is controlled by
// firestore.rules, not by hiding this file). Project: meals4us-app.
// Plain global (not an ES module) so it shares scope with app.js like every
// other script in this app — no build step, no bundler.
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDgZAZIefxR2nC97DJDNYYIGb1Ua8ICEP4",
  authDomain: "meals4us-app.firebaseapp.com",
  projectId: "meals4us-app",
  storageBucket: "meals4us-app.firebasestorage.app",
  messagingSenderId: "807928426004",
  appId: "1:807928426004:web:be92247f2d95717c610101"
};
