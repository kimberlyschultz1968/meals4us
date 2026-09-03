# Meals4Us

A mobile-friendly web app that turns a family's food description into a weekly
meal plan and grocery list. Built from the spec in the ChatGPT conversation
linked in the original request.

## How it works (no AI — keyword matching, not a live model call)

- **Screen 1 — Tell Us About Your Family**: free-text box + tap-to-insert prompt chips.
- **Screen 2 — What We Learned**: `parseFamilyText()` in [app.js](app.js) keyword-matches the
  text against the vocabulary in [recipes.js](recipes.js) to build a profile (likes, dislikes,
  allergies, cooking style, pantry staples). Editable before continuing.
- **Screen 3 — Plan Your Week**: `pickWeek()` filters the ~40-recipe library
  in [recipes.js](recipes.js) (allergies/dislikes are hard excludes), scores what's left against
  the profile, and picks 7 with variety caps (no repeat protein two nights running, max 2
  of the same dish type like "tacos" per week). **Love it / Change it** feedback is stored
  per recipe in `localStorage` and nudges future weeks — this is the "gets smarter" part,
  and it doesn't need a live AI call.
- **Screen 4 — Grocery List**: `buildGroceryList()` combines duplicate ingredients across
  the week's recipes, skips anything the family said they keep at home, and sorts into
  Produce / Meat & Seafood / Dairy & Eggs / Pantry / Frozen / Other. Fully editable
  (check off, add, remove).

Everything also persists in the browser's `localStorage`, so the app still works
fully offline/local if she skips signing in ("Not now" on the sign-in screen).

## Accounts + sync

Accounts live on the same shared Postgres backend as the rest of The Binder family
(`https://the-binder-api.onrender.com`, `/meals4us/*` routes) — the separate Firebase
project is retired for auth/data (Firebase Hosting still serves the site).
[sync.js](sync.js) is a plain classic script loaded after [app.js](app.js) (shares its
global scope on purpose — no build step) that:

- shows an auth gate ([index.html](index.html)'s `#auth-gate`) until she's signed in
- stamps every real edit with the time it happened (`state._syncStamp`)
- on every open — and every return to the tab/app (`visibilitychange`) — pulls the
  cloud copy and adopts it if it's newer than this device's copy (**newest edit
  wins**); otherwise pushes this device's copy up
- hooks into `app.js`'s existing `saveState()` (via a `queueCloudSave()` global it
  checks for) so every local save also queues a debounced push to the server

## Expanding later

- **More recipes**: add entries to the `RECIPES` array in [recipes.js](recipes.js) — each one
  is tagged (cuisine, proteins, tags, allergens, ingredients) so it plugs straight into
  the existing matching/filtering logic.
- **Real AI**: the architecture is intentionally decoupled — `parseFamilyText()` and
  `pickWeek()`/`scoreRecipe()` could each be swapped for a live Claude call later
  (e.g. as a paid "Pro" tier) without touching the screens or data structures.
- **Charging for it**: accounts now exist, which is the prerequisite for a paid tier —
  Stripe isn't wired up yet.

## Running it locally

```
python dev-server.py 8738
```

Then open `http://localhost:8738`. (Already wired up as the `meals4us` entry in the
repo-level `.claude/launch.json`.) Uses a custom no-cache server, not plain
`python -m http.server` — see the comment at the top of `dev-server.py`.

## Status

**Live**: https://meals4us-app.web.app — Firebase Hosting, project `meals4us-app`, this
is the canonical URL going forward. `meals4us.com` (purchased 23 Aug 2026) is connected
in Firebase but needs one DNS step at the registrar before it resolves — see the project
memory for exact status. https://kimberlyschultz1968.github.io/meals4us/ (GitHub Pages)
serves from the same repo, so it has the same code, but isn't the one to give out —
plan is to point it at the Firebase copy or retire it once the domain is live. Repo:
https://github.com/kimberlyschultz1968/meals4us
