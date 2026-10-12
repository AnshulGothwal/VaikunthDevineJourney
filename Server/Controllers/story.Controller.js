const Story = require("../Models/Story");
const mongoose = require("mongoose");

const getAllStories = async (req, res) => {
    try {
        const stories = await Story.find();
        res.json(stories);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createStory = async (req, res) => {
    try {
        const { title, description, content, image, category } = req.body;
        if (!title || !description || !content || !image || !category) {
            return res.status(400).json({
                message: "Title, description, content, image and category are required"
            });
        }
        const story = await Story.create(req.body);
        res.status(201).json(story);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateStory = async (req, res) => {
    try {
        const { title, description, content, image, category } = req.body;
        if (!title || !description || !content || !image || !category) {
            return res.status(400).json({
                message: "Title, description, content, image and category are required"
            });
        }
        const story = await Story.findByIdAndUpdate(
            req.params.id,
            { title, description, content, image, category },
            { returnDocument: "after", runValidators: true }
        );
        if (!story) {
            return res.status(404).json({
                message: "Story not found"
            });
        }
        res.json(story);
    }catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: "Invalid Story ID" });
        }
        res.status(500).json({ message: error.message });
        }
};

    const deleteStory = async (req, res) => {
        try {
            const story = await Story.findByIdAndDelete(req.params.id);
            if (!story) {
                return res.status(404).json({
                    message: "Story not found"
                });
            }
            res.json({ message: "Story deleted successfully" });
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({
                    message: "Invalid Story ID"
                });
            }
            res.status(500).json({ message: error.message });
        }
    };

module.exports = {
    getAllStories,
    createStory,
    updateStory,
    deleteStory
}
