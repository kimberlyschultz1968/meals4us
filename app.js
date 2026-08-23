// Meals4Us — app logic
// No AI calls. Family text is parsed with keyword matching against the
// recipe library in recipes.js, meals are scored/picked with plain rules,
// and "Love it / Change it" feedback is stored per recipe so future weeks
// lean toward what this family actually likes. Everything lives in
// localStorage — no account, no server, no cost.

const STORAGE_KEY = "meals4us_state_v2"; // bumped to auto-discard old corrupted saves
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const GROCERY_CATEGORY_ORDER = ["Produce", "Meat & Seafood", "Dairy & Eggs", "Pantry", "Frozen", "Other"];

// Generic dish words families use that don't literally appear in every
// matching recipe's name (e.g. "pasta" should match Spaghetti, Ziti, Alfredo).
// Keys are singular stems only — "taco" already matches "tacos" as a
// substring, so a plural key would just double-add the same tag.
const DISH_SYNONYMS = {
  pasta: ["spaghetti", "ziti", "alfredo", "penne"],
  noodle: ["noodles", "spaghetti"],
  burger: ["burger"],
  taco: ["taco"],
  quesadilla: ["quesadilla"],
  fajita: ["fajita"],
  pizza: ["pizza"],
  stew: ["stew"],
  chili: ["chili"],
  fries: ["fries", "hot dogs"],
  soup: ["soup"],
  bowl: ["bowls", "bowl"],
  rice: ["rice"],
  sandwich: ["sandwich", "sub"],
  wrap: ["wrap"],
  curry: ["curry"],
  casserole: ["casserole"],
  salad: ["salad"]
};

// Example words shown when a Screen 1 prompt category is tapped, keyed by
// each chip's data-key. Tapping a word inserts just that word into the
// textarea — the category chip itself no longer inserts anything.
const CATEGORY_SUGGESTIONS = {
  meals: ["tacos", "burgers", "pasta", "pizza", "stir fry", "fajitas", "chili", "rice bowls"],
  love: ["chicken", "Mexican food", "pasta", "pizza", "tacos", "steak"],
  dislike: ["fish", "mushrooms", "spicy food", "cilantro", "seafood", "onions", "peppers"],
  allergies: ["peanuts", "shellfish", "dairy", "gluten", "eggs", "soy"],
  meats: ["chicken", "beef", "pork", "turkey", "shrimp"],
  veggies: ["broccoli", "carrots", "potatoes", "bell peppers", "zucchini", "corn"],
  cuisines: ["Mexican", "Italian", "American", "Asian", "Mediterranean", "Indian"],
  quick: ["quick meals", "air fryer", "slow cooker", "leftovers", "one-pot", "grilling"],
  pantry: ["rice", "pasta", "olive oil", "eggs", "milk", "cheese"]
};

// Each category writes its own clearly-labeled sentence (never a shared
// run-on paragraph), so a word picked under "Foods we don't like" always
// reads as a dislike instead of getting lost among favorites.
const CATEGORY_SENTENCE = {
  meals: words => `Favorite meals: ${words.join(", ")}.`,
  love: words => `Foods we love: ${words.join(", ")}.`,
  dislike: words => `Foods we don't like: ${words.join(", ")}.`,
  allergies: words => `Allergies: ${words.join(", ")}.`,
  meats: words => `Favorite meats: ${words.join(", ")}.`,
  veggies: words => `Favorite vegetables: ${words.join(", ")}.`,
  cuisines: words => `Favorite cuisines: ${words.join(", ")}.`,
  quick: words => `How we like to cook: ${words.join(", ")}.`,
  pantry: words => `Foods we always keep at home: ${words.join(", ")}.`
};
const CATEGORY_ORDER = ["love", "meals", "meats", "veggies", "cuisines", "dislike", "allergies", "quick", "pantry"];

// Maps a "How we like to cook" bubble's display word to the internal style
// key recipes are tagged with (recipe.tags in recipes.js).
const QUICK_STYLE_MAP = {
  "quick meals": "quick",
  "air fryer": "airfryer",
  "slow cooker": "slowcooker",
  "leftovers": "leftovers",
  "one-pot": "onepot",
  "grilling": "grill"
};

function emptyProfile() {
  return { likes: [], dislikes: [], allergies: [], cookingStyle: [], keepAtHome: [] };
}

function mergeProfiles(...profiles) {
  const merged = emptyProfile();
  for (const key of Object.keys(merged)) {
    const all = profiles.flatMap(p => p[key] || []).map(w => w.toLowerCase());
    // Substring-aware dedupe, not just exact match — a bubble word like
    // "mushrooms" and the fuzzy re-parse of that same generated sentence
    // ("mushroom") are the same thing and shouldn't show as two tags.
    const deduped = [];
    for (const word of all) {
      if (!deduped.some(existing => existing.includes(word) || word.includes(existing))) {
        deduped.push(word);
      }
    }
    merged[key] = deduped;
  }
  return merged;
}

// Anything picked via a bubble (built-in or custom) is known with certainty —
// no need to guess it back out of a sentence. This is what actually fixes
// "I added a food but it didn't show up on the profile page": a custom word
// like "asparagus" isn't in the keyword parser's vocabulary, but it IS known
// for certain to belong under whichever category bubble she tapped it in.
function profileFromSelections(selections) {
  const profile = emptyProfile();
  ["love", "meals", "meats", "veggies", "cuisines"].forEach(key => {
    (selections[key] || []).forEach(w => profile.likes.push(w.toLowerCase()));
  });
  (selections.dislike || []).forEach(w => profile.dislikes.push(w.toLowerCase()));
  (selections.allergies || []).forEach(w => profile.allergies.push(w.toLowerCase()));
  (selections.quick || []).forEach(w => {
    profile.cookingStyle.push(QUICK_STYLE_MAP[w.toLowerCase()] || w.toLowerCase());
  });
  (selections.pantry || []).forEach(w => profile.keepAtHome.push(w.toLowerCase()));
  return profile;
}

function defaultState() {
  return {
    familyText: "",
    familyNotes: "",      // free-typed text — never touched by tapping a suggestion word
    selections: {},      // { categoryKey: [word, word, ...] } — what's been tapped on Screen 1
    customSuggestions: {}, // { categoryKey: [word, ...] } — words she's added herself, become reusable bubbles
    profile: null,
    weekPlan: null,      // [{ day, recipeId }]
    feedback: {},         // { recipeId: score }
    neverSuggest: [],     // recipeIds removed forever via "Remove It"
    nextWeekQueue: [],    // [{ recipeId, proteinOverride, day }] — moved forward via "Change Day → Next Week"
    customRecipes: [],    // recipes she's added herself — same shape as the built-in library
    recipeCustomizations: {}, // { recipeId: { added: [ingredient,...], removed: [name,...] } } — permanent per-recipe tweaks (e.g. "always add corn to Air Fryer Chicken & Potatoes")
    removalNotes: [],     // [{ recipeId, name, reason }] — why she removed something, for her own record
    household: { adults: 2, kids: 2 }, // scales every recipe's quantities and the grocery list
    noRepeatWeeks: 3,      // how many weeks (this one + completed ones) before a meal can repeat — her call, set on Screen 1
    season: detectSeason(), // nudges scoring toward heartier/lighter meals — auto-detected, overridable on Screen 1
    recentWeeksHistory: [], // completed weeks' recipe ids, trimmed to noRepeatWeeks - 1 entries
    heldBackRecipes: [],   // [{ recipeId, weeksRemaining }] — moved "Beyond" next week, held out of the pool that long
    staples: [             // recurring items added to every week's grocery list automatically
      { id: "coffee", name: "coffee", qty: "", unit: "", category: "Pantry" },
      { id: "creamer", name: "creamer", qty: "", unit: "", category: "Dairy & Eggs" },
      { id: "bread", name: "bread", qty: "", unit: "", category: "Pantry" },
      { id: "lunch-meat", name: "lunch meat", qty: "", unit: "", category: "Meat & Seafood" },
      { id: "cheese-slices", name: "cheese", qty: "", unit: "", category: "Dairy & Eggs" }
    ],
    groceryList: null,    // [{ id, name, qty, unit, category, checked, custom, staple }]
    currentScreen: 1
  };
}

// Northern-hemisphere default — she can always override on Screen 1.
function detectSeason() {
  const month = new Date().getMonth(); // 0 = Jan
  if (month === 11 || month <= 1) return "winter";
  if (month <= 4) return "spring";
  if (month <= 7) return "summer";
  return "fall";
}

// Fills in any field a saved blob might be missing (an older local save, or
// a cloud doc written by an earlier version of the app) so the rest of the
// app never has to guard against a half-shaped state object. Used both at
// boot and whenever sync.js swaps in a freshly-downloaded cloud state.
function hydrateStateDefaults(s) {
  if (!s.selections) s.selections = {};
  if (!s.neverSuggest) s.neverSuggest = [];
  if (!s.customSuggestions) s.customSuggestions = {};
  if (!s.staples) s.staples = [];
  if (!s.nextWeekQueue) s.nextWeekQueue = [];
  if (!s.customRecipes) s.customRecipes = [];
  if (!s.recipeCustomizations) s.recipeCustomizations = {};
  if (!s.removalNotes) s.removalNotes = [];
  if (!s.household) s.household = { adults: 2, kids: 2 };
  if (!s.noRepeatWeeks) s.noRepeatWeeks = 3;
  if (!s.season) s.season = detectSeason();
  if (!s.recentWeeksHistory) s.recentWeeksHistory = [];
  if (!s.heldBackRecipes) s.heldBackRecipes = [];
  return s;
}

let state = hydrateStateDefaults(loadState() || defaultState());

// This week + the last 2 completed weeks = a 3-week no-repeat window.
function pushWeekToHistory(weekPlan) {
  const ids = weekPlan.map(e => e.recipeId).filter(Boolean);
  if (!ids.length) return;
  state.recentWeeksHistory.push(ids);
  const completedWeeksToKeep = Math.max(0, state.noRepeatWeeks - 1); // this week + N completed = noRepeatWeeks total
  while (state.recentWeeksHistory.length > completedWeeksToKeep) state.recentWeeksHistory.shift();
}

// Held-back ids count as excluded on top of the rolling week history —
// this is what "Beyond" uses to keep a meal out for 2 more week-generations
// regardless of what the 3-week window alone would already cover.
function recentHistoryIds() {
  return [...state.recentWeeksHistory.flat(), ...state.heldBackRecipes.map(h => h.recipeId)];
}

// Called once per "Start a New Week" — counts down how much longer each
// held-back meal stays out of the pool, dropping it once its time is up.
function tickHeldBack() {
  state.heldBackRecipes = state.heldBackRecipes
    .map(h => ({ ...h, weeksRemaining: h.weeksRemaining - 1 }))
    .filter(h => h.weeksRemaining > 0);
}

// Recipe ingredient amounts were written for a 2-adult, 2-kid household
// (kids counted at half an adult portion). Everything scales off that.
const KID_PORTION_WEIGHT = 0.5;
const BASELINE_PORTIONS = 2 + 2 * KID_PORTION_WEIGHT; // = 3
const DISCRETE_UNITS = ["count", "whole", "clove"]; // bought/used as whole items, not measured

function scaleFactor() {
  const h = state.household;
  const portions = (h.adults || 0) + (h.kids || 0) * KID_PORTION_WEIGHT;
  return portions > 0 ? portions / BASELINE_PORTIONS : 1;
}

function scaleQty(qty, unit) {
  const scaled = qty * scaleFactor();
  if (DISCRETE_UNITS.includes(unit)) return Math.max(1, Math.ceil(scaled - 1e-9));
  return Math.max(0.25, Math.round(scaled * 4) / 4);
}

// The built-in library plus anything she's added herself — every matching/
// picking function reads from this so her recipes show up everywhere.
function allRecipes() { return [...RECIPES, ...state.customRecipes]; }

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) { /* storage unavailable — app still works, just won't persist */ }
  // sync.js defines this once she's signed in — every local save also queues
  // a debounced push to her account so the other device picks it up live.
  if (typeof queueCloudSave === "function") queueCloudSave();
}

function recipeById(id) {
  const base = allRecipes().find(r => r.id === id);
  if (!base) return base;
  const custom = state.recipeCustomizations[id];
  if (!custom || (!custom.added?.length && !custom.removed?.length)) return base;

  let ingredients = base.ingredients;
  if (custom.removed?.length) ingredients = ingredients.filter(i => !custom.removed.includes(i.name));
  if (custom.added?.length) {
    const already = new Set(ingredients.map(i => i.name));
    ingredients = [...ingredients, ...custom.added.filter(a => !already.has(a.name))];
  }
  return { ...base, ingredients };
}

// ---------- Screen navigation ----------

// The furthest screen she can jump to — each step unlocks once its data exists,
// so tapping a tab can only reach screens that already have something to show.
function maxReachedStep() {
  let m = 1;
  if (state.profile) m = 2;
  if (state.weekPlan) m = 3;
  if (state.groceryList) m = 4;
  return m;
}

function showScreen(n) {
  document.querySelectorAll(".screen").forEach(el => {
    el.classList.toggle("hidden", el.dataset.screen !== String(n));
  });
  const maxReached = maxReachedStep();
  document.querySelectorAll("#progress li").forEach(li => {
    const step = Number(li.dataset.step);
    li.classList.toggle("active", step === n);
    li.classList.toggle("done", step < n);
    li.classList.toggle("locked", step > maxReached);
  });
  state.currentScreen = n;
  saveState();
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}

// ---------- Screen 1 -> 2: parse family text into a profile ----------

function parseFamilyText(text) {
  const lower = text.toLowerCase();
  const sentences = lower.split(/[.!\n]+/).map(s => s.trim()).filter(Boolean);

  const profile = {
    likes: new Set(),
    dislikes: new Set(),
    allergies: new Set(),
    cookingStyle: new Set(),
    keepAtHome: new Set()
  };

  const NEGATION = /\b(don't|dont|do not|doesn't|doesnt|does not|didn't|didnt|did not|won't|wont|will not|not a fan of|not big on|not into|not fond of|not keen on|no |never|hate|dislike|allerg|can't have|cant have|cannot have|can not have|avoid|don't care for|dont care for)\b/;

  function isNegated(sentence) {
    return NEGATION.test(sentence);
  }

  for (const sentence of sentences) {
    const negated = isNegated(sentence);
    const isAllergyLine = /allerg/.test(sentence);

    // cuisines
    for (const cuisine of KEYWORD_MAP.cuisines) {
      if (sentence.includes(cuisine)) {
        (negated ? profile.dislikes : profile.likes).add(cuisine);
      }
    }

    // proteins
    for (const protein of KEYWORD_MAP.proteins) {
      if (sentence.includes(protein)) {
        if (isAllergyLine) profile.allergies.add(protein);
        (negated ? profile.dislikes : profile.likes).add(protein);
      }
    }

    // vegetables
    for (const veg of KEYWORD_MAP.vegetables) {
      if (sentence.includes(veg)) {
        (negated ? profile.dislikes : profile.likes).add(veg);
      }
    }

    // Allergen words — matched against ANY sentence that mentions "allerg"
    // at all, regardless of word order ("nut allergy" and "allergic to
    // nuts" both need to catch this; the old version only matched rigid
    // phrases like "nut allerg" and missed "allergic to ... nuts").
    if (isAllergyLine) {
      for (const [allergen, words] of Object.entries(KEYWORD_MAP.allergens)) {
        if (words.some(w => sentence.includes(w))) profile.allergies.add(allergen);
      }
    }
    // "allergic to X" / "allergy to X" free-form capture
    // Stops at the next clause ("...and we don't...", "but I hate...") so a
    // run-on sentence like "allergic to X and Y and we can't stand Z" doesn't
    // pull the next clause's words into the allergy list.
    const allergyMatch = sentence.match(/aller(?:gic|gy)\s*(?:to|:)?\s*([a-z, ]+?)(?=\s+(?:and|but)\s+(?:we|i|the|my|her|his|they|our)\b|$)/);
    if (allergyMatch) {
      allergyMatch[1].split(/,| and /).map(s => s.trim()).filter(Boolean).forEach(item => {
        // Skip if this is just a plural/substring of an allergen already caught above.
        const alreadyKnown = [...profile.allergies].some(a => item.includes(a) || a.includes(item));
        if (item.length > 1 && !alreadyKnown) profile.allergies.add(item);
      });
    }

    // generic dislike food words
    for (const food of KEYWORD_MAP.dislikeFoods) {
      if (sentence.includes(food) && negated) profile.dislikes.add(food);
    }

    // cooking style
    for (const [style, phrases] of Object.entries(KEYWORD_MAP.cookingStyle)) {
      for (const phrase of phrases) {
        if (sentence.includes(phrase)) profile.cookingStyle.add(style);
      }
    }

    // dish words (tacos, pasta, burgers, pizza...) via synonym map + recipe names
    for (const dishWord of Object.keys(DISH_SYNONYMS)) {
      if (sentence.includes(dishWord)) {
        (negated ? profile.dislikes : profile.likes).add(dishWord);
      }
    }

    // "keep at home" phrase capture — items can come after the phrase
    // ("keep at home: rice") or before it ("we always keep rice at home").
    const keepAfter = sentence.match(/keep\s*(?:this|these)?\s*at home\s*:?\s*([a-z, ]+)/);
    const keepBefore = sentence.match(/keep\s+([a-z, ]+?)\s+at home/);
    const keepItems = (keepAfter && keepAfter[1]) || (keepBefore && keepBefore[1]);
    if (keepItems) {
      keepItems.split(/,| and /).map(s => s.trim()).filter(Boolean).forEach(item => profile.keepAtHome.add(item));
    }
  }

  return {
    likes: [...profile.likes],
    dislikes: [...profile.dislikes],
    allergies: [...profile.allergies],
    cookingStyle: [...profile.cookingStyle],
    keepAtHome: [...profile.keepAtHome]
  };
}

function renderLearned(profile) {
  const likesEl = document.getElementById("learned-likes");
  const dislikesEl = document.getElementById("learned-dislikes");
  const styleEl = document.getElementById("learned-style");
  likesEl.innerHTML = "";
  dislikesEl.innerHTML = "";
  styleEl.innerHTML = "";

  const allDislikes = [...new Set([...profile.dislikes, ...profile.allergies])];

  profile.likes.forEach(t => likesEl.appendChild(makeTag(t)));
  allDislikes.forEach(t => dislikesEl.appendChild(makeTag(t)));
  profile.cookingStyle.forEach(t => styleEl.appendChild(makeTag(styleLabel(t))));

  const nothingLearned = profile.likes.length === 0 && allDislikes.length === 0 && profile.cookingStyle.length === 0;
  document.getElementById("learned-empty").classList.toggle("hidden", !nothingLearned);
}

function styleLabel(key) {
  const labels = { quick: "Quick meals", airfryer: "Air fryer", slowcooker: "Slow cooker", leftovers: "Leftovers", onepot: "One pot", grill: "Grill" };
  return labels[key] || key;
}

function makeTag(text) {
  const tpl = document.getElementById("tpl-tag");
  const node = tpl.content.cloneNode(true).querySelector(".tag");
  node.textContent = text;
  return node;
}

// ---------- Screen 3: build the week ----------

function dishMatchesRecipe(dishWord, recipe) {
  const haystack = recipe.name.toLowerCase();
  const synonyms = DISH_SYNONYMS[dishWord] || [dishWord];
  return synonyms.some(s => haystack.includes(s));
}

// "Swap Meat" — keeps the same recipe (name, time, other ingredients),
// just substitutes the protein ingredient. This is a per-meal override
// layered on top of the base library recipe, not a totally different meal.
const PROTEIN_SUBSTITUTES = {
  chicken: { label: "Chicken", word: "Chicken", emoji: "🍗", ingredient: { name: "chicken breast", qty: 1.25, unit: "lb", category: "Meat & Seafood" } },
  beef: { label: "Beef", word: "Beef", emoji: "🥩", ingredient: { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" } },
  pork: { label: "Pork", word: "Pork", emoji: "🍖", ingredient: { name: "pork chops", qty: 4, unit: "count", category: "Meat & Seafood" } },
  turkey: { label: "Turkey", word: "Turkey", emoji: "🦃", ingredient: { name: "ground turkey", qty: 1, unit: "lb", category: "Meat & Seafood" } },
  fish: { label: "Fish", word: "Fish", emoji: "🐟", ingredient: { name: "tilapia", qty: 1.25, unit: "lb", category: "Meat & Seafood" } },
  shrimp: { label: "Shrimp", word: "Shrimp", emoji: "🍤", ingredient: { name: "shrimp", qty: 1, unit: "lb", category: "Meat & Seafood" } },
  vegetarian: { label: "Vegetarian (black beans)", word: "Veggie", emoji: "🥦", ingredient: { name: "black beans", qty: 2, unit: "cup", category: "Pantry" } }
};
const PROTEIN_ALLERGEN = { fish: "fish", shrimp: "shellfish" };

function renameForProtein(name, oldProteinKey, newWord) {
  const oldWord = PROTEIN_SUBSTITUTES[oldProteinKey]?.word;
  if (oldWord && name.includes(oldWord)) return name.replace(oldWord, newWord);
  return `${newWord} ${name}`;
}

// Returns the recipe as it should actually be shown/shopped-for — the base
// library recipe, or that recipe with its protein swapped if this meal has
// an override applied via "Swap Meat".
// A small set of "main" vegetables — recipes whose whole identity is
// vegetable-forward (name starts with "Veggie ") draw their produce from
// this instead of whatever was originally written in, so a family that
// only likes a few vegetables doesn't get surprised by zucchini/spinach/
// mushrooms buried in a dish they picked because it looked safe.
const MAIN_VEGGIE_INGREDIENT = {
  corn: { name: "corn", qty: 1, unit: "cup", category: "Produce" },
  carrot: { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
  broccoli: { name: "broccoli", qty: 2, unit: "cup", category: "Produce" },
  potato: { name: "potatoes", qty: 1, unit: "lb", category: "Produce" },
  zucchini: { name: "zucchini", qty: 2, unit: "whole", category: "Produce" },
  spinach: { name: "spinach", qty: 2, unit: "cup", category: "Produce" },
  pepper: { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" }
};
const DEFAULT_MAIN_VEGGIES = ["corn", "carrot", "broccoli"]; // used until she's told the app which veggies her family likes

// Aromatics/standalone favorites that stay put even in a veggie-forward
// recipe — it's the bulk vegetable filler that gets swapped, not these.
const VEGGIE_SWAP_KEEP = ["garlic", "onion", "green onion", "lime", "lemon", "cilantro", "basil", "avocado"];

// Her "Favorite vegetables" picks (Screen 1) if she's made any, else the default set.
function mainVeggies() {
  const liked = (state.profile?.likes || []).filter(w => KEYWORD_MAP.vegetables.includes(w));
  return liked.length ? liked : DEFAULT_MAIN_VEGGIES;
}

function applyVeggieNormalization(recipe) {
  if (!recipe.name.startsWith("Veggie ") || !recipe.proteins.includes("vegetarian")) return recipe;
  if (state.recipeCustomizations[recipe.id]) return recipe; // she's set this one manually — respect that over the automatic swap
  const kept = recipe.ingredients.filter(i => i.category !== "Produce" || VEGGIE_SWAP_KEEP.some(k => i.name.includes(k)));
  const veggies = mainVeggies().slice(0, 2).map(v => MAIN_VEGGIE_INGREDIENT[v]).filter(Boolean);
  if (!veggies.length) return recipe;
  return { ...recipe, ingredients: [...kept, ...veggies] };
}

function getEffectiveRecipe(entry) {
  const base = recipeById(entry.recipeId);
  if (!base) return base;

  let recipe = base;
  if (entry.proteinOverride) {
    const sub = PROTEIN_SUBSTITUTES[entry.proteinOverride];
    if (sub) {
      const keptIngredients = base.ingredients.filter(i => i.category !== "Meat & Seafood");
      const ingredients = sub.ingredient.category === "Meat & Seafood"
        ? [sub.ingredient, ...keptIngredients]
        : [...keptIngredients, sub.ingredient];

      const oldAllergen = PROTEIN_ALLERGEN[base.proteins[0]];
      let allergens = oldAllergen ? base.allergens.filter(a => a !== oldAllergen) : base.allergens.slice();
      if (PROTEIN_ALLERGEN[entry.proteinOverride]) allergens = [...new Set([...allergens, PROTEIN_ALLERGEN[entry.proteinOverride]])];

      recipe = {
        ...base,
        name: renameForProtein(base.name, base.proteins[0], sub.word),
        proteins: [entry.proteinOverride],
        emoji: sub.emoji,
        ingredients,
        allergens
      };
    }
  }

  return applyVeggieNormalization(recipe);
}

// Whole-word match (with simple plural tolerance), not raw substring —
// "egg" as a dislike/allergy shouldn't exclude every recipe with "eggplant"
// in it, but "onions" disliked should still catch a "green onion"
// ingredient even though the plurals don't match exactly.
function wordMatch(text, word) {
  const stem = word.replace(/s$/i, "");
  const escaped = stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}s?\\b`, "i").test(text);
}

function recipeViolatesProfile(recipe, profile, neverSuggest = []) {
  if (neverSuggest.includes(recipe.id)) return true; // removed forever via "Remove It"
  // Hard filters: allergies and explicit dislikes always exclude a recipe.
  // Checking the actual ingredient list (not just protein/cuisine/name) is
  // what catches something like "bell pepper" or "onion" disliked as a
  // side ingredient in a dish whose name and protein don't mention it at
  // all — e.g. Sausage & Peppers wasn't excluded for a pepper dislike
  // before this, since "pepper" never appeared in its protein or cuisine.
  for (const allergen of profile.allergies) {
    if (recipe.allergens.includes(allergen)) return true;
    if (recipe.proteins.includes(allergen)) return true;
    if (recipe.ingredients.some(i => wordMatch(i.name, allergen) || wordMatch(allergen, i.name))) return true;
  }
  for (const dislike of profile.dislikes) {
    if (recipe.proteins.includes(dislike)) return true;
    if (recipe.cuisine === dislike) return true;
    if (DISH_SYNONYMS[dislike] && dishMatchesRecipe(dislike, recipe)) return true;
    if (recipe.name.toLowerCase().includes(dislike)) return true;
    if (recipe.ingredients.some(i => wordMatch(i.name, dislike) || wordMatch(dislike, i.name))) return true;
  }
  return false;
}

// Soft seasonal nudge, not a hard filter — a soup in July can still show
// up if nothing else fits, it just won't be reached for first.
const COLD_WEATHER_FAMILIES = ["soup", "stew", "chili", "casserole", "curry"];
const WARM_WEATHER_FAMILIES = ["salad"];

function seasonAffinity(recipe, season) {
  const families = dishFamiliesOf(recipe);
  const isCold = families.some(f => COLD_WEATHER_FAMILIES.includes(f)) || recipe.tags.includes("slowcooker");
  const isWarm = families.some(f => WARM_WEATHER_FAMILIES.includes(f)) || recipe.tags.includes("grill");
  const wantsCold = season === "fall" || season === "winter";
  const wantsWarm = season === "summer" || season === "spring";
  let bonus = 0;
  if (wantsCold && isCold) bonus += 1.5;
  if (wantsCold && isWarm) bonus -= 1;
  if (wantsWarm && isWarm) bonus += 1.5;
  if (wantsWarm && isCold) bonus -= 1;
  return bonus;
}

function scoreRecipe(recipe, profile, feedback) {
  let score = 0;
  for (const like of profile.likes) {
    if (recipe.proteins.includes(like)) score += 2;
    if (recipe.cuisine === like) score += 2;
    if (DISH_SYNONYMS[like] && dishMatchesRecipe(like, recipe)) score += 3;
  }
  for (const style of profile.cookingStyle) {
    if (recipe.tags.includes(style)) score += 1.5;
  }
  // A family that hasn't said they like vegetarian/veggie food gets fewer
  // vegetarian dishes suggested overall — not banned outright (one might
  // still fit via cuisine/dish-family match), just deprioritized as filler.
  if (recipe.proteins.includes("vegetarian") && !profile.likes.includes("vegetarian")) score -= 1.5;
  score += seasonAffinity(recipe, state.season);
  score += (feedback[recipe.id] || 0); // learned from Love it / Change it over time
  score += Math.random() * 0.5; // small jitter so the week isn't identical every time
  return score;
}

// A recipe can match more than one dish family at once (a "Rice Bowl" is
// both "bowl" and "rice") — returning all of them, not just the first, is
// what makes the cooldown below actually catch a rice-heavy week even when
// the family *names* differ.
function dishFamiliesOf(recipe) {
  return Object.keys(DISH_SYNONYMS).filter(key => dishMatchesRecipe(key, recipe));
}

// A few base ingredients make a week feel repetitive even across different
// dish-family tags (a rice bowl and a chicken-and-rice skillet aren't the
// same "family," but both read as "rice again") — tracked the same way.
const TRACKED_BASE_INGREDIENTS = ["rice"];

function varietyTagsOf(recipe) {
  const tags = dishFamiliesOf(recipe);
  TRACKED_BASE_INGREDIENTS.forEach(name => {
    if (recipe.ingredients.some(i => i.name === name)) tags.push(`ingredient:${name}`);
  });
  return tags;
}

const FAMILY_COOLDOWN_DAYS = 4; // a dish family/base ingredient shouldn't repeat within this many days
const MAX_PER_CUISINE = 3; // out of 7 nights, so no single cuisine can dominate the week

// presetByDay: { "Wednesday": { recipeId, proteinOverride } } — meals moved
// forward from last week via "Change Day → Next Week". Those days keep the
// preset meal; the algorithm only fills whatever days are left.
function pickWeek(profile, feedback, excludeIds = [], neverSuggest = [], presetByDay = {}) {
  const presetIds = Object.values(presetByDay).map(p => p.recipeId).filter(Boolean);
  const combinedExclude = [...excludeIds, ...presetIds];
  const daysToFill = DAYS.filter(d => !presetByDay[d]).length;

  const eligible = allRecipes().filter(r => !recipeViolatesProfile(r, profile, neverSuggest) && !combinedExclude.includes(r.id));
  const pool = eligible.length >= daysToFill ? eligible : allRecipes().filter(r => !recipeViolatesProfile(r, profile, neverSuggest) && !presetIds.includes(r.id));
  const scored = pool.map(r => ({ r, score: scoreRecipe(r, profile, feedback) }))
    .sort((a, b) => b.score - a.score);

  const chosen = [];
  const usedProteins = [];
  const varietyLastDay = {}; // tag ("taco", "ingredient:rice", ...) -> day index it was last used
  const cuisineCounts = {};
  for (const { r } of scored) {
    if (chosen.length >= daysToFill) break;
    if (chosen.some(c => c.id === r.id)) continue;
    const currentDayIndex = chosen.length;
    // light variety heuristics: avoid the same protein two days running,
    // keep the same dish type/base ingredient spaced out across the week,
    // and cap one cuisine from quietly taking over the whole week — liking
    // "Mexican" and "tacos" both gives every Mexican recipe a cuisine-match
    // bonus on top of the dish-match one, so without a cap they can crowd
    // out everything else even though each individual dish type is capped.
    const lastProtein = usedProteins[usedProteins.length - 1];
    if (lastProtein && r.proteins.includes(lastProtein) && scored.length > 10) continue;
    if ((cuisineCounts[r.cuisine] || 0) >= MAX_PER_CUISINE && scored.length > 10) continue;
    const tags = varietyTagsOf(r);
    const tooSoon = tags.some(tag => varietyLastDay[tag] !== undefined && (currentDayIndex - varietyLastDay[tag]) < FAMILY_COOLDOWN_DAYS);
    if (tooSoon && scored.length > 10) continue;
    chosen.push(r);
    usedProteins.push(r.proteins[0]);
    cuisineCounts[r.cuisine] = (cuisineCounts[r.cuisine] || 0) + 1;
    tags.forEach(tag => { varietyLastDay[tag] = currentDayIndex; });
  }
  // fill any remainder (small pools / heavy filtering) ignoring the variety rules
  if (chosen.length < daysToFill) {
    for (const { r } of scored) {
      if (chosen.length >= daysToFill) break;
      if (!chosen.some(c => c.id === r.id)) chosen.push(r);
    }
  }

  let chosenIndex = 0;
  return DAYS.map(day => {
    if (presetByDay[day]) {
      return { day, recipeId: presetByDay[day].recipeId, proteinOverride: presetByDay[day].proteinOverride || null };
    }
    const r = chosen[chosenIndex++];
    return { day, recipeId: r ? r.id : null };
  });
}

function pickReplacement(profile, feedback, weekPlan, dayIndex, neverSuggest = [], historyIds = []) {
  const thisWeekIds = weekPlan.map(d => d.recipeId).filter(Boolean);

  function poolExcluding(excludeIds) {
    return allRecipes().filter(r => !recipeViolatesProfile(r, profile, neverSuggest) && !excludeIds.includes(r.id));
  }

  // Try honoring the 3-week window first; relax it (then relax the profile
  // itself as a last resort) rather than ever leaving a day with no meal.
  let pool = poolExcluding([...thisWeekIds, ...historyIds]);
  if (!pool.length) pool = poolExcluding(thisWeekIds);
  if (!pool.length) pool = allRecipes().filter(r => !neverSuggest.includes(r.id) && !thisWeekIds.includes(r.id));

  const scored = pool.map(r => ({ r, score: scoreRecipe(r, profile, feedback) })).sort((a, b) => b.score - a.score);
  return scored.length ? scored[0].r.id : null;
}

// "Swap Meat" — keep the same kind of dish where possible, just change the
// protein. Falls back to same-cuisine, then any eligible different-protein
// recipe, so it (almost) always finds something instead of giving up.
function renderWeek(weekPlan) {
  const listEl = document.getElementById("week-list");
  listEl.innerHTML = "";
  const tpl = document.getElementById("tpl-day-card");
  const freeTpl = document.getElementById("tpl-free-day-card");

  weekPlan.forEach((entry, index) => {
    if (entry.freeDay) {
      const node = freeTpl.content.cloneNode(true);
      node.querySelector(".day-name").textContent = entry.day;
      node.querySelector(".undo-free-day").addEventListener("click", () => {
        const newId = pickReplacement(state.profile, state.feedback, state.weekPlan, index, state.neverSuggest, recentHistoryIds());
        state.weekPlan[index] = { day: entry.day, recipeId: newId, proteinOverride: null, freeDay: false };
        saveState();
        renderWeek(state.weekPlan);
      });
      listEl.appendChild(node);
      return;
    }

    const recipe = entry.recipeId ? getEffectiveRecipe(entry) : null;
    const node = tpl.content.cloneNode(true);
    node.querySelector(".day-name").textContent = entry.day;
    node.querySelector(".free-day-toggle").addEventListener("click", () => {
      state.weekPlan[index] = { day: entry.day, recipeId: null, proteinOverride: null, freeDay: true };
      saveState();
      renderWeek(state.weekPlan);
    });
    node.querySelector(".pick-recipe-btn").addEventListener("click", () => openRecipePicker(index));
    node.querySelector(".side-editor-btn").addEventListener("click", () => openSideEditor(index));

    if (recipe) {
      node.querySelector(".meal-emoji").textContent = recipe.emoji;
      node.querySelector(".meal-name").textContent = recipe.name;
      const metaBits = [`${recipe.timeMinutes} min`];
      if ((state.feedback[recipe.id] || 0) >= 2) metaBits.push("Family favorite");
      node.querySelector(".meal-meta").textContent = metaBits.join(" • ");

      const loveBtn = node.querySelector(".love-btn");
      const okBtn = node.querySelector(".ok-btn");
      const viewBtn = node.querySelector(".view-btn");
      const dayBtn = node.querySelector(".day-btn");
      const swapBtn = node.querySelector(".swap-btn");
      const removeBtn = node.querySelector(".remove-btn");

      const score = state.feedback[recipe.id] || 0;
      if (score >= 1) loveBtn.classList.add("loved");
      else if (score > 0) okBtn.classList.add("marked-ok");

      loveBtn.addEventListener("click", () => {
        state.feedback[recipe.id] = (state.feedback[recipe.id] || 0) + 1;
        saveState();
        renderWeek(state.weekPlan);
      });

      okBtn.addEventListener("click", () => {
        state.feedback[recipe.id] = (state.feedback[recipe.id] || 0) + 0.25;
        saveState();
        renderWeek(state.weekPlan);
      });

      viewBtn.addEventListener("click", () => openRecipeModal(recipe));

      dayBtn.addEventListener("click", () => openDayPicker(index));

      swapBtn.addEventListener("click", () => openMeatPicker(index));

      removeBtn.addEventListener("click", () => openRemoveReasonModal(index, recipe));
    } else {
      node.querySelector(".meal-emoji").textContent = "🍽️";
      node.querySelector(".meal-name").textContent = "No match found";
      node.querySelector(".meal-meta").textContent = "Try loosening a dislike in your profile";
      node.querySelectorAll(".meal-actions").forEach(el => el.remove());
    }

    listEl.appendChild(node);
  });

  renderNextWeekPreview();
}

function renderNextWeekPreview() {
  const box = document.getElementById("next-week-box");
  const list = document.getElementById("next-week-list");
  if (!state.nextWeekQueue.length) { box.classList.add("hidden"); return; }

  list.innerHTML = "";
  // Sort Monday → Sunday for display, but remove by original index so the
  // ✕ button still deletes the right entry regardless of display order.
  const ordered = state.nextWeekQueue
    .map((q, i) => ({ q, i }))
    .sort((a, b) => DAYS.indexOf(a.q.day) - DAYS.indexOf(b.q.day));

  ordered.forEach(({ q, i }) => {
    const recipe = getEffectiveRecipe(q);
    const row = document.createElement("div");
    row.className = "next-week-item";
    row.innerHTML = `
      <span class="next-week-item-info">
        <span class="next-week-item-day">${q.day}</span>
        <span>${recipe ? `${recipe.emoji} ${recipe.name}` : "Meal"}</span>
      </span>
      <button type="button" class="grocery-remove" aria-label="Cancel">✕</button>
    `;
    row.querySelector(".grocery-remove").addEventListener("click", () => {
      state.nextWeekQueue.splice(i, 1);
      saveState();
      renderNextWeekPreview();
    });
    list.appendChild(row);
  });
  box.classList.remove("hidden");
}

function openModal(html) {
  document.getElementById("modal-body").innerHTML = html;
  document.getElementById("recipe-modal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("recipe-modal").classList.add("hidden");
}

// ---------- Add Your Own Recipe ----------

const UNIT_OPTIONS = ["count", "lb", "oz", "cup", "tbsp", "tsp", "clove", "whole", "bunch"];
const CATEGORY_OPTIONS = ["Produce", "Meat & Seafood", "Dairy & Eggs", "Pantry", "Frozen", "Other"];
const TAG_OPTIONS = [
  ["quick", "Quick"], ["airfryer", "Air fryer"], ["slowcooker", "Slow cooker"], ["onepot", "One pot"],
  ["leftovers", "Leftovers"], ["kidFriendly", "Kid friendly"], ["spicy", "Spicy"], ["grill", "Grill"],
  ["breakfastForDinner", "Breakfast for dinner"]
];
const ALLERGEN_OPTIONS = [
  ["dairy", "Dairy"], ["gluten", "Gluten"], ["egg", "Egg"], ["fish", "Fish"],
  ["shellfish", "Shellfish"], ["peanut", "Peanut"], ["soy", "Soy"]
];

function ingredientRowHTML() {
  return `
    <div class="ingredient-row">
      <input type="text" class="ing-name" placeholder="ingredient" />
      <input type="text" inputmode="decimal" class="ing-qty" placeholder="qty" />
      <select class="ing-unit">${UNIT_OPTIONS.map(u => `<option value="${u}">${u}</option>`).join("")}</select>
      <select class="ing-category">${CATEGORY_OPTIONS.map(c => `<option value="${c}">${c}</option>`).join("")}</select>
      <button type="button" class="ingredient-remove" aria-label="Remove ingredient">✕</button>
    </div>`;
}

function openAddRecipeForm() {
  openModal(`
    <div class="modal-body-title">Add Your Own Recipe</div>
    <div class="modal-body-meta">Saved for good — shows up in future weeks and swaps alongside the built-in recipes.</div>

    <div class="recipe-form-field">
      <label>Recipe name</label>
      <input type="text" id="rf-name" placeholder="e.g. Grandma's Meatloaf" />
    </div>

    <div class="recipe-form-row">
      <div class="recipe-form-field">
        <label>Emoji (optional)</label>
        <input type="text" id="rf-emoji" placeholder="🍽️" maxlength="4" />
      </div>
      <div class="recipe-form-field">
        <label>Time (minutes)</label>
        <input type="number" id="rf-time" placeholder="30" min="1" />
      </div>
    </div>

    <div class="recipe-form-row">
      <div class="recipe-form-field">
        <label>Cuisine</label>
        <select id="rf-cuisine">
          <option value="american">American</option>
          <option value="mexican">Mexican</option>
          <option value="italian">Italian</option>
          <option value="asian">Asian</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="indian">Indian</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div class="recipe-form-field">
        <label>Main protein</label>
        <select id="rf-protein">
          <option value="chicken">Chicken</option>
          <option value="beef">Beef</option>
          <option value="pork">Pork</option>
          <option value="turkey">Turkey</option>
          <option value="fish">Fish</option>
          <option value="shrimp">Shrimp</option>
          <option value="vegetarian">Vegetarian</option>
        </select>
      </div>
    </div>

    <div class="recipe-form-field">
      <label>How it fits your week (optional)</label>
      <div class="checkbox-grid" id="rf-tags">
        ${TAG_OPTIONS.map(([v, l]) => `<label><input type="checkbox" value="${v}" /> ${l}</label>`).join("")}
      </div>
    </div>

    <div class="recipe-form-field">
      <label>Contains any of these? (so allergies get respected)</label>
      <div class="checkbox-grid" id="rf-allergens">
        ${ALLERGEN_OPTIONS.map(([v, l]) => `<label><input type="checkbox" value="${v}" /> ${l}</label>`).join("")}
      </div>
    </div>

    <div class="recipe-form-field">
      <label>Ingredients</label>
      <div id="rf-ingredients">${[1, 2, 3].map(ingredientRowHTML).join("")}</div>
      <button type="button" class="add-word-btn" id="rf-add-ingredient">+ Add ingredient</button>
    </div>

    <div class="recipe-form-field">
      <label>How to make it (optional — one step per line)</label>
      <textarea id="rf-instructions" class="family-textarea" style="min-height:100px" placeholder="Season the chicken and cook 6-7 min per side.&#10;Warm the tortillas.&#10;Assemble with toppings."></textarea>
    </div>

    <div class="recipe-form-actions">
      <button type="button" class="btn btn-secondary" id="rf-cancel">Cancel</button>
      <button type="button" class="btn btn-primary" id="rf-save">Save Recipe</button>
    </div>
  `);

  document.getElementById("rf-add-ingredient").addEventListener("click", () => {
    document.getElementById("rf-ingredients").insertAdjacentHTML("beforeend", ingredientRowHTML());
  });

  document.getElementById("rf-ingredients").addEventListener("click", e => {
    if (e.target.classList.contains("ingredient-remove")) e.target.closest(".ingredient-row").remove();
  });

  document.getElementById("rf-cancel").addEventListener("click", closeModal);
  document.getElementById("rf-save").addEventListener("click", saveCustomRecipe);
}

function saveCustomRecipe() {
  const name = document.getElementById("rf-name").value.trim();
  const ingredientRows = [...document.querySelectorAll("#rf-ingredients .ingredient-row")].map(row => ({
    name: row.querySelector(".ing-name").value.trim().toLowerCase(),
    qty: parseFloat(row.querySelector(".ing-qty").value) || 1,
    unit: row.querySelector(".ing-unit").value,
    category: row.querySelector(".ing-category").value
  })).filter(i => i.name);

  if (!name) { alert("Give the recipe a name first."); return; }
  if (!ingredientRows.length) { alert("Add at least one ingredient."); return; }

  const tags = [...document.querySelectorAll("#rf-tags input:checked")].map(c => c.value);
  const allergens = [...document.querySelectorAll("#rf-allergens input:checked")].map(c => c.value);
  const emoji = document.getElementById("rf-emoji").value.trim() || "🍽️";
  const timeMinutes = parseInt(document.getElementById("rf-time").value, 10) || 30;
  const cuisine = document.getElementById("rf-cuisine").value;
  const protein = document.getElementById("rf-protein").value;
  const instructions = document.getElementById("rf-instructions").value
    .split("\n").map(s => s.trim()).filter(Boolean);

  state.customRecipes.push({
    id: `custom-${Date.now()}`,
    name, emoji, cuisine,
    proteins: [protein],
    tags, allergens, timeMinutes,
    ingredients: ingredientRows,
    instructions
  });
  saveState();
  closeModal();
  alert(`"${name}" is saved! It'll show up in future weeks and swaps.`);
}

function openRecipeModal(recipe) {
  const steps = recipe.instructions && recipe.instructions.length
    ? `<div class="modal-instructions">
        <h3>How to make it</h3>
        <ol>${recipe.instructions.map(step => `<li>${step}</li>`).join("")}</ol>
      </div>`
    : `<p class="empty-note">No steps written for this one yet — just the ingredients.</p>`;

  openModal(`
    <div class="modal-body-emoji">${recipe.emoji}</div>
    <div class="modal-body-title">${recipe.name}</div>
    <div class="modal-body-meta">${recipe.timeMinutes} min • ${capitalize(recipe.cuisine)}</div>
    <div class="modal-ingredients">
      <h3>Ingredients <span style="font-weight:400;text-transform:none;letter-spacing:normal;">— sized for ${state.household.adults} adult${state.household.adults === 1 ? "" : "s"}${state.household.kids ? ` + ${state.household.kids} kid${state.household.kids === 1 ? "" : "s"}` : ""}</span></h3>
      <ul>${recipe.ingredients.map(i => `<li>${formatQty(scaleQty(i.qty, i.unit))} ${i.unit === "count" ? "" : i.unit} ${i.name}`.trim() + "</li>").join("")}</ul>
    </div>
    ${steps}
  `);
}

function openDayPicker(dayIndex) {
  const current = state.weekPlan[dayIndex];
  const thisWeekOptions = state.weekPlan
    .map((entry, i) => ({ entry, i }))
    .filter(({ i }) => i !== dayIndex)
    .map(({ entry, i }) => {
      const r = entry.recipeId ? getEffectiveRecipe(entry) : null;
      const label = entry.freeDay ? "🍽️ Free day" : (r ? `${r.emoji} ${r.name}` : "No meal");
      return `<button type="button" class="day-pick-option" data-day-index="${i}">
        <span class="day-pick-day">${entry.day}</span>
        <span class="day-pick-meal">${label}</span>
      </button>`;
    }).join("");

  const nextWeekOptions = DAYS.map(day => `<button type="button" class="day-pick-option" data-next-week-day="${day}">
      <span class="day-pick-day">${day}</span>
      <span class="day-pick-meal">Next week</span>
    </button>`).join("");

  openModal(`
    <div class="modal-body-title">Move "${getEffectiveRecipe(current).name}" to which day?</div>
    <div class="modal-body-meta">It'll swap places with whatever's already there.</div>
    <div class="day-pick-list">${thisWeekOptions}</div>
    <p class="field-label" style="margin-top:18px">Or push it to next week instead:</p>
    <div class="day-pick-list">${nextWeekOptions}</div>
    <p class="field-label" style="margin-top:18px">Or send it further out:</p>
    <div class="day-pick-list">
      <button type="button" class="day-pick-option" id="day-pick-beyond">
        <span class="day-pick-meal">Beyond — back into the pool, held out for 2 more weeks</span>
      </button>
    </div>
  `);

  document.querySelectorAll(".day-pick-option[data-day-index]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetIndex = Number(btn.dataset.dayIndex);
      // Swap the whole entry (recipe + any meat swap + free-day status) so
      // a swapped meal takes its substitution with it to the new day.
      const temp = { recipeId: state.weekPlan[dayIndex].recipeId, proteinOverride: state.weekPlan[dayIndex].proteinOverride, freeDay: state.weekPlan[dayIndex].freeDay };
      state.weekPlan[dayIndex].recipeId = state.weekPlan[targetIndex].recipeId;
      state.weekPlan[dayIndex].proteinOverride = state.weekPlan[targetIndex].proteinOverride;
      state.weekPlan[dayIndex].freeDay = state.weekPlan[targetIndex].freeDay;
      state.weekPlan[targetIndex].recipeId = temp.recipeId;
      state.weekPlan[targetIndex].proteinOverride = temp.proteinOverride;
      state.weekPlan[targetIndex].freeDay = temp.freeDay;
      saveState();
      renderWeek(state.weekPlan);
      closeModal();
    });
  });

  document.querySelectorAll(".day-pick-option[data-next-week-day]").forEach(btn => {
    btn.addEventListener("click", () => {
      const thisRecipeId = state.weekPlan[dayIndex].recipeId;
      if (state.nextWeekQueue.some(q => q.recipeId === thisRecipeId)) {
        alert(`"${getEffectiveRecipe(state.weekPlan[dayIndex]).name}" is already queued for next week — pick something else, or remove it from the "Coming next week" list first if you want to move it to a different day.`);
        closeModal();
        return;
      }
      const requestedDay = btn.dataset.nextWeekDay;
      // If that day's already spoken for in the queue, use the first open one instead.
      const takenDays = state.nextWeekQueue.map(q => q.day);
      const day = takenDays.includes(requestedDay) ? (DAYS.find(d => !takenDays.includes(d)) || requestedDay) : requestedDay;

      state.nextWeekQueue.push({
        recipeId: state.weekPlan[dayIndex].recipeId,
        proteinOverride: state.weekPlan[dayIndex].proteinOverride || null,
        day
      });
      // This day's slot needs something to eat this week — backfill it.
      const replacementId = pickReplacement(state.profile, state.feedback, state.weekPlan, dayIndex, state.neverSuggest, recentHistoryIds());
      state.weekPlan[dayIndex].recipeId = replacementId;
      state.weekPlan[dayIndex].proteinOverride = null;
      saveState();
      renderWeek(state.weekPlan);
      closeModal();
      alert(`Moved to ${day} of next week.`);
    });
  });

  document.getElementById("day-pick-beyond").addEventListener("click", () => {
    const removedId = state.weekPlan[dayIndex].recipeId;
    const removedName = getEffectiveRecipe(state.weekPlan[dayIndex]).name;

    state.heldBackRecipes = state.heldBackRecipes.filter(h => h.recipeId !== removedId);
    state.heldBackRecipes.push({ recipeId: removedId, weeksRemaining: 2 });

    const replacementId = pickReplacement(state.profile, state.feedback, state.weekPlan, dayIndex, state.neverSuggest, recentHistoryIds());
    state.weekPlan[dayIndex].recipeId = replacementId;
    state.weekPlan[dayIndex].proteinOverride = null;
    saveState();
    renderWeek(state.weekPlan);
    closeModal();
    alert(`"${removedName}" is back in the pool — won't be suggested again for 2 more weeks after this one.`);
  });
}

function openMeatPicker(dayIndex) {
  const entry = state.weekPlan[dayIndex];
  const recipe = getEffectiveRecipe(entry);
  const currentProtein = recipe.proteins[0];
  const profile = state.profile;

  const options = Object.entries(PROTEIN_SUBSTITUTES)
    .filter(([key]) => key !== currentProtein)
    .filter(([key]) => !profile.allergies.includes(key) && !profile.dislikes.includes(key))
    .map(([key, sub]) => `<button type="button" class="day-pick-option" data-protein="${key}">
        <span class="day-pick-meal">${sub.emoji} ${sub.label}</span>
      </button>`).join("");

  openModal(`
    <div class="modal-body-title">Swap the meat in "${recipe.name}"</div>
    <div class="modal-body-meta">Keeps everything else about this meal the same.</div>
    <div class="day-pick-list">${options || "<p class='empty-note'>No other protein fits your family's profile.</p>"}</div>
  `);

  document.querySelectorAll(".day-pick-option[data-protein]").forEach(btn => {
    btn.addEventListener("click", () => {
      entry.proteinOverride = btn.dataset.protein;
      saveState();
      renderWeek(state.weekPlan);
      closeModal();
    });
  });
}

// "Pick a Recipe for This Day" — browse the whole library (built-in +
// her own) and drop one straight onto a day, search by name only.
function openRecipePicker(dayIndex) {
  const entry = state.weekPlan[dayIndex];
  const all = [...allRecipes()].sort((a, b) => a.name.localeCompare(b.name));

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const matches = q ? all.filter(r => r.name.toLowerCase().includes(q)) : all;
    const list = document.getElementById("rp-results");
    if (!matches.length) {
      list.innerHTML = `<p class="recipe-picker-empty">No recipes match "${query}".</p>`;
      return;
    }
    list.innerHTML = matches.map(r => {
      const flagged = recipeViolatesProfile(r, state.profile, []) ? " ⚠️" : "";
      return `<button type="button" class="day-pick-option" data-recipe-id="${r.id}">
        <span class="day-pick-meal" style="text-align:left;">${r.emoji} ${r.name}${flagged}</span>
        <span class="day-pick-day" style="text-transform:none;letter-spacing:0;">${r.timeMinutes} min</span>
      </button>`;
    }).join("");
    list.querySelectorAll("[data-recipe-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        state.weekPlan[dayIndex] = { day: entry.day, recipeId: btn.dataset.recipeId, proteinOverride: null, freeDay: false };
        saveState();
        renderWeek(state.weekPlan);
        closeModal();
      });
    });
  }

  openModal(`
    <div class="modal-body-title">Pick a recipe for ${entry.day}</div>
    <div class="modal-body-meta">⚠️ means it conflicts with an allergy or dislike in your profile — still pickable, just flagged.</div>
    <input type="text" id="rp-search" class="recipe-picker-search" placeholder="Search by name..." />
    <div class="recipe-picker-list" id="rp-results"></div>
  `);

  renderResults("");
  const searchInput = document.getElementById("rp-search");
  searchInput.addEventListener("input", () => renderResults(searchInput.value));
  searchInput.focus();
}

// Asking why, when she removes something forever, does two things: keeps
// a record for her own reference, and actually learns from it — the
// reason gets run through the same free-text parser as her Screen 1
// notes, so "not big on soups" nudges the whole soup dish-family, not
// just this one recipe. (No season-awareness yet — "especially in
// summer" is noted verbatim but the app doesn't know what month it is.)
function openRemoveReasonModal(dayIndex, recipe) {
  openModal(`
    <div class="modal-body-title">Remove "${recipe.name}" forever?</div>
    <div class="modal-body-meta">You won't see it suggested again. Why? (optional — helps steer future suggestions toward what your family actually likes)</div>
    <textarea id="remove-reason" class="family-textarea" style="min-height:80px" placeholder="e.g. not big on soups, especially in summer — they only like certain kinds"></textarea>
    <div class="recipe-form-actions">
      <button type="button" class="btn btn-secondary" id="remove-cancel">Cancel</button>
      <button type="button" class="btn btn-primary" id="remove-confirm">Remove It</button>
    </div>
  `);
  document.getElementById("remove-cancel").addEventListener("click", closeModal);
  document.getElementById("remove-confirm").addEventListener("click", () => {
    const reason = document.getElementById("remove-reason").value.trim();
    finalizeRemoval(dayIndex, recipe, reason);
    closeModal();
  });
}

function finalizeRemoval(dayIndex, recipe, reason) {
  state.neverSuggest.push(recipe.id);
  delete state.feedback[recipe.id];
  if (reason) {
    state.removalNotes.push({ recipeId: recipe.id, name: recipe.name, reason });
    state.profile = mergeProfiles(state.profile, parseFamilyText(reason));
  }
  const newId = pickReplacement(state.profile, state.feedback, state.weekPlan, dayIndex, state.neverSuggest, recentHistoryIds());
  state.weekPlan[dayIndex].recipeId = newId;
  saveState();
  renderWeek(state.weekPlan);
}

// "Add/Swap a Side" — permanent per-recipe customization (via
// state.recipeCustomizations), not tied to this one week. Quick-add
// options are the main vegetables plus anything she's already added as a
// grocery staple (so "Kraft Mac & Cheese" shows up as a one-tap option
// once she's added it once), and a free-text field covers anything else.
function openSideEditor(dayIndex) {
  const entry = state.weekPlan[dayIndex];
  if (!entry || !entry.recipeId) {
    alert("Pick a recipe for this day first, then you can add or swap a side.");
    return;
  }
  const recipeId = entry.recipeId;
  if (!state.recipeCustomizations[recipeId]) state.recipeCustomizations[recipeId] = { added: [], removed: [] };
  const custom = state.recipeCustomizations[recipeId];

  function addIngredient(ing) {
    if (!custom.added) custom.added = [];
    custom.added.push(ing);
    custom.removed = (custom.removed || []).filter(n => n !== ing.name);
    saveState();
    renderWeek(state.weekPlan);
    render();
  }

  function render() {
    const recipe = getEffectiveRecipe(entry);
    const nonProtein = recipe.ingredients.filter(i => i.category !== "Meat & Seafood");
    const existingNames = new Set(recipe.ingredients.map(i => i.name));

    const currentRows = nonProtein.length
      ? nonProtein.map(i => `<button type="button" class="day-pick-option" data-remove-item="${i.name}">
          <span class="day-pick-meal" style="text-align:left;">${titleCase(i.name)}</span>
          <span class="day-pick-day" style="text-transform:none;letter-spacing:0;">✕ remove</span>
        </button>`).join("")
      : `<p class="recipe-picker-empty">Nothing on the side yet.</p>`;

    const veggieOptions = Object.values(MAIN_VEGGIE_INGREDIENT).filter(ing => !existingNames.has(ing.name));
    const stapleOptions = state.staples
      .map(s => ({ name: s.name, qty: 1, unit: "count", category: s.category || "Other" }))
      .filter(ing => !existingNames.has(ing.name));
    const quickAdds = [...veggieOptions, ...stapleOptions];
    const addRows = quickAdds.map(ing => `<button type="button" class="day-pick-option" data-add-item="${escapeHtmlAttr(JSON.stringify(ing))}">
        <span class="day-pick-meal" style="text-align:left;">+ ${titleCase(ing.name)}</span>
      </button>`).join("");

    openModal(`
      <div class="modal-body-title">Add or swap a side for "${recipe.name}"</div>
      <div class="modal-body-meta">Changes here stick for good — every future time this meal comes up, it'll include what you pick.</div>
      <p class="field-label">Currently included</p>
      <div class="day-pick-list">${currentRows}</div>
      <p class="field-label" style="margin-top:16px">Quick add</p>
      <div class="day-pick-list">${addRows || "<p class='recipe-picker-empty'>Nothing new to suggest — try typing one below.</p>"}</div>
      <p class="field-label" style="margin-top:16px">Or add anything else</p>
      <div class="add-word-row">
        <input type="text" id="side-custom-input" class="add-word-input" placeholder="e.g. Kraft Mac & Cheese" />
        <button type="button" class="add-word-btn" id="side-custom-add">+ Add</button>
      </div>
    `);

    document.querySelectorAll("[data-remove-item]").forEach(btn => {
      btn.addEventListener("click", () => {
        const name = btn.dataset.removeItem;
        custom.added = (custom.added || []).filter(a => a.name !== name);
        if (!custom.removed) custom.removed = [];
        if (!custom.removed.includes(name)) custom.removed.push(name);
        saveState();
        renderWeek(state.weekPlan);
        render();
      });
    });

    document.querySelectorAll("[data-add-item]").forEach(btn => {
      btn.addEventListener("click", () => addIngredient(JSON.parse(btn.dataset.addItem)));
    });

    document.getElementById("side-custom-add").addEventListener("click", () => {
      const input = document.getElementById("side-custom-input");
      const name = input.value.trim().toLowerCase();
      if (!name) return;
      addIngredient({ name, qty: 1, unit: "count", category: "Other" });
    });
    document.getElementById("side-custom-input").addEventListener("keydown", e => {
      if (e.key === "Enter") { e.preventDefault(); document.getElementById("side-custom-add").click(); }
    });
  }

  render();
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function formatQty(qty) {
  if (qty === "" || qty === null || qty === undefined) return "";
  if (Number.isInteger(qty)) return String(qty);
  return qty.toFixed(2).replace(/\.?0+$/, "");
}

// ---------- Screen 4: grocery list ----------

function buildGroceryList(weekPlan, keepAtHome, staples = []) {
  const combined = new Map(); // key: name|unit -> {name, qty, unit, category}

  weekPlan.forEach(entry => {
    const recipe = entry.recipeId ? getEffectiveRecipe(entry) : null;
    if (!recipe) return;
    recipe.ingredients.forEach(ing => {
      const haveAtHome = keepAtHome.some(k => ing.name.includes(k) || k.includes(ing.name));
      if (haveAtHome) return;
      const scaledQty = scaleQty(ing.qty, ing.unit);
      const key = `${ing.name}|${ing.unit}`;
      if (combined.has(key)) {
        combined.get(key).qty += scaledQty;
      } else {
        combined.set(key, { ...ing, qty: scaledQty });
      }
    });
  });

  const list = [...combined.values()].map((item, i) => ({
    id: `g${i}-${item.name.replace(/\s+/g, "-")}`,
    name: item.name,
    qty: item.qty,
    unit: item.unit,
    category: GROCERY_CATEGORY_ORDER.includes(item.category) ? item.category : "Other",
    checked: false,
    custom: false,
    staple: false
  }));

  // Staples & lunch items — things like coffee, bread, lunch meat that don't
  // change week to week. Added every time a new list is built, not derived
  // from the meal plan, so they show up automatically without re-typing them.
  staples.forEach(s => {
    const haveAtHome = keepAtHome.some(k => s.name.includes(k) || k.includes(s.name));
    if (haveAtHome) return;
    list.push({
      id: `staple-item-${s.id}`,
      stapleId: s.id,
      name: s.name,
      qty: s.qty || "",
      unit: s.unit || "",
      category: GROCERY_CATEGORY_ORDER.includes(s.category) ? s.category : "Other",
      checked: false,
      custom: false,
      staple: true
    });
  });

  list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

function renderGrocery(list) {
  const container = document.getElementById("grocery-list");
  container.innerHTML = "";
  const catTpl = document.getElementById("tpl-grocery-category");
  const itemTpl = document.getElementById("tpl-grocery-item");

  GROCERY_CATEGORY_ORDER.forEach(category => {
    const items = list.filter(i => i.category === category);
    if (!items.length) return;

    const catNode = catTpl.content.cloneNode(true);
    catNode.querySelector(".grocery-category-title").textContent = category;
    const itemsEl = catNode.querySelector(".grocery-items");

    items.forEach(item => {
      const itemNode = itemTpl.content.cloneNode(true);
      const label = itemNode.querySelector(".grocery-item");
      const check = itemNode.querySelector(".grocery-check");
      check.checked = item.checked;
      label.classList.toggle("checked", item.checked);
      itemNode.querySelector(".grocery-item-name").textContent = item.name + (item.staple ? " 🔁" : "");
      itemNode.querySelector(".grocery-item-qty").textContent = `${formatQty(item.qty)} ${item.unit === "count" ? "" : item.unit}`.trim();

      check.addEventListener("change", () => {
        item.checked = check.checked;
        label.classList.toggle("checked", item.checked);
        saveState();
      });

      itemNode.querySelector(".grocery-remove").addEventListener("click", () => {
        state.groceryList = state.groceryList.filter(g => g.id !== item.id);
        // A staple's ✕ means "stop buying this every week," not just "not this week."
        if (item.staple && item.stapleId) {
          state.staples = state.staples.filter(s => s.id !== item.stapleId);
        }
        saveState();
        renderGrocery(state.groceryList);
      });

      itemsEl.appendChild(itemNode);
    });

    container.appendChild(catNode);
  });

  if (!list.length) {
    container.innerHTML = `<p class="empty-note">Your grocery list is empty — add items below.</p>`;
  }
}

// ---------- Event wiring ----------

document.getElementById("progress").addEventListener("click", e => {
  const li = e.target.closest("li");
  if (!li) return;
  const step = Number(li.dataset.step);
  if (step > maxReachedStep()) return; // not unlocked yet — nothing to show there
  // re-render in case something changed since this screen was last shown —
  // step 2 rebuilds from Screen 1's current inputs, not just the old profile
  if (step === 2 && state.profile) { rebuildProfileFromScreen1(); renderLearned(state.profile); }
  if (step === 3 && state.weekPlan) renderWeek(state.weekPlan);
  if (step === 4 && state.groceryList) renderGrocery(state.groceryList);
  showScreen(step);
});

document.querySelectorAll(".back-link").forEach(btn => {
  btn.addEventListener("click", () => {
    const from = Number(btn.dataset.back);
    const target = from - 1;
    if (target === 2 && state.profile) renderLearned(state.profile);
    if (target === 3 && state.weekPlan) renderWeek(state.weekPlan);
    showScreen(target);
  });
});

let activeSuggestionCategory = null;

document.getElementById("chip-row").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  activeSuggestionCategory = chip.dataset.key;
  showSuggestions(chip.dataset.key, chip.textContent);
});

document.getElementById("add-word-btn").addEventListener("click", addCustomWord);
document.getElementById("add-word-input").addEventListener("keydown", e => {
  if (e.key === "Enter") { e.preventDefault(); addCustomWord(); }
});

document.getElementById("btn-clear-text").addEventListener("click", () => {
  state.selections = {};
  state.familyText = ""; // was surviving Clear and coming back on reload — now actually cleared
  saveState();
  document.getElementById("family-text").value = "";
  document.getElementById("family-text").focus();
  document.getElementById("suggestion-box").classList.add("hidden");
  document.querySelectorAll(".suggestion-pill.used").forEach(p => p.classList.remove("used"));
  activeSuggestionCategory = null;
});

document.getElementById("btn-reset-everything").addEventListener("click", () => {
  const warning = "Reset everything and start over?\n\nThis permanently wipes:\n" +
    "• Your family profile and everything typed on this screen\n" +
    "• This week's plan and grocery list\n" +
    "• Every Love it / It's OK / Remove It / Beyond you've set\n" +
    "• Household size and the no-repeat setting (back to defaults)\n" +
    "• Any recipes you added yourself, and the staples list (back to the defaults)\n\n" +
    "This can't be undone.";
  if (!confirm(warning)) return;

  state = defaultState();
  saveState();
  location.reload();
});

// Rebuilds the whole textarea from every selected word across every
// category — one clearly-labeled line per category — so the text always
// matches exactly what's toggled on, no matter which categories were tapped
// in what order.
function regenerateFamilyText() {
  const lines = CATEGORY_ORDER
    .filter(key => (state.selections[key] || []).length > 0)
    .map(key => CATEGORY_SENTENCE[key](state.selections[key]));
  document.getElementById("family-text").value = lines.join(" ");
  saveState();
}

function showSuggestions(key, label) {
  const baseWords = CATEGORY_SUGGESTIONS[key];
  const box = document.getElementById("suggestion-box");
  const row = document.getElementById("suggestion-row");
  if (!baseWords) { box.classList.add("hidden"); return; }
  if (!state.selections[key]) state.selections[key] = [];
  if (!state.customSuggestions[key]) state.customSuggestions[key] = [];

  document.getElementById("suggestion-label").textContent = `Tap words to add or remove them — "${label}":`;
  row.innerHTML = "";

  const isSelected = word => state.selections[key].some(w => w.toLowerCase() === word.toLowerCase());
  const toggle = (word, pill) => {
    if (isSelected(word)) {
      state.selections[key] = state.selections[key].filter(w => w.toLowerCase() !== word.toLowerCase());
      pill.classList.remove("used");
    } else {
      state.selections[key].push(word);
      pill.classList.add("used");
    }
    regenerateFamilyText();
  };

  baseWords.forEach(word => {
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "suggestion-pill";
    pill.textContent = word;
    if (isSelected(word)) pill.classList.add("used");
    pill.addEventListener("click", () => toggle(word, pill));
    row.appendChild(pill);
  });

  // Words she's added herself — same toggle behavior, plus a ✕ to remove
  // the bubble entirely (built-in example words can't be deleted, only hers).
  state.customSuggestions[key].forEach(word => {
    const wrap = document.createElement("span");
    wrap.className = "suggestion-pill-wrap";

    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = "suggestion-pill";
    pill.textContent = word;
    if (isSelected(word)) pill.classList.add("used");
    pill.addEventListener("click", () => toggle(word, pill));

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "suggestion-pill-remove";
    removeBtn.textContent = "✕";
    removeBtn.addEventListener("click", () => {
      state.customSuggestions[key] = state.customSuggestions[key].filter(w => w.toLowerCase() !== word.toLowerCase());
      state.selections[key] = state.selections[key].filter(w => w.toLowerCase() !== word.toLowerCase());
      regenerateFamilyText();
      showSuggestions(key, label);
    });

    wrap.appendChild(pill);
    wrap.appendChild(removeBtn);
    row.appendChild(wrap);
  });

  box.classList.remove("hidden");
}

function addCustomWord() {
  if (!activeSuggestionCategory) return;
  const input = document.getElementById("add-word-input");
  const word = input.value.trim();
  if (!word) return;
  const key = activeSuggestionCategory;
  const allExisting = [...CATEGORY_SUGGESTIONS[key], ...(state.customSuggestions[key] || [])];
  if (allExisting.some(w => w.toLowerCase() === word.toLowerCase())) {
    input.value = "";
    return; // already there as a bubble — nothing new to add
  }
  if (!state.customSuggestions[key]) state.customSuggestions[key] = [];
  state.customSuggestions[key].push(word);
  if (!state.selections[key]) state.selections[key] = [];
  state.selections[key].push(word); // adding it also selects it right away
  input.value = "";
  regenerateFamilyText();
  showSuggestions(key, document.querySelector(`.chip[data-key="${key}"]`).textContent);
  input.focus();
}

// Rebuilds state.profile from whatever's currently on Screen 1 — called any
// time she lands on Screen 2, not just via Continue, so editing Screen 1 and
// then jumping straight to the Profile tab still picks up the changes
// instead of showing a stale profile.
function rebuildProfileFromScreen1() {
  const tapped = document.getElementById("family-text").value.trim();
  const notes = document.getElementById("family-notes").value.trim();
  state.familyText = tapped;
  state.familyNotes = notes;
  state.household = {
    adults: Math.max(0, parseInt(document.getElementById("household-adults").value, 10) || 0),
    kids: Math.max(0, parseInt(document.getElementById("household-kids").value, 10) || 0)
  };
  state.noRepeatWeeks = parseInt(document.getElementById("no-repeat-weeks").value, 10) || 3;
  state.season = document.getElementById("season").value;
  // Sources merged: the bubble taps (100% reliable, known category), a
  // fuzzy keyword-parse of each text box (covers anything typed by hand,
  // including manual edits to the tap-built summary), and every reason
  // she's given for removing a meal — that last one matters because this
  // function fully REBUILDS the profile from scratch each time (it also
  // runs just from tapping the Profile tab); without re-folding removal
  // reasons back in every time, a "not big on soups" she gave earlier
  // would quietly vanish the next time this runs.
  const removalReasons = state.removalNotes.map(n => n.reason).join(". ");
  state.profile = mergeProfiles(
    profileFromSelections(state.selections),
    tapped ? parseFamilyText(tapped) : emptyProfile(),
    notes ? parseFamilyText(notes) : emptyProfile(),
    removalReasons ? parseFamilyText(removalReasons) : emptyProfile()
  );
  saveState();
}

document.getElementById("btn-continue-1").addEventListener("click", () => {
  rebuildProfileFromScreen1();
  renderLearned(state.profile);
  showScreen(2);
});

document.getElementById("btn-edit-2").addEventListener("click", () => {
  showScreen(1);
});

document.getElementById("btn-confirm-2").addEventListener("click", () => {
  state.weekPlan = pickWeek(state.profile, state.feedback, recentHistoryIds(), state.neverSuggest);
  saveState();
  renderWeek(state.weekPlan);
  showScreen(3);
});

document.getElementById("btn-continue-3").addEventListener("click", () => {
  state.groceryList = buildGroceryList(state.weekPlan, state.profile.keepAtHome, state.staples);
  saveState();
  renderGrocery(state.groceryList);
  showScreen(4);
});

document.getElementById("btn-add-recipe").addEventListener("click", openAddRecipeForm);

document.getElementById("btn-add-item").addEventListener("click", openAddGroceryItemForm);

function titleCase(s) {
  return s.replace(/\b\w/g, c => c.toUpperCase());
}

// For embedding arbitrary text (e.g. JSON) inside an HTML attribute value —
// an unescaped "&" (as in "Kraft Mac & Cheese") corrupts the attribute
// since the parser reads it as the start of an entity reference.
function escapeHtmlAttr(s) {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Formatted for pasting into a shopping app's search or a notes app —
// grouped by aisle/category, skips anything already checked off (already
// have it), includes quantities where they're meaningful.
function buildGroceryListText() {
  const lines = ["🛒 Grocery List"];
  GROCERY_CATEGORY_ORDER.forEach(category => {
    const items = state.groceryList.filter(g => g.category === category && !g.checked);
    if (!items.length) return;
    lines.push("", category.toUpperCase());
    items.forEach(item => {
      const qty = formatQty(item.qty);
      const amount = qty && item.unit !== "count" ? ` (${qty}${item.unit ? " " + item.unit : ""})` : (qty && Number(qty) > 1 ? ` (${qty})` : "");
      lines.push(`- ${titleCase(item.name)}${amount}`);
    });
  });
  return lines.join("\n").trim();
}

document.getElementById("btn-copy-list").addEventListener("click", async () => {
  const text = buildGroceryListText();
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied! Paste it into your shopping app.");
  } catch (e) {
    // Clipboard access can be blocked depending on the browser/context —
    // fall back to showing it so she can select and copy by hand.
    openModal(`
      <div class="modal-body-title">Your Grocery List</div>
      <div class="modal-body-meta">Couldn't copy automatically — tap in the box, select all, and copy.</div>
      <textarea readonly onclick="this.select()" style="width:100%;min-height:240px;font-family:inherit;font-size:14px;padding:12px;border:1px solid var(--line);border-radius:8px;color:var(--ink);">${text}</textarea>
    `);
  }
});

function openAddGroceryItemForm() {
  openModal(`
    <div class="modal-body-title">Add an item</div>
    <div class="recipe-form-field">
      <label>Item</label>
      <input type="text" id="gi-name" placeholder="e.g. paper towels" />
    </div>
    <div class="recipe-form-field">
      <label>Category</label>
      <select id="gi-category">${CATEGORY_OPTIONS.map(c => `<option value="${c}">${c}</option>`).join("")}</select>
    </div>
    <label style="display:flex;align-items:center;gap:8px;font-size:14.5px;font-weight:600;color:var(--ink);margin:14px 0 4px;">
      <input type="checkbox" id="gi-weekly" style="width:19px;height:19px;accent-color:var(--red);" />
      Add this every week (a staple like coffee or bread), not just this once
    </label>
    <div class="recipe-form-actions">
      <button type="button" class="btn btn-secondary" id="gi-cancel">Cancel</button>
      <button type="button" class="btn btn-primary" id="gi-save">Add</button>
    </div>
  `);
  document.getElementById("gi-cancel").addEventListener("click", closeModal);
  document.getElementById("gi-save").addEventListener("click", saveGroceryItem);
  document.getElementById("gi-name").addEventListener("keydown", e => {
    if (e.key === "Enter") { e.preventDefault(); saveGroceryItem(); }
  });
  document.getElementById("gi-name").focus();
}

function saveGroceryItem() {
  const name = document.getElementById("gi-name").value.trim().toLowerCase();
  if (!name) { alert("Type what you want to add first."); return; }
  const category = document.getElementById("gi-category").value;
  const weekly = document.getElementById("gi-weekly").checked;

  if (weekly) {
    const stapleId = `custom-${Date.now()}`;
    state.staples.push({ id: stapleId, name, qty: "", unit: "", category });
    state.groceryList.push({
      id: `staple-item-${stapleId}`, stapleId, name, qty: "", unit: "", category,
      checked: false, custom: true, staple: true
    });
  } else {
    state.groceryList.push({
      id: `custom-${Date.now()}`, name, qty: "", unit: "", category,
      checked: false, custom: true, staple: false
    });
  }
  saveState();
  renderGrocery(state.groceryList);
  closeModal();
}

document.getElementById("btn-start-over").addEventListener("click", () => {
  const queuedNote = state.nextWeekQueue.length
    ? ` ${state.nextWeekQueue.length} meal(s) you moved forward will be placed in.`
    : "";
  if (!confirm(`Start a new week? This keeps your family profile and what we've learned, but clears this week's meals and grocery list.${queuedNote}`)) return;

  const presetByDay = {};
  state.nextWeekQueue.forEach(q => {
    presetByDay[q.day] = { recipeId: q.recipeId, proteinOverride: q.proteinOverride };
  });
  pushWeekToHistory(state.weekPlan); // archive the week that's ending — keeps the 3-week no-repeat window honest
  state.weekPlan = pickWeek(state.profile, state.feedback, recentHistoryIds(), state.neverSuggest, presetByDay);
  tickHeldBack(); // count down anything sent "Beyond" — this generation used it, one fewer to go
  state.nextWeekQueue = [];
  state.groceryList = null;
  saveState();
  renderWeek(state.weekPlan);
  showScreen(3);
});

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("recipe-modal").classList.add("hidden");
});
document.getElementById("recipe-modal").addEventListener("click", e => {
  if (e.target.id === "recipe-modal") e.currentTarget.classList.add("hidden");
});

// TEMPORARY recovery tool (23 Aug 2026) — brought back just to rescue meal
// plans that were built before accounts existed, on a device that never got
// signed in. Remove again once she's moved off local-only data.
document.getElementById("btn-export-data").addEventListener("click", async () => {
  const text = JSON.stringify(state);
  try {
    await navigator.clipboard.writeText(text);
    alert("Copied! Paste it wherever you're sending it.");
  } catch (e) {
    openModal(`
      <div class="modal-body-title">Your Data</div>
      <div class="modal-body-meta">Couldn't copy automatically — tap in the box, select all, and copy.</div>
      <textarea readonly onclick="this.select()" style="width:100%;min-height:200px;font-family:inherit;font-size:12px;padding:12px;border:1px solid var(--line);border-radius:8px;color:var(--ink);word-break:break-all;">${text}</textarea>
    `);
  }
});

// ---------- Boot ----------

function boot() {
  const hasSelections = Object.values(state.selections).some(list => list && list.length);
  if (hasSelections) regenerateFamilyText();
  else if (state.familyText) document.getElementById("family-text").value = state.familyText;
  if (state.familyNotes) document.getElementById("family-notes").value = state.familyNotes;
  document.getElementById("household-adults").value = state.household.adults;
  document.getElementById("household-kids").value = state.household.kids;
  document.getElementById("no-repeat-weeks").value = state.noRepeatWeeks;
  document.getElementById("season").value = state.season;

  if (state.profile) renderLearned(state.profile);
  if (state.weekPlan) renderWeek(state.weekPlan);
  if (state.groceryList) renderGrocery(state.groceryList);

  // Resume wherever they left off, but only if the data needed for that
  // screen actually exists (guards against a partially-cleared state).
  let resumeScreen = 1;
  if (state.profile) resumeScreen = 2;
  if (state.weekPlan) resumeScreen = 3;
  if (state.groceryList) resumeScreen = 4;
  if (state.currentScreen && state.currentScreen <= resumeScreen) resumeScreen = state.currentScreen;

  showScreen(resumeScreen);
}

boot();

// No service worker for now — it was causing devices to keep showing an
// old cached version instead of checking the network for updates. Offline
// support isn't worth that tradeoff yet. This also actively unregisters
// any service worker a device already installed from before, so anyone
// who visited earlier gets un-stuck automatically.
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => regs.forEach(r => r.unregister()));
}
