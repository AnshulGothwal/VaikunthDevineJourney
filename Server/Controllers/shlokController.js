const Shlok = require("../Models/Shlok");
const mongoose = require("mongoose");

// GET: All Shloks
const getAllShloks = async (req, res) => {
  try {
    const shloks = await Shlok.find();
    res.status(200).json(shloks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST: Create Shlok
const createShlok = async (req, res) => {
  try {
    const { title, sanskrit, meaning, source, chapter, verse } = req.body;

    if (!title || !sanskrit || !meaning || !source) {
      return res.status(400).json({
        message: "Title, Sanskrit, meaning and source are required"
      });
    }

    const shlok = await Shlok.create({
      title, sanskrit, meaning, source, chapter, verse
    });

    res.status(201).json(shlok);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT: Update Shlok
const updateShlok = async (req, res) => {
  try {
    const { title, sanskrit, meaning, source, chapter, verse } = req.body;

    const shlok = await Shlok.findByIdAndUpdate(
      req.params.id,
      { title, sanskrit, meaning, source, chapter, verse },
      { new: true, runValidators: true }
    );

    if (!shlok) {
      return res.status(404).json({ message: "Shlok not found" });
    }

    res.status(200).json(shlok);
  } catch (error) {
    const status = error instanceof mongoose.Error.CastError ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

// DELETE: Remove Shlok
const deleteShlok = async (req, res) => {
  try {
    const shlok = await Shlok.findByIdAndDelete(req.params.id);

    if (!shlok) {
      return res.status(404).json({ message: "Shlok not found" });
    }

    res.status(200).json({ message: "Shlok deleted successfully" });
  } catch (error) {
    const status = error instanceof mongoose.Error.CastError ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};

module.exports = {
  getAllShloks,
  createShlok,
  updateShlok,
  deleteShlok
};

