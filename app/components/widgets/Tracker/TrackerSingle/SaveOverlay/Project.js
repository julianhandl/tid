import React from "react"
import {connect} from "react-redux"
import Close from "../../../Icons/Close"
import Check from "../../../Icons/Check"
import ClickInput from "../../../ClickInput"
import {Translation, translate} from "../../../../../i18n/Intl"

import {
    cancelSaving,
    setTrackerProject,
    setTrackerClient
} from "../../../../../actions/activeTrackers"
import {
    saveActiveTracker
} from "../../../../../actions/closedTrackers"

@connect(({
    trackers:{activeTrackers},
    projects:{projects},
    clients:{clients},
    settings
},props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    return {
        tracker: tracker,
        projects: projects,
        clients: clients,
        lang: settings.language
    }
},{
    cancelSaving,
    setTrackerProject,
    setTrackerClient,
    saveActiveTracker
})
export default class Project extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.tracker !== nextProps.tracker ||
            this.props.projects !== nextProps.projects ||
            this.props.clients !== nextProps.clients ||
            this.props.lang !== nextProps.lang
    }
    render(){
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
        return (
            <div className="tracker-single-save-project">
                <div className="tracker-single-header">
                    <Close
                        onClick={() => {
                            this.props.cancelSaving(this.props.trackerId)
                        }}
                    />
                    <Check
                        onClick={() => {
                            this.props.saveActiveTracker({
                                ...this.props.tracker,
                                client: clients[this.props.tracker.client],
                                project: projects[this.props.tracker.project]
                            })
                        }}
                    />
                </div>
                <div className="tracker-single-project-selects">
                    <div className="tracker-single-project-select">
                        <label><Translation translation="project" /></label>
                        <ClickInput
                            index={this.props.tracker.project === null ? 1 : this.props.tracker.project}
                            values={projects}
                            onChange={(index)=>{
                                this.props.setTrackerProject(this.props.trackerId,index)
                            }}
                        />
                    </div>
                    <div className="tracker-single-project-select">
                        <label><Translation translation="client" /></label>
                        <ClickInput
                            index={this.props.tracker.client === null ? 1 : this.props.tracker.client}
                            values={clients}
                            onChange={(index)=>{
                                this.props.setTrackerClient(this.props.trackerId,index)
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
