import * as constants from "../constants.js";
function logger(log, type = constants.LOG) {
    console[type](log)
}
export default logger;