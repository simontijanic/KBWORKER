const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  duration: Number, // in minutes
  equipment: [String],
  category: [String], // e.g., ['legs', 'strength', 'cardio']
  content: String, // Rich text content for the entire workout
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout