const express = require('express');
const router = express.Router();
const recipeController =require('../controllers/RecipeController');

//Retrieve a list of all recipes.
router.get('/',recipeController.getAllRecipes);

//Retrieve a specific recipe by ID.
router.get('/:id',recipeController.getRecipe);

// Create a new recipe.
router.post('/',recipeController.createRecipe);

//Update a specific recipe by ID.
router.put('/:id',recipeController.updateRecipe);

//Delete a specific recipe by ID.
router.delete('/:id',recipeController.destroyRecipe);


// Export the router to be used in app.js.
module.exports=router;
