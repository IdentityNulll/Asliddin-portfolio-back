const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteProjectImage
} = require("../controllers/projectsController");

// 🟢 Routes
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", upload.array("images", 5), createProject);
router.put("/:id", upload.array("images", 5), updateProject);
router.delete("/:id", deleteProject);
router.delete("/:id/image", deleteProjectImage);



module.exports = router;