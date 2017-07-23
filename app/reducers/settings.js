import {ipcRenderer} from "electron"

import {
    SETTINGS_CHANGE_LANGUAGE
} from "../actions/settings"

const initialState = {
    language: "en",
    windowView: "standard",
    trackerType: "project",
    currentProject: undefined
}

export default function settings(state = initialState, action){
    switch(action.type) {
    case 'INIT_SETTINGS':
        return {
            ...state,
            language: action.payload.settings.language,
            windowView: action.payload.settings.windowView,
            trackerType: action.payload.settings.trackerType
        }
    case SETTINGS_CHANGE_LANGUAGE:
        ipcRenderer.send("save_settings_prop", {
            prop: "language",
            value: action.payload.langKey
        })
        return {
            ...state,
            language: action.payload.langKey
        }
    case "SET_WINDOW_VIEW":
        ipcRenderer.send("save_settings_prop", {
            prop: "windowView",
            value: action.view
        })
        return {
            ...state,
            windowView: action.view
        }
    case "SET_CURRENT_PROJECT":
        return {
            ...state,
            currentProject: action.path
        }
    default:
        return state
    }
}
