import {
    SETTINGS_CHANGE_LANGUAGE
} from "../actions/settings"

const initialState = {
    language: "en"
}

export default function settings(state = initialState, action){
    switch(action.type) {
    case SETTINGS_CHANGE_LANGUAGE:
        return {
            ...state,
            language: action.payload.langKey
        }
    default:
        return state
    }
}
