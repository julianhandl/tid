export const SAVE_ACTIVE_TRACKER = "SAVE_ACTIVE_TRACKER"

export function saveActiveTracker(tracker) {
    return {
        type: SAVE_ACTIVE_TRACKER,
        payload: {
            tracker
        }
    }
}
