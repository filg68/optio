//editUserData.js

import axios from "axios";

export async function updateAvatar(formData, cb) {
    await axios
        .post("/api/images/upload", formData)
        .then(response => {
            cb(response);
        })
        .catch(err => {
            console.log(err);
            cb(err);
        });
}

export async function updateUserData(newData, cb) {
    await axios
        .patch("/api/users", newData)
        .then(response => {
            cb(response);
        })
        .catch(err => {
            console.log(err);
            cb(err);
        });
}
