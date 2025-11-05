const mongoose = require('mongoose');

const projectsSchema = new mongoose.Schema({
    name: { type: String,},
    description: { type: String},
    imageUrl: [{ type: String }],
    technologies: [{ type: String }]
});

const Projects = mongoose.model('Projects', projectsSchema);

module.exports = Projects;