export const ADD_TRACKER = "ADD_TRACKER"
export const PAUSE_TRACKER = "PAUSE_TRACKER"
export const START_TRACKER = "START_TRACKER"
export const STOP_TRACKER = "STOP_TRACKER"

export const SET_TRACKER_DESCRIPTION = "SET_TRACKER_DESCRIPTION"
export const SET_TRACKER_PROJECT = "SET_TRACKER_PROJECT"
export const SET_TRACKER_CLIENT = "SET_TRACKER_CLIENT"

export function addTracker(){
    return {
        type: ADD_TRACKER
    }
}

export function pauseTracker(id){
    return {
        type: PAUSE_TRACKER,
        tracker: id
    }
}

export function startTracker(id) {
    return {
        type: START_TRACKER,
        tracker: id
    }
}

export function stopTracker(id) {
    return {
        type: STOP_TRACKER,
        tracker: id
    }
}

export function setTrackerDescription(id, val){
    return {
        type: SET_TRACKER_DESCRIPTION,
        tracker: id,
        payload: {
            value: val
        }
    }
}

export function setTrackerProject(id, val){
    return {
        type: SET_TRACKER_PROJECT,
        tracker: id,
        payload: {
            value: val
        }
    }
}

export function setTrackerClient(id, val){
    return {
        type: SET_TRACKER_CLIENT,
        tracker: id,
        payload: {
            value: val
        }
    }
}
