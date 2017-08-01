import {app} from 'electron'
const fs = require('fs')

let initLanguage = 'en'
let locale = app.getLocale()
if(locale){
    if(locale.indexOf('-') >= 0){
        intialLanguage = locale.split('-')[0]
    }
    else{
        intialLanguage = locale
    }
}
const initalSettings = {
    language: initLanguage,
    windowView: "standard",
    trackerType: "project",
    lastOpenProject: undefined,
    recentProjects: []
}

export default class SettingsStore{
    constructor(loadCallback){
        this.settings = undefined
        const userDataPath = app.getPath('userData')
        this.path = userDataPath + '/tid_settings.json'

        this.changeListeners = []

        fs.stat(this.path, (err, stat)=>{
            if(stat){
                try {
                    fs.readFile(this.path, (err, data)=>{
                        this.settings = initalSettings
                        let settingsJSON = {}
                        try{
                            settingsJSON = JSON.parse(data)
                        }
                        catch(err){
                            console.log(err)
                        }
                        loadCallback({
                            ...initalSettings,
                            ...settingsJSON
                        }, this)
                    })
                } catch(error) {
                    this.settings = initalSettings
                    loadCallback(this.settings, this)
                }
            }
            else{
                this.settings = initalSettings
                loadCallback({
                    ...initalSettings,
                    ...this.settings
                }, this)
            }
        })
    }
    get(){
        return this.settings
    }
    set(action){
        if(typeof action === 'object'){
            if(Array.isArray(action) === true){
                action.forEach(a => {
                    this.settings[a.prop] = a.value
                })
            }
            else{
                this.settings[action.prop] = action.value
            }
            fs.writeFile(this.path, JSON.stringify(this.settings),(err)=>{
                if(err){
                    throw new Error(err)
                }
            })
        }
        
        this.changeListeners.forEach(listener => {
            listener(this.settings)
        })
    }
    onChange(cb){
        this.changeListeners.push(cb)
    }
}
