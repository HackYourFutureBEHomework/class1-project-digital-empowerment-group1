const mongoose = require("mongoose");

const ModuleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    explanation: String,
    exercise: String,
    evaluation: String,
    completed: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Module", ModuleSchema);
