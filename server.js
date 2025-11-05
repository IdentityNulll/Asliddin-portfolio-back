const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDb = require("./config/connectToDB");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectToDb();
const aboutRoutes = require("./src/routes/aboutMeRoutes");
app.use("/api/about", aboutRoutes);



const PORT = process.env.PORT || 4567;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});