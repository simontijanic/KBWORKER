const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  duration: { type: Number, required: true }, // in days
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'] },
  category: [String],
  schedule: [{
    day: { type: Number, required: true },
    workouts: [{
      workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
      notes: String // Optional notes specific to this workout in the program
    }]
  }],
  equipment: [String],
});

const Program = mongoose.model('Program', programSchema);

module.exports = Program