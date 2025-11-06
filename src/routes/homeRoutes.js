const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // 🟢 import multer

const {
  getHome,
  createHome,
  updateHome,
  deleteHome,
} = require("../controllers/homeController");

// 🟢 Routes
router.get("/", getHome);
router.post("/", upload.single("image"), createHome);
router.put("/:id", upload.single("image"), updateHome);
router.delete("/:id", deleteHome);

module.exports = router;
