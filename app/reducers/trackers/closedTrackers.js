import {
    SAVE_ACTIVE_TRACKER
} from "../../actions/closedTrackers"

const initialState = []

export default function closedTrackers(state = initialState, action) {
    switch(action.type){
    case SAVE_ACTIVE_TRACKER:
        let closedTracker = action.payload.tracker
        action.callback(closedTracker)
        return [
            ...state,
            closedTracker
        ]
    case "SET_CLOSED_TRACKERS_FROM_PROJECT":
        return [
            ...state,
            action.closedTrackers
        ]
    default:
        return state
    }
}
