//getVotes.js

const Vote = require("../../models/Vote");

export async function getVotes(pollId) {
    //Get the results for this poll
    const votes = await Vote.find({ pollId: pollId }, "option updatedAt")
        .sort("-createdAt")
        .populate({
            path: "userId",
            select: "name avatar"
        });

    //Format the data in an array of objects [{name:, avatar:, option:}]
    let results = [];
    votes.forEach(vote => {
        //console.log(vote);
        let friend = {
            userId: vote.userId._id,
            name: vote.userId.name,
            avatar: vote.userId.avatar,
            option: vote.option,
            updatedAt: vote.updatedAt
        };
        results.push(friend);
    });

    //Return the data
    return results;
}

// PRIVATE FUNCTIONS
