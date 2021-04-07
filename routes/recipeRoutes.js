const { requireAuth } = require("../middleware/authMiddleware");
const recipeController = require("../controllers/recipeControllers")
const { Router } = require("express");
const router = Router();

router.get("/recipes", requireAuth, recipeController.recipes_get);

router.get("/recipes/:id", recipeController.recipeId_get)

router.get("/write-recipe", requireAuth, recipeController.writeRecipe_get);

router.post("/write-recipe", recipeController.writeRecipe_post);

module.exports = router;
