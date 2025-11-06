const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); 

const {
  getAbout,
  createAbout,
  updateAbout,
  deleteAbout,
} = require("../controllers/aboutController");

// 🟢 Routes
router.get("/", getAbout);
router.post("/", upload.single("image"), createAbout);
router.put("/:id", upload.single("image"), updateAbout);
router.delete("/:id", deleteAbout);

module.exports = router;