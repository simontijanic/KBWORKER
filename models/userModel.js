const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minLength: [3, "Username must be at least 3 characters"],
    maxLength: [30, "Username cannot exceed 30 characters"],
    match: [/^[a-zA-Z0-9._-]+$/, "Username can only contain letters, numbers, dots, underscores, and hyphens"]
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [8, "Password must be at least 8 characters"],
    select: false // Excludes password from queries by default
  },
  savedWorkouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Workout",
    },
  ],
  savedPrograms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
    },
  ],
  savedGuides: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guide",
    },
  ],
  savedCollections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
