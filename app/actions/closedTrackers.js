import saveTracker from "../utils/files/saveTracker"

export const SAVE_ACTIVE_TRACKER = "SAVE_ACTIVE_TRACKER"

export function saveActiveTracker(tracker) {
    return (dispatch, getState) => {
        dispatch({
            type: SAVE_ACTIVE_TRACKER,
            payload: {
                tracker
            },
            callback: tracker => {
                let state = getState()
                let currentProject = state.settings.currentProject
                if(currentProject){
                    saveTracker(tracker, "closed", state.settings.currentProject, true)
                }
            }
        })
    }
}
