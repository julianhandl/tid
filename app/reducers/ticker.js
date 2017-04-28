import {TICKER_TICK} from "../actions/ticker"

const initialState = Date.now()

export default function ticker(state = initialState, action) {
    switch(action.type){
    case TICKER_TICK:
        return Date.now()
    default: return state
    }
}
