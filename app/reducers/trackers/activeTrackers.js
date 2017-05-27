import {
    ADD_TRACKER,
    START_TRACKER,
    PAUSE_TRACKER,
    STOP_TRACKER,
    DELETE_TRACKER,
    START_SAVING,
    CANCEL_SAVING,
    SET_TRACKER_DESCRIPTION,
    SET_TRACKER_PROJECT,
    SET_SAVED_TRACKER_PROJECT,
    SET_TRACKER_CLIENT
} from "../../actions/activeTrackers"
import {
    SAVE_ACTIVE_TRACKER
} from "../../actions/closedTrackers"

function newLog() {
    return {
        start: null,
        end: null,
        total: null
    }
}

function newTracker() {
    return {
        id: Date.now(), // user + datestring
        logs: [newLog()], // if no open logs and totalMinutes => set project
        description: null,
        totalMinutes: null, // set on stop
        firstLog: null, // set on stop
        lastLog: null, // set on stop
        project: null, // set on stop
        projectSaved: null, // set for stepping MultiTracker SaveState
        client: null, // set on stop
    }
}

const initialState = [newTracker()] // TODO: Set loaded data or empty tracker

export default function activeTrackers(state = initialState, action) {
    switch (action.type) {
    case ADD_TRACKER:
        return [...state, newTracker()]
    case START_TRACKER:
        return state.map(t => {
            if (t.id === action.tracker) {
                return {
                    ...t,
                    logs: t.logs.map((l, index, all) => {
                        if (index + 1 === all.length) {
                            return {
                                ...l,
                                start: Date.now()
                            }
                        } else return l
                    })
                }
            } else return t
        })
    case PAUSE_TRACKER:
        return state.map(t => {
            if (t.id === action.tracker) {
                return {
                    ...t,
                    logs: [
                        ...t.logs.map((l, index, all) => {
                            if (index + 1 === all.length) {
                                let now = Date.now()
                                return {
                                    ...l,
                                    end: now,
                                    total: now - l.start
                                }
                            } else return l
                        }),
                        newLog()
                    ]
                }
            } else return t
        })
    case STOP_TRACKER:
            // move this action outside. We need to move all stoped trackers
            // to another place in the store
        return state.map(t => {
            if (t.id === action.tracker) {
                let logs = t.logs
                        .map(l => {
                            if (l.start && l.end) return l
                            if (l.start && l.end == null) {
                                let now = Date.now()
                                return {
                                    start: l.start,
                                    end: now,
                                    total: now - l.start
                                }
                            }
                            return undefined
                        })
                        .filter(l => l && l.total)
                let firstLog = logs.length > 0 ? logs[0].start : null
                let lastLog = firstLog ? logs[logs.length - 1].end : null
                return {
                    ...t,
                    logs: logs,
                    firstLog: firstLog,
                    lastLog: lastLog,
                    project: null, // set on stop
                    client: null // set on stop
                }
            }
            return t
        })
    case DELETE_TRACKER:
        return  state.filter(t => t.id !== action.tracker)
    case START_SAVING:
        return  state.map(t => {
            if (t.id === action.tracker) {
                return {
                    ...t,
                    totalMinutes: action.payload.totalMinutes
                }
            } else return t
        })
    case CANCEL_SAVING:
        return  state.map(t => {
            if (action.tracker === t.id) {
                return {
                    ...t,
                    logs: [...t.logs, newLog()],
                    totalMinutes: null,
                    projectSaved: null,
                }
            } else return t
        })
    case SET_TRACKER_DESCRIPTION:
        return  state.map(t => {
            if (action.tracker === t.id) {
                return {
                    ...t,
                    description: action.payload.value
                }
            } else return t
        })
    case SET_TRACKER_PROJECT:
        return state.map(t => {
            if (action.tracker === t.id) {
                return {
                    ...t,
                    project: action.payload.value
                }
            } else return t
        })
    case SET_SAVED_TRACKER_PROJECT:
        return state.map(t => {
            if (action.tracker === t.id) {
                return {
                    ...t,
                    projectSaved: action.payload.value
                }
            } else return t
        })
    case SET_TRACKER_CLIENT:
        return state.map(t => {
            if (action.tracker === t.id) {
                return {
                    ...t,
                    client: action.payload.value
                }
            } else return t
        })
    case SAVE_ACTIVE_TRACKER:
        let newTrackers = state.filter(t => t.id !== action.payload.tracker.id)
        return newTrackers.length === 0 ? [newTracker()] : newTrackers
    default:
        return state
    }
}
