import {
    SETTINGS_CHANGE_LANGUAGE
} from "../actions/settings"

const initialState = {
    language: "en",
    windowView: "standard"
}

export default function settings(state = initialState, action){
    switch(action.type) {
    case SETTINGS_CHANGE_LANGUAGE:
        return {
            ...state,
            language: action.payload.langKey
        }
    case "SET_WINDOW_VIEW":
        return {
            ...state,
            windowView: action.view
        }
    default:
        return state
    }
}
