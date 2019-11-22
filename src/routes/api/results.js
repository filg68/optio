//results.js

const express = require("express");
const router = express.Router();

//External Modules
import { getVotes } from "../utils/getVotes";
import { executeApiRequest } from "../utils/apiSupport";

router.get("/results", (req, res) => {
    executeApiRequest(req, res, "/api/poll/results", getVotes, [
        req.query.pollId
    ]);
});

module.exports = router;
