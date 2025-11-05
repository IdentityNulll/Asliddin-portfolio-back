const express = require("express");
const router = express.Router();
const {
  getHome,
  createHome,
  updateHome,
  deleteHome,
} = require("../controllers/homeController");

router.get("/", getAbout);
router.post("/", createAbout);
router.put("/:id", updateAbout);
router.delete("/:id", deleteAbout);

module.exports = router;
