const express = require("express");
const router = express.Router();

const { addFavorite, removeFavorite, getFavorites} = require("../Controllers/favoriteController");
const authMiddleware = require("../Middlewares/authMiddleware");

router.post("/add", authMiddleware, addFavorite);
router.delete("/remove", authMiddleware, removeFavorite);
router.get("/list", authMiddleware, getFavorites);

module.exports = router;