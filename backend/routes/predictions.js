const router = require("express").Router();
let Prediction = require("../models/prediction.model");

router.route("/").get((req, res) => {
  Prediction.find()
    .then((predictions) => res.json(predictions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const race = req.body.race;
  const items = req.body.items;
  const fastestLap = req.body.fastestLap;

  const newPrediction = new Prediction({
    username,
    race,
    items,
    fastestLap,
  });

  newPrediction
    .save()
    .then(() => res.json("Prediction added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
