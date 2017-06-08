import React from "react"
import {connect} from "react-redux"
import Time from "../../TrackerSingle/SaveOverlay/Time"
import Project from "./Project"
import Client from "./Client"
import {translate} from "../../../../../i18n/Intl"
import "./SaveState.less"

@connect(({
    trackers:{activeTrackers},
    projects:{projects},
    clients:{clients},
    settings
}, props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    return {
        saving: !!tracker.totalMinutes,
        projectSaved: tracker.projectSaved,
        minutes: tracker.logs.reduce((min, log)=>{
            return min + (log.total / 1000 / 60)
        },0),
        projects: projects,
        clients: clients,
        lang: settings.language,
        trackerType: settings.trackerType,
    }
},{
})
export default class SaveState extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.saving !== nextProps.saving ||
            this.props.projectSaved !== nextProps.projectSaved ||
            this.props.minutes !== nextProps.minutes
    }
    render(){
        if(this.props.saving && this.props.trackerType !== "project"){
            // Save Project and Client
            let projects = [
                translate("new_project",this.props.lang),
                translate("no_project",this.props.lang),
                ...this.props.projects.map(p => p.name)
            ]
            let clients = [
                translate("new_client",this.props.lang),
                translate("no_client",this.props.lang),
                ...this.props.clients.map(p => p.name)
            ]
            if(this.props.projectSaved){
                return (
                    <Client
                        trackerId={this.props.trackerId}
                        projects={projects}
                        clients={clients}
                    />
                )
            }
            else{
                return (
                    <Project
                        trackerId={this.props.trackerId}
                        projects={projects}
                    />
                )
            }
        }
        else{
            // Adjust Time
            return (
                <Time
                    trackerId={this.props.trackerId}
                    minutes={this.props.minutes}
                    projectTracker={this.props.trackerType === "project"}
                />
            )
        }
    }
}
