const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // 🟢 import multer setup

const {
  getJourney,
  createJourney,
  updateJourney,
  deleteJourney,
} = require("../controllers/journeyController");

// 🟢 Routes
router.get("/", getJourney);
router.post("/", upload.single("image"), createJourney);
router.put("/:id", upload.single("image"), updateJourney);
router.delete("/:id", deleteJourney);

module.exports = router;
