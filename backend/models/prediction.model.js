const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const predictionSchema = new Schema(
  {
    username: { type: String, required: true },
    predictArray: { type: [String], required: true, maxlength: 3 },
    fastestLap: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
