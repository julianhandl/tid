export const SETTINGS_CHANGE_LANGUAGE = "SETTINGS_CHANGE_LANGUAGE"

export function changeLanguage(langKey){
    return {
        type: SETTINGS_CHANGE_LANGUAGE,
        payload: {
            langKey
        }
    }
}
