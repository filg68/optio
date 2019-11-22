//requests.js

const express = require("express");
const router = express.Router();

//External Modules
import { executeApiRequest } from "../utils/apiSupport";
import { getRequests } from "../utils/getFriendsPollRequests";

router.get("/requests", (req, res) => {
    executeApiRequest(req, res, "/api/poll/requests", getRequests, [
        req.query.userId
    ]);
});

module.exports = router;
