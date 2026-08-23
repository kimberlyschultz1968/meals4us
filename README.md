# Meals4Us

A mobile-friendly web app that turns a family's food description into a weekly
meal plan and grocery list. Built from the spec in the ChatGPT conversation
linked in the original request.

## How it works (v1 — no AI, no account, no cost)

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

Everything persists in the browser's `localStorage` — refreshing or closing the tab
resumes exactly where you left off. There's no backend and nothing to pay for.

## Expanding later

- **More recipes**: add entries to the `RECIPES` array in [recipes.js](recipes.js) — each one
  is tagged (cuisine, proteins, tags, allergens, ingredients) so it plugs straight into
  the existing matching/filtering logic.
- **Real AI**: the architecture is intentionally decoupled — `parseFamilyText()` and
  `pickWeek()`/`scoreRecipe()` could each be swapped for a live Claude call later
  (e.g. as a paid "Pro" tier) without touching the screens or data structures.
- **Accounts / sync**: profile, week plan, and feedback are already separate objects in
  `state` — moving them from `localStorage` to a real backend is a storage-layer swap,
  not a redesign.

## Running it locally

```
python -m http.server 8738 --directory .
```

Then open `http://localhost:8738`. (Already wired up as the `meals4us` entry in the
repo-level `.claude/launch.json`.)

## Status

Local prototype only — not yet pushed to GitHub or published anywhere. Say the word
when you want it live.
