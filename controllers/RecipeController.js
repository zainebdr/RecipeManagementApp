const Recipe = require('../models/RecipeModel');// Import Recipe model

//Get All Recipes
exports.getAllRecipes = async (req, res, next) => {
    try { 
      console.log('Model is imported successfully');

      const recipes = await Recipe.find();
      res.json(recipes);
    } catch (error) {
      next(error); // Pass the error to the error handler
    }
  };


  //Get a specific Recipe by id
exports.getRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(parseInt(req.params.id));
    if(!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    next(error); // Pass the error to the error handler
  }
   
};

  //Create a new Recipe
  exports.createRecipe = async (req, res, next) => {
    try {
      const { name, description, ingredients, instructions } = req.body;
      const newRecipe = new Recipe({ name, description, ingredients, instructions });
      const savedRecipe = await newRecipe.save();
      res.json(savedRecipe);
    } catch (error) {
      next(error); // Pass the error to the error handler
    }
  };
  

  
  //Update a recipe with his id
  exports.updateRecipe=async (req,res,next)=>{
    try{
        updatedRecipe = req.body;
        let recipe=await Recipe.findByIdAndUpdate(recipeId,updatedRecipe);//function that performs both finding a document by its ID and updated it in a single operation. 
             console.log("recipe", recipe  ) //recipe is assigned the value of the removed recipe.
        if(!recipe){return res.status(401).send('Recipe not found')}
        return res.status(200).send(`Recipe Updated`).json(recipe);

      }catch(err){
        return next(err);
        }
            
  }

  //Delete a recipe with his id
  exports.destroyRecipe=async (req,res,next)=>{
    try{
        let recipeId=req.body.recipeId
            console.log("id", req.params._id );
            console.log('delete', req.body )
       
        let recipe=await Recipe.findByIdAndRemove(recipeId);//function that performs both finding a document by its ID and removing it in a single operation. 
             console.log("recipe", recipe  ) //recipe is assigned the value of the removed recipe.
        if(!recipe){return res.status(401).send('Recipe not found')}
        return res.status(200).send(`Recipe Deleted`).json(recipe);

      }catch(err){
        return next(err);
        }
            
  }