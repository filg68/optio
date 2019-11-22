//upload.js

const express = require("express");
const router = express.Router();

// File upload packages
import { filesToUpload } from "../utils/S3Upload";
const fileUpload = require("express-fileupload");
router.use(fileUpload());

// External Modules
import { createNewPoll } from "../utils/pollModelUpdates";
import { updateUserAvatar } from "../utils/userModelUpdates";

// Constants Used in This Module

const TARGET_POLLS = "poll_images";
const TARGET_AVATAR = "avatar_image";

/**
 * @desc Passes the file data to file upload function if there is a file in req
 * @desc This function will always execute if there is at least one file to upload
 * @desc Does not check to make sure that you have 2 images if that's what you
 * @desc meant to do.  Send all files required.
 */

router.post("/upload", function(req, res) {
    // no files uploaded

    if (req.files === null) {
        res.status(400).json({ error: "No files to upload." });
    } else {
        filesToUpload(req["files"], response => {
            // Make sure there were no errors in the upload
            if (response.status !== 200) {
                res.status(response.status).json(response.result);
            }
            // save the path to the image
            if (req.body.target === TARGET_POLLS) {
                const params = {
                    userId: req.body.userId,
                    title: req.body.title,
                    sendToList: req.body.sendToList,
                    // expiresOn: req.body.expiresOn,
                    options: response.result
                };
                createNewPoll(params)
                    .then(response => {
                        res.status(200).json(response);
                    })
                    .catch(err => res.status(500).json(err));
            } else if (req.body.target === TARGET_AVATAR) {
                const params = {
                    userId: req.body.userId,
                    options: response.result
                };
                updateUserAvatar(params)
                    .then(response => res.status(200).json(response))
                    .catch(err => res.status(500).json(err));
            } else {
                console.log("No target");
                res.status(500).json({
                    error: `No target specified. Given ${req.body.target}`
                });
            }
        });
    }
});

//PRIVATE FUNCTIONS

module.exports = router;
