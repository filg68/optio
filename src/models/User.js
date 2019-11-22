//User.js
//Created by Fil Gambatesa - August 25, 2019

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        avatar: String,
        polls: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "poll"
            }
        ],
        lists: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "friendList"
            }
        ],
        friends: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            }
        ],
        online: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
