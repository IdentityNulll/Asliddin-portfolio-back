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
    const data = req.body;

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`; // save the image path
    }

    const journey = new Journey(data);
    await journey.save();
    res.status(201).json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update journey (with optional new image)
exports.updateJourney = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;

      // optionally delete the old image if one exists
      const oldJourney = await Journey.findById(req.params.id);
      if (oldJourney && oldJourney.image) {
        const oldPath = path.join(__dirname, "..", oldJourney.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
    }

    const journey = await Journey.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.json(journey);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete journey (and its image)
exports.deleteJourney = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id);
    if (!journey) return res.status(404).json({ error: "Journey not found" });

    // delete image if it exists
    if (journey.image) {
      const imgPath = path.join(__dirname, "..", journey.image);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await Journey.findByIdAndDelete(req.params.id);
    res.json({ message: "Journey section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
