// Meals4Us — app logic
// No AI calls. Family text is parsed with keyword matching against the
// recipe library in recipes.js, meals are scored/picked with plain rules,
// and "Love it / Change it" feedback is stored per recipe so future weeks
// lean toward what this family actually likes. Everything lives in
// localStorage — no account, no server, no cost.

const STORAGE_KEY = "meals4us_state_v1";
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
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
  rice: ["rice"]
};

let state = loadState() || {
  familyText: "",
  profile: null,
  weekPlan: null,      // [{ day, recipeId }]
  feedback: {},         // { recipeId: score }
  groceryList: null,    // [{ id, name, qty, unit, category, checked, custom }]
  currentScreen: 1
};

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
}

function recipeById(id) {
  return RECIPES.find(r => r.id === id);
}

// ---------- Screen navigation ----------

function showScreen(n) {
  document.querySelectorAll(".screen").forEach(el => {
    el.classList.toggle("hidden", el.dataset.screen !== String(n));
  });
  document.querySelectorAll("#progress li").forEach(li => {
    const step = Number(li.dataset.step);
    li.classList.toggle("active", step === n);
    li.classList.toggle("done", step < n);
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

  const NEGATION = /\b(don't|dont|doesn't|doesnt|won't|wont|not a fan of|no |never|hate|dislike|allerg|can't have|cant have|avoid)\b/;

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

    // known allergen phrases
    for (const [allergen, phrases] of Object.entries(KEYWORD_MAP.allergens)) {
      for (const phrase of phrases) {
        if (sentence.includes(phrase)) profile.allergies.add(allergen);
      }
    }
    // "allergic to X" / "allergy to X" free-form capture
    const allergyMatch = sentence.match(/aller(?:gic|gy)\s*(?:to|:)?\s*([a-z, ]+)/);
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

function recipeViolatesProfile(recipe, profile) {
  // Hard filters: allergies and explicit dislikes always exclude a recipe.
  for (const allergen of profile.allergies) {
    if (recipe.allergens.includes(allergen)) return true;
    if (recipe.proteins.includes(allergen)) return true;
  }
  for (const dislike of profile.dislikes) {
    if (recipe.proteins.includes(dislike)) return true;
    if (recipe.cuisine === dislike) return true;
    if (DISH_SYNONYMS[dislike] && dishMatchesRecipe(dislike, recipe)) return true;
    if (recipe.name.toLowerCase().includes(dislike)) return true;
  }
  return false;
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
  score += (feedback[recipe.id] || 0); // learned from Love it / Change it over time
  score += Math.random() * 0.5; // small jitter so the week isn't identical every time
  return score;
}

function dishFamilyOf(recipe) {
  for (const key of Object.keys(DISH_SYNONYMS)) {
    if (dishMatchesRecipe(key, recipe)) return key;
  }
  return null;
}

const MAX_PER_DISH_FAMILY = 2; // e.g. loving tacos shouldn't mean tacos 4 nights this week

function pickWeek(profile, feedback, excludeIds = []) {
  const eligible = RECIPES.filter(r => !recipeViolatesProfile(r, profile) && !excludeIds.includes(r.id));
  const pool = eligible.length >= 7 ? eligible : RECIPES.filter(r => !recipeViolatesProfile(r, profile));
  const scored = pool.map(r => ({ r, score: scoreRecipe(r, profile, feedback) }))
    .sort((a, b) => b.score - a.score);

  const chosen = [];
  const usedProteins = [];
  const dishFamilyCounts = {};
  for (const { r } of scored) {
    if (chosen.length >= 7) break;
    if (chosen.some(c => c.id === r.id)) continue;
    // light variety heuristics: avoid the same protein two days running,
    // and cap how many times one dish type (tacos, pasta, pizza...) repeats
    const lastProtein = usedProteins[usedProteins.length - 1];
    if (lastProtein && r.proteins.includes(lastProtein) && scored.length > 10) continue;
    const family = dishFamilyOf(r);
    if (family && (dishFamilyCounts[family] || 0) >= MAX_PER_DISH_FAMILY && scored.length > 10) continue;
    chosen.push(r);
    usedProteins.push(r.proteins[0]);
    if (family) dishFamilyCounts[family] = (dishFamilyCounts[family] || 0) + 1;
  }
  // fill any remainder (small pools / heavy filtering) ignoring the variety rules
  if (chosen.length < 7) {
    for (const { r } of scored) {
      if (chosen.length >= 7) break;
      if (!chosen.some(c => c.id === r.id)) chosen.push(r);
    }
  }
  return DAYS.map((day, i) => ({ day, recipeId: chosen[i] ? chosen[i].id : null }));
}

function pickReplacement(profile, feedback, weekPlan, dayIndex) {
  const excludeIds = weekPlan.map(d => d.recipeId).filter(Boolean);
  const eligible = RECIPES.filter(r => !recipeViolatesProfile(r, profile) && !excludeIds.includes(r.id));
  const pool = eligible.length ? eligible : RECIPES.filter(r => !excludeIds.includes(r.id));
  const scored = pool.map(r => ({ r, score: scoreRecipe(r, profile, feedback) })).sort((a, b) => b.score - a.score);
  return scored.length ? scored[0].r.id : null;
}

function renderWeek(weekPlan) {
  const listEl = document.getElementById("week-list");
  listEl.innerHTML = "";
  const tpl = document.getElementById("tpl-day-card");

  weekPlan.forEach((entry, index) => {
    const recipe = entry.recipeId ? recipeById(entry.recipeId) : null;
    const node = tpl.content.cloneNode(true);
    node.querySelector(".day-name").textContent = entry.day;

    if (recipe) {
      node.querySelector(".meal-emoji").textContent = recipe.emoji;
      node.querySelector(".meal-name").textContent = recipe.name;
      const metaBits = [`${recipe.timeMinutes} min`];
      if ((state.feedback[recipe.id] || 0) >= 2) metaBits.push("Family favorite");
      node.querySelector(".meal-meta").textContent = metaBits.join(" • ");

      const loveBtn = node.querySelector(".love-btn");
      const changeBtn = node.querySelector(".change-btn");
      const viewBtn = node.querySelector(".view-btn");
      if ((state.feedback[recipe.id] || 0) > 0) loveBtn.classList.add("loved");

      loveBtn.addEventListener("click", () => {
        state.feedback[recipe.id] = (state.feedback[recipe.id] || 0) + 1;
        saveState();
        renderWeek(state.weekPlan);
      });

      changeBtn.addEventListener("click", () => {
        state.feedback[recipe.id] = (state.feedback[recipe.id] || 0) - 1;
        const newId = pickReplacement(state.profile, state.feedback, state.weekPlan, index);
        if (newId) state.weekPlan[index].recipeId = newId;
        saveState();
        renderWeek(state.weekPlan);
      });

      viewBtn.addEventListener("click", () => openRecipeModal(recipe));
    } else {
      node.querySelector(".meal-emoji").textContent = "🍽️";
      node.querySelector(".meal-name").textContent = "No match found";
      node.querySelector(".meal-meta").textContent = "Try loosening a dislike in your profile";
      node.querySelector(".meal-actions").remove();
    }

    listEl.appendChild(node);
  });
}

function openRecipeModal(recipe) {
  const modal = document.getElementById("recipe-modal");
  const body = document.getElementById("modal-body");
  body.innerHTML = `
    <div class="modal-body-emoji">${recipe.emoji}</div>
    <div class="modal-body-title">${recipe.name}</div>
    <div class="modal-body-meta">${recipe.timeMinutes} min • ${capitalize(recipe.cuisine)}</div>
    <div class="modal-ingredients">
      <h3>Ingredients</h3>
      <ul>${recipe.ingredients.map(i => `<li>${formatQty(i.qty)} ${i.unit === "count" ? "" : i.unit} ${i.name}`.trim() + "</li>").join("")}</ul>
    </div>
  `;
  modal.classList.remove("hidden");
}

function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function formatQty(qty) {
  if (Number.isInteger(qty)) return String(qty);
  return qty.toFixed(2).replace(/\.?0+$/, "");
}

// ---------- Screen 4: grocery list ----------

function buildGroceryList(weekPlan, keepAtHome) {
  const combined = new Map(); // key: name|unit -> {name, qty, unit, category}

  weekPlan.forEach(entry => {
    const recipe = entry.recipeId ? recipeById(entry.recipeId) : null;
    if (!recipe) return;
    recipe.ingredients.forEach(ing => {
      const haveAtHome = keepAtHome.some(k => ing.name.includes(k) || k.includes(ing.name));
      if (haveAtHome) return;
      const key = `${ing.name}|${ing.unit}`;
      if (combined.has(key)) {
        combined.get(key).qty += ing.qty;
      } else {
        combined.set(key, { ...ing });
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
    custom: false
  }));

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
      itemNode.querySelector(".grocery-item-name").textContent = item.name;
      itemNode.querySelector(".grocery-item-qty").textContent = `${formatQty(item.qty)} ${item.unit === "count" ? "" : item.unit}`.trim();

      check.addEventListener("change", () => {
        item.checked = check.checked;
        label.classList.toggle("checked", item.checked);
        saveState();
      });

      itemNode.querySelector(".grocery-remove").addEventListener("click", () => {
        state.groceryList = state.groceryList.filter(g => g.id !== item.id);
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

document.getElementById("chip-row").addEventListener("click", e => {
  const chip = e.target.closest(".chip");
  if (!chip) return;
  const textarea = document.getElementById("family-text");
  const hint = chip.dataset.hint;
  textarea.value = textarea.value.trim().length
    ? textarea.value.trim() + (textarea.value.trim().endsWith(".") ? " " : ". ") + hint
    : hint;
  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
});

document.getElementById("btn-continue-1").addEventListener("click", () => {
  const text = document.getElementById("family-text").value.trim();
  state.familyText = text;
  state.profile = parseFamilyText(text);
  saveState();
  renderLearned(state.profile);
  showScreen(2);
});

document.getElementById("btn-edit-2").addEventListener("click", () => {
  showScreen(1);
});

document.getElementById("btn-confirm-2").addEventListener("click", () => {
  state.weekPlan = pickWeek(state.profile, state.feedback);
  saveState();
  renderWeek(state.weekPlan);
  showScreen(3);
});

document.getElementById("btn-continue-3").addEventListener("click", () => {
  state.groceryList = buildGroceryList(state.weekPlan, state.profile.keepAtHome);
  saveState();
  renderGrocery(state.groceryList);
  showScreen(4);
});

document.getElementById("btn-add-item").addEventListener("click", () => {
  const name = prompt("What do you want to add?");
  if (!name || !name.trim()) return;
  state.groceryList.push({
    id: `custom-${Date.now()}`,
    name: name.trim().toLowerCase(),
    qty: 1,
    unit: "count",
    category: "Other",
    checked: false,
    custom: true
  });
  saveState();
  renderGrocery(state.groceryList);
});

document.getElementById("btn-start-over").addEventListener("click", () => {
  if (!confirm("Start a new week? This keeps your family profile and what we've learned, but clears this week's meals and grocery list.")) return;
  state.weekPlan = pickWeek(state.profile, state.feedback);
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

// ---------- Boot ----------

function boot() {
  if (state.familyText) document.getElementById("family-text").value = state.familyText;

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

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js").catch(() => { /* offline support is optional */ });
  });
}
