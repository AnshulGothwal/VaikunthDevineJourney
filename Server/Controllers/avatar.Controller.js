const Avatar = require("../Models/Avatar");
const mongoose = require("mongoose");

const getALLAvatars = async (req, res) => {
    try {
        const avatar = await Avatar.find();
        res.json(avatar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAvatar = async (req, res) => {
    try {
        const { name, title, description, image } = req.body;
        if (!name || !title || !description || !image) {
            return res.status(400).json({
                message: "Name, title, description and image are required"
            });
        }
        const avatar = await Avatar.create(req.body);
        res.status(201).json(avatar);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateAvatar = async (req, res) => {
    try {
        const { name, title, description, image } = req.body;
        if (!name || !title || !description || !image) {
            return res.status(400).json({
                message: "Name, title, description and image are required"
            });
        }
        const avatar = await Avatar.findByIdAndUpdate(
            req.params.id,
            { name, title, description, image },
            { returnDocument: "after", runValidators: true }
        );
        if (!avatar) {
            return res.status(404).json({
                message: "Avatar not found"
            });
        }
        res.json(avatar);
    }catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: "Invalid Avatar ID" });
        }

        res.status(500).json({ message: error.message });
        }
};

const deleteAvatar = async (req, res) => {
    try {
        const avatar = await Avatar.findByIdAndDelete(req.params.id);
        if (!avatar) {
            return res.status(404).json({ message: "Avatar not found" });
        }
        res.json({ message: "Avatar deleted successfully" });

        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({
                    message: "Invalid Avatar ID"
                });
            }
            res.status(500).json({ message: error.message });
        }
};
module.exports = {
    getALLAvatars,
    createAvatar,
    updateAvatar,
    deleteAvatar
};
