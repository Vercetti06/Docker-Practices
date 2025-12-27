const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
  status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  assignee: String
}, { timestamps: true });

module.exports = mongoose.model("Task", TaskSchema);

