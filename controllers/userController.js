const User = require("../models/userModel");

const Collection = require("../models/collectionModel");
const Guide = require("../models/guideModel");
const Program = require("../models/programModel");
const Workout = require("../models/workoutModel");

exports.getIndex = async (req, res) => {
  try {
    const guide = await Guide.findOne().skip(Math.floor(Math.random() * await Guide.countDocuments()));
    const program = await Program.findOne().skip(Math.floor(Math.random() * await Program.countDocuments()));
    const workoutCount = await Workout.countDocuments();

    if (workoutCount < 2) {
      throw new Error("Not enough workouts in the database.");
    }

    const workout1 = await Workout.findOne().skip(Math.floor(Math.random() * workoutCount));

    let workout2;
    do {
      workout2 = await Workout.findOne().skip(Math.floor(Math.random() * workoutCount));
    } while (workout1._id.equals(workout2._id)); 

    const collection = await Collection.findOne().skip(Math.floor(Math.random() * await Collection.countDocuments()));

    res.render("index", { guide, program, workout1, workout2, collection });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({});
    res.render("workouts", { workouts });
  } catch (err) {
    console.error(err);
  }
};
exports.getSingleWorkout = async (req, res) => {
  try {
    const id = req.params.workoutId;
    const workout = await Workout.findById(id);

    let user = null;
    if (req.session.user) {
      user = await User.findById(req.session.user._id);
    }

    res.render("singleWorkout", {workout, user});
  } catch (err) {
    console.error(err);
  }
}

exports.getPrograms = async (req, res) => {
  try {
    const programs = await Program.find({});

    res.render("programs", { programs });
  } catch (err) {
    console.error(err);
  }
};
exports.getSingleProgram = async (req, res) => {
  try {
    const id = req.params.programId;
    const program = await Program.findById(id).populate("schedule.workouts.workout");

    let user = null;
    if (req.session.user) {
      user = await User.findById(req.session.user._id);
    }

    res.render("singleProgram", { program, user });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};


exports.getGuides = async (req, res) => {
  try {
    const guides = await Guide.find({});
    res.render("guides", { guides });
  } catch (err) {
    console.error(err);
  }
};
exports.getSingleGuide = async (req, res) => {
  try {
    const id = req.params.guideId;
    const guide = await Guide.findById(id).populate("sections");

    let user = null;
    if (req.session.user) {
      user = await User.findById(req.session.user._id);
    }

    res.render("singleGuide", {guide, user});
  } catch (err) {
    console.error(err);
  }
}

exports.getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({});
    res.render("collections", { collections });
  } catch (err) {
    console.error(err);
  }
};
exports.getSingleCollection = async (req, res) => {
  try {
    const id = req.params.collectionId;
    const collection = await Collection.findById(id).populate("workouts").populate("programs");

    let user = null;
    if (req.session.user) {
      user = await User.findById(req.session.user._id);
    }

    res.render("singleCollection", {collection, user});
  } catch (err) {
    console.error(err);
  }
}

exports.getProfile = async (req, res) => {
  try {
    // Get the logged-in user's ID from the session
    const userId = req.session.user._id;

    // Find the user and populate the saved fields
    const user = await User.findById(userId)
      .populate("savedWorkouts") // Populating the saved workouts
      .populate("savedPrograms") // Populating the saved programs
      .populate("savedGuides") // Populating the saved guides
      .populate("savedCollections"); // Populating the saved collections

    res.render("profile", { user });
  } catch (error) {
    console.error(error);
    res.redirect("/login");
  }
};


exports.toggleSaveWorkout = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const workoutId = req.params.workoutId;
    
    const user = await User.findById(userId);
    const workoutIndex = user.savedWorkouts.indexOf(workoutId);
    
    if (workoutIndex === -1) {
      user.savedWorkouts.push(workoutId);
      await user.save();
    } else {
      user.savedWorkouts.splice(workoutIndex, 1);
      await user.save();
    }
    
    res.redirect('back');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating saved workouts');
  }
};

exports.toggleSaveProgram = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const programId = req.params.programId;
    
    const user = await User.findById(userId);
    const programIndex = user.savedPrograms.indexOf(programId);
    
    if (programIndex === -1) {
      user.savedPrograms.push(programId);
      await user.save();
    } else {
      user.savedPrograms.splice(programIndex, 1);
      await user.save();
    }
    
    res.redirect('back');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating saved programs');
  }
};

exports.toggleSaveGuide = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const guideId = req.params.guideId;
    
    const user = await User.findById(userId);
    const guideIndex = user.savedGuides.indexOf(guideId);
    
    if (guideIndex === -1) {
      user.savedGuides.push(guideId);
      await user.save();
    } else {
      user.savedGuides.splice(guideIndex, 1);
      await user.save();
    }
    
    res.redirect('back');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating saved guides');
  }
};

exports.toggleSaveCollection = async (req, res) => {
  try {
    const userId = req.session.user._id;
    const collectionId = req.params.collectionId;
    
    const user = await User.findById(userId);
    const collectionIndex = user.savedCollections.indexOf(collectionId);
    
    if (collectionIndex === -1) {
      user.savedCollections.push(collectionId);
      await user.save();
    } else {
      user.savedCollections.splice(collectionIndex, 1);
      await user.save();
    }
    
    res.redirect('back');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating saved collections');
  }
};