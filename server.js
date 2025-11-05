const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
const connectToDb = require("./config/connectToDB");

const homeRoutes = require("./src/routes/homeRoutes");
const projectsRoutes = require("./src/routes/projectsRoutes");
const journeyRoutes = require("./src/routes/journeyRoutes");
const aboutRoutes = require("./src/routes/aboutRoutes");
const auth = require("./src/middleware/authMiddleware");
const UserRoutes = require("./src/routes/UserRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// ✅ Static route to serve uploaded images
app.use("/uploads", express.static(uploadDir));

// ✅ Connect to database
connectToDb();

// ✅ API Routes
app.use("/api/home", homeRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/journey", journeyRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/users", UserRoutes);

// ✅ Protected test route (for JWT or any auth)
app.get("/api/secret", auth, (req, res) => {
  res.json({ msg: "You got access, bruh 🔥" });
});

// ✅ Global error handler (optional but good practice)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(400).json({ error: err.message || "Something went wrong" });
});

// ✅ Start the server
const PORT = process.env.PORT || 4567;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
