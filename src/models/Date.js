const mongoose = require("mongoose");

const DateSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    // Add name field
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Date", DateSchema);
