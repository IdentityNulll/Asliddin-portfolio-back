const Home = require("../models/homeModel");

exports.getAbout = async (req, res) => {
  try {
    const about = await Home.findOne(); 
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createAbout = async (req, res) => {
  try {
    const about = new Home(req.body);
    await about.save();
    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAbout = async (req, res) => {
  try {
    const about = await Home.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    await Home.findByIdAndDelete(req.params.id);
    res.json({ message: "About section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};