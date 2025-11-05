const { About } = require("../models/aboutModel");
const fs = require("fs");
const path = require("path");

// 🟢 GET
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 CREATE (with multer single file)
exports.createAbout = async (req, res) => {
  try {
    const { title, description, who } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const about = new About({ title, description, who, imageUrl });
    await about.save();

    res.status(201).json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 UPDATE (replace image if new one uploaded)
exports.updateAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, who } = req.body;
    const about = await About.findById(id);

    if (!about) return res.status(404).json({ error: "Not found" });

    // if new image uploaded — delete old one
    if (req.file) {
      if (about.imageUrl) {
        const oldPath = path.join(__dirname, "..", "..", about.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      about.imageUrl = `/uploads/${req.file.filename}`;
    }

    about.title = title ?? about.title;
    about.description = description ?? about.description;
    about.who = who ?? about.who;

    await about.save();
    res.json(about);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🟢 DELETE (also remove image)
exports.deleteAbout = async (req, res) => {
  try {
    const { id } = req.params;
    const about = await About.findByIdAndDelete(id);

    if (!about) return res.status(404).json({ error: "Not found" });

    if (about.imageUrl) {
      const imgPath = path.join(__dirname, "..", "..", about.imageUrl);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    res.json({ message: "About section deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
