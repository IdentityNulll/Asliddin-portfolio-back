const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  image: { type: String },
  who: {type: String}
});

const Home = mongoose.model("homeSchema", homeSchema);

module.exports = Home;