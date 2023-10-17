const express = require('express');
const router = express.Router();
const recipeController =require('../controllers/RecipeController');
const auth=require('../middleware/Auth');
//Retrieve a list of all recipes.
router.get('/',auth,recipeController.getAllRecipes);

//Retrieve a specific recipe by ID.
router.get('/:id',auth,recipeController.getRecipe);

// Create a new recipe.
router.post('/',auth,recipeController.createRecipe);

//Update a specific recipe by ID.
router.put('/:id',auth,recipeController.updateRecipe);

//Delete a specific recipe by ID.
router.delete('/:id',auth,recipeController.destroyRecipe);


// Export the router to be used in app.js.
module.exports=router;
