const mongoose = require("mongoose");

const Collection = require("../models/collectionModel");
const Guide = require("../models/guideModel");
const Program = require("../models/programModel");
const Workout = require("../models/workoutModel");

async function seedDatabase() {
  try {
    // Delete existing data to avoid duplicates (Optional)
    await Collection.deleteMany({});
    await Guide.deleteMany({});
    await Program.deleteMany({});
    await Workout.deleteMany({});

    // Seed Workouts
    const workout1 = new Workout({
      title: "Bodyweight Squats",
      description: "A simple bodyweight workout to build leg strength.",
      difficulty: "beginner",
      duration: 15, // 15 minutes
      equipment: ["none"],
      category: ["legs", "strength"],
      content: "Start with 3 sets of 10 squats, rest for 1 minute in between.",
    });

    const workout2 = new Workout({
      title: "Push-ups",
      description:
        "An upper body workout targeting the chest, shoulders, and triceps.",
      difficulty: "intermediate",
      duration: 10,
      equipment: ["none"],
      category: ["upper body", "strength"],
      content: "Do 3 sets of 15 push-ups with a 1-minute rest in between.",
    });

    await workout1.save();
    await workout2.save();

    // Seed Programs
    const program1 = new Program({
      title: "Beginner Bodyweight Program",
      description: "A 30-day bodyweight workout program for beginners.",
      duration: 30,
      difficulty: "beginner",
      category: ["strength", "beginner"],
      schedule: [
        {
          day: 1,
          workouts: [{ workout: workout1._id, notes: "Focus on form" }],
        },
        {
          day: 2,
          workouts: [{ workout: workout2._id, notes: "Do full push-ups" }],
        },
      ],
      equipment: ["none"],
    });

    await program1.save();

    // Seed Guides
    const guide1 = new Guide({
      title: "MMA Training Guide",
      sections: [
        {
          sectionTitle: "Introduction",
          content: "This is a beginner guide to MMA training.",
        },
        {
          sectionTitle: "Warm-up Routine",
          content: "A proper warm-up is essential before MMA training.",
        },
      ],
      sources: ["MMA.com", "FightSports.tv"],
      category: ["MMA", "training"],
      tags: ["MMA", "training", "beginner"],
    });

    await guide1.save();

    // Seed Collections
    const collection1 = new Collection({
      name: "MMA Training",
      description: "Complete collection of MMA workouts for all skill levels.",
      image: "/images/mma-collection.jpg",
      workouts: [workout1._id, workout2._id],
      programs: [program1._id],
      featured: true,
    });

    await collection1.save();

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  } finally {
    // Close the connection to the database
    mongoose.connection.close();
  }
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
    //seedDatabase();
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
