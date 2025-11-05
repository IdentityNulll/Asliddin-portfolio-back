const { Journey } = require("../models/aboutModel");

exports.getJourney = async (req, res) => {
  try {
    const journey = await Journey.findOne();
    res.json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createJourney = async (req, res) => {
  try {
    const journey = new Journey(req.body);
    await journey.save();
    res.status(201).json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.updateJourney = async (req, res) => {
  try {
    const journey = await Journey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteJourney = async (req, res) => {
  try {
    await Journey.findByIdAndDelete(req.params.id);
    res.json({ message: "Journey section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
