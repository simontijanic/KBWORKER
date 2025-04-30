const router = require("express").Router();
const registrationController = require("../controllers/registrationController");

router.get("/register", registrationController.getRegister);
router.get("/login", registrationController.getLogin);
router.post("/register", registrationController.register);
router.post("/login", registrationController.login);
router.post("/logout", registrationController.logout);

module.exports = router;