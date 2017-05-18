import React from "react"
import {connect} from "react-redux"
import Play from "../../../Icons/Play"
import Pause from "../../../Icons/Pause"
import Stop from "../../../Icons/Stop"
import Time from "./Time"
import "./Clock.less"

import {
  startTracker,
  pauseTracker,
  stopTracker
} from "../../../../../actions/activeTrackers"

@connect(({trackers:{activeTrackers}})=>{
    let tracker = activeTrackers[0]
    let lastLog = tracker.logs[tracker.logs.length - 1]
    return {
        trackerId: tracker.id,
        running: lastLog.start && lastLog.end == null
    }
},{
    startTracker,
    pauseTracker,
    stopTracker
})
export default class Clock extends React.Component{
    shouldComponentUpdate(nextProps){
        return (
            this.props.running !== nextProps.running
        )
    }
    render(){
        let statusClass = "tracker-single-status-toggle" + (this.props.running ? " running" : " paused")
        return(
            <div className="tracker-single-clock">
                <div className={statusClass}>
                    <Play onClick={()=>{this.props.startTracker(this.props.trackerId)}} />
                    <Pause onClick={()=>{this.props.pauseTracker(this.props.trackerId)}} />
                </div>
                <Time trackerId={this.props.trackerId} />
                <div className="tracker-single-stop">
                    <Stop onClick={()=>{this.props.stopTracker(this.props.trackerId)}} />
                </div>
            </div>
        )
    }
}
