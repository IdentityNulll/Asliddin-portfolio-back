const Home = require("../models/homeModel");
const fs = require("fs");
const path = require("path");
// controllers/homeController.js
const UPLOADS_DIR = path.join(__dirname, "..", "..", "uploads"); // <- outside src

exports.getHome = async (req, res) => {
  try {
    const home = await Home.findOne();
    res.json(home);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createHome = async (req, res) => {
  try {
    const { title, description, who } = req.body;
    const image = req.file ? req.file.filename : null;

    const home = new Home({ title, description, who, image });
    await home.save();

    res.status(201).json(home);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHome = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, who } = req.body;

    const home = await Home.findById(id);
    if (!home) return res.status(404).json({ error: "Not found" });

    if (req.file && home.image) {
      const oldPath = path.join(UPLOADS_DIR, home.image);
      console.log("Trying to delete old image at:", oldPath);

      try {
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
          console.log("Old image deleted ✅");
        } else {
          console.log("Old image not found ❌");
        }
      } catch (err) {
        console.error("Error deleting old image:", err);
      }

      home.image = req.file.filename;
    }

    home.title = title ?? home.title;
    home.description = description ?? home.description;
    home.who = who ?? home.who;

    await home.save();
    res.json(home);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHome = async (req, res) => {
  try {
    const { id } = req.params;
    const home = await Home.findByIdAndDelete(id);

    if (!home) return res.status(404).json({ error: "Not found" });

    if (home.image) {
      const imgPath = path.join(__dirname, "..", "..", home.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "Home section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
