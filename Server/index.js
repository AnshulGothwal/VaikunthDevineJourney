const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/db");
const avatarRoutes = require("./Routes/avatarRoutes");
const templeRoutes = require("./Routes/templeRoutes");
const storyRoutes = require("./Routes/storyRoutes");
const userRoutes = require("./Routes/userRoutes");
const favoriteRoutes = require("./Routes/favoriteRoutes");
const errorMiddleware = require("./Middlewares/errorMiddleware");
const shlokRoutes = require("./Routes/shlokRoutes");

connectDB();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/avatars", avatarRoutes);
app.use("/api/temples", templeRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/shloks", shlokRoutes);

app.get("/", (req, res) => {
  res.send("Vaikunth Backend Running");
});

const PORT = process.env.PORT || 5000;
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
