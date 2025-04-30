const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

router.get("/", userController.getIndex);
router.get("/profile", auth.isAuthenticated, userController.getProfile);
router.post("/workouts/:workoutId/toggle-save", auth.isAuthenticated, userController.toggleSaveWorkout);
router.post("/programs/:programId/toggle-save", auth.isAuthenticated, userController.toggleSaveProgram);
router.post("/guides/:guideId/toggle-save", auth.isAuthenticated, userController.toggleSaveGuide);
router.post("/collections/:collectionId/toggle-save", auth.isAuthenticated, userController.toggleSaveCollection);

module.exports = router;