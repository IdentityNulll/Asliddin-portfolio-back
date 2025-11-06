const Projects = require("../models/projectsModel");
const path = require("path");
const fs = require("fs");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create new project (with multiple images)
exports.createProject = async (req, res) => {
  try {
    const data = req.body;

    // Handle multiple uploaded images
    if (req.files && req.files.length > 0) {
      data.imageUrl = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const project = new Projects(data);
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update existing project (add or replace images)
exports.updateProject = async (req, res) => {
  try {
    const data = req.body;

    const oldProject = await Projects.findById(req.params.id);
    if (!oldProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    // If new images uploaded, replace old ones
    if (req.files && req.files.length > 0) {
      // Delete old images from server
      if (oldProject.imageUrl && oldProject.imageUrl.length > 0) {
        oldProject.imageUrl.forEach((imgPath) => {
          const fullPath = path.join(__dirname, "..", imgPath);
          if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
        });
      }

      // Save new ones
      data.imageUrl = req.files.map((file) => `/uploads/${file.filename}`);
    }

    const project = await Projects.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete project and its images
exports.deleteProject = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });

    // Delete images from uploads
    if (project.imageUrl && project.imageUrl.length > 0) {
      project.imageUrl.forEach((imgPath) => {
        const fullPath = path.join(__dirname, "..", imgPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      });
    }

    await Projects.findByIdAndDelete(req.params.id);
    res.json({ message: "Project deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Projects.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
