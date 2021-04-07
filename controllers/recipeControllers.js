const Recipe = require("../models/Recipes");

module.exports.recipes_get = (req, res) => {
    res.locals.title = "Recipes";

    Recipe.find({}, (err, recipes) => {

        res.render("recipes", { recipes });
    })

}

module.exports.recipeId_get = (req, res) => {
    const recipeId = req.params.id;
    Recipe.findById(recipeId, (err, recipe) => {
        if (err) console.log(err);
        else {
            res.locals.title = recipe.title;
            res.render("dish_recipe", { recipe })
        }
    })
}

module.exports.writeRecipe_get = (req, res) => {
    res.locals.title = "Write Recipe";
    res.render("write_recipe");
}

module.exports.writeRecipe_post = async (req, res) => {
    const { title, image, content } = req.body;

    try {
        const recipe = await Recipe.create({
            title,
            image,
            content,
        });

        res.status(201).json({ recipe: recipe._id });
    } catch (err) {
        console.log(err);
    }
}