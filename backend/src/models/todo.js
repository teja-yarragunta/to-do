const mongoose = require("mongoose");

// const enumStates = ["Pending", "Completed"];
const todoSchema = new mongoose.Schema({
  // title: {
  //   type: String,
  //   required: true,
  // },
  task: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: function (value) {
        return value.trim().length > 0;
      },
    },
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    required: true,
    message: "Status must be either 'pending' or 'completed'",
    default: "pending",
  },
});

module.exports = mongoose.model("todo", todoSchema);
