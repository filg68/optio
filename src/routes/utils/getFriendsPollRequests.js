//getFriendsPollRequests.js

const Lists = require("../../models/friendList");
const Polls = require("../../models/Poll");
const Votes = require("../../models/Vote");

export async function getRequests(userId) {
    try {
        //Get all the lists the user is a member of
        const lists = await Lists.find({ friends: userId }, "_id").exec();

        //Get all the votes the user has already cast
        const votes = await Votes.find(
            { userId: userId },
            { pollId: 1, _id: 0 }
        ).exec();

        // Strip out the key from the votes object
        const votesArray = [];
        votes.map(poll => votesArray.push(poll.pollId));

        //Get all the polls attached to those lists
        return await Polls.find(
            {
                sendToList: lists,
                _id: { $nin: votesArray }
            },
            "_id title votes options"
        ).sort("createdAt");
    } catch (err) {
        console.log("Error during requests query\n", err);
        return "Error during data request";
    }
}

// PRIVATE FUNCTIONS
