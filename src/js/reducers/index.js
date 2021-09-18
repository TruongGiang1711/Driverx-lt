import { combineReducers } from "redux";

import counter from "./counter";
import add from "./add";

export const allReducers = combineReducers({
    counter,
    add,
    // add more reducers here
});