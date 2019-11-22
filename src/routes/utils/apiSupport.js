//apiSupport.js
/*
 * @desc Executes data requests query through the api
 * @param req - express route data object
 * @param res - callback function with results from route
 * @param route - string value of the route
 * @param getData - function to execute to get data
 * @param opts - array of data required to execute query - options should be in
 * @param the order required by the data getter - opts[0] needs to be the key Id
 * @param used to make decisions about getting data
 */
export function executeApiRequest(req, res, route, getData, opts) {
    if (opts[0] === undefined) {
        res.status(400).json({ error: "No user id provided" });
    } else {
        try {
            getData(...opts).then(result => {
                res.status(200).json(result);
            });
        } catch (err) {
            console.log(route, err);
            res.status(500).json({
                error: `${route} failure`
            });
        }
    }
}
