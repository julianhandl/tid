import React from "react"
import {connect} from "react-redux"
import Time from "./Time"
import Project from "./Project"
import "./SaveOverlay.less"

@connect(({activeTrackers:{trackers}},props)=>{
    let tracker = trackers.find(t => t.id === props.trackerId)
    return {
        saving: !!tracker.totalMinutes,
        minutes: tracker.logs.reduce((min, log)=>{
            return min + (log.total / 1000 / 60)
        },0)
    }
},{
})
export default class SaveOverlay extends React.Component{
    render(){
        return (
            <div>
                {
                    this.props.saving ?
                    <Project
                        trackerId={this.props.trackerId}
                    /> :
                    <Time
                        trackerId={this.props.trackerId}
                        minutes={this.props.minutes}
                    />
                }
            </div>
        )
    }
}
