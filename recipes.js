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
    ],
    instructions: [
      "Season chicken breast with taco seasoning.",
      "Cook chicken in a skillet over medium-high heat, 6-7 minutes per side, until done.",
      "Slice or shred the chicken.",
      "Warm the tortillas.",
      "Assemble tacos with chicken, cheese, lettuce, tomato, and salsa."
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
    ],
    instructions: [
      "Mix ground beef with breadcrumbs, egg, parmesan, and italian seasoning; roll into meatballs.",
      "Brown the meatballs in a skillet, about 8-10 minutes, turning occasionally.",
      "Add garlic and diced tomatoes to the pan and simmer 10 minutes to make the sauce.",
      "Meanwhile, boil the spaghetti until al dente and drain.",
      "Serve meatballs and sauce over the spaghetti, topped with extra parmesan."
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
    ],
    instructions: [
      "Cut the potatoes into bite-size chunks.",
      "Toss chicken thighs and potatoes with olive oil, paprika, and garlic.",
      "Arrange in the air fryer basket in a single layer.",
      "Air fry at 400F for about 18-20 minutes, shaking the basket halfway, until chicken is cooked through and potatoes are tender."
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
    ],
    instructions: [
      "Shape the ground beef into 6 patties and season with salt and pepper.",
      "Grill or pan-cook the patties over medium-high heat, about 4-5 minutes per side.",
      "Top each patty with shredded cheddar during the last minute to melt.",
      "Toast the hamburger buns.",
      "Build burgers with lettuce, tomato, ketchup, and mayo."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Heat a large skillet or wok and stir-fry the bell pepper, broccoli, and carrots for 3-4 minutes.",
      "Add the shrimp and garlic, cooking 2-3 minutes until shrimp turn pink.",
      "Pour in the soy sauce and toss everything together.",
      "Serve the stir fry over the rice."
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
    ],
    instructions: [
      "Preheat the oven to 400F.",
      "Toss broccoli with olive oil and garlic on a baking sheet, and place salmon alongside.",
      "Drizzle salmon with olive oil and squeeze lemon over the top.",
      "Bake 12-15 minutes until salmon flakes easily and broccoli is tender.",
      "Serve with extra lemon wedges."
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
    ],
    instructions: [
      "Brown the ground beef in a skillet over medium-high heat, breaking it up as it cooks.",
      "Stir in taco seasoning and a splash of water; simmer 3-4 minutes.",
      "Warm the corn tortillas.",
      "Fill tortillas with beef, shredded cheddar, and lettuce.",
      "Top with sour cream and serve."
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
    ],
    instructions: [
      "Cook the penne pasta according to package directions and drain.",
      "Season chicken breast and cook in a skillet until golden and cooked through, then slice.",
      "In the same pan, melt butter and cook garlic for 1 minute.",
      "Whisk in milk and parmesan, simmering until the sauce thickens.",
      "Toss the pasta and sliced chicken in the alfredo sauce and serve."
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
    ],
    instructions: [
      "Cut potatoes into chunks and toss with olive oil.",
      "Roast or pan-fry the potatoes with garlic until golden and tender.",
      "Season pork chops with salt and pepper.",
      "Sear pork chops in a hot skillet with olive oil, about 4-5 minutes per side, until cooked through.",
      "Serve the pork chops alongside the potatoes."
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
    ],
    instructions: [
      "Place the pork shoulder in the slow cooker and pour bbq sauce over it.",
      "Cover and cook on low 7-8 hours (or high 4-5 hours) until the pork shreds easily.",
      "Remove the pork and shred it with two forks, discarding excess fat.",
      "Mix the shredded pork back into the sauce.",
      "Pile onto hamburger buns and serve."
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
    ],
    instructions: [
      "Cook the rice ahead of time (or use leftover cold rice).",
      "Cut chicken breast into small pieces and cook in a large skillet until done; set aside.",
      "Push chicken to the side, scramble the eggs in the same pan.",
      "Add rice, peas, and carrots, and stir-fry 3-4 minutes.",
      "Stir in soy sauce and cooked chicken, top with green onion, and serve."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Heat a skillet or wok and stir-fry broccoli, carrots, bell pepper, and mushrooms for 4-5 minutes.",
      "Add garlic and cook 1 more minute.",
      "Pour in soy sauce and toss to coat.",
      "Serve the vegetables over the rice."
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
    ],
    instructions: [
      "Warm the black beans in a saucepan, mashing lightly if you like.",
      "Warm the corn tortillas.",
      "Fill tortillas with black beans and shredded cheddar.",
      "Top with sliced avocado and salsa.",
      "Squeeze fresh lime juice over the tacos before serving."
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
    ],
    instructions: [
      "Preheat the oven to 475F.",
      "Stretch or roll out the pizza dough on a baking sheet or pizza stone.",
      "Spread pizza sauce over the dough and sprinkle with italian seasoning.",
      "Top evenly with shredded mozzarella.",
      "Bake 12-15 minutes until the crust is golden and cheese is bubbly."
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
    ],
    instructions: [
      "Preheat the oven to 475F.",
      "Stretch or roll out the pizza dough on a baking sheet or pizza stone.",
      "Spread pizza sauce over the dough.",
      "Top with shredded mozzarella and pepperoni slices.",
      "Bake 12-15 minutes until the crust is golden and cheese is bubbly."
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
    ],
    instructions: [
      "Brown the ground turkey with chopped onion in a large pot, about 6-7 minutes.",
      "Stir in chili powder and cumin and cook 1 minute until fragrant.",
      "Add the diced tomatoes and black beans.",
      "Simmer 20-25 minutes, stirring occasionally, until thickened.",
      "Ladle into bowls and serve."
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
    ],
    instructions: [
      "Shape the ground turkey into 6 patties and season with salt and pepper.",
      "Grill or pan-cook the patties over medium heat, about 5-6 minutes per side, until cooked through.",
      "Toast the hamburger buns.",
      "Spread mayo on the buns.",
      "Build the burgers with lettuce and tomato."
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
    ],
    instructions: [
      "Dice the bell pepper and saute in a skillet 3-4 minutes until softened.",
      "Whisk the eggs and pour into the skillet, scrambling until just set.",
      "Stir in shredded cheddar.",
      "Warm the flour tortillas.",
      "Fill tortillas with the egg mixture and top with salsa before rolling up."
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
    ],
    instructions: [
      "Cook the bacon in a skillet until crisp, then drain on paper towels.",
      "Whisk the pancake mix with milk until just combined.",
      "Melt a little butter in a pan and cook pancakes, flipping when bubbles form, about 2 minutes per side.",
      "Fry or scramble the eggs in the bacon drippings.",
      "Serve pancakes, eggs, and bacon together."
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
    ],
    instructions: [
      "Butter one side of each slice of bread.",
      "Layer shredded cheddar between two slices, buttered sides out, and grill in a skillet until golden and melted, about 3 minutes per side.",
      "Meanwhile, simmer diced tomatoes in a saucepan.",
      "Blend or mash the tomatoes and stir in milk to make the soup; season with salt and pepper.",
      "Serve the grilled cheese alongside the tomato soup."
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
    ],
    instructions: [
      "Cook the frozen fries in the air fryer or oven according to package directions.",
      "Grill or pan-cook the hot dogs, turning occasionally, until heated through and lightly browned.",
      "Warm the hot dog buns.",
      "Tuck a hot dog into each bun.",
      "Serve with the fries, ketchup, and mustard."
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
    ],
    instructions: [
      "Toss shrimp with chili powder.",
      "Cook shrimp in a skillet over medium-high heat, 2-3 minutes per side, until pink.",
      "Warm the corn tortillas.",
      "Fill tortillas with shrimp and shredded cabbage.",
      "Top with sour cream and a squeeze of lime."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Slice the beef sirloin thin against the grain.",
      "Stir-fry the beef in a hot skillet 2-3 minutes until browned; remove.",
      "Stir-fry the broccoli and garlic 3-4 minutes, then return the beef to the pan.",
      "Add soy sauce, toss to coat, and serve over rice."
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
    ],
    instructions: [
      "Cook the spaghetti according to package directions and drain.",
      "Dip chicken breast in beaten egg, then coat in breadcrumbs mixed with parmesan.",
      "Pan-fry the chicken in a skillet until golden, about 4-5 minutes per side.",
      "Top chicken with pizza sauce and shredded mozzarella; broil or cover until cheese melts.",
      "Serve the chicken over the spaghetti."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Season chicken breast and cook in a skillet with olive oil until golden and cooked through, then slice.",
      "Dice the cucumber and tomato.",
      "Divide rice into bowls and top with sliced chicken, cucumber, and tomato.",
      "Sprinkle with feta and finish with a squeeze of lemon."
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
    ],
    instructions: [
      "Brown the ground beef with diced bell pepper in a skillet, about 6-7 minutes.",
      "Lay a tortilla in a clean skillet, sprinkle with cheddar, add the beef mixture, then more cheddar, and top with a second tortilla.",
      "Cook 2-3 minutes per side until golden and cheese melts.",
      "Slice into wedges.",
      "Serve with sour cream."
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
    ],
    instructions: [
      "Preheat the oven to 350F. Mix ground beef with breadcrumbs, egg, and half the ketchup; shape into a loaf in a baking pan.",
      "Spread the remaining ketchup over the top and bake 45-50 minutes until cooked through.",
      "Meanwhile, boil the potatoes until fork-tender, about 15 minutes.",
      "Drain and mash the potatoes with butter and milk.",
      "Slice the meatloaf and serve with the mashed potatoes."
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
    ],
    instructions: [
      "Season the tilapia with salt and pepper.",
      "Air fry the tilapia at 400F for about 10 minutes, until it flakes easily.",
      "Break the fish into pieces.",
      "Warm the corn tortillas and fill with fish and shredded cabbage.",
      "Top with sour cream and a squeeze of lime."
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
    ],
    instructions: [
      "Season chicken thighs and brown them in a large pot, about 3-4 minutes per side; remove.",
      "Saute the onion and carrots in the same pot for 3 minutes.",
      "Stir in the rice, then add chicken broth and nestle the chicken back in.",
      "Cover and simmer 20-25 minutes until rice is tender and chicken is cooked through.",
      "Fluff with a fork and serve."
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
    ],
    instructions: [
      "Place the beef stew meat, potatoes, carrots, and onion in the slow cooker.",
      "Pour in the chicken broth.",
      "Cover and cook on low 7-8 hours (or high 4-5 hours) until the beef and vegetables are tender.",
      "Stir before serving.",
      "Ladle into bowls."
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
    ],
    instructions: [
      "Saute the diced bell pepper for 3-4 minutes until softened.",
      "Warm the black beans.",
      "Lay a tortilla in a skillet, top with cheddar, peppers, and black beans, then more cheddar and a second tortilla.",
      "Cook 2-3 minutes per side until golden and cheese melts.",
      "Slice into wedges and serve with salsa."
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
    ],
    instructions: [
      "Preheat the oven to 425F.",
      "Rub the whole chicken with olive oil, garlic, and juice from one lemon; place the other lemon inside the cavity.",
      "Arrange potatoes around the chicken in a roasting pan.",
      "Roast about 50-60 minutes until the chicken is cooked through and potatoes are tender.",
      "Let rest 10 minutes before carving."
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
    ],
    instructions: [
      "Cook the spaghetti according to package directions and drain.",
      "Cook the shrimp in a hot skillet with garlic and chili powder, 2-3 minutes per side until pink.",
      "Add the cooked spaghetti to the skillet along with soy sauce and toss to coat.",
      "Sprinkle with sliced green onion.",
      "Serve hot."
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
    ],
    instructions: [
      "Slice the bell peppers and onion.",
      "Saute them in a skillet over medium-high heat 6-8 minutes until softened and lightly charred.",
      "Warm the black beans and flour tortillas.",
      "Fill tortillas with the peppers, onions, and black beans.",
      "Top with sliced avocado."
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
    ],
    instructions: [
      "Slice the chicken breast, bell peppers, and onion into strips.",
      "Cook the chicken in a hot skillet 5-6 minutes until browned and cooked through; remove.",
      "Saute the peppers and onion in the same skillet 5-6 minutes until softened.",
      "Return the chicken to the pan and toss together.",
      "Warm the tortillas and serve with the chicken and veggies, topped with sour cream."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Cook the penne pasta until just shy of al dente and drain.",
      "Brown the ground beef in a skillet, then stir in diced tomatoes and italian seasoning; simmer 5 minutes.",
      "Mix the pasta with the meat sauce and half the mozzarella.",
      "Pour into a baking dish, top with remaining mozzarella and parmesan.",
      "Bake 20-25 minutes until bubbly and golden."
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
    ],
    instructions: [
      "Cook the spaghetti according to package directions and drain.",
      "Cut chicken breast into strips and cook in a skillet until browned and cooked through.",
      "Whisk peanut butter with soy sauce and a splash of the pasta water to make a sauce.",
      "Toss the noodles, chicken, and carrots with the peanut sauce.",
      "Top with sliced green onion and serve."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Season shrimp and cook in a skillet 2-3 minutes per side until pink.",
      "Dice the cucumber and tomato.",
      "Divide rice into bowls and top with shrimp, cucumber, and tomato.",
      "Sprinkle with feta and a squeeze of lemon."
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
    ],
    instructions: [
      "Preheat the oven to 400F. Halve the zucchini lengthwise and scoop out the centers.",
      "Brown the ground turkey with the chopped zucchini centers, diced tomatoes, and italian seasoning.",
      "Spoon the turkey mixture into the zucchini boats.",
      "Top with shredded mozzarella.",
      "Bake 20-25 minutes until zucchini is tender and cheese is melted."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Slice the beef sirloin, bell pepper, and onion into strips.",
      "Cook the beef in a hot skillet 3-4 minutes until browned; remove.",
      "Saute the peppers and onion in the same pan 5-6 minutes, then return the beef.",
      "Serve over rice with sliced avocado and a squeeze of lime."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Saute the onion and garlic in a pot for 3-4 minutes.",
      "Add the chicken thighs and curry powder, stirring to coat, and cook 3-4 minutes.",
      "Pour in the coconut milk and simmer 15-20 minutes until the chicken is cooked through.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Saute the onion and garlic in a pot for 3-4 minutes.",
      "Stir in the curry powder and cook 1 minute.",
      "Add the lentils and coconut milk, along with enough water to cover, and simmer 20-25 minutes until the lentils are tender.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cook the chicken thighs in a skillet 5-6 minutes per side until cooked through.",
      "Steam or saute the broccoli until tender-crisp.",
      "Slice the chicken and toss with teriyaki sauce in the pan.",
      "Serve over rice with the broccoli, sprinkled with sesame seeds."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cut the chicken breast into bite-size pieces and cook in a skillet until browned and cooked through.",
      "Steam or saute the broccoli until tender-crisp.",
      "Whisk orange marmalade with soy sauce and add to the chicken, simmering 2-3 minutes until glazed.",
      "Serve the chicken over rice with the broccoli."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Brown the ground beef in a skillet, breaking it up as it cooks.",
      "Stir in soy sauce, brown sugar, and garlic; simmer 3-4 minutes until slightly thickened.",
      "Spoon the beef over the rice.",
      "Top with sliced green onion."
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
    ],
    instructions: [
      "Soak the rice noodles in hot water until softened, then drain.",
      "Cook the shrimp in a hot skillet 2-3 minutes per side until pink; push to the side.",
      "Scramble the eggs in the same pan.",
      "Add the noodles and bean sprouts, tossing everything together for 2-3 minutes.",
      "Top with crushed peanuts and a squeeze of lime."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Season the chicken thighs and cook in a skillet 5-6 minutes per side until cooked through, then slice.",
      "Dice the cucumber and tomato.",
      "Warm the pita bread.",
      "Serve the chicken over rice with cucumber and tomato, drizzled with tahini, alongside the pita."
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
    ],
    instructions: [
      "Slice the beef sirloin thin.",
      "Cook the beef in a hot skillet 4-5 minutes until browned and cooked through.",
      "Warm the pita bread.",
      "Slice the tomato and cucumber.",
      "Fill the pita with beef, tomato, and cucumber, and top with tzatziki."
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
    ],
    instructions: [
      "Mash the chickpeas and form into small patties (or use a food processor to combine).",
      "Pan-fry the falafel patties in a little oil, 3-4 minutes per side until golden.",
      "Warm the pita bread.",
      "Dice the cucumber and tomato.",
      "Serve falafel in pita with cucumber, tomato, and a drizzle of tahini."
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
    ],
    instructions: [
      "Boil the elbow macaroni according to package directions and drain.",
      "Melt the butter in the same pot over low heat.",
      "Stir in the milk and shredded cheddar, stirring until melted and smooth.",
      "Return the macaroni to the pot and toss to coat.",
      "Season with salt and pepper and serve."
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
    ],
    instructions: [
      "Boil the elbow macaroni according to package directions and drain.",
      "Cut chicken breast into pieces and cook in a skillet until browned and cooked through.",
      "Melt the butter in a pot, then stir in milk and shredded cheddar until smooth.",
      "Add the macaroni and chicken to the cheese sauce and toss to coat.",
      "Serve warm."
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
    ],
    instructions: [
      "Preheat the oven to 400F. Cut the chicken breast into small pieces and cook in a skillet until browned and cooked through.",
      "Add the carrots and chicken broth, simmering 8-10 minutes until carrots soften.",
      "Stir in the frozen peas.",
      "Pour the filling into a pie crust and top with the second crust, sealing the edges and cutting a few vents.",
      "Bake 30-35 minutes until the crust is golden."
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
    ],
    instructions: [
      "Bring the chicken broth to a boil in a large pot.",
      "Add the chicken breast and simmer 12-15 minutes until cooked through, then remove and shred.",
      "Add the carrots and celery to the broth and simmer 8-10 minutes until tender.",
      "Stir in the egg noodles and cook according to package directions.",
      "Return the shredded chicken to the pot and serve."
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
    ],
    instructions: [
      "Bring the chicken broth to a boil in a large pot.",
      "Add the diced tomatoes, carrots, and celery and simmer 10 minutes until vegetables soften.",
      "Stir in the penne pasta and cook according to package directions until tender.",
      "Add the black beans and heat through.",
      "Season with salt and pepper and serve."
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
    ],
    instructions: [
      "Cook the egg noodles according to package directions and drain.",
      "Brown the ground beef with the mushrooms in a skillet, about 6-7 minutes.",
      "Stir in the beef broth and simmer 5 minutes.",
      "Remove from heat and stir in the sour cream until smooth.",
      "Serve over the egg noodles."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Cook the egg noodles according to package directions and drain.",
      "Mix the noodles with the drained tuna, frozen peas, milk, and half the cheddar in a baking dish.",
      "Top with the remaining cheddar.",
      "Bake 20-25 minutes until bubbly and golden.",
      "Let cool slightly before serving."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Cook the chicken breast in a skillet until cooked through, then shred.",
      "Mix the shredded chicken with diced tomatoes and sour cream.",
      "Layer corn tortillas, the chicken mixture, and shredded cheddar in a baking dish, repeating layers.",
      "Top with the remaining cheddar.",
      "Bake 25-30 minutes until bubbly and golden."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Cook the chicken breast in a skillet until cooked through, then shred.",
      "Toss the shredded chicken with a little enchilada sauce.",
      "Roll the chicken into the corn tortillas and place seam-side down in a baking dish.",
      "Pour the remaining enchilada sauce over the top and sprinkle with cheddar.",
      "Bake 20-25 minutes until bubbly, then serve with sour cream."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Brown the ground beef in a skillet, about 6-7 minutes.",
      "Toss the beef with a little enchilada sauce.",
      "Roll the beef into the corn tortillas and place seam-side down in a baking dish.",
      "Pour the remaining enchilada sauce over the top and sprinkle with cheddar.",
      "Bake 20-25 minutes until bubbly and golden."
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
    ],
    instructions: [
      "Place the pork shoulder in the slow cooker and cook on low 7-8 hours (or high 4-5 hours) until it shreds easily.",
      "Shred the pork with two forks.",
      "Cook the rice according to package directions and warm the black beans.",
      "Divide rice and beans into bowls and top with the shredded pork.",
      "Squeeze lime over the top and sprinkle with chopped cilantro."
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
    ],
    instructions: [
      "Slice the bell peppers and onion.",
      "Cook the italian sausage in a skillet 8-10 minutes, turning, until browned and cooked through; slice if using links.",
      "Add the peppers and onion to the pan and saute 6-8 minutes until softened.",
      "Warm the sub rolls.",
      "Pile the sausage and peppers into the rolls and serve."
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
    ],
    instructions: [
      "Slice the beef sirloin thin.",
      "Cook the beef in a hot skillet 3-4 minutes until browned; remove.",
      "Saute the bell pepper and onion in the same pan 5-6 minutes until softened, then return the beef.",
      "Top with shredded mozzarella until melted.",
      "Warm the sub rolls and pile the beef mixture inside."
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
    ],
    instructions: [
      "Mix ground beef with breadcrumbs and egg; shape into meatballs.",
      "Brown the meatballs in a skillet, about 8-10 minutes.",
      "Add the pizza sauce and simmer 10 minutes.",
      "Warm the sub rolls and fill with meatballs and sauce.",
      "Top with shredded mozzarella and melt under the broiler if desired."
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
    ],
    instructions: [
      "Brown the ground beef with the chopped onion in a skillet, about 6-7 minutes.",
      "Stir in the ketchup and bbq sauce.",
      "Simmer 8-10 minutes, stirring occasionally, until thickened.",
      "Toast the hamburger buns.",
      "Spoon the beef mixture onto the buns and serve."
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
    ],
    instructions: [
      "Cut the chicken breast into strips and cook in a skillet until browned and cooked through.",
      "Toss the cooked chicken with hot sauce.",
      "Warm the flour tortillas.",
      "Fill tortillas with the chicken, shredded cheddar, and lettuce.",
      "Roll up and serve."
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
    ],
    instructions: [
      "Cook the chicken breast in a skillet until browned and cooked through, then slice.",
      "Toss the lettuce with caesar dressing and parmesan.",
      "Warm the flour tortillas.",
      "Layer the chicken and dressed lettuce onto the tortillas.",
      "Roll up tightly and serve."
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
    ],
    instructions: [
      "Cook the bacon in a skillet until crisp, then drain on paper towels.",
      "Toast the bread slices.",
      "Spread mayo on the toasted bread.",
      "Layer bacon, lettuce, and sliced tomato on the bread.",
      "Top with the second slice and slice the sandwich in half."
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
    ],
    instructions: [
      "Cook the bacon in a skillet until crisp, then drain on paper towels.",
      "Toast the bread slices and spread with mayo.",
      "Layer deli turkey, bacon, lettuce, and sliced tomato between the bread.",
      "Stack in layers for a classic club, securing with toothpicks if needed.",
      "Slice and serve."
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
    ],
    instructions: [
      "Cook the chicken breast in a skillet until browned and cooked through, then dice.",
      "Cook the bacon until crisp and crumble.",
      "Hard boil the eggs, then peel and slice.",
      "Arrange the lettuce in a bowl or platter and top with rows of chicken, bacon, eggs, and sliced avocado.",
      "Sprinkle with blue cheese crumbles and serve with dressing of choice."
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
    ],
    instructions: [
      "Season the chicken breast and cook in a skillet with a little olive oil until browned and cooked through, then slice.",
      "Chop the lettuce, cucumber, and tomato.",
      "Toss the vegetables together in a large bowl with a drizzle of olive oil.",
      "Top with the sliced chicken.",
      "Sprinkle with feta cheese and serve."
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
    ],
    instructions: [
      "Cook the penne pasta according to package directions and drain.",
      "Dice the tomato and mozzarella.",
      "Toss the warm pasta with the tomato, mozzarella, and olive oil.",
      "Tear the basil leaves and stir in.",
      "Season with salt and pepper and serve."
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
    ],
    instructions: [
      "Preheat the oven to 400F. Slice the eggplant into rounds.",
      "Dip eggplant slices in beaten egg, then coat in breadcrumbs mixed with parmesan.",
      "Bake the breaded eggplant on a sheet pan 15 minutes, flipping once, until golden.",
      "Layer the eggplant with pizza sauce and shredded mozzarella in a baking dish.",
      "Bake another 15-20 minutes until the cheese is melted and bubbly."
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
    ],
    instructions: [
      "Cook the veggie burger patties in a skillet or on the grill according to package directions, about 4-5 minutes per side.",
      "Toast the hamburger buns.",
      "Slice the tomato and avocado.",
      "Build the burgers with lettuce, tomato, and avocado.",
      "Serve immediately."
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
    ],
    instructions: [
      "Saute the onion and carrots in a pot for 4-5 minutes.",
      "Add the lentils, diced tomatoes, and vegetable broth.",
      "Bring to a boil, then reduce heat and simmer 25-30 minutes until the lentils are tender.",
      "Season with salt and pepper.",
      "Ladle into bowls and serve."
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
    ],
    instructions: [
      "Cook the breakfast sausage links in a skillet, turning occasionally, until browned and cooked through.",
      "Whisk the waffle mix with milk and eggs until just combined.",
      "Melt a little butter in the waffle iron and cook the waffles according to the mix directions.",
      "Keep waffles warm while finishing the batch.",
      "Serve the waffles with the sausage links."
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
    ],
    instructions: [
      "Cook the bacon in a skillet until crisp, then drain on paper towels.",
      "Whisk the eggs with the milk in a shallow dish.",
      "Dip bread slices in the egg mixture, coating both sides.",
      "Melt butter in a skillet and cook the bread slices 2-3 minutes per side until golden.",
      "Serve the french toast with the bacon."
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
    ],
    instructions: [
      "Dice the bell pepper and mushrooms.",
      "Melt the butter in a skillet and saute the vegetables 3-4 minutes until softened.",
      "Whisk the eggs and pour into the pan.",
      "Once the eggs are mostly set, sprinkle shredded cheddar and the vegetables over half.",
      "Fold the omelet in half and cook 1 more minute before serving."
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
    ],
    instructions: [
      "Slice the andouille sausage and brown it in a large pot, about 4-5 minutes.",
      "Add the bell pepper and onion, cooking 4-5 minutes until softened.",
      "Stir in the rice, diced tomatoes, and enough water or broth to cook the rice; simmer 15-18 minutes.",
      "Add the shrimp and cook 3-4 minutes until pink and the rice is tender.",
      "Stir everything together and serve."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Slice the andouille sausage and brown it in a pot, about 4-5 minutes.",
      "Add the onion and bell pepper, cooking 4-5 minutes until softened.",
      "Stir in the black beans and simmer 10 minutes, mashing some beans to thicken.",
      "Serve the beans and sausage over the rice."
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
    ],
    instructions: [
      "Mix the crab meat with breadcrumbs, egg, and mayo until just combined.",
      "Shape the mixture into patties.",
      "Pan-fry the crab cakes in a little oil, about 3-4 minutes per side until golden.",
      "Squeeze fresh lemon over the top.",
      "Serve warm."
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
    ],
    instructions: [
      "Cook the frozen fries in the oven or air fryer according to package directions.",
      "Dip the tilapia in beaten egg, then coat in breadcrumbs.",
      "Pan-fry the fish in a little oil, about 3-4 minutes per side until golden and flaky.",
      "Squeeze lemon over the fish.",
      "Serve the fish with the fries."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cook the chicken thighs in a skillet 5-6 minutes per side until browned and cooked through.",
      "Whisk together honey, soy sauce, and garlic.",
      "Pour the sauce into the pan and simmer 2-3 minutes until it thickens and coats the chicken.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the chorizo in a skillet, breaking it up, about 6-8 minutes until browned and cooked through.",
      "Add the chopped onion and cook 2-3 minutes more.",
      "Warm the corn tortillas.",
      "Fill tortillas with the chorizo mixture and top with chopped cilantro.",
      "Squeeze lime over the tacos before serving."
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
    ],
    instructions: [
      "Brown the ground beef in a skillet, about 6-7 minutes.",
      "Stir in the taco seasoning and a splash of water; simmer 3-4 minutes.",
      "Chop the lettuce and arrange in a large bowl.",
      "Top with the taco beef, shredded cheddar, and crushed tortilla chips.",
      "Spoon salsa over the top and serve."
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
    ],
    instructions: [
      "Preheat the oven to 400F (or use the broiler). Brown the ground beef in a skillet, about 6-7 minutes.",
      "Spread the tortilla chips on a baking sheet.",
      "Top with the beef, black beans, and shredded cheddar.",
      "Bake or broil 3-5 minutes until the cheese melts.",
      "Top with sour cream and salsa before serving."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cut the chicken breast into pieces and cook in a skillet until browned and cooked through.",
      "Warm the black beans and corn.",
      "Divide rice into bowls and top with chicken, black beans, and corn.",
      "Finish with a dollop of sour cream."
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
    ],
    instructions: [
      "Warm the salsa in a large skillet.",
      "Add the tortilla chips and toss gently to coat, cooking 2-3 minutes until slightly softened.",
      "Push the chips to the side and scramble the eggs in the same pan (or fry them separately).",
      "Sprinkle shredded cheddar over the chips and let it melt.",
      "Top with the eggs and a dollop of sour cream."
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
    ],
    instructions: [
      "Bring the chicken broth to a boil in a large pot with the chopped onion.",
      "Add the chicken thighs and simmer 15-18 minutes until cooked through, then shred.",
      "Stir in the black beans and return the shredded chicken to the pot; simmer 5 minutes.",
      "Ladle into bowls and top with shredded cabbage.",
      "Serve with lime wedges."
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
    ],
    instructions: [
      "Warm the black beans in a small saucepan.",
      "Warm the corn tortillas in a dry skillet.",
      "Fry the eggs in a skillet to your liking.",
      "Place tortillas on plates, top with black beans and fried eggs.",
      "Spoon salsa over the top and sprinkle with shredded cheddar."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Brown the ground beef in a skillet, about 6-7 minutes.",
      "Stir in the corn and diced tomatoes; simmer 5 minutes, then pour into a baking dish and top with shredded cheddar.",
      "Prepare the cornbread mix according to package directions.",
      "Pour the cornbread batter over the beef mixture.",
      "Bake 25-30 minutes until the cornbread topping is golden and cooked through."
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
    ],
    instructions: [
      "Cook the spaghetti according to package directions and drain.",
      "Season chicken breast and cook in a skillet until golden and cooked through; remove.",
      "Melt the butter in the pan with the garlic, then squeeze in the lemon juice.",
      "Return the chicken to the pan and spoon the sauce over it.",
      "Serve over the spaghetti."
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
    ],
    instructions: [
      "Cook the spaghetti according to package directions and drain.",
      "Melt the butter in a skillet and cook the garlic for 1 minute until fragrant.",
      "Add the shrimp and cook 2-3 minutes per side until pink.",
      "Squeeze lemon juice into the pan and toss in the spaghetti.",
      "Serve immediately."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Cook the lasagna noodles according to package directions and drain.",
      "Brown the ground beef in a skillet, then stir in the diced tomatoes; simmer 10 minutes.",
      "Mix the ricotta with the egg.",
      "Layer noodles, meat sauce, ricotta mixture, and mozzarella in a baking dish, repeating to fill the pan, ending with mozzarella on top.",
      "Bake 30-35 minutes until bubbly and golden."
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
    ],
    instructions: [
      "Warm the chicken broth in a saucepan and keep it at a low simmer.",
      "Melt the butter in a large pot and saute the mushrooms until browned, about 5 minutes; remove.",
      "Add the arborio rice to the pot and stir 1 minute, then add the warm broth a ladle at a time, stirring often until absorbed before adding more, about 20-25 minutes.",
      "Stir the mushrooms back in along with the parmesan.",
      "Serve immediately while creamy."
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
    ],
    instructions: [
      "Cook the spaghetti according to package directions and drain.",
      "Season chicken breast and cook in a skillet with butter until golden and cooked through; remove.",
      "Saute the mushrooms in the same pan 4-5 minutes.",
      "Pour in the marsala wine and simmer 2-3 minutes, then return the chicken to the pan to coat in the sauce.",
      "Serve over the spaghetti."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Cook the jumbo pasta shells according to package directions and drain.",
      "Mix the ricotta, egg, and half the mozzarella together.",
      "Spread a layer of pizza sauce in a baking dish, then stuff each shell with the ricotta mixture and arrange in the dish.",
      "Top with the remaining pizza sauce and mozzarella.",
      "Bake 25-30 minutes until bubbly and golden."
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
    ],
    instructions: [
      "Mix the ground turkey with breadcrumbs and egg; roll into small meatballs.",
      "Bring the chicken broth to a boil in a large pot and add the carrots, simmering 5 minutes.",
      "Drop the meatballs into the broth and simmer 8-10 minutes until cooked through.",
      "Stir in the spinach and cook until wilted, about 2 minutes.",
      "Ladle into bowls and top with parmesan."
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
    ],
    instructions: [
      "Season chicken breast and cook in a skillet with olive oil until golden and cooked through.",
      "Dice the tomato and toss with chopped basil and a little olive oil.",
      "Top each chicken breast with shredded mozzarella and let it melt.",
      "Spoon the tomato-basil mixture over the chicken.",
      "Serve warm."
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
    ],
    instructions: [
      "Soak the chicken thighs in buttermilk for at least 15 minutes.",
      "Dredge the chicken in flour, seasoned with salt and pepper.",
      "Fry the chicken in hot oil, turning occasionally, about 12-15 minutes until golden and cooked through.",
      "Meanwhile, boil the potatoes until fork-tender, about 15 minutes, then mash or serve whole.",
      "Drain the chicken on paper towels and serve with the potatoes."
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
    ],
    instructions: [
      "Cook the frozen fries in the oven or air fryer according to package directions.",
      "Cut the chicken breast into strips.",
      "Dip the chicken in beaten egg, then coat in breadcrumbs.",
      "Pan-fry or bake the tenders until golden and cooked through, about 4-5 minutes per side.",
      "Serve the tenders with the fries and ketchup."
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
    ],
    instructions: [
      "Mix the ground beef with breadcrumbs and egg; shape into meatballs.",
      "Brown the meatballs in a skillet, turning occasionally, about 10-12 minutes until cooked through.",
      "Meanwhile, boil the potatoes until fork-tender, about 15 minutes.",
      "Drain and mash the potatoes with butter and milk.",
      "Serve the meatballs over the mashed potatoes."
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
    ],
    instructions: [
      "Preheat the oven to 400F. Boil the potatoes until fork-tender, about 15 minutes, then drain and mash with butter and milk.",
      "Brown the ground beef in a skillet, about 6-7 minutes.",
      "Add the carrots and frozen peas and cook 3-4 minutes.",
      "Spread the beef mixture in a baking dish and top with the mashed potatoes.",
      "Bake 20-25 minutes until the top is lightly golden."
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
    ],
    instructions: [
      "Place the beef stew meat, potatoes, carrots, and onion in the slow cooker.",
      "Pour in the beef broth.",
      "Cover and cook on low 7-8 hours (or high 4-5 hours) until the beef is fork-tender.",
      "Shred or slice the beef.",
      "Serve with the vegetables and cooking liquid spooned over the top."
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
    ],
    instructions: [
      "Boil the potatoes until fork-tender, about 15 minutes, then drain and mash.",
      "Dip the cube steak in buttermilk, then dredge in flour seasoned with salt and pepper.",
      "Fry the steaks in hot oil, about 3-4 minutes per side, until golden and cooked through.",
      "Whisk the pan drippings with flour, egg, and milk to make gravy, stirring until thickened.",
      "Serve the steaks and mashed potatoes topped with gravy."
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
    ],
    instructions: [
      "Bake the biscuits according to package directions.",
      "Cook the breakfast sausage links in a skillet, then remove and slice or crumble.",
      "Whisk flour into the drippings in the pan, cooking 1 minute.",
      "Slowly whisk in the milk, stirring until thickened into gravy; stir the sausage back in.",
      "Split the biscuits and spoon the sausage gravy over the top."
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
    ],
    instructions: [
      "Cook the frozen fries in the oven or air fryer according to package directions.",
      "Mix the cornmeal with egg and a little water or milk to make a thick batter.",
      "Dip the hot dogs in the batter, coating evenly.",
      "Fry the coated hot dogs in hot oil, turning, about 3-4 minutes until golden.",
      "Serve with the fries and mustard."
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
    ],
    instructions: [
      "Preheat the oven to 425F (or heat oil for frying). Pat the chicken wings dry and arrange on a baking sheet.",
      "Bake the wings 30-35 minutes, flipping halfway, until crispy and cooked through.",
      "Melt the butter and whisk in the hot sauce.",
      "Toss the hot wings in the buffalo sauce.",
      "Serve with celery sticks."
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
    ],
    instructions: [
      "Cook the spaghetti according to package directions and drain.",
      "Mix the ground turkey with breadcrumbs and egg; shape into meatballs.",
      "Brown the meatballs in a skillet, about 8-10 minutes.",
      "Add the pizza sauce and simmer 10 minutes until the meatballs are cooked through.",
      "Serve the meatballs and sauce over the spaghetti."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cut the chicken breast into bite-size pieces and cook in a skillet until browned and cooked through.",
      "Whisk together soy sauce and brown sugar and pour into the pan; simmer 2-3 minutes until glazed.",
      "Sprinkle with sesame seeds.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Slice the beef sirloin thin against the grain.",
      "Cook the beef in a hot skillet 2-3 minutes until browned.",
      "Whisk together soy sauce and brown sugar, pour into the pan, and simmer 2-3 minutes until glazed.",
      "Stir in the sliced green onion and serve over rice."
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
    ],
    instructions: [
      "Cook the lo mein noodles according to package directions and drain.",
      "Cut the chicken breast into strips and cook in a skillet or wok until browned and cooked through; remove.",
      "Stir-fry the bell pepper and carrots 3-4 minutes.",
      "Return the chicken to the pan along with the noodles and soy sauce, tossing to combine.",
      "Serve hot."
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
    ],
    instructions: [
      "Cook the lo mein noodles according to package directions and drain.",
      "Stir-fry the bell pepper, carrots, and broccoli in a hot skillet or wok for 4-5 minutes.",
      "Add the noodles to the pan along with the soy sauce.",
      "Toss everything together for 2-3 minutes until heated through.",
      "Serve hot."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cut the chicken breast into bite-size pieces and cook in a skillet until browned and cooked through.",
      "Add the bell pepper and cook 3-4 minutes until slightly softened.",
      "Stir in the pineapple chunks and soy sauce, simmering 2-3 minutes.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cut the chicken breast into bite-size pieces and cook in a hot skillet until browned and cooked through; remove.",
      "Stir-fry the bell pepper 3-4 minutes, then return the chicken to the pan.",
      "Add the soy sauce and peanuts, tossing to coat.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Slice the beef sirloin thin against the grain.",
      "Whisk together soy sauce, brown sugar, and garlic, and toss with the beef.",
      "Cook the beef in a hot skillet 2-3 minutes per side until browned and cooked through.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Pound the chicken breast to an even thickness.",
      "Dip the chicken in beaten egg, then coat in breadcrumbs.",
      "Pan-fry the chicken in oil, about 4-5 minutes per side, until golden and cooked through.",
      "Slice and serve over rice."
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
    ],
    instructions: [
      "Cook the rice ahead of time (or use leftover cold rice).",
      "Heat a large skillet and scramble the eggs; remove.",
      "Stir-fry the carrots and peas 3-4 minutes.",
      "Add the rice and scrambled eggs back to the pan along with the soy sauce, tossing to combine.",
      "Serve hot."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cook the salmon in a skillet or under the broiler, about 4-5 minutes per side, until it flakes easily.",
      "Steam or saute the broccoli until tender-crisp.",
      "Brush the salmon with teriyaki sauce during the last minute of cooking.",
      "Serve the salmon over rice with the broccoli."
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
    ],
    instructions: [
      "Cut the chicken breast, bell pepper, and onion into chunks.",
      "Toss with olive oil and lemon juice, then thread onto skewers.",
      "Grill the skewers over medium-high heat, turning occasionally, about 10-12 minutes until the chicken is cooked through.",
      "Warm the pita bread.",
      "Serve the skewers with the pita."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Saute the spinach until wilted, then let cool slightly and mix with the feta and egg.",
      "Melt the butter and brush over sheets of phyllo dough, layering several sheets in a baking dish.",
      "Spread the spinach mixture over the phyllo.",
      "Top with more buttered phyllo sheets, tucking in the edges.",
      "Bake 30-35 minutes until golden and crisp."
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
    ],
    instructions: [
      "Dice the cucumber, tomato, and bell pepper.",
      "Warm the pita bread.",
      "Spoon hummus into bowls.",
      "Top with the diced vegetables.",
      "Serve with the warm pita for dipping."
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
    ],
    instructions: [
      "Preheat the oven to 400F.",
      "Toss the chicken thighs and potatoes with olive oil, garlic, and juice from the lemons.",
      "Arrange in a single layer on a baking sheet.",
      "Roast 35-40 minutes until the chicken is cooked through and potatoes are tender.",
      "Serve with any pan juices spooned over the top."
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
    ],
    instructions: [
      "Cut the chicken breast, bell pepper, and onion into chunks and toss with olive oil.",
      "Thread onto skewers.",
      "Grill over medium-high heat, turning occasionally, about 10-12 minutes until the chicken is cooked through.",
      "Sprinkle with feta cheese.",
      "Serve warm."
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
    ],
    instructions: [
      "Preheat the oven to 375F. Slice the eggplant and potatoes into rounds.",
      "Brown the ground beef in a skillet, about 6-7 minutes.",
      "Layer the potatoes, eggplant, and beef in a baking dish.",
      "Whisk the milk with parmesan and pour over the top.",
      "Bake 45-50 minutes until the vegetables are tender and the top is golden."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Melt the butter in a pot and cook the chicken thighs 4-5 minutes until browned.",
      "Stir in the curry powder and cook 1 minute.",
      "Add the diced tomatoes and coconut milk, and simmer 15-20 minutes until the chicken is cooked through and the sauce thickens.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cut the chicken breast into pieces and cook in a pot until browned, about 5 minutes.",
      "Stir in the curry powder and cook 1 minute.",
      "Add the diced tomatoes and coconut milk, and simmer 15-20 minutes until the chicken is cooked through and the sauce thickens.",
      "Serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Cube the paneer cheese and pan-fry until lightly golden; set aside.",
      "Saute the spinach with the curry powder until wilted, about 3-4 minutes.",
      "Stir in the coconut milk and simmer 5 minutes, then blend or mash lightly.",
      "Stir the paneer back in and serve over rice."
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
    ],
    instructions: [
      "Cook the rice according to package directions.",
      "Saute the onion in a pot for 3-4 minutes until softened.",
      "Stir in the curry powder and cook 1 minute.",
      "Add the chickpeas and diced tomatoes, and simmer 15-20 minutes until thickened.",
      "Serve over rice."
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
    ],
    instructions: [
      "Toss the chicken thighs with yogurt and curry powder; let sit 10 minutes if time allows.",
      "Saute the onion in a large pot until softened and golden, about 5-6 minutes.",
      "Add the marinated chicken and cook 5-6 minutes until browned.",
      "Stir in the rice and enough water to cook it, then cover and simmer 20-25 minutes until the rice is tender and chicken is cooked through.",
      "Fluff with a fork and serve."
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
    ],
    instructions: [
      "Cook the bacon in a skillet until crisp, then crumble.",
      "Whisk the eggs and scramble them in the same skillet.",
      "Warm the flour tortillas.",
      "Fill tortillas with scrambled eggs, bacon, and shredded cheddar.",
      "Top with salsa and serve."
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
    ],
    instructions: [
      "Preheat the oven to 425F. Cook the bacon in a skillet until crisp, then crumble.",
      "Stretch the pizza dough onto a baking sheet.",
      "Scramble the eggs lightly (slightly undercooked) and spread over the dough.",
      "Top with the bacon, cheddar, and mozzarella.",
      "Bake 12-15 minutes until the crust is golden and eggs are fully set."
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
    ],
    instructions: [
      "Dice the ham.",
      "Whisk the eggs in a bowl.",
      "Melt the butter in a skillet and pour in the eggs.",
      "Once mostly set, sprinkle the ham and shredded cheddar over half the omelet.",
      "Fold in half and cook 1 more minute before serving."
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
    ],
    instructions: [
      "Saute the onion and bell pepper in a skillet for 5 minutes until softened.",
      "Add the diced tomatoes and simmer 8-10 minutes until slightly thickened.",
      "Make small wells in the sauce and crack the eggs into them.",
      "Cover and cook 6-8 minutes until the egg whites are set but yolks are still soft.",
      "Sprinkle with feta and serve straight from the pan."
    ]
  },
  {
    id: "bbq-ribs", name: "BBQ Baby Back Ribs", emoji: "🍖", cuisine: "american",
    proteins: ["pork"], tags: ["slowcooker"], allergens: [],
    timeMinutes: 20,
    ingredients: [
      { name: "pork baby back ribs", qty: 3, unit: "lb", category: "Meat & Seafood" },
      { name: "bbq sauce", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "brown sugar", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "garlic powder", qty: 1, unit: "tsp", category: "Pantry" },
      { name: "smoked paprika", qty: 1, unit: "tsp", category: "Pantry" }
    ],
    instructions: [
      "Rub the ribs all over with brown sugar, garlic powder, and smoked paprika.",
      "Place ribs in the slow cooker, standing them up around the edge if needed to fit.",
      "Pour half the BBQ sauce over the ribs.",
      "Cook on low for 7-8 hours, until the meat is falling-off-the-bone tender.",
      "Brush with the remaining BBQ sauce and broil 3-4 minutes to caramelize before serving."
    ]
  },
  {
    id: "chicken-dumplings", name: "Chicken and Dumplings", emoji: "🍲", cuisine: "american",
    proteins: ["chicken"], tags: ["onepot", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "chicken broth", qty: 4, unit: "cup", category: "Pantry" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "celery", qty: 1, unit: "cup", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "biscuit mix", qty: 2, unit: "cup", category: "Pantry" },
      { name: "milk", qty: 0.75, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" }
    ],
    instructions: [
      "Cook chicken breast in a large pot with the broth until done, about 15 minutes; remove and shred.",
      "Add carrots, celery, and onion to the broth and simmer until tender, about 10 minutes.",
      "Stir the shredded chicken back in.",
      "Mix biscuit mix, milk, and melted butter into a soft dough; drop spoonfuls into the simmering pot.",
      "Cover and simmer 12-15 minutes until the dumplings are cooked through."
    ]
  },
  {
    id: "cottage-pie", name: "Cottage Pie", emoji: "🥧", cuisine: "american",
    proteins: ["beef"], tags: ["kidFriendly", "leftovers"], allergens: ["dairy"],
    timeMinutes: 50,
    ingredients: [
      { name: "ground beef", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "potatoes", qty: 2, unit: "lb", category: "Produce" },
      { name: "frozen peas and carrots", qty: 1.5, unit: "cup", category: "Frozen" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "beef broth", qty: 1, unit: "cup", category: "Pantry" },
      { name: "tomato paste", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "butter", qty: 3, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "milk", qty: 0.25, unit: "cup", category: "Dairy & Eggs" }
    ],
    instructions: [
      "Boil the potatoes until fork-tender, then mash with butter and milk.",
      "Brown ground beef with the onion in a skillet; drain excess fat.",
      "Stir in tomato paste, beef broth, and peas and carrots; simmer 8-10 minutes until thickened.",
      "Spread the beef mixture in a baking dish and top with the mashed potatoes.",
      "Bake at 400F for 20 minutes, until the top is lightly golden."
    ]
  },
  {
    id: "classic-cheeseburgers", name: "Classic Cheeseburgers", emoji: "🧀", cuisine: "american",
    proteins: ["beef"], tags: ["quick", "grill", "kidFriendly"], allergens: ["dairy", "gluten"],
    timeMinutes: 20,
    ingredients: [
      { name: "ground beef", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "burger buns", qty: 6, unit: "count", category: "Pantry" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "lettuce", qty: 1, unit: "cup", category: "Produce" },
      { name: "tomato", qty: 1, unit: "whole", category: "Produce" },
      { name: "onion", qty: 0.5, unit: "whole", category: "Produce" },
      { name: "ketchup", qty: 2, unit: "tbsp", category: "Pantry" }
    ],
    instructions: [
      "Form ground beef into 6 patties, season with salt and pepper.",
      "Grill or pan-sear patties 3-4 minutes per side.",
      "Top each patty with cheese during the last minute of cooking, until melted.",
      "Toast the buns lightly.",
      "Build burgers with lettuce, tomato, onion, and ketchup."
    ]
  },
  {
    id: "beef-tips-noodles", name: "Beef Tips & Noodles", emoji: "🥩", cuisine: "american",
    proteins: ["beef"], tags: ["onepot", "leftovers"], allergens: ["gluten", "dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "beef stew meat", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "egg noodles", qty: 12, unit: "oz", category: "Pantry" },
      { name: "beef broth", qty: 2, unit: "cup", category: "Pantry" },
      { name: "mushrooms", qty: 1, unit: "cup", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "flour", qty: 2, unit: "tbsp", category: "Pantry" }
    ],
    instructions: [
      "Brown the beef stew meat in a large pot; remove and set aside.",
      "Sauté onion and mushrooms in the same pot until soft.",
      "Sprinkle in flour, then stir in beef broth; return the beef to the pot.",
      "Cover and simmer 25-30 minutes until the beef is tender.",
      "Stir in sour cream. Serve over cooked egg noodles, or over mashed potatoes instead if that's more the family's speed."
    ]
  },
  {
    id: "bbq-chicken-rollups", name: "BBQ Chicken Roll-Ups", emoji: "🌯", cuisine: "american",
    proteins: ["chicken"], tags: ["quick", "kidFriendly"], allergens: ["gluten", "dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "bbq sauce", qty: 0.75, unit: "cup", category: "Pantry" },
      { name: "crescent roll dough", qty: 2, unit: "can", category: "Pantry" },
      { name: "shredded cheddar", qty: 1.5, unit: "cup", category: "Dairy & Eggs" }
    ],
    instructions: [
      "Cook and shred the chicken breast (or use leftover cooked chicken).",
      "Toss the shredded chicken with BBQ sauce.",
      "Unroll the crescent dough into triangles; place a spoonful of chicken and a sprinkle of cheese on the wide end of each.",
      "Roll up and place seam-side down on a baking sheet.",
      "Bake at 375F for 12-15 minutes until golden brown."
    ]
  },
  {
    id: "bbq-chicken-thighs", name: "BBQ Chicken Thighs", emoji: "🍗", cuisine: "american",
    proteins: ["chicken"], tags: ["grill", "quick", "kidFriendly"], allergens: [],
    timeMinutes: 30,
    ingredients: [
      { name: "chicken thighs", qty: 2, unit: "lb", category: "Meat & Seafood" },
      { name: "bbq sauce", qty: 1, unit: "cup", category: "Pantry" },
      { name: "garlic powder", qty: 1, unit: "tsp", category: "Pantry" },
      { name: "onion powder", qty: 1, unit: "tsp", category: "Pantry" }
    ],
    instructions: [
      "Season chicken thighs with garlic powder and onion powder.",
      "Grill (or bake at 400F) for about 20 minutes, turning once, until cooked through.",
      "Brush generously with BBQ sauce during the last 5 minutes of cooking.",
      "Let rest a few minutes before serving with extra sauce on the side."
    ]
  },
  {
    id: "turkey-meatloaf", name: "Turkey Meatloaf", emoji: "🦃", cuisine: "american",
    proteins: ["turkey"], tags: ["kidFriendly", "leftovers"], allergens: ["egg", "gluten"],
    timeMinutes: 55,
    ingredients: [
      { name: "ground turkey", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "onion", qty: 0.5, unit: "whole", category: "Produce" },
      { name: "ketchup", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "worcestershire sauce", qty: 1, unit: "tbsp", category: "Pantry" }
    ],
    instructions: [
      "Mix ground turkey, breadcrumbs, egg, minced onion, and half the ketchup with the worcestershire sauce.",
      "Shape into a loaf in a baking dish.",
      "Spread the remaining ketchup over the top.",
      "Bake at 350F for 45 minutes, until cooked through (165F internal).",
      "Let rest 5 minutes before slicing."
    ]
  },
  {
    id: "baked-potato-soup", name: "Loaded Baked Potato Soup", emoji: "🥔", cuisine: "american",
    proteins: ["pork"], tags: ["onepot"], allergens: ["dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "potatoes", qty: 2.5, unit: "lb", category: "Produce" },
      { name: "bacon", qty: 6, unit: "oz", category: "Meat & Seafood" },
      { name: "chicken broth", qty: 3, unit: "cup", category: "Pantry" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "green onions", qty: 2, unit: "whole", category: "Produce" }
    ],
    instructions: [
      "Cook bacon until crisp; crumble and set aside.",
      "Boil the potatoes in chicken broth until very tender, about 15 minutes.",
      "Mash about half the potatoes right in the pot for a thick, chunky texture.",
      "Stir in milk and half the cheese until melted and creamy.",
      "Serve topped with the remaining cheese, bacon, sour cream, and green onions."
    ]
  },
  {
    id: "broccoli-cheddar-soup", name: "Broccoli Cheddar Soup", emoji: "🥦", cuisine: "american",
    proteins: ["vegetarian"], tags: ["vegetarian", "onepot", "quick"], allergens: ["dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "broccoli", qty: 4, unit: "cup", category: "Produce" },
      { name: "carrots", qty: 1, unit: "cup", category: "Produce" },
      { name: "onion", qty: 0.5, unit: "whole", category: "Produce" },
      { name: "vegetable broth", qty: 3, unit: "cup", category: "Pantry" },
      { name: "shredded cheddar", qty: 2, unit: "cup", category: "Dairy & Eggs" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" },
      { name: "flour", qty: 3, unit: "tbsp", category: "Pantry" }
    ],
    instructions: [
      "Sauté onion and carrots in butter until softened.",
      "Add broccoli and vegetable broth; simmer 10 minutes until the broccoli is tender.",
      "Whisk flour into the milk, then stir into the pot to thicken.",
      "Reduce heat and stir in cheddar cheese until melted.",
      "Blend partially with an immersion blender for a chunky-smooth texture, if you like."
    ]
  },
  {
    id: "fried-catfish", name: "Southern Fried Catfish", emoji: "🐟", cuisine: "american",
    proteins: ["fish"], tags: ["quick"], allergens: ["fish", "gluten", "egg"],
    timeMinutes: 25,
    ingredients: [
      { name: "catfish fillets", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "cornmeal", qty: 1, unit: "cup", category: "Pantry" },
      { name: "flour", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "cajun seasoning", qty: 1, unit: "tbsp", category: "Pantry" },
      { name: "eggs", qty: 2, unit: "count", category: "Dairy & Eggs" },
      { name: "vegetable oil", qty: 0.5, unit: "cup", category: "Pantry" }
    ],
    instructions: [
      "Whisk eggs in a shallow bowl.",
      "Mix cornmeal, flour, and cajun seasoning in another shallow bowl.",
      "Dip catfish fillets in egg, then coat in the cornmeal mixture.",
      "Fry in hot oil, about 4 minutes per side, until golden and crisp.",
      "Drain on paper towels before serving."
    ]
  },
  {
    id: "chicken-waffles", name: "Chicken & Waffles", emoji: "🧇", cuisine: "american",
    proteins: ["chicken"], tags: ["breakfastForDinner", "kidFriendly"], allergens: ["gluten", "egg", "dairy"],
    timeMinutes: 35,
    ingredients: [
      { name: "chicken tenders", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "buttermilk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "flour", qty: 1, unit: "cup", category: "Pantry" },
      { name: "waffle mix", qty: 2, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "vegetable oil", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "maple syrup", qty: 0.5, unit: "cup", category: "Pantry" }
    ],
    instructions: [
      "Soak chicken tenders in buttermilk for at least 15 minutes.",
      "Dredge the chicken in flour and fry in hot oil, about 4 minutes per side, until golden and cooked through.",
      "Make waffles according to the waffle mix directions.",
      "Serve the fried chicken on top of the waffles with maple syrup."
    ]
  },
  {
    id: "honey-mustard-pork-chops", name: "Honey Mustard Pork Chops", emoji: "🐖", cuisine: "american",
    proteins: ["pork"], tags: ["quick", "kidFriendly"], allergens: [],
    timeMinutes: 25,
    ingredients: [
      { name: "pork chops", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "honey", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "dijon mustard", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "garlic", qty: 2, unit: "clove", category: "Produce" },
      { name: "olive oil", qty: 1, unit: "tbsp", category: "Pantry" }
    ],
    instructions: [
      "Whisk together honey, dijon mustard, minced garlic, and olive oil.",
      "Season pork chops with salt and pepper, then sear in a hot skillet, 3-4 minutes per side.",
      "Pour the honey mustard mixture over the chops and reduce heat.",
      "Simmer 3-4 minutes, spooning the sauce over the chops, until cooked through (145F)."
    ]
  },
  {
    id: "ranch-chicken-bake", name: "Ranch Chicken Bake", emoji: "🐔", cuisine: "american",
    proteins: ["chicken"], tags: ["kidFriendly", "leftovers"], allergens: ["dairy"],
    timeMinutes: 40,
    ingredients: [
      { name: "chicken breast", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "ranch seasoning", qty: 2, unit: "tbsp", category: "Pantry" },
      { name: "sour cream", qty: 0.5, unit: "cup", category: "Dairy & Eggs" },
      { name: "shredded cheddar", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "bacon bits", qty: 0.25, unit: "cup", category: "Pantry" }
    ],
    instructions: [
      "Place chicken breast in a baking dish and sprinkle with ranch seasoning.",
      "Spread sour cream evenly over the chicken.",
      "Top with cheddar cheese and bacon bits.",
      "Bake at 375F for 30-35 minutes, until the chicken is cooked through (165F) and the cheese is bubbly."
    ]
  },
  {
    id: "corn-chowder", name: "Corn Chowder", emoji: "🌽", cuisine: "american",
    proteins: ["vegetarian"], tags: ["vegetarian", "onepot", "quick"], allergens: ["dairy"],
    timeMinutes: 30,
    ingredients: [
      { name: "corn", qty: 4, unit: "cup", category: "Produce" },
      { name: "potatoes", qty: 1.5, unit: "lb", category: "Produce" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "vegetable broth", qty: 2, unit: "cup", category: "Pantry" },
      { name: "milk", qty: 1, unit: "cup", category: "Dairy & Eggs" },
      { name: "butter", qty: 2, unit: "tbsp", category: "Dairy & Eggs" }
    ],
    instructions: [
      "Sauté onion in butter until soft.",
      "Add potatoes and vegetable broth; simmer 12-15 minutes until the potatoes are tender.",
      "Stir in corn and milk; simmer 5 more minutes.",
      "Mash a few scoops right in the pot for a thicker texture, if you like."
    ]
  },
  {
    id: "smothered-pork-chops", name: "Smothered Pork Chops", emoji: "🍖", cuisine: "american",
    proteins: ["pork"], tags: ["onepot"], allergens: ["dairy", "gluten"],
    timeMinutes: 35,
    ingredients: [
      { name: "pork chops", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "mushrooms", qty: 1, unit: "cup", category: "Produce" },
      { name: "chicken broth", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "flour", qty: 3, unit: "tbsp", category: "Pantry" },
      { name: "milk", qty: 0.25, unit: "cup", category: "Dairy & Eggs" }
    ],
    instructions: [
      "Season pork chops with salt and pepper; sear in a skillet, 3-4 minutes per side, then set aside.",
      "Sauté onion and mushrooms in the same skillet until soft.",
      "Sprinkle in flour, then whisk in chicken broth and milk to make a gravy.",
      "Return the pork chops to the skillet, cover, and simmer 12-15 minutes until tender."
    ]
  },
  {
    id: "salisbury-steak", name: "Salisbury Steak", emoji: "🥩", cuisine: "american",
    proteins: ["beef"], tags: ["onepot", "kidFriendly"], allergens: ["gluten", "egg"],
    timeMinutes: 35,
    ingredients: [
      { name: "ground beef", qty: 1.5, unit: "lb", category: "Meat & Seafood" },
      { name: "breadcrumbs", qty: 0.5, unit: "cup", category: "Pantry" },
      { name: "eggs", qty: 1, unit: "count", category: "Dairy & Eggs" },
      { name: "onion", qty: 1, unit: "whole", category: "Produce" },
      { name: "mushrooms", qty: 1, unit: "cup", category: "Produce" },
      { name: "beef broth", qty: 1.5, unit: "cup", category: "Pantry" },
      { name: "flour", qty: 2, unit: "tbsp", category: "Pantry" }
    ],
    instructions: [
      "Mix ground beef, breadcrumbs, egg, and a little minced onion; shape into oval patties.",
      "Brown the patties in a skillet, then set aside.",
      "Sauté the remaining onion and mushrooms in the same skillet.",
      "Sprinkle in flour, then whisk in beef broth to make a gravy.",
      "Return the patties to the skillet, cover, and simmer 12-15 minutes until cooked through."
    ]
  }
];

// Simple keyword dictionary the free-text parser (Screen 1 -> Screen 2) matches
// against. Kept next to the recipe data since tags/proteins/cuisines here must
// line up with the tags used above.
const KEYWORD_MAP = {
  cuisines: ["mexican", "italian", "american", "asian", "mediterranean", "indian"],
  proteins: ["chicken", "beef", "pork", "turkey", "fish", "shrimp", "vegetarian"],
  vegetables: ["broccoli", "carrot", "potato", "zucchini", "spinach", "pepper", "corn"],
  cookingStyle: {
    quick: ["quick", "easy", "fast", "simple", "30 minute", "weeknight"],
    airfryer: ["air fryer", "airfryer", "air-fryer"],
    slowcooker: ["slow cooker", "crockpot", "crock pot", "slowcooker"],
    leftovers: ["leftover", "leftovers", "meal prep", "big batch"],
    onepot: ["one pot", "one-pot", "sheet pan", "easy cleanup"],
    grill: ["grill", "grilling", "bbq", "barbecue"]
  },
  // Bare words, not phrases — these only get checked against sentences that
  // already mention "allerg" somewhere (see parseFamilyText), so a plain
  // word is enough and catches phrasing in either order ("nut allergy" or
  // "allergic to nuts").
  allergens: {
    fish: ["fish", "seafood"],
    shellfish: ["shellfish", "shrimp", "crab", "lobster"],
    dairy: ["dairy", "milk", "cheese", "lactose"],
    gluten: ["gluten", "wheat", "celiac"],
    egg: ["egg"],
    peanut: ["peanut", "nut"],
    soy: ["soy"]
  },
  // Singular stems only — "onion" already matches "onions" as a substring,
  // so a plural entry here would just double-add the same tag.
  dislikeFoods: ["fish", "mushroom", "spicy", "seafood", "shrimp", "cilantro", "onion", "pork", "beef", "chicken", "tomato", "egg"]
};
