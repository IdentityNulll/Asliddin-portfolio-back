const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  title: { type: String, },
  description: { type: String,},
  imageUrl: { type: String },
  who: { type: String }
});

const journeySchema = new mongoose.Schema({
  title: { type: String,},
  description: { type: String,},
  imageUrl: { type: String  },
  who: { type: String }
});

const About = mongoose.model('About', aboutSchema);
const Journey = mongoose.model('Journey', journeySchema);
module.exports = { About, Journey };