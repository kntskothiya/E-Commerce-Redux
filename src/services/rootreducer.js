import { combineReducers } from "redux";
import { moduleReducers } from "./module/reducer";

export default combineReducers({
    info : moduleReducers
})