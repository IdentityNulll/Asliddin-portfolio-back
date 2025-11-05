const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDb = require("./config/connectToDB");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDb();
const homeRoutes = require("./src/routes/homeRoutes");
const projectsRoutes = require("./src/routes/projectsRoutes");
const journeyRoutes = require("./src/routes/journeyRoutes");
const aboutRoutes = require("./src/routes/aboutRoutes");
app.use("/api/home", homeRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/journey", journeyRoutes);
app.use("/api/about", aboutRoutes);




const PORT = process.env.PORT || 4567;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});