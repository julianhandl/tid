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
        fs.stat(projectPath+"/tidtracker/"+destination,(err, stat)=>{
            if(!stat){
                fs.mkdir(projectPath+"/tidtracker/"+destination,(err)=>{
                    if(err){
                        return err
                    }
                })
            }
        })

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
                backup = trackerPath+"backup"
            }
            // finally save the tracker
            fs.writeFile(trackerPath,JSON.stringify(trackers),(err)=>{
                if(err){
                    // throw error
                    // restore backup
                    if(backup) fs.renameSync(backup, backup.substr(0, backup.length - 6))
                }
                else{
                    // clear already existing files
                    if(filesToClear.length > 0){
                        filesToClear.forEach(file => fs.unlinkSync(file))
                    }
                    if(backup){
                        // delete backup
                        fs.unlinkSync(backup)
                    }
                }
            })
 
        })
       }
    }
}