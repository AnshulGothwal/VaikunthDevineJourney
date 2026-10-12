const express = require('express');
const router = express.Router();
const { signup, login, getProfile, updateProfile, uploadProfilePhoto} = require("../Controllers/userController");
const authMiddleware = require("../Middlewares/authMiddleware");
const upload = require("../Middlewares/uploadMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);
router.put("/profile/photo", authMiddleware, upload.single("photo"), uploadProfilePhoto);
module.exports = router;