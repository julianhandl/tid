import {
    ADD_TRACKER,
    START_TRACKER,
    PAUSE_TRACKER,
    STOP_TRACKER
} from "../actions/activeTrackers.js"

function newLog() {
    return {
        start: null,
        end: null
    }
}

function newTracker() {
    return {
        id: Date.now(), // user + datestring
        closed: false,
        logs: [newLog()],
        description: null,
        totalMinutes: null, // set on stop
        firstLog: null, // set on stop
        lastLog: null, // set on stop
        project: null, // set on stop
        client: null // set on stop
    }
}

const initialState = {
    trackers: [] // TODO: Set loaded data or empty tracker
}

export default function activeTrackers(state = initialState, action) {
    switch (action.type) {
    case ADD_TRACKER:
        return {
            ...state,
            trackers: [
                ...state.trackers,
                newTracker()
            ]
        }
    case START_TRACKER:
        return {
            ...state,
            trackers: state.trackers.map(t => {
                if(t.id === action.tracker){
                    return {
                        ...t,
                        logs: t.logs.map((l, index, length) => {
                            if(index+1 === length){
                                return {
                                    ...l,
                                    start: Date.now()
                                }
                            }
                            else return l
                        })
                    }
                }
                else return t
            })
        }
    case PAUSE_TRACKER:
        return {
            ...state,
            trackers: state.trackers.map(t => {
                if(t.id === action.tracker){
                    return {
                        ...t,
                        logs: [
                            ...t.logs.map((l, index, length) => {
                                if(index+1 === length){
                                    return {
                                        ...l,
                                        stop: Date.now()
                                    }
                                }
                                else return l
                            }),
                            newTracker()
                        ]
                    }
                }
                else return t
            })
        }
    case STOP_TRACKER:
        // move this action outside. We need to move all stoped trackers
        // to another place in the store
        return {
            ...state,
            trackers: state.trackers.map(t => {
                if(t.id === action.tracker){
                    let logs = t.logs.filter(l => l.start && l.end)
                    let totalMinutes = logs.reduce((comb, log) => {
                        return comb + ((log.end - log.start) / 1000 / 60)
                    }, 0)
                    let firstLog = logs.length > 0 ? logs[0].start : null
                    let lastLog = firstLog ? logs[logs.length-1].end : null
                    return{
                        ...t,
                        closed: true,
                        logs: logs,
                        totalMinutes: totalMinutes,
                        firstLog: firstLog,
                        lastLog: lastLog,
                        project: null, // set on stop
                        client: null // set on stop
                    }
                }
                return t
            })
        }
    default:
        return state
    }
}
