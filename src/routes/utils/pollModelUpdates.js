//pollModelUpdates
/**
 * @author - Fil
 * @date - September 8, 2019
 * @purpose - Functions used to update the Poll model
 */

import Poll from "../../models/Poll";
import User from "../../models/User";

export async function createNewPoll(data) {
    try {
        //Create the new poll record
        const newPoll = await new Poll({
            title: data.title,
            userId: data.userId,
            sendToList: data.sendToList,
            options: data.options,
            complete: false
        });
        await newPoll.save();

        //Add the new poll to the user record
        await User.findOneAndUpdate(
            { _id: data.userId },
            { $push: { polls: newPoll._id } }
        );
        return { status: 200, newPoll };
    } catch (err) {
        console.log(err);
        return { status: 500, errors: "Unable to save poll images." };
    } finally {
        // console.log(data);
    }
}
