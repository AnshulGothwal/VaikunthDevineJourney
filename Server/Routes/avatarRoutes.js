const express = require('express');
const router = express.Router();
const { getALLAvatars, createAvatar, updateAvatar, deleteAvatar } = require('../Controllers/avatar.Controller');

router.get("/", getALLAvatars);
router.post("/", createAvatar); 
router.put("/:id", updateAvatar);
router.delete("/:id", deleteAvatar);

module.exports = router;
