const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const predictionSchema = new Schema(
  {
    username: { type: String, required: true },
    race: { type: String, required: true },
    items: { type: [{ id: String, content: String }], required: true },
    fastestLap: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

module.exports = Prediction;
