const mongoose = require("mongoose");

// schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isCompleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now() },
});

exports.Task = mongoose.model("Task", taskSchema);
