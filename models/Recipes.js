const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "you need to add a title"],
    uppercase: true
  },
  image: {
    type: String
  },
  content: {
    type: String,
    required: true,
  },
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;
