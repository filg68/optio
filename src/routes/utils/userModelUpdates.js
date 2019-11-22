//userModelUpdates
/**
 * @author - Fil
 * @date - September 8, 2019
 * @purpose - Functions used to update the User model
 */

import User from "../../models/User";

export async function updateUserAvatar(data, res) {
    try {
        //Update the avatar image for the user
        await User.findOneAndUpdate(
            { _id: data.userId },
            { avatar: data.options[0] }
        );
        return { status: 200, avatarUrl: data.options[0] };
    } catch (err) {
        console.log(err);
        return { status: 500, message: "Unable to save avatar image." };
    }
}

export async function setUserOnline(userId) {
    try {
        await User.findOneAndUpdate({ _id: userId }, { online: true });
        return { status: 200, userId };
    } catch (err) {
        console.log(err);
        return { status: 500, message: "Unable to change user status." };
    }
}

export async function setUserOffline(userId) {
    try {
        await User.findOneAndUpdate({ _id: userId }, { online: false });
        return { status: 200, userId };
    } catch (err) {
        console.log(err);
        return { status: 500, message: "Unable to change user status." };
    }
}
