const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    content: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    category: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Story", storySchema);