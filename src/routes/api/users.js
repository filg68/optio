//users.js
//Author - Fil - August 28, 2019
//Inspiration - https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669

// Core packages to enable routing functionality
const express = require("express");
const router = express.Router();

// Loads .env keys depending on environment in use
const keys = require("../../config/config");

// Used to encrypt/decrypt password and for using jwt token
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// LOAD VALIDATION FUNCTIONS
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateFriendListInput = require("../../validation/friendList");
import { validateUserDataInput } from "../../validation/userData";

// LOAD DATA MODELS

const User = require("../../models/User");
const FriendList = require("../../models/friendList");
const Poll = require("../../models/Poll");

// ROUTES
/**
 * @route POST api/users/register
 * @desc Register user
 * @access Public
 * */
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => createToken(user, res))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

/**
 * @route POST api/users/login
 * @desc Login user and return a JWT token
 */
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ email: "Email not found" });
        }

        // Check password
        bcrypt
            .compare(password, user.password)
            .then(isMatch => {
                if (isMatch) {
                    // User matched
                    // Create JWT token and return via res.json
                    createToken(user, res);
                } else {
                    return res
                        .status(400)
                        .json({ password: "Password incorrect" });
                }
            })
            .catch();
    });
});

/**
 * @route POST api/users/add_friend_list
 * @desc Create a new friends list
 */
router.post("/add_friend_list", (req, res) => {
    const { errors, isValid } = validateFriendListInput(req.body);

    // validate request info:
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const newList = new FriendList({
        userId: req.body.userId,
        title: req.body.title,
        friends: req.body.friends
    });

    // check that title is unique for this user before saving list:
    FriendList.find({ userId: req.body.userId })
        .select("title")
        .then(result => {
            if (
                result.length &&
                result.find(
                    list =>
                        list.title.toLowerCase() ===
                        req.body.title.toLowerCase()
                )
            ) {
                return res
                    .status(400)
                    .json({ error: "List with this name already exists" });
            } else {
                newList
                    .save()
                    .then(list => {
                        User.findOneAndUpdate(
                            { _id: req.body.userId },
                            {
                                $push: {
                                    lists: list["_id"]
                                }
                            }
                        )
                            .then(response => {
                                res.json(list);
                            })
                            .catch(err => {
                                console.log("error: ", err);
                                return res.status(500).json({
                                    error: "Error updating the user list"
                                });
                            });
                    })
                    .catch(err => {
                        console.log("error: ", err);
                        res.status(500).json({
                            error: "Unable to create a new list"
                        });
                    });
            }
        })
        .catch(err => {
            console.log("error: ", err);
            res.status(500).json({
                error: "Unable to create a new list"
            });
        });
});

// @route GET api/users/users
// @desc Get all users
// @access Private
router.get("/", (req, res) => {
    User.find({})
        .then(users => {
            if (!users.length) {
                return res.status(404).json({ error: "Users were not found" });
            } else {
                res.status(200).json(users);
            }
        })
        .catch(err => {
            console.log("error: ", err);
            res.status(500).json({
                error: "Unable to retrieve data"
            });
        });
});

// @route GET api/users/users
// @desc Get all information for a single user
// @access Private
router.get("/user/:id", (req, res) => {
    User.findById(req.params.id)
        .populate("polls")
        .populate({
            path: "lists",
            populate: {
                path: "friends",
                select: "name avatar"
            } // select only name and avatar for each friend
        })
        .populate("friends", "name _id avatar")
        .then(result => {
            res.json(result);
        })
        .catch(err => {
            console.log("error: ", err);
            res.status(500).json({
                error: "Unable to retrieve user data"
            });
        });
});

router.patch("/", (req, res) => {
    const { errors, isValid } = validateUserDataInput(req.body);
    const { userId, email, name } = req.body;
    if (!isValid) {
        res.status(400).json(errors);
    }

    const dataToUpdate = {
        email: email,
        name: name
    };

    User.findByIdAndUpdate(userId, dataToUpdate, {
        lean: true,
        omitUndefined: true
    })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// UTILITY FUNCTIONS

/**
 * @desc Creates a JWT token and returns it via callback provided
 * @params user - an instance of a users
 * @params res - call back function
 * @access Private
 */
function createToken(user, res) {
    // Create JWT Payload
    const payload = {
        id: user.id,
        name: user.name
    };

    // Sign token
    jwt.sign(
        payload,
        keys.app.secretOrKey,
        {
            expiresIn: 31556926 // 1 year in seconds
        },
        (err, token) => {
            if (!err) {
                res.json({
                    status: 200,
                    token: `Bearer ${token}`
                });
            } else {
                res.json({
                    status: 500,
                    error: "Unable to generate token."
                });
            }
        }
    );
}

module.exports = router;
