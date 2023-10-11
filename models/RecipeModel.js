//import Mongoose library which is an Object Data Modeling (ODM) library for MongoDB.
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  ingredients: [String],
  instructions: String,

}, {
    timestamps: true, // This option enables automatic createdAt and updatedAt fields.
  });


//A Mongoose model is a constructor function that can interact with MongoDB documents in the "Recipe" collection following this schema.
module.exports = mongoose.model('Recipe', recipeSchema);
