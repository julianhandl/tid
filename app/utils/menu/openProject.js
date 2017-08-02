import {webContents} from "electron"
const fs  = require("fs")

export default function openProject(path, settings, store){
    fs.stat(path+"/tidtracker",(err, stat)=>{
        if(stat){
            let activeWebcontents = webContents.getFocusedWebContents()
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
            
            let activeFolder
            let closedFolder

            try{
                activeFolder = fs.statSync(path+"/tidtracker/active")
            } catch(err){}
            try{
                closedFolder = fs.statSync(path+"/tidtracker/closed")
            } catch(err){}

            let activeTrackers = []
            // get active trackers from project
            if(activeFolder){
                fs.readdirSync(path+"/tidtracker/active").forEach(file => {
                    let trackerJSON
                    try{
                        let trackerfile = fs.readFileSync(path+"/tidtracker/active/"+file)
                        if(trackerfile){
                            try{
                                trackerJSON = JSON.parse(trackerfile)
                            } catch(err){
                                console.log(err, trackerfile)
                            }
                        }
                    } catch(err){
                        console.log(err, file)
                    }
                    if(trackerJSON) activeTrackers.push(trackerJSON)
                })
            }
            // get also closed tracker asyc (if big data)
            if(closedFolder){
                fs.readdir(path+"/tidtracker/closed",(err, files) => {
                    if(err){ console.log(err) }
                    else{
                        let closedTrackers = []
                        files.forEach(file => {
                            let trackerJSON
                            try{
                                let trackerfile = fs.readFileSync(path+"/tidtracker/closed/"+file)
                                if(trackerfile){
                                    try{
                                        trackerJSON = JSON.parse(trackerfile)
                                    } catch(err){
                                        console.log(err, trackerfile)
                                    }
                                }
                            } catch(err){
                                console.log(err, file)
                            }
                            if(trackerJSON) closedTrackers.push(trackerJSON)
                        })
                        activeWebcontents.send("redux", {
                            type: "SET_CLOSED_TRACKERS_FROM_PROJECT",
                            closedTrackers: closedTrackers
                        })
                    }
                })
            }

            if(activeWebcontents){
                activeWebcontents.send("redux", {
                    type: "SET_CURRENT_PROJECT",
                    activeTrackers: activeTrackers.length > 0 ? activeTrackers : undefined,
                    path
                })
                // saving of already running trackers happens in index.js
            }

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
