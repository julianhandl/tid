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

            // store already running trackers in the folder
            let activeWebcontents = webContents.getFocusedWebContents()
            if(activeWebcontents){
                activeWebcontents.send("redux", {
                    type: "SET_CURRENT_PROJECT",
                    path
                })
                // load trackers in that project
            }
            let trackers = {}

            store.set([{
                prop: "lastOpenProject",
                value: path
            },{
                prop: "recentProjects",
                value: recentProjects
            }])
        }
        else{
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
                activeWebcontents.send("redux", {
                    type: "SET_CURRENT_PROJECT",
                    path
                })
            }

            store.set([{
                prop: "lastOpenProject",
                value: path
            },{
                prop: "recentProjects",
                value: recentProjects
            }])
        }
    })
}
