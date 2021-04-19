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
        required: true,
      },
      commercialName: {
        type: String,
        required: true,
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
