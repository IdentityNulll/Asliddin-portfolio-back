const mongoose = require("mongoose");

const aboutMeSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
});

const AboutMe = mongoose.model("AboutMe", aboutMeSchema);

module.exports = AboutMe; // ✅ export the model itself
