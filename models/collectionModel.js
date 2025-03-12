const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Example: "MMA Training", "Bodyweight Workouts"
  description: String, // Example: "Complete collection of MMA workouts for all skill levels"
  image: String, // Example: "/images/mma-collection.jpg"
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  programs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Program' }],
  featured: { type: Boolean, default: false },
});

const Collection = mongoose.model("Collection", collectionSchema);

module.exports = Collection