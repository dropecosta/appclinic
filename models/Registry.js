const mongoose = require("mongoose");
const RegistrySchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patient",
  },
  description: {
    type: String,
  },
  prescription: [
    {
      genericName: {
        type: String,
      },
      commercialName: {
        type: String,
      },
      producer: {
        type: String,
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  exam: [
    {
      completed: {
        type: Boolean,
        default: false,
      },
      category: {
        type: [String]
      },
      description: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = User = mongoose.model("registry", RegistrySchema);
