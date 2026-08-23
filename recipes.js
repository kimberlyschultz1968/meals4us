// Meals4Us — starter recipe library
// Each recipe is tagged so the matching engine in app.js can filter/score it
// against a family profile without calling any AI. Ingredient units are kept
// consistent per ingredient name across every recipe so the grocery list can
// combine duplicates with simple addition (no unit conversion needed).
//
// allergens: fish, shellfish, dairy, gluten, egg, peanut, treeNut, soy
// tags: quick (<=30 min), airfryer, slowcooker, onepot, leftovers, kidFriendly, spicy, vegetarian, grill, breakfastForDinner

const RECIPES = [
  {
    id: "chicken-tacos", name: "Chicken Tacos", emoji: "🌮", cuisine: "mexican",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["gluten"],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "taco seasoning", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "flour tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "salsa", qty: 0.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "spaghetti-meatballs", name: "Spaghetti & Meatballs", emoji: "🍝", cuisine: "italian",
    proteins: ["beef"], tags: ["kidFriendly", "leftovers"], allergens: ["gluten", "egg", "dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "spaghetti", qty: 16, unit: "oz", category: "Pantry" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "parmesan", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "diced tomatoes", qty: 2, unit: "cup", category: "Pantry" },
      { name: "garlic", qty: 3, unit: "clove", category: "Produce" },
      { name: "italian seasoning", qty: 1, unit: "tsp", category: "Pantry" }
    ]
  },
  {
    id: "airfryer-chicken-potatoes", name: "Air Fryer Chicken & Potatoes", emoji: "🍗", cuisine: "american",
    proteins: ["chicken"], tags: ["quick", "airfryer", "kidFriendly"], allergens: [],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "potatoes", qty: 1.5, unit: "lb", category: "Produce" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "paprika", qty: 1, unit: "tsp", category: "Pantry" },
      { name: "garlic", qty: 2, unit: "clove", category: "Produce" }
    ]
  },
  {
    id: "beef-burgers", name: "Classic Beef Burgers", emoji: "🍔", cuisine: "american",
    proteins: ["beef"], tags: ["quick", "grill", "kidFriendly"], allergens: ["gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "ground beef", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "hamburger buns", qty: 6, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "ketchup", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "mayo", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "shrimp-stirfry", name: "Shrimp Stir Fry", emoji: "🍤", cuisine: "asian",
    proteins: ["shrimp"], tags: ["quick", "onepot"], allergens: ["shellfish", "soy", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "shrimp", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "broccoli", qty: 2, unit: "cup", category: "Produce" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 3, unit: "clove", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "salmon-veggies", name: "Baked Salmon & Veggies", emoji: "🐟", cuisine: "american",
    proteins: ["fish"], tags: ["quick"], allergens: ["fish"],
    timeMinutes: 25,
    ingredients: [
      { name: "salmon", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "broccoli", qty: 2, unit: "cup", category: "Produce" },
      { name: "lemon", qty: 1, unit: "whole", category: "Produce" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 2, unit: "clove", category: "Produce" }
    ]
  },
  {
    id: "beef-tacos", name: "Ground Beef Tacos", emoji: "🌮", cuisine: "mexican",
    proteins: ["beef"], tags: ["quick", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "taco seasoning", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "corn tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "chicken-alfredo", name: "Chicken Alfredo", emoji: "🍝", cuisine: "italian",
    proteins: ["chicken"], tags: ["kidFriendly", "leftovers"], allergens: ["gluten", "dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken breast", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "penne pasta", qty: 16, unit: "oz", category: "Pantry" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "parmesan", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "garlic", qty: 2, unit: "clove", category: "Produce" }
    ]
  },
  {
    id: "porkchops-applesauce", name: "Pan-Seared Pork Chops", emoji: "🍖", cuisine: "american",
    proteins: ["pork"], tags: ["quick"], allergens: [],
    timeMinutes: 25,
    ingredients: [
      { name: "pork chops", qty: 4, unit: "count", category: "Meat & Seafood" },
      { name: "potatoes", qty: 1, unit: "lb", category: "Produce" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 2, unit: "clove", category: "Produce" }
    ]
  },
  {
    id: "bbq-pulled-pork", name: "Slow Cooker BBQ Pulled Pork", emoji: "🍖", cuisine: "american",
    proteins: ["pork"], tags: ["slowcooker", "leftovers", "kidFriendly"], allergens: ["gluten"],
    timeMinutes: 20,
    ingredients: [
      { name: "pork shoulder", qty: 2.5, unit: "lb", category: "Meat & Seafood" },
      { name: "bbq sauce", qty: 1, unit: "cup", category: "Pantry" },
      { name: "hamburger buns", qty: 6, unit: "count", category: "Pantry" }
    ]
  },
  {
    id: "chicken-fried-rice", name: "Chicken Fried Rice", emoji: "🍚", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick", "onepot", "leftovers"], allergens: ["soy", "egg", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 2, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "frozen peas", qty: 1, unit: "cup", category: "Frozen" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "green onion", qty: 1, unit: "bunch", category: "Produce" }
    ]
  },
  {
    id: "veggie-stirfry", name: "Veggie Stir Fry", emoji: "🥦", cuisine: "asian",
    proteins: ["vegetarian"], tags: ["quick", "onepot", "vegetarian"], allergens: ["soy", "gluten"],
    timeMinutes: 20,
    ingredients: [
      { name: "broccoli", qty: 2, unit: "cup", category: "Produce" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "mushrooms", qty: 1, unit: "cup", category: "Produce" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "garlic", qty: 3, unit: "clove", category: "Produce" }
    ]
  },
  {
    id: "black-bean-tacos", name: "Black Bean Tacos", emoji: "🌮", cuisine: "mexican",
    proteins: ["vegetarian"], tags: ["quick", "vegetarian", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "black beans", qty: 2, unit: "cup", category: "Pantry" },
      { name: "corn tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "avocado", qty: 2, unit: "whole", category: "Produce" },
      { name: "salsa", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "lime", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "cheese-pizza", name: "Homemade Cheese Pizza", emoji: "🍕", cuisine: "italian",
    proteins: ["vegetarian"], tags: ["kidFriendly", "vegetarian"], allergens: ["gluten", "dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "pizza dough", qty: 1, unit: "whole", category: "Pantry" },
      { name: "pizza sauce", qty: 0.75, unit: "cup", category: "Pantry" },
      { name: "shredded mozzarella", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "italian seasoning", qty: 1, unit: "tsp", category: "Pantry" }
    ]
  },
  {
    id: "pepperoni-pizza", name: "Pepperoni Pizza", emoji: "🍕", cuisine: "italian",
    proteins: ["pork"], tags: ["kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "pizza dough", qty: 1, unit: "whole", category: "Pantry" },
      { name: "pizza sauce", qty: 0.75, unit: "cup", category: "Pantry" },
      { name: "shredded mozzarella", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "pepperoni", qty: 3, unit: "oz", category: "Meat & Seafood" }
    ]
  },
  {
    id: "turkey-chili", name: "Turkey Chili", emoji: "🌶️", cuisine: "american",
    proteins: ["turkey"], tags: ["onepot", "leftovers", "spicy"], allergens: [],
    timeMinutes: 35,
    ingredients: [
      { name: "ground turkey", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "black beans", qty: 2, unit: "cup", category: "Pantry" },
      { name: "diced tomatoes", qty: 2, unit: "cup", category: "Pantry" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "chili powder", qty: 2, unit: "tsp", category: "Pantry" },
      { name: "cumin", qty: 1, unit: "tsp", category: "Pantry" }
    ]
  },
  {
    id: "turkey-burgers", name: "Turkey Burgers", emoji: "🍔", cuisine: "american",
    proteins: ["turkey"], tags: ["quick", "grill"], allergens: ["gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "ground turkey", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "hamburger buns", qty: 6, unit: "count", category: "Pantry" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "mayo", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "breakfast-burritos", name: "Breakfast-for-Dinner Burritos", emoji: "🌯", cuisine: "mexican",
    proteins: ["vegetarian"], tags: ["quick", "breakfastForDinner", "kidFriendly"], allergens: ["egg", "gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "eggs", qty: 8, unit: "count", category: "Dairy & Eggs" },
      { name: "flour tortillas", qty: 6, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" },
      { name: "salsa", qty: 0.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "bacon-egg-pancakes", name: "Bacon, Eggs & Pancakes", emoji: "🥞", cuisine: "american",
    proteins: ["pork"], tags: ["quick", "breakfastForDinner", "kidFriendly"], allergens: ["egg", "gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "bacon", qty: 8, unit: "oz", category: "Meat & Seafood" },
      { name: "eggs", qty: 6, unit: "count", category: "Dairy & Eggs" },
      { name: "pancake mix", qty: 2, unit: "cup", category: "Pantry" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "grilled-cheese-tomato-soup", name: "Grilled Cheese & Tomato Soup", emoji: "🧀", cuisine: "american",
    proteins: ["vegetarian"], tags: ["quick", "kidFriendly", "vegetarian"], allergens: ["gluten", "dairy"],
    timeMinutes: 15,
    ingredients: [
      { name: "bread loaf", qty: 1, unit: "whole", category: "Pantry" },
      { name: "shredded cheddar", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "diced tomatoes", qty: 2, unit: "cup", category: "Pantry" },
      { name: "milk", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "hot-dogs-fries", name: "Hot Dogs & Fries", emoji: "🌭", cuisine: "american",
    proteins: ["beef"], tags: ["quick", "kidFriendly", "airfryer"], allergens: ["gluten"],
    timeMinutes: 20,
    ingredients: [
      { name: "hot dogs", qty: 8, unit: "count", category: "Meat & Seafood" },
      { name: "hot dog buns", qty: 8, unit: "count", category: "Pantry" },
      { name: "frozen fries", qty: 1, unit: "lb", category: "Frozen" },
      { name: "ketchup", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "mustard", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "shrimp-tacos", name: "Shrimp Tacos", emoji: "🌮", cuisine: "mexican",
    proteins: ["shrimp"], tags: ["quick"], allergens: ["shellfish", "dairy", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "shrimp", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "corn tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "cabbage", qty: 1, unit: "cup", category: "Produce" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "lime", qty: 2, unit: "whole", category: "Produce" },
      { name: "chili powder", qty: 1, unit: "tsp", category: "Pantry" }
    ]
  },
  {
    id: "beef-stirfry", name: "Beef & Broccoli Stir Fry", emoji: "🥢", cuisine: "asian",
    proteins: ["beef"], tags: ["quick", "onepot"], allergens: ["soy", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "beef sirloin", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "broccoli", qty: 3, unit: "cup", category: "Produce" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 3, unit: "clove", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-parmesan", name: "Chicken Parmesan", emoji: "🍗", cuisine: "italian",
    proteins: ["chicken"], tags: ["leftovers", "kidFriendly"], allergens: ["gluten", "egg", "dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 1, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "parmesan", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "shredded mozzarella", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "pizza sauce", qty: 1, unit: "cup", category: "Pantry" },
      { name: "spaghetti", qty: 16, unit: "oz", category: "Pantry" }
    ]
  },
  {
    id: "greek-chicken-bowls", name: "Greek Chicken Bowls", emoji: "🥙", cuisine: "mediterranean",
    proteins: ["chicken"], tags: ["quick", "leftovers"], allergens: ["dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "cucumber", qty: 1, unit: "whole", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "feta cheese", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "lemon", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "beef-quesadillas", name: "Beef Quesadillas", emoji: "🧀", cuisine: "mexican",
    proteins: ["beef"], tags: ["quick", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "flour tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "meatloaf-mashed-potatoes", name: "Meatloaf & Mashed Potatoes", emoji: "🍽️", cuisine: "american",
    proteins: ["beef"], tags: ["leftovers", "kidFriendly"], allergens: ["egg", "gluten", "dairy"],
    timeMinutes: 55,
    ingredients: [
      { name: "ground beef", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "ketchup", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "potatoes", qty: 2, unit: "lb", category: "Produce" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "milk", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "airfryer-fish-tacos", name: "Air Fryer Fish Tacos", emoji: "🐠", cuisine: "mexican",
    proteins: ["fish"], tags: ["quick", "airfryer"], allergens: ["fish", "gluten", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "tilapia", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "corn tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "cabbage", qty: 1, unit: "cup", category: "Produce" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "lime", qty: 2, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "one-pot-chicken-rice", name: "One-Pot Chicken & Rice", emoji: "🍲", cuisine: "american",
    proteins: ["chicken"], tags: ["onepot", "leftovers", "kidFriendly"], allergens: [],
    timeMinutes: 35,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "chicken broth", qty: 2, unit: "cup", category: "Pantry" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "slowcooker-beef-stew", name: "Slow Cooker Beef Stew", emoji: "🍖", cuisine: "american",
    proteins: ["beef"], tags: ["slowcooker", "leftovers"], allergens: [],
    timeMinutes: 20,
    ingredients: [
      { name: "beef stew meat", qty: 2, unit: "lb", category: "Meat & Seafood" },
      { name: "potatoes", qty: 1.5, unit: "lb", category: "Produce" },
      { name: "carrots", qty: 1.5, unit: "cup", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "chicken broth", qty: 2, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "veggie-quesadillas", name: "Veggie Quesadillas", emoji: "🌯", cuisine: "mexican",
    proteins: ["vegetarian"], tags: ["quick", "vegetarian", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 15,
    ingredients: [
      { name: "flour tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "black beans", qty: 1, unit: "cup", category: "Pantry" },
      { name: "salsa", qty: 0.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "lemon-herb-chicken", name: "Lemon Herb Roast Chicken", emoji: "🍗", cuisine: "american",
    proteins: ["chicken"], tags: ["leftovers"], allergens: [],
    timeMinutes: 60,
    ingredients: [
      { name: "whole chicken", qty: 1, unit: "whole", category: "Meat & Seafood" },
      { name: "potatoes", qty: 1.5, unit: "lb", category: "Produce" },
      { name: "lemon", qty: 2, unit: "whole", category: "Produce" },
      { name: "garlic", qty: 4, unit: "clove", category: "Produce" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "spicy-shrimp-noodles", name: "Spicy Shrimp Noodles", emoji: "🍜", cuisine: "asian",
    proteins: ["shrimp"], tags: ["quick", "spicy"], allergens: ["shellfish", "soy", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "shrimp", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "spaghetti", qty: 12, unit: "oz", category: "Pantry" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "green onion", qty: 1, unit: "bunch", category: "Produce" },
      { name: "garlic", qty: 3, unit: "clove", category: "Produce" },
      { name: "chili powder", qty: 1, unit: "tsp", category: "Pantry" }
    ]
  },
  {
    id: "veggie-fajitas", name: "Veggie Fajitas", emoji: "🫑", cuisine: "mexican",
    proteins: ["vegetarian"], tags: ["quick", "vegetarian"], allergens: ["gluten"],
    timeMinutes: 20,
    ingredients: [
      { name: "bell pepper", qty: 3, unit: "whole", category: "Produce" },
      { name: "onion", qty: 2, unit: "whole", category: "Produce" },
      { name: "flour tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "black beans", qty: 1, unit: "cup", category: "Pantry" },
      { name: "avocado", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "chicken-fajitas", name: "Chicken Fajitas", emoji: "🌶️", cuisine: "mexican",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "bell pepper", qty: 3, unit: "whole", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "flour tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "baked-ziti", name: "Baked Ziti", emoji: "🧀", cuisine: "italian",
    proteins: ["beef"], tags: ["leftovers", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 45,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "penne pasta", qty: 16, unit: "oz", category: "Pantry" },
      { name: "diced tomatoes", qty: 2, unit: "cup", category: "Pantry" },
      { name: "shredded mozzarella", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "parmesan", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "italian seasoning", qty: 1, unit: "tsp", category: "Pantry" }
    ]
  },
  {
    id: "peanut-chicken-noodles", name: "Peanut Chicken Noodles", emoji: "🥜", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick"], allergens: ["peanut", "soy", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "spaghetti", qty: 12, unit: "oz", category: "Pantry" },
      { name: "peanut butter", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "soy sauce", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "green onion", qty: 1, unit: "bunch", category: "Produce" }
    ]
  },
  {
    id: "mediterranean-shrimp-bowls", name: "Mediterranean Shrimp Bowls", emoji: "🥗", cuisine: "mediterranean",
    proteins: ["shrimp"], tags: ["quick"], allergens: ["shellfish", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "shrimp", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "cucumber", qty: 1, unit: "whole", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "feta cheese", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "lemon", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "zucchini-boats", name: "Stuffed Zucchini Boats", emoji: "🥒", cuisine: "italian",
    proteins: ["turkey"], tags: ["leftovers"], allergens: ["dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "ground turkey", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "zucchini", qty: 4, unit: "whole", category: "Produce" },
      { name: "diced tomatoes", qty: 1, unit: "cup", category: "Pantry" },
      { name: "shredded mozzarella", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "italian seasoning", qty: 1, unit: "tsp", category: "Pantry" }
    ]
  },
  {
    id: "steak-fajita-bowls", name: "Steak Fajita Bowls", emoji: "🥩", cuisine: "mexican",
    proteins: ["beef"], tags: ["quick"], allergens: [],
    timeMinutes: 25,
    ingredients: [
      { name: "beef sirloin", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "lime", qty: 1, unit: "whole", category: "Produce" },
      { name: "avocado", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "chicken-curry", name: "Chicken Curry", emoji: "🍛", cuisine: "indian",
    proteins: ["chicken"], tags: ["onepot", "leftovers"], allergens: ["dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "garlic", qty: 3, unit: "clove", category: "Produce" },
      { name: "curry powder", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "coconut milk", qty: 1, unit: "cup", category: "Pantry" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "lentil-curry", name: "Lentil Curry", emoji: "🍛", cuisine: "indian",
    proteins: ["vegetarian"], tags: ["onepot", "leftovers", "vegetarian"], allergens: ["dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "lentils", qty: 2, unit: "cup", category: "Pantry" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "garlic", qty: 3, unit: "clove", category: "Produce" },
      { name: "curry powder", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "coconut milk", qty: 1, unit: "cup", category: "Pantry" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "teriyaki-chicken", name: "Teriyaki Chicken", emoji: "🍱", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["soy", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "teriyaki sauce", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "broccoli", qty: 2, unit: "cup", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "sesame seeds", qty: 1, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "orange-chicken", name: "Orange Chicken", emoji: "🍊", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["soy", "gluten"],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "orange marmalade", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "soy sauce", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "broccoli", qty: 1, unit: "cup", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "korean-beef-bowls", name: "Korean Beef Bowls", emoji: "🥢", cuisine: "asian",
    proteins: ["beef"], tags: ["quick", "onepot"], allergens: ["soy"],
    timeMinutes: 25,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "brown sugar", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 3, unit: "clove", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "green onion", qty: 1, unit: "bunch", category: "Produce" }
    ]
  },
  {
    id: "pad-thai", name: "Shrimp Pad Thai", emoji: "🍜", cuisine: "asian",
    proteins: ["shrimp"], tags: ["quick"], allergens: ["shellfish", "peanut", "egg"],
    timeMinutes: 30,
    ingredients: [
      { name: "shrimp", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "rice noodles", qty: 8, unit: "oz", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "peanuts", qty: 0.25, unit: "cup", category: "Pantry" },
      { name: "bean sprouts", qty: 1, unit: "cup", category: "Produce" },
      { name: "lime", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "chicken-shawarma-bowls", name: "Chicken Shawarma Bowls", emoji: "🥙", cuisine: "mediterranean",
    proteins: ["chicken"], tags: ["quick", "leftovers"], allergens: [],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "cucumber", qty: 1, unit: "whole", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "tahini", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "pita bread", qty: 4, unit: "count", category: "Pantry" }
    ]
  },
  {
    id: "beef-gyros", name: "Beef Gyros", emoji: "🥙", cuisine: "mediterranean",
    proteins: ["beef"], tags: ["quick"], allergens: ["gluten", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "beef sirloin", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "pita bread", qty: 4, unit: "count", category: "Pantry" },
      { name: "tomato", qty: 1, unit: "whole", category: "Produce" },
      { name: "cucumber", qty: 1, unit: "whole", category: "Produce" },
      { name: "tzatziki", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "falafel-bowls", name: "Falafel Bowls", emoji: "🧆", cuisine: "mediterranean",
    proteins: ["vegetarian"], tags: ["quick", "vegetarian"], allergens: ["gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "chickpeas", qty: 2, unit: "cup", category: "Pantry" },
      { name: "pita bread", qty: 4, unit: "count", category: "Pantry" },
      { name: "cucumber", qty: 1, unit: "whole", category: "Produce" },
      { name: "tomato", qty: 1, unit: "whole", category: "Produce" },
      { name: "tahini", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "mac-and-cheese", name: "Homemade Mac & Cheese", emoji: "🧀", cuisine: "american",
    proteins: ["vegetarian"], tags: ["quick", "kidFriendly", "vegetarian"], allergens: ["gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "elbow macaroni", qty: 16, unit: "oz", category: "Pantry" },
      { name: "shredded cheddar", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "chicken-mac-and-cheese", name: "Chicken Mac & Cheese", emoji: "🧀", cuisine: "american",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "elbow macaroni", qty: 16, unit: "oz", category: "Pantry" },
      { name: "shredded cheddar", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "chicken-pot-pie", name: "Chicken Pot Pie", emoji: "🥧", cuisine: "american",
    proteins: ["chicken"], tags: ["leftovers", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 50,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "frozen peas", qty: 1, unit: "cup", category: "Frozen" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "pie crust", qty: 2, unit: "count", category: "Pantry" },
      { name: "chicken broth", qty: 1, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-noodle-soup", name: "Chicken Noodle Soup", emoji: "🍲", cuisine: "american",
    proteins: ["chicken"], tags: ["onepot", "leftovers"], allergens: ["gluten"],
    timeMinutes: 35,
    ingredients: [
      { name: "chicken breast", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "egg noodles", qty: 8, unit: "oz", category: "Pantry" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "celery", qty: 1, unit: "cup", category: "Produce" },
      { name: "chicken broth", qty: 4, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "minestrone-soup", name: "Minestrone Soup", emoji: "🍲", cuisine: "italian",
    proteins: ["vegetarian"], tags: ["onepot", "vegetarian", "leftovers"], allergens: ["gluten"],
    timeMinutes: 35,
    ingredients: [
      { name: "diced tomatoes", qty: 2, unit: "cup", category: "Pantry" },
      { name: "black beans", qty: 1, unit: "cup", category: "Pantry" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "celery", qty: 1, unit: "cup", category: "Produce" },
      { name: "penne pasta", qty: 8, unit: "oz", category: "Pantry" },
      { name: "chicken broth", qty: 3, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "beef-stroganoff", name: "Beef Stroganoff", emoji: "🍝", cuisine: "american",
    proteins: ["beef"], tags: ["leftovers"], allergens: ["gluten", "dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "mushrooms", qty: 1, unit: "cup", category: "Produce" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "egg noodles", qty: 12, unit: "oz", category: "Pantry" },
      { name: "beef broth", qty: 1, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "tuna-casserole", name: "Tuna Casserole", emoji: "🥘", cuisine: "american",
    proteins: ["fish"], tags: ["kidFriendly", "leftovers"], allergens: ["fish", "gluten", "dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "canned tuna", qty: 2, unit: "can", category: "Pantry" },
      { name: "egg noodles", qty: 12, unit: "oz", category: "Pantry" },
      { name: "frozen peas", qty: 1, unit: "cup", category: "Frozen" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "milk", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "king-ranch-chicken", name: "King Ranch Chicken", emoji: "🌮", cuisine: "american",
    proteins: ["chicken"], tags: ["leftovers"], allergens: ["dairy"],
    timeMinutes: 45,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "corn tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "diced tomatoes", qty: 1, unit: "cup", category: "Pantry" },
      { name: "shredded cheddar", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "chicken-enchiladas", name: "Chicken Enchiladas", emoji: "🌯", cuisine: "mexican",
    proteins: ["chicken"], tags: ["leftovers", "kidFriendly"], allergens: ["dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "corn tortillas", qty: 10, unit: "count", category: "Pantry" },
      { name: "enchilada sauce", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "shredded cheddar", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "beef-enchiladas", name: "Beef Enchiladas", emoji: "🌯", cuisine: "mexican",
    proteins: ["beef"], tags: ["leftovers", "kidFriendly"], allergens: ["dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "corn tortillas", qty: 10, unit: "count", category: "Pantry" },
      { name: "enchilada sauce", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "shredded cheddar", qty: 1.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "carnitas-bowls", name: "Carnitas Bowls", emoji: "🌮", cuisine: "mexican",
    proteins: ["pork"], tags: ["slowcooker", "leftovers"], allergens: [],
    timeMinutes: 25,
    ingredients: [
      { name: "pork shoulder", qty: 2, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "black beans", qty: 1, unit: "cup", category: "Pantry" },
      { name: "lime", qty: 1, unit: "whole", category: "Produce" },
      { name: "cilantro", qty: 0.5, unit: "bunch", category: "Produce" }
    ]
  },
  {
    id: "sausage-peppers", name: "Sausage & Peppers", emoji: "🌭", cuisine: "italian",
    proteins: ["pork"], tags: ["quick", "onepot"], allergens: ["gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "italian sausage", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "bell pepper", qty: 3, unit: "whole", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "sub rolls", qty: 6, unit: "count", category: "Pantry" }
    ]
  },
  {
    id: "philly-cheesesteak", name: "Philly Cheesesteak", emoji: "🥪", cuisine: "american",
    proteins: ["beef"], tags: ["quick"], allergens: ["gluten", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "beef sirloin", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "sub rolls", qty: 6, unit: "count", category: "Pantry" },
      { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "shredded mozzarella", qty: 1, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "meatball-subs", name: "Meatball Subs", emoji: "🥪", cuisine: "italian",
    proteins: ["beef"], tags: ["kidFriendly", "leftovers"], allergens: ["gluten", "egg", "dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "sub rolls", qty: 6, unit: "count", category: "Pantry" },
      { name: "pizza sauce", qty: 1, unit: "cup", category: "Pantry" },
      { name: "shredded mozzarella", qty: 1, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "sloppy-joes", name: "Sloppy Joes", emoji: "🍔", cuisine: "american",
    proteins: ["beef"], tags: ["quick", "kidFriendly"], allergens: ["gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "ground beef", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "hamburger buns", qty: 6, unit: "count", category: "Pantry" },
      { name: "ketchup", qty: 4, unit: "tbsp", category: "Pantry" },
      { name: "bbq sauce", qty: 0.25, unit: "cup", category: "Pantry" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "buffalo-chicken-wraps", name: "Buffalo Chicken Wraps", emoji: "🌯", cuisine: "american",
    proteins: ["chicken"], tags: ["quick", "spicy"], allergens: ["gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "chicken breast", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "flour tortillas", qty: 6, unit: "count", category: "Pantry" },
      { name: "hot sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" }
    ]
  },
  {
    id: "chicken-caesar-wraps", name: "Chicken Caesar Wraps", emoji: "🌯", cuisine: "american",
    proteins: ["chicken"], tags: ["quick"], allergens: ["gluten", "dairy", "egg"],
    timeMinutes: 20,
    ingredients: [
      { name: "chicken breast", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "flour tortillas", qty: 6, unit: "count", category: "Pantry" },
      { name: "caesar dressing", qty: 0.25, unit: "cup", category: "Pantry" },
      { name: "parmesan", qty: 0.25, unit: "cup", category: "Dairy & Eggs" },
      { name: "lettuce", qty: 2, unit: "cup", category: "Produce" }
    ]
  },
  {
    id: "blt-sandwiches", name: "BLT Sandwiches", emoji: "🥪", cuisine: "american",
    proteins: ["pork"], tags: ["quick", "kidFriendly"], allergens: ["gluten", "egg"],
    timeMinutes: 15,
    ingredients: [
      { name: "bacon", qty: 12, unit: "oz", category: "Meat & Seafood" },
      { name: "bread loaf", qty: 1, unit: "whole", category: "Pantry" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "mayo", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "club-sandwiches", name: "Club Sandwiches", emoji: "🥪", cuisine: "american",
    proteins: ["turkey"], tags: ["quick"], allergens: ["gluten", "egg"],
    timeMinutes: 15,
    ingredients: [
      { name: "deli turkey", qty: 8, unit: "oz", category: "Meat & Seafood" },
      { name: "bacon", qty: 8, unit: "oz", category: "Meat & Seafood" },
      { name: "bread loaf", qty: 1, unit: "whole", category: "Pantry" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" },
      { name: "tomato", qty: 1, unit: "whole", category: "Produce" },
      { name: "mayo", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "cobb-salad", name: "Cobb Salad", emoji: "🥗", cuisine: "american",
    proteins: ["chicken"], tags: ["quick"], allergens: ["egg", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "chicken breast", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "bacon", qty: 6, unit: "oz", category: "Meat & Seafood" },
      { name: "eggs", qty: 4, unit: "count", category: "Dairy & Eggs" },
      { name: "lettuce", qty: 3, unit: "cup", category: "Produce" },
      { name: "avocado", qty: 1, unit: "whole", category: "Produce" },
      { name: "blue cheese crumbles", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "greek-salad-chicken", name: "Greek Salad with Chicken", emoji: "🥗", cuisine: "mediterranean",
    proteins: ["chicken"], tags: ["quick"], allergens: ["dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "chicken breast", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "lettuce", qty: 2, unit: "cup", category: "Produce" },
      { name: "cucumber", qty: 1, unit: "whole", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "feta cheese", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "caprese-pasta", name: "Caprese Pasta", emoji: "🍝", cuisine: "italian",
    proteins: ["vegetarian"], tags: ["quick", "vegetarian"], allergens: ["gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "penne pasta", qty: 16, unit: "oz", category: "Pantry" },
      { name: "tomato", qty: 3, unit: "whole", category: "Produce" },
      { name: "shredded mozzarella", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "basil", qty: 1, unit: "bunch", category: "Produce" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "eggplant-parmesan", name: "Eggplant Parmesan", emoji: "🍆", cuisine: "italian",
    proteins: ["vegetarian"], tags: ["leftovers", "vegetarian"], allergens: ["gluten", "egg", "dairy"],
    timeMinutes: 45,
    ingredients: [
      { name: "eggplant", qty: 2, unit: "whole", category: "Produce" },
      { name: "breadcrumbs", qty: 1, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "shredded mozzarella", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "pizza sauce", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "parmesan", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "veggie-burgers", name: "Veggie Burgers", emoji: "🍔", cuisine: "american",
    proteins: ["vegetarian"], tags: ["quick", "vegetarian", "kidFriendly"], allergens: ["gluten"],
    timeMinutes: 20,
    ingredients: [
      { name: "veggie burger patties", qty: 6, unit: "count", category: "Frozen" },
      { name: "hamburger buns", qty: 6, unit: "count", category: "Pantry" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "avocado", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "lentil-soup", name: "Lentil Soup", emoji: "🍲", cuisine: "mediterranean",
    proteins: ["vegetarian"], tags: ["onepot", "vegetarian", "leftovers"], allergens: [],
    timeMinutes: 35,
    ingredients: [
      { name: "lentils", qty: 2, unit: "cup", category: "Pantry" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "diced tomatoes", qty: 1, unit: "cup", category: "Pantry" },
      { name: "vegetable broth", qty: 4, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "waffles-sausage", name: "Waffles & Sausage", emoji: "🧇", cuisine: "american",
    proteins: ["pork"], tags: ["quick", "breakfastForDinner", "kidFriendly"], allergens: ["egg", "gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "breakfast sausage links", qty: 12, unit: "oz", category: "Meat & Seafood" },
      { name: "waffle mix", qty: 2, unit: "cup", category: "Pantry" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "french-toast-bacon", name: "French Toast & Bacon", emoji: "🍞", cuisine: "american",
    proteins: ["pork"], tags: ["quick", "breakfastForDinner", "kidFriendly"], allergens: ["egg", "gluten", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "bread loaf", qty: 1, unit: "whole", category: "Pantry" },
      { name: "eggs", qty: 4, unit: "count", category: "Dairy & Eggs" },
      { name: "milk", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "bacon", qty: 8, unit: "oz", category: "Meat & Seafood" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "veggie-omelets", name: "Veggie Omelets", emoji: "🍳", cuisine: "american",
    proteins: ["vegetarian"], tags: ["quick", "breakfastForDinner", "vegetarian"], allergens: ["egg", "dairy"],
    timeMinutes: 15,
    ingredients: [
      { name: "eggs", qty: 8, unit: "count", category: "Dairy & Eggs" },
      { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" },
      { name: "mushrooms", qty: 1, unit: "cup", category: "Produce" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 1, unit: "tbsp", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "jambalaya", name: "Shrimp & Sausage Jambalaya", emoji: "🍤", cuisine: "american",
    proteins: ["shrimp"], tags: ["onepot", "spicy", "leftovers"], allergens: ["shellfish"],
    timeMinutes: 40,
    ingredients: [
      { name: "shrimp", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "andouille sausage", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "diced tomatoes", qty: 1, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "red-beans-rice", name: "Red Beans & Rice", emoji: "🍚", cuisine: "american",
    proteins: ["pork"], tags: ["onepot", "leftovers"], allergens: [],
    timeMinutes: 30,
    ingredients: [
      { name: "andouille sausage", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "black beans", qty: 2, unit: "cup", category: "Pantry" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "crab-cakes", name: "Crab Cakes", emoji: "🦀", cuisine: "american",
    proteins: ["shrimp"], tags: ["quick"], allergens: ["shellfish", "egg", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "crab meat", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "mayo", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "lemon", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "fish-and-chips", name: "Fish & Chips", emoji: "🐟", cuisine: "american",
    proteins: ["fish"], tags: ["quick"], allergens: ["fish", "egg", "gluten"],
    timeMinutes: 30,
    ingredients: [
      { name: "tilapia", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "frozen fries", qty: 1, unit: "lb", category: "Frozen" },
      { name: "breadcrumbs", qty: 1, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "lemon", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "honey-garlic-chicken", name: "Honey Garlic Chicken", emoji: "🍗", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["soy"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "honey", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "soy sauce", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 4, unit: "clove", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chorizo-tacos", name: "Chorizo Tacos", emoji: "🌮", cuisine: "mexican",
    proteins: ["pork"], tags: ["quick", "spicy"], allergens: ["gluten"],
    timeMinutes: 20,
    ingredients: [
      { name: "chorizo", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "corn tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "cilantro", qty: 0.5, unit: "bunch", category: "Produce" },
      { name: "lime", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "taco-salad", name: "Taco Salad", emoji: "🥗", cuisine: "mexican",
    proteins: ["beef"], tags: ["quick", "kidFriendly"], allergens: ["dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "taco seasoning", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "lettuce", qty: 3, unit: "cup", category: "Produce" },
      { name: "tortilla chips", qty: 4, unit: "oz", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "salsa", qty: 0.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "nachos-supreme", name: "Nachos Supreme", emoji: "🧀", cuisine: "mexican",
    proteins: ["beef"], tags: ["quick", "kidFriendly"], allergens: ["dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "tortilla chips", qty: 8, unit: "oz", category: "Pantry" },
      { name: "shredded cheddar", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "black beans", qty: 1, unit: "cup", category: "Pantry" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "salsa", qty: 0.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "mexican-rice-bowls", name: "Mexican Chicken Rice Bowls", emoji: "🥣", cuisine: "mexican",
    proteins: ["chicken"], tags: ["quick", "onepot", "leftovers"], allergens: ["dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "black beans", qty: 1, unit: "cup", category: "Pantry" },
      { name: "corn", qty: 1, unit: "cup", category: "Produce" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "chilaquiles", name: "Chilaquiles", emoji: "🌶️", cuisine: "mexican",
    proteins: ["vegetarian"], tags: ["quick", "breakfastForDinner", "vegetarian"], allergens: ["egg", "dairy"],
    timeMinutes: 20,
    ingredients: [
      { name: "tortilla chips", qty: 8, unit: "oz", category: "Pantry" },
      { name: "eggs", qty: 6, unit: "count", category: "Dairy & Eggs" },
      { name: "salsa", qty: 1, unit: "cup", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "pozole", name: "Chicken Pozole", emoji: "🍲", cuisine: "mexican",
    proteins: ["chicken"], tags: ["onepot", "leftovers"], allergens: [],
    timeMinutes: 40,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "black beans", qty: 2, unit: "cup", category: "Pantry" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "cabbage", qty: 1, unit: "cup", category: "Produce" },
      { name: "chicken broth", qty: 4, unit: "cup", category: "Pantry" },
      { name: "lime", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "huevos-rancheros", name: "Huevos Rancheros", emoji: "🍳", cuisine: "mexican",
    proteins: ["vegetarian"], tags: ["quick", "breakfastForDinner", "vegetarian"], allergens: ["egg", "dairy"],
    timeMinutes: 15,
    ingredients: [
      { name: "eggs", qty: 6, unit: "count", category: "Dairy & Eggs" },
      { name: "corn tortillas", qty: 6, unit: "count", category: "Pantry" },
      { name: "black beans", qty: 1, unit: "cup", category: "Pantry" },
      { name: "salsa", qty: 0.75, unit: "cup", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "tamale-pie", name: "Tamale Pie", emoji: "🌽", cuisine: "mexican",
    proteins: ["beef"], tags: ["leftovers", "kidFriendly"], allergens: ["dairy"],
    timeMinutes: 45,
    ingredients: [
      { name: "ground beef", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "cornbread mix", qty: 1, unit: "count", category: "Pantry" },
      { name: "corn", qty: 1, unit: "cup", category: "Produce" },
      { name: "diced tomatoes", qty: 1, unit: "cup", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "chicken-piccata", name: "Chicken Piccata", emoji: "🍋", cuisine: "italian",
    proteins: ["chicken"], tags: ["quick"], allergens: ["gluten", "dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "lemon", qty: 2, unit: "whole", category: "Produce" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "garlic", qty: 2, unit: "clove", category: "Produce" },
      { name: "spaghetti", qty: 12, unit: "oz", category: "Pantry" }
    ]
  },
  {
    id: "shrimp-scampi", name: "Shrimp Scampi", emoji: "🍤", cuisine: "italian",
    proteins: ["shrimp"], tags: ["quick"], allergens: ["shellfish", "gluten", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "shrimp", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "spaghetti", qty: 12, unit: "oz", category: "Pantry" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "garlic", qty: 4, unit: "clove", category: "Produce" },
      { name: "lemon", qty: 1, unit: "whole", category: "Produce" }
    ]
  },
  {
    id: "lasagna", name: "Beef Lasagna", emoji: "🍝", cuisine: "italian",
    proteins: ["beef"], tags: ["leftovers", "kidFriendly"], allergens: ["gluten", "dairy", "egg"],
    timeMinutes: 60,
    ingredients: [
      { name: "ground beef", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "lasagna noodles", qty: 12, unit: "oz", category: "Pantry" },
      { name: "ricotta cheese", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "shredded mozzarella", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "diced tomatoes", qty: 2, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "mushroom-risotto", name: "Mushroom Risotto", emoji: "🍚", cuisine: "italian",
    proteins: ["vegetarian"], tags: ["vegetarian"], allergens: ["dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "arborio rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "mushrooms", qty: 2, unit: "cup", category: "Produce" },
      { name: "parmesan", qty: 0.75, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "chicken broth", qty: 3, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-marsala", name: "Chicken Marsala", emoji: "🍄", cuisine: "italian",
    proteins: ["chicken"], tags: ["leftovers"], allergens: ["gluten", "dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "mushrooms", qty: 2, unit: "cup", category: "Produce" },
      { name: "marsala wine", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "spaghetti", qty: 12, unit: "oz", category: "Pantry" }
    ]
  },
  {
    id: "stuffed-shells", name: "Stuffed Shells", emoji: "🐚", cuisine: "italian",
    proteins: ["vegetarian"], tags: ["leftovers", "vegetarian"], allergens: ["gluten", "dairy", "egg"],
    timeMinutes: 45,
    ingredients: [
      { name: "jumbo pasta shells", qty: 12, unit: "oz", category: "Pantry" },
      { name: "ricotta cheese", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "shredded mozzarella", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "pizza sauce", qty: 2, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "italian-wedding-soup", name: "Italian Wedding Soup", emoji: "🍲", cuisine: "italian",
    proteins: ["turkey"], tags: ["onepot", "leftovers"], allergens: ["gluten", "egg", "dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "ground turkey", qty: 1, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "spinach", qty: 2, unit: "cup", category: "Produce" },
      { name: "chicken broth", qty: 4, unit: "cup", category: "Pantry" },
      { name: "parmesan", qty: 0.25, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "bruschetta-chicken", name: "Bruschetta Chicken", emoji: "🍅", cuisine: "italian",
    proteins: ["chicken"], tags: ["quick"], allergens: ["dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "tomato", qty: 3, unit: "whole", category: "Produce" },
      { name: "shredded mozzarella", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "basil", qty: 1, unit: "bunch", category: "Produce" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "fried-chicken", name: "Fried Chicken", emoji: "🍗", cuisine: "american",
    proteins: ["chicken"], tags: ["kidFriendly", "leftovers"], allergens: ["gluten", "dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "chicken thighs", qty: 2, unit: "lb", category: "Meat & Seafood" },
      { name: "flour", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "buttermilk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "potatoes", qty: 1.5, unit: "lb", category: "Produce" }
    ]
  },
  {
    id: "chicken-tenders-fries", name: "Chicken Tenders & Fries", emoji: "🍗", cuisine: "american",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["gluten", "egg"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 1, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "frozen fries", qty: 1, unit: "lb", category: "Frozen" },
      { name: "ketchup", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "meatballs-mashed-potatoes", name: "Meatballs & Mashed Potatoes", emoji: "🍽️", cuisine: "american",
    proteins: ["beef"], tags: ["leftovers", "kidFriendly"], allergens: ["gluten", "egg", "dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "ground beef", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "potatoes", qty: 2, unit: "lb", category: "Produce" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "milk", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "shepherds-pie", name: "Shepherd's Pie", emoji: "🥧", cuisine: "american",
    proteins: ["beef"], tags: ["leftovers", "kidFriendly"], allergens: ["dairy"],
    timeMinutes: 45,
    ingredients: [
      { name: "ground beef", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "frozen peas", qty: 1, unit: "cup", category: "Frozen" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "potatoes", qty: 2, unit: "lb", category: "Produce" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "milk", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "pot-roast", name: "Sunday Pot Roast", emoji: "🍖", cuisine: "american",
    proteins: ["beef"], tags: ["slowcooker", "leftovers"], allergens: [],
    timeMinutes: 20,
    ingredients: [
      { name: "beef stew meat", qty: 2.5, unit: "lb", category: "Meat & Seafood" },
      { name: "potatoes", qty: 1.5, unit: "lb", category: "Produce" },
      { name: "carrots", qty: 1.5, unit: "cup", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "beef broth", qty: 2, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-fried-steak", name: "Chicken Fried Steak", emoji: "🥩", cuisine: "american",
    proteins: ["beef"], tags: ["kidFriendly"], allergens: ["gluten", "dairy", "egg"],
    timeMinutes: 30,
    ingredients: [
      { name: "beef cube steak", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "flour", qty: 1, unit: "cup", category: "Pantry" },
      { name: "buttermilk", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "potatoes", qty: 1.5, unit: "lb", category: "Produce" }
    ]
  },
  {
    id: "biscuits-gravy", name: "Biscuits & Gravy", emoji: "🥖", cuisine: "american",
    proteins: ["pork"], tags: ["quick", "breakfastForDinner", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "biscuits", qty: 8, unit: "count", category: "Pantry" },
      { name: "breakfast sausage links", qty: 12, unit: "oz", category: "Meat & Seafood" },
      { name: "flour", qty: 0.25, unit: "cup", category: "Pantry" },
      { name: "milk", qty: 2, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "corn-dogs", name: "Corn Dogs & Fries", emoji: "🌭", cuisine: "american",
    proteins: ["beef"], tags: ["quick", "kidFriendly"], allergens: ["gluten", "egg"],
    timeMinutes: 20,
    ingredients: [
      { name: "hot dogs", qty: 8, unit: "count", category: "Meat & Seafood" },
      { name: "cornmeal", qty: 1, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "frozen fries", qty: 1, unit: "lb", category: "Frozen" },
      { name: "mustard", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "buffalo-wings", name: "Buffalo Wings", emoji: "🍗", cuisine: "american",
    proteins: ["chicken"], tags: ["spicy", "quick"], allergens: ["dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "chicken wings", qty: 2, unit: "lb", category: "Meat & Seafood" },
      { name: "hot sauce", qty: 4, unit: "tbsp", category: "Pantry" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "celery", qty: 1, unit: "cup", category: "Produce" }
    ]
  },
  {
    id: "turkey-meatballs-marinara", name: "Turkey Meatballs & Marinara", emoji: "🍝", cuisine: "italian",
    proteins: ["turkey"], tags: ["leftovers", "kidFriendly"], allergens: ["gluten", "egg"],
    timeMinutes: 35,
    ingredients: [
      { name: "ground turkey", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "pizza sauce", qty: 2, unit: "cup", category: "Pantry" },
      { name: "spaghetti", qty: 16, unit: "oz", category: "Pantry" }
    ]
  },
  {
    id: "sesame-chicken", name: "Sesame Chicken", emoji: "🍗", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["soy"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "sesame seeds", qty: 1, unit: "tbsp", category: "Pantry" },
      { name: "brown sugar", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "mongolian-beef", name: "Mongolian Beef", emoji: "🥢", cuisine: "asian",
    proteins: ["beef"], tags: ["quick"], allergens: ["soy"],
    timeMinutes: 25,
    ingredients: [
      { name: "beef sirloin", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "brown sugar", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "green onion", qty: 1, unit: "bunch", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-lo-mein", name: "Chicken Lo Mein", emoji: "🍜", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick", "onepot"], allergens: ["soy", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "lo mein noodles", qty: 12, unit: "oz", category: "Pantry" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" }
    ]
  },
  {
    id: "veggie-lo-mein", name: "Veggie Lo Mein", emoji: "🍜", cuisine: "asian",
    proteins: ["vegetarian"], tags: ["quick", "onepot", "vegetarian"], allergens: ["soy", "gluten"],
    timeMinutes: 20,
    ingredients: [
      { name: "lo mein noodles", qty: 12, unit: "oz", category: "Pantry" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "broccoli", qty: 1, unit: "cup", category: "Produce" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "sweet-sour-chicken", name: "Sweet & Sour Chicken", emoji: "🍍", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["soy"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "pineapple chunks", qty: 1, unit: "cup", category: "Produce" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "soy sauce", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "kung-pao-chicken", name: "Kung Pao Chicken", emoji: "🌶️", cuisine: "asian",
    proteins: ["chicken"], tags: ["quick", "spicy"], allergens: ["soy", "peanut"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "peanuts", qty: 0.25, unit: "cup", category: "Pantry" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "beef-bulgogi", name: "Beef Bulgogi", emoji: "🥢", cuisine: "asian",
    proteins: ["beef"], tags: ["quick"], allergens: ["soy"],
    timeMinutes: 25,
    ingredients: [
      { name: "beef sirloin", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "brown sugar", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 4, unit: "clove", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-katsu", name: "Chicken Katsu", emoji: "🍗", cuisine: "asian",
    proteins: ["chicken"], tags: ["kidFriendly"], allergens: ["gluten", "egg"],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 1, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "veggie-fried-rice", name: "Veggie Fried Rice", emoji: "🍚", cuisine: "asian",
    proteins: ["vegetarian"], tags: ["quick", "onepot", "vegetarian"], allergens: ["soy", "egg"],
    timeMinutes: 20,
    ingredients: [
      { name: "rice", qty: 2, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "frozen peas", qty: 1, unit: "cup", category: "Frozen" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "soy sauce", qty: 3, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "teriyaki-salmon", name: "Teriyaki Salmon", emoji: "🐟", cuisine: "asian",
    proteins: ["fish"], tags: ["quick"], allergens: ["fish", "soy", "gluten"],
    timeMinutes: 25,
    ingredients: [
      { name: "salmon", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "teriyaki sauce", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "broccoli", qty: 2, unit: "cup", category: "Produce" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-kebabs", name: "Chicken Kebabs", emoji: "🍢", cuisine: "mediterranean",
    proteins: ["chicken"], tags: ["quick", "grill"], allergens: [],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "lemon", qty: 1, unit: "whole", category: "Produce" },
      { name: "pita bread", qty: 4, unit: "count", category: "Pantry" }
    ]
  },
  {
    id: "spanakopita", name: "Spanakopita", emoji: "🥬", cuisine: "mediterranean",
    proteins: ["vegetarian"], tags: ["vegetarian", "leftovers"], allergens: ["gluten", "dairy", "egg"],
    timeMinutes: 45,
    ingredients: [
      { name: "spinach", qty: 4, unit: "cup", category: "Produce" },
      { name: "feta cheese", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "phyllo dough", qty: 12, unit: "count", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "hummus-veggie-bowls", name: "Hummus Veggie Bowls", emoji: "🥙", cuisine: "mediterranean",
    proteins: ["vegetarian"], tags: ["quick", "vegetarian"], allergens: ["gluten"],
    timeMinutes: 15,
    ingredients: [
      { name: "hummus", qty: 1, unit: "cup", category: "Pantry" },
      { name: "cucumber", qty: 1, unit: "whole", category: "Produce" },
      { name: "tomato", qty: 2, unit: "whole", category: "Produce" },
      { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" },
      { name: "pita bread", qty: 4, unit: "count", category: "Pantry" }
    ]
  },
  {
    id: "mediterranean-baked-chicken", name: "Mediterranean Baked Chicken", emoji: "🍗", cuisine: "mediterranean",
    proteins: ["chicken"], tags: ["leftovers"], allergens: [],
    timeMinutes: 45,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "lemon", qty: 2, unit: "whole", category: "Produce" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 4, unit: "clove", category: "Produce" },
      { name: "potatoes", qty: 1.5, unit: "lb", category: "Produce" }
    ]
  },
  {
    id: "greek-chicken-skewers", name: "Greek Chicken Skewers", emoji: "🍢", cuisine: "mediterranean",
    proteins: ["chicken"], tags: ["quick", "grill"], allergens: ["dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "bell pepper", qty: 2, unit: "whole", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "feta cheese", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "olive oil", qty: 2, unit: "tbsp", category: "Pantry" }
    ]
  },
  {
    id: "moussaka", name: "Moussaka", emoji: "🍆", cuisine: "mediterranean",
    proteins: ["beef"], tags: ["leftovers"], allergens: ["dairy"],
    timeMinutes: 55,
    ingredients: [
      { name: "ground beef", qty: 1.25, unit: "lb", category: "Meat & Seafood" },
      { name: "eggplant", qty: 2, unit: "whole", category: "Produce" },
      { name: "potatoes", qty: 1, unit: "lb", category: "Produce" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "parmesan", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "butter-chicken", name: "Butter Chicken", emoji: "🍛", cuisine: "indian",
    proteins: ["chicken"], tags: ["leftovers"], allergens: ["dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "coconut milk", qty: 1, unit: "cup", category: "Pantry" },
      { name: "diced tomatoes", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "curry powder", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-tikka-masala", name: "Chicken Tikka Masala", emoji: "🍛", cuisine: "indian",
    proteins: ["chicken"], tags: ["leftovers", "spicy"], allergens: ["dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "coconut milk", qty: 1, unit: "cup", category: "Pantry" },
      { name: "diced tomatoes", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "curry powder", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "saag-paneer", name: "Saag Paneer", emoji: "🍛", cuisine: "indian",
    proteins: ["vegetarian"], tags: ["vegetarian"], allergens: ["dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "spinach", qty: 4, unit: "cup", category: "Produce" },
      { name: "paneer cheese", qty: 8, unit: "oz", category: "Dairy & Eggs" },
      { name: "coconut milk", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "curry powder", qty: 1, unit: "tbsp", category: "Pantry" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chana-masala", name: "Chana Masala", emoji: "🍛", cuisine: "indian",
    proteins: ["vegetarian"], tags: ["onepot", "vegetarian", "leftovers"], allergens: [],
    timeMinutes: 30,
    ingredients: [
      { name: "chickpeas", qty: 2, unit: "cup", category: "Pantry" },
      { name: "diced tomatoes", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "curry powder", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "rice", qty: 1.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "chicken-biryani", name: "Chicken Biryani", emoji: "🍛", cuisine: "indian",
    proteins: ["chicken"], tags: ["leftovers"], allergens: ["dairy"],
    timeMinutes: 45,
    ingredients: [
      { name: "chicken thighs", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "rice", qty: 2, unit: "cup", category: "Pantry" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "curry powder", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "yogurt", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "breakfast-tacos", name: "Breakfast Tacos", emoji: "🌮", cuisine: "mexican",
    proteins: ["pork"], tags: ["quick", "breakfastForDinner", "kidFriendly"], allergens: ["egg", "gluten", "dairy"],
    timeMinutes: 15,
    ingredients: [
      { name: "eggs", qty: 8, unit: "count", category: "Dairy & Eggs" },
      { name: "bacon", qty: 8, unit: "oz", category: "Meat & Seafood" },
      { name: "flour tortillas", qty: 8, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "salsa", qty: 0.5, unit: "cup", category: "Pantry" }
    ]
  },
  {
    id: "breakfast-pizza", name: "Breakfast Pizza", emoji: "🍕", cuisine: "american",
    proteins: ["pork"], tags: ["breakfastForDinner", "kidFriendly"], allergens: ["egg", "gluten", "dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "pizza dough", qty: 1, unit: "whole", category: "Pantry" },
      { name: "eggs", qty: 6, unit: "count", category: "Dairy & Eggs" },
      { name: "bacon", qty: 8, unit: "oz", category: "Meat & Seafood" },
      { name: "shredded cheddar", qty: 1.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "shredded mozzarella", qty: 1, unit: "cup", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "ham-cheese-omelet", name: "Ham & Cheese Omelets", emoji: "🍳", cuisine: "american",
    proteins: ["pork"], tags: ["quick", "breakfastForDinner"], allergens: ["egg", "dairy"],
    timeMinutes: 15,
    ingredients: [
      { name: "eggs", qty: 8, unit: "count", category: "Dairy & Eggs" },
      { name: "ham", qty: 8, unit: "oz", category: "Meat & Seafood" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 1, unit: "tbsp", category: "Dairy & Eggs" }
    ]
  },
  {
    id: "shakshuka", name: "Shakshuka", emoji: "🍳", cuisine: "mediterranean",
    proteins: ["vegetarian"], tags: ["quick", "breakfastForDinner", "vegetarian"], allergens: ["egg", "dairy"],
    timeMinutes: 25,
    ingredients: [
      { name: "eggs", qty: 6, unit: "count", category: "Dairy & Eggs" },
      { name: "diced tomatoes", qty: 2, unit: "cup", category: "Pantry" },
      { name: "bell pepper", qty: 1, unit: "whole", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "feta cheese", qty: 0.5, unit: "cup", category: "Dairy & Eggs" }
    ]
  }
];

// Simple keyword dictionary the free-text parser (Screen 1 -> Screen 2) matches
// against. Kept next to the recipe data since tags/proteins/cuisines here must
// line up with the tags used above.
const KEYWORD_MAP = {
  cuisines: ["mexican", "italian", "american", "asian", "mediterranean", "indian"],
  proteins: ["chicken", "beef", "pork", "turkey", "fish", "shrimp", "vegetarian"],
  vegetables: ["broccoli", "carrot", "potato", "zucchini", "spinach", "bell pepper", "corn"],
  cookingStyle: {
    quick: ["quick", "easy", "fast", "simple", "30 minute", "weeknight"],
    airfryer: ["air fryer", "airfryer", "air-fryer"],
    slowcooker: ["slow cooker", "crockpot", "crock pot", "slowcooker"],
    leftovers: ["leftover", "leftovers", "meal prep", "big batch"],
    onepot: ["one pot", "one-pot", "sheet pan", "easy cleanup"],
    grill: ["grill", "grilling", "bbq", "barbecue"]
  },
  allergens: {
    fish: ["fish", "no seafood"],
    shellfish: ["shellfish", "shrimp allerg", "no shrimp"],
    dairy: ["dairy", "lactose", "no cheese", "no milk"],
    gluten: ["gluten", "celiac", "wheat allerg"],
    egg: ["egg allerg", "no eggs"],
    peanut: ["peanut", "nut allerg", "tree nut"],
    soy: ["soy allerg", "no soy"]
  },
  // Singular stems only — "onion" already matches "onions" as a substring,
  // so a plural entry here would just double-add the same tag.
  dislikeFoods: ["fish", "mushroom", "spicy", "seafood", "shrimp", "cilantro", "onion", "pork", "beef", "chicken", "tomato", "egg"]
};
