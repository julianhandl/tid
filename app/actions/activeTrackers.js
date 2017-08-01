import saveTracker from "../utils/files/saveTracker"

export const ADD_TRACKER = "ADD_TRACKER"
export const PAUSE_TRACKER = "PAUSE_TRACKER"
export const START_TRACKER = "START_TRACKER"
export const STOP_TRACKER = "STOP_TRACKER"
export const DELETE_TRACKER = "DELETE_TRACKER"
export const START_SAVING = "START_SAVING"
export const CANCEL_SAVING = "CANCEL_SAVING"

export const SET_TRACKER_DESCRIPTION = "SET_TRACKER_DESCRIPTION"
export const SET_TRACKER_PROJECT = "SET_TRACKER_PROJECT"
export const SET_SAVED_TRACKER_PROJECT = "SET_SAVED_TRACKER_PROJECT"
export const SET_TRACKER_CLIENT = "SET_TRACKER_CLIENT"

export function addTracker(){
    return (dispatch, getState) => {
        dispatch({
            type: ADD_TRACKER,
            callback: tracker => {
                let state = getState()
                let currentProject = state.settings.currentProject
                if(currentProject){
                    saveTracker(tracker, "active", state.settings.currentProject)
                }
            }
        })
        
    }
    return 
}

export function pauseTracker(id){
    return (dispatch, getState) => {
        dispatch({
            type: PAUSE_TRACKER,
            tracker: id,
            callback: tracker => {
                let state = getState()
                let currentProject = state.settings.currentProject
                if(currentProject){
                    saveTracker(tracker, "active", state.settings.currentProject)
                }
            }
        })
    }
}

export function startTracker(id) {
    return (dispatch, getState) => {
        dispatch({
            type: START_TRACKER,
            tracker: id,
            callback: tracker => {
                let state = getState()
                let currentProject = state.settings.currentProject
                if(currentProject){
                    saveTracker(tracker, "active", state.settings.currentProject)
                }
            }
        })
    }
}

export function stopTracker(id) {
    return (dispatch, getState) => {
        dispatch({
            type: STOP_TRACKER,
            tracker: id,
            callback: tracker => {
                let state = getState()
                let currentProject = state.settings.currentProject
                if(currentProject){
                    saveTracker(tracker, "active", state.settings.currentProject)
                }
            }
        })
    }
}

export function deleteTracker(id){
    return {
        type: DELETE_TRACKER,
        tracker: id
    }
}

export function startSaving(id, totalMinutes){
    return {
        type: START_SAVING,
        tracker: id,
        payload: {
            totalMinutes
        }
    }
}

export function cancelSaving(id){
    return{
        type: CANCEL_SAVING,
        tracker: id
    }
}

export function setTrackerDescription(id, val){
    return (dispatch, getState) => {
        dispatch({
            type: SET_TRACKER_DESCRIPTION,
            tracker: id,
            payload: {
                value: val
            },
            callback: tracker => {
                let state = getState()
                let currentProject = state.settings.currentProject
                if(currentProject){
                    saveTracker(tracker, "active", state.settings.currentProject)
                }
            }
        })
    }
}

// Unused from here for now

export function setTrackerProject(id, val){
    return {
        type: SET_TRACKER_PROJECT,
        tracker: id,
        payload: {
            value: val
        }
    }
}

export function setSavedTrackerProject(id, value){
    return {
        type: SET_SAVED_TRACKER_PROJECT,
        tracker: id,
        payload: {
            value: value === undefined ? true : value
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
