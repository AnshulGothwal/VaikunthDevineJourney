const express = require("express");
const router = express.Router();
const { getAllStories, createStory, updateStory, deleteStory } = require("../Controllers/story.Controller");

router.get("/", getAllStories);
router.post("/", createStory);
router.put("/:id", updateStory);
router.delete("/:id", deleteStory);

module.exports = router;