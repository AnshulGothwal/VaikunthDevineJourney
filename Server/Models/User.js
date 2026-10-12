const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: ""
        },
    favorites: {
                avatars:[
                    {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Avatar"
                    }
                ],

                temples: [
                    {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Temple"
                    }
                ],

                stories: [
                    {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Story"
                    }
                        ]
                }
});

module.exports = mongoose.model("User", userSchema);