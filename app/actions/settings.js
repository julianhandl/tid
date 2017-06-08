import {ipcRenderer} from "electron"

export const SETTINGS_SAVE = "SETTINGS_SAVE"
export const SETTINGS_CHANGE_LANGUAGE = "SETTINGS_CHANGE_LANGUAGE"

export function saveSettings(settings){
    return (dispatch,getState) => {
        ipcRenderer.send("save_settings",getState().settings)
        dispatch({
            type: SETTINGS_SAVE
        })
    }
}
export function changeLanguage(langKey){
    return {
        type: SETTINGS_CHANGE_LANGUAGE,
        payload: {
            langKey
        }
    }
}
