const router = require("express").Router();

const userController = require("../controllers/userController");
const registrationController = require("../controllers/registrationController");
const auth = require("../middleware/auth");

router.get("/", userController.getIndex);

router.get("/workouts", userController.getWorkouts);
router.get("/workouts/:workoutId", userController.getSingleWorkout);

router.get("/programs", userController.getPrograms);
router.get("/programs/:programId", userController.getSingleProgram);

router.get("/guides", userController.getGuides);
router.get("/guides/:guideId", userController.getSingleGuide);

router.get("/collections", userController.getCollections);
router.get("/collections/:collectionId", userController.getSingleCollection);

router.get("/register", registrationController.getRegister);
router.get("/login", registrationController.getLogin);

router.post("/register", registrationController.register);
router.post("/login", registrationController.login);
router.post("/logout", registrationController.logout);

router.get("/profile", auth.isAuthenticated, userController.getProfile);

// Save/unsave routes - all need authentication
router.post('/workouts/:workoutId/toggle-save', auth.isAuthenticated, userController.toggleSaveWorkout);
router.post('/programs/:programId/toggle-save', auth.isAuthenticated, userController.toggleSaveProgram);
router.post('/guides/:guideId/toggle-save', auth.isAuthenticated, userController.toggleSaveGuide);
router.post('/collections/:collectionId/toggle-save', auth.isAuthenticated, userController.toggleSaveCollection);

module.exports = router;