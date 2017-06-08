import {webContents} from "electron"
const fs  = require("fs")

export default function openProject(path, settings, store){
    fs.stat(path+"/tidtracker",(err, stat)=>{
        if(stat){
            // open files, read and send to app
            let recentProjects = settings.recentProjects || []
            if(
                recentProjects.length === 0 ||
                (
                    recentProjects.length > 0 &&
                    recentProjects[0] !== path
                )
            ){
                recentProjects.unshift(path)
                if(recentProjects.length > 5){
                    recentProjects = recentProjects.slice(0,4)
                }
            }
            store.set([{
                prop: "lastOpenProject",
                value: path + "/tidtracker"
            },{
                prop: "recentProjects",
                value: recentProjects
            }])
        }
        else{
            fs.mkdir(path+"/tidtracker",(err)=>{
                let recentProjects = settings.recentProjects || []
                if(
                    recentProjects.length === 0 ||
                    (
                        recentProjects.length > 0 &&
                        recentProjects[0] !== path
                    )
                ){
                    recentProjects.unshift(path)
                    if(recentProjects.length > 5){
                        recentProjects = recentProjects.slice(0,5)
                    }
                }

                // store already running trackers in the folder
                let activeWebcontents = webContents.getFocusedWebContents()
                if(activeWebcontents){
                    activeWebcontents.send()
                }
                let trackers = {}


                store.set([{
                    prop: "lastOpenProject",
                    value: path + "/tidtracker"
                },{
                    prop: "recentProjects",
                    value: recentProjects
                }])
            })
        }
    })
}
