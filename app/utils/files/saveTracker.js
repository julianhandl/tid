const fs  = require("fs")

export default function saveTracker(trackers, status, projectPath, clearExisting){
    if(Array.isArray(trackers)){
        trackers.forEach(t => {
            saveTracker(t, status, projectPath, clearExisting)
        })
    }
    else{
        // save one tracker
        let destination = status === 'active' ? 'active' : 'closed'
        
        // create destination folder if missing
        let tidFolder = false
        try{
            fs.statSync(projectPath+"/tidtracker")
            tidFolder = true
        }
        catch(err){
            fs.mkdirSync(projectPath+"/tidtracker")
            fs.mkdirSync(projectPath+"/tidtracker/"+destination)
        }
        if(tidFolder){
            let destFolder
            try{
                destFolder = fs.statSync(projectPath+"/tidtracker/"+destination)
            }
            catch(err){
                fs.mkdirSync(projectPath+"/tidtracker/"+destination)
            }
        }

        let filesToClear = []
        if(clearExisting){
            let clearDestination = destination === 'active' ? 'closed' : 'active'
            // add existing tracker to clear files
            // needed if tracker is moved from active to closed
            filesToClear.push(projectPath+'/tidtracker/'+clearDestination+'/'+trackers.id+'.tid')
        }

        let trackerPath = projectPath+"/tidtracker/"+destination+"/"+trackers.id+".tid"
        let backupFile
        fs.stat(trackerPath,(err, stat) => {
            if(stat){
                // create backup file if tracker already exists
                fs.renameSync(trackerPath, trackerPath+"backup")
                backupFile = trackerPath+"backup"
            }
            // finally save the tracker
            fs.writeFile(trackerPath,JSON.stringify(trackers),(err)=>{
                if(err){
                    // throw error
                    // restore backup
                    console.error(err)
                    if(backupFile) fs.renameSync(backupFile, backupFile.substr(0, backupFile.length - 6))
                }
                else{
                    // clear already existing files
                    if(filesToClear.length > 0){
                        filesToClear.forEach(file => fs.unlinkSync(file))
                    }
                    if(backupFile){
                        // delete backup
                        fs.unlinkSync(backupFile)
                    }
                }
            })
        })
    }
}