//Polls.js

require("mongoose-type-url");
const mongoose = require("mongoose");

const pollSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        sendToList: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "friendList",
            required: true
        },
        options: [
            {
                type: String,
                required: true
            }
        ],
        votes: [
            {
                type: Number
            }
        ],
        complete: { type: Boolean }
    },
    { timestamps: true }
);

module.exports = mongoose.model("poll", pollSchema);
