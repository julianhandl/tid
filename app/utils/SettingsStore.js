import {app} from 'electron'
const fs = require('fs')

const initalSettings = {
    language: app.getLocale().split("-")[0],
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
                        this.settings = JSON.parse(data)
                        loadCallback({
                            ...initalSettings,
                            ...this.settings
                        }, this)
                    })
                } catch(error) {
                    this.settings = initalSettings
                    loadCallback({
                        ...initalSettings,
                        ...this.settings
                    }, this)
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
