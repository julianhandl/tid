import React from "react"
import {connect} from "react-redux"
import Time from "./Time"
import Project from "./Project"
import Close from "../../../Icons/Close"
import {cancelSaving} from "../../../../../actions/activeTrackers"
import "./SaveOverlay.less"

@connect(({trackers:{activeTrackers},settings},props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    return {
        saving: !!tracker.totalMinutes,
        minutes: tracker.logs.reduce((min, log)=>{
            return min + (log.total / 1000 / 60)
        },0),
        trackerType: settings.trackerType,
    }
},{
    cancelSaving
})
export default class SaveOverlay extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.saving !== nextProps.saving ||
            this.props.trackerId !== nextProps.trackerId ||
            this.props.minutes !== nextProps.minutes
    }
    renderTimeSaveHeader = () => {
        return (
            <div className="tracker-single-header">
                <Close
                    onClick={() => {
                        this.props.cancelSaving(this.props.trackerId)
                    }}
                />
                <span />
            </div>
        )
    }
    render(){
        return (
            <div>
                {
                    this.props.saving && this.props.trackerType !== "project" ?
                    <Project
                        trackerId={this.props.trackerId}
                    /> :
                    <Time
                        trackerId={this.props.trackerId}
                        minutes={this.props.minutes}
                        headerComponent={this.renderTimeSaveHeader()}
                        projectTracker={this.props.trackerType === "project"}
                    />
                }
            </div>
        )
    }
}
