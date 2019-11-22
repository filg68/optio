const isEmpty = require("is-empty");

/* data: 
    userId: id,
    title: 'String',
    friends: [id1, id2, id3]
*/

export function validateFriendListInput(data) {
    let errors = {};

    // Title check
    if (isEmpty(data.title)) {
        errors.title = "List title is required";
    }

    // Friends array check
    if (isEmpty(data.friends)) {
        errors.friends = "List should have at least one friend";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}
