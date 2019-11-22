// axiosInterceptors.js
// Defines interceptors to execute actions centrally for certain axios results

import axios from "axios";

const ERROR_CODES_TO_LOGOUT = [401];

export default function setupResultInterceptor(logout) {
    axios.interceptors.response.use(
        response => {
            return response;
        },
        error => {
            if (ERROR_CODES_TO_LOGOUT.includes(error.response.status)) {
                console.error(
                    "\x1b[41mLogging user out due to authorization failure.\x1b[0m"
                );
                localStorage.clear();
                logout();
            }
            return Promise.reject(error);
        }
    );
}
