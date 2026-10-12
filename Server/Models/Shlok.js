const mongoose = require("mongoose");
const shlokSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    sanskrit: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    },
    source: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        default: ""
    },
    verse: {
        type: String,
        default: ""
    }
    });
module.exports = mongoose.model("Shlok", shlokSchema);
