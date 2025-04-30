const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/workouts", userController.getWorkouts);
router.get("/workouts/:workoutId", userController.getSingleWorkout);
router.get("/programs", userController.getPrograms);
router.get("/programs/:programId", userController.getSingleProgram);
router.get("/guides", userController.getGuides);
router.get("/guides/:guideId", userController.getSingleGuide);
router.get("/collections", userController.getCollections);
router.get("/collections/:collectionId", userController.getSingleCollection);

module.exports = router;