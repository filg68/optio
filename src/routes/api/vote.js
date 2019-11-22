//vote.js

const express = require("express");
const router = express.Router();

// External Modules
import { registerVote } from "../utils/voteModelUpdates";
import { executeApiRequest } from "../utils/apiSupport";

/**
 * @desc Registers or updates a users vote depending on whether or not a vote
 * @desc was previously cast.
 * @param req should be a json object -> {data: {pollId: value, userId: value, opinion: value }}
 */

router.post("/vote", function(req, res) {
    executeApiRequest(req, res, "/api/poll/vote", registerVote, [
        req.body.pollId,
        req.body.userId,
        req.body.option
    ]);
});

//PRIVATE FUNCTIONS

module.exports = router;
