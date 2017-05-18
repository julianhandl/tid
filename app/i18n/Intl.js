import React from "react"
import {connect} from "react-redux"
import translations from "./translations"

@connect(({settings})=>({
    lang: settings.language
}),{})
export class Translation extends React.Component{
    render(translationKey, language){
        let translationValues = translations[this.props.translation]
        let translation = translationValues ?
            translationValues[this.props.lang] :
            undefined
        if(translation) return <span>{translation}</span>
        else{
            return <span className="no_translation">
                NO TRANSLATION
            </span>
        }
    }
}

export function translate(translation, language){
    return translations[translation][language]
}
