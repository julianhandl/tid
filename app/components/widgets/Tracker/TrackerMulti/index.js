import React from "react"
import {connect} from "react-redux"
import Status from "../../Icons/Status"
import Play from "../../Icons/Play"
import Pause from "../../Icons/Pause"
import Stop from "../../Icons/Stop"
import Time from "../TrackerSingle/Clock/Time"
import Description from "../TrackerSingle/Description"
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
        running: lastLog.start && lastLog.end === null,
    }
},{
    startTracker,
    pauseTracker,
    stopTracker
})
export default class TrackerMulti extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.trackerId !== nextProps.trackerId ||
            this.props.running !== nextProps.running
    }
    render(){
        return (
            <div className="tracker-multi">
                <div className="tracker-multi-status">
                    <div className="tracker-multi-status-action">
                        {this.props.running ?
                            <Pause onClick={()=>{
                                this.props.pauseTracker(this.props.trackerId)
                            }} /> :
                            <Play onClick={()=>{
                                this.props.startTracker(this.props.trackerId)
                            }} />
                        }
                    </div>
                    <Status running={this.props.running} />
                </div>
                <Time trackerId={this.props.trackerId} />
                <Description trackerId={this.props.trackerId} />
                <Stop onClick={()=>{
                    this.props.stopTracker(this.props.trackerId)
                }} />
            </div>
        )
    }
}
