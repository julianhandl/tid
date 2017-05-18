import {
    SAVE_ACTIVE_TRACKER
} from "../../actions/closedTrackers"

const initialState = []

export default function closedTrackers(state = initialState, action) {
    switch(action.type){
    case SAVE_ACTIVE_TRACKER:
        let newTracker = action.payload.tracker
        return [
            ...state,
            newTracker
        ]
    default:
        return state
    }
}
