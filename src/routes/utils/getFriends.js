// get friends of the specific user

const User = require("../../models/User");

export async function getFriends(userId) {
    try {
        const user = await User.findById(userId).populate({
            path: "friends",
            select: "name _id avatar online"
        });

        return { userId: user._id, friends: user.friends };
    } catch (err) {
        console.log("Error fetching friends from the database: ", err);
        return "Error fetching friends";
    }
}
