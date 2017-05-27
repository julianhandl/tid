import React from "react"
import {connect} from "react-redux"
import Status from "../../Icons/Status"
import Play from "../../Icons/Play"
import Pause from "../../Icons/Pause"
import Stop from "../../Icons/Stop"
import Time from "../TrackerSingle/Clock/Time"
import Description from "../TrackerSingle/Description"
import SaveState from "./SaveState"
import "./TrackerMulti.less"

import {
    startTracker,
    pauseTracker,
    stopTracker
} from "../../../../actions/activeTrackers"

@connect(({trackers:{activeTrackers}}, props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    let lastLog = tracker.logs[tracker.logs.length-1]
    return {
        lastLog: lastLog
    }
},{
    startTracker,
    pauseTracker,
    stopTracker
})
export default class TrackerMulti extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.trackerId !== nextProps.trackerId ||
            this.props.lastLog !== nextProps.lastLog
    }
    render(){
        let running = this.props.lastLog.start && this.props.lastLog.end === null
        if(this.props.lastLog.end === null){
            return (
                <div className="tracker-multi">
                    <div className="tracker-multi-status">
                        <div className="tracker-multi-status-action">
                            {running ?
                                <Pause onClick={()=>{
                                    this.props.pauseTracker(this.props.trackerId)
                                }} /> :
                                <Play onClick={()=>{
                                    this.props.startTracker(this.props.trackerId)
                                }} />
                            }
                        </div>
                        <Status running={running} />
                    </div>
                    <Time trackerId={this.props.trackerId} />
                    <Description trackerId={this.props.trackerId} />
                    <Stop onClick={()=>{
                        this.props.stopTracker(this.props.trackerId)
                    }} />
                </div>
            )
        }
        else{
            return (
                <div className="tracker-multi">
                    <SaveState trackerId={this.props.trackerId} />
                </div>
            )
        }
    }
}
