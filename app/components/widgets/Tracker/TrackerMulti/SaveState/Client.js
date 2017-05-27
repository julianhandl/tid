import React from "react"
import {connect} from "react-redux"
import {Translation} from "../../../../../i18n/Intl"
import ClickInput from "../../../ClickInput"
import Arrow from "../../../Icons/Arrow"
import Check from "../../../Icons/Check"
import {
    setSavedTrackerProject,
    setTrackerClient,
} from "../../../../../actions/activeTrackers"
import {
    saveActiveTracker
} from "../../../../../actions/closedTrackers"

@connect(({
    trackers:{activeTrackers},
    settings
},props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    return {
        tracker: tracker,
        lang: settings.language
    }
},{
    setSavedTrackerProject,
    setTrackerClient,
    saveActiveTracker
})
export default class Client extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.tracker !== nextProps.tracker ||
            this.props.clients !== nextProps.clients
    }
    render(){
        return (
            <div className="tracker-multi-client-select">
                <Arrow
                    direction="left"
                    onClick={()=>{
                        this.props.setSavedTrackerProject(this.props.trackerId, null)
                    }}
                />
                <label><Translation translation="client" /></label>
                <ClickInput
                    index={this.props.tracker.client === null ? 1 : this.props.tracker.client}
                    values={this.props.clients}
                    onChange={(index)=>{
                        this.props.setTrackerClient(this.props.trackerId,index)
                    }}
                />
                <Check
                    onClick={()=>{
                        this.props.saveActiveTracker({
                            ...this.props.tracker,
                            client: this.props.clients[
                                this.props.tracker.client
                            ],
                            project: this.props.projects[
                                this.props.tracker.project
                            ]
                        })
                    }}
                />
            </div>
        )
    }
}
