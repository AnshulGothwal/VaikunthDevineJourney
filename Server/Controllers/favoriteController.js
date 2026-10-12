const User = require("../Models/User");

const addFavorite = async (req, res) => {
  try {
    const { type, itemId } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!["avatars", "temples", "stories"].includes(type)) {
      return res.status(400).json({ message: "Invalid favorite type" });
    }

    if (user.favorites[type].includes(itemId)) {
      return res.status(400).json({ message: "Already in favorites" });
    }

    user.favorites[type].push(itemId);
    await user.save();

    res.json({ message: "Added to favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { type, itemId } = req.body;

    if (!["avatars", "temples", "stories"].includes(type)) {
      return res.status(400).json({ message: "Invalid favorite type" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favorites[type] = user.favorites[type].filter(
      id => id.toString() !== itemId
    );

    await user.save();

    res.json({ message: "Removed from favorites" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate("favorites.avatars")
      .populate("favorites.temples")
      .populate("favorites.stories")
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = { addFavorite, removeFavorite, getFavorites };