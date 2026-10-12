const Temple = require("../Models/Temples");
const mongoose = require("mongoose");
const getAllTemples = async (req, res) => {
    try {
        const temple = await Temple.find();
        res.json(temple);
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

const createTemple = async (req, res) => {
    try {
        const { name, location, description, image, mapLink } = req.body;
        if (!name || !location || !description || !image || !mapLink) {
            return res.status(400).json({
                message: "Name, location, description and image are required"
            });
        }
        const temple = await Temple.create(req.body);
        res.status(201).json(temple);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateTemple = async (req, res) => {
    try {
        const { name, location, description, image, mapLink } = req.body;

        if (!name || !location || !description || !image || !mapLink) {
            return res.status(400).json({
                message: "Name, location, description and image are required"
            });
        }
        const temple = await Temple.findByIdAndUpdate(
            req.params.id,
            { name, location, description, image },
            { returnDocument: "after", runValidators: true }
        );
        if (!temple) {
            return res.status(404).json({
                message: "Temple not found"
            });
        }
        res.json(temple);

    }catch (error) {
        if (error instanceof mongoose.Error.CastError) {
            return res.status(400).json({ message: "Invalid Temple ID" });
        }
        res.status(500).json({ message: error.message });
        }
};

    const deleteTemple = async (req, res) => {
        try {
            const temple = await Temple.findByIdAndDelete(req.params.id);

            if (!temple) {
                return res.status(404).json({
                    message: "Temple not found"
                });
            }

            res.json({ message: "Temple deleted successfully" });

        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return res.status(400).json({
                    message: "Invalid Temple ID"
                });
            }

            res.status(500).json({ message: error.message });
        }
};

module.exports = {
    getAllTemples,
    createTemple,
    updateTemple,
    deleteTemple
}