const { About } = require("../models/aboutModel");

exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAbout = async (req, res) => {
  try {
    const about = new About(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    await About.findByIdAndDelete(req.params.id);
    res.json({ message: "About section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
