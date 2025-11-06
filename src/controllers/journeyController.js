const { Journey } = require("../models/aboutModel");
const path = require("path");
const fs = require("fs");

// Get the journey section
exports.getJourney = async (req, res) => {
  try {
    const journey = await Journey.findOne();
    res.json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new journey section (with optional image upload)
exports.createJourney = async (req, res) => {
  try {
    const { title, description, who } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    const journey = new Journey({ title, description, who, imageUrl });
    await journey.save();
    res.status(201).json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update journey (with optional new image)
exports.updateJourney = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, who } = req.body;

    const journey = await Journey.findById(id);
    if (!journey) return res.status(404).json({ error: "Not found" });

    if (req.file) {
      // delete old image
      if (journey.imageUrl) {
        const oldPath = path.join(__dirname, "..", "..", "uploads", journey.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      journey.imageUrl = req.file.filename; // update with new image
    }

    journey.title = title ?? journey.title;
    journey.description = description ?? journey.description;
    journey.who = who ?? journey.who;

    await journey.save();
    res.json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete journey (and its image)
exports.deleteJourney = async (req, res) => {
  try {
    const { id } = req.params;
    const journey = await Journey.findById(id);
    if (!journey) return res.status(404).json({ error: "Journey not found" });

    // delete image if it exists
    if (journey.imageUrl) {
      const imgPath = path.join(__dirname, "..", "..", "uploads", journey.imageUrl);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Journey.findByIdAndDelete(id);
    res.json({ message: "Journey section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
