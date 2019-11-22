//voteModelUpdates
/**
 * @author - Fil
 * @date - September 8, 2019
 * @purpose - Functions used to cast a vote
 */

import Vote from "../../models/Vote";
import Poll from "../../models/Poll";

export async function registerVote(pollId, userId, option) {
    try {
        //Update the vote for this poll and this user
        await Vote.findOneAndUpdate(
            { userId: userId, pollId: pollId },
            { option: option },
            { new: true, upsert: true }
        ).exec();

        // Retrieves counts by option and total # of votes needed
        // newCounts[0,1] = vote counts for options
        // newCounts[2] = number of votes needed
        const newCounts = await parallelSumOfCounts(pollId);

        await Poll.findOneAndUpdate(
            { _id: pollId },
            {
                votes: newCounts.slice(0, 2),
                complete: newCounts[0] + newCounts[1] === newCounts[2]
            }
        ).exec();
        return {
            pollId: pollId,
            option: option,
            newCounts: newCounts.slice(0, 2)
        };
    } catch (err) {
        console.log(err);
        return { status: 500, message: "Error occurred while saving vote." };
    }
}

//PRIVATE FUNCTIONS

export async function parallelSumOfCounts(pollId) {
    const promises = [
        Vote.where({
            pollId: pollId,
            option: 0
        }).countDocuments(),
        Vote.where({
            pollId: pollId,
            option: 1
        }).countDocuments(),
        Poll.findById(pollId, "-_id sendToList", { lean: true }).populate({
            path: "sendToList",
            select: "friends -_id"
        })
    ];
    const [count0, count1, sendToList] = await Promise.all(promises);
    const voters = sendToList["sendToList"]["friends"];
    return [count0, count1, voters.length];
}
