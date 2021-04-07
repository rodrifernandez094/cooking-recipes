const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userControllers");

router.get("/signup", userController.signup_get);
router.post("/signup", userController.signup_post);
router.get("/login", userController.login_get);
router.post("/login", userController.login_post);
router.get("/logout", userController.logout_get);
router.get("/:emailToken", userController.verifyEmail);

module.exports = router;
