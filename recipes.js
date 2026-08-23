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
  }
];

// Simple keyword dictionary the free-text parser (Screen 1 -> Screen 2) matches
// against. Kept next to the recipe data since tags/proteins/cuisines here must
// line up with the tags used above.
const KEYWORD_MAP = {
  cuisines: ["mexican", "italian", "american", "asian", "mediterranean"],
  proteins: ["chicken", "beef", "pork", "turkey", "fish", "shrimp", "vegetarian"],
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
