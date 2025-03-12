const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  sections: [
    {
      sectionTitle: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  sources: [
    {
      type: String,
      trim: true,
    },
  ],
  category: [String],
  tags: [String],
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide