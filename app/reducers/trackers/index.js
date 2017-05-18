import {combineReducers} from "redux"
import activeTrackers from "./activeTrackers"
import closedTrackers from "./closedTrackers"

export default combineReducers({
    activeTrackers,
    closedTrackers
})
