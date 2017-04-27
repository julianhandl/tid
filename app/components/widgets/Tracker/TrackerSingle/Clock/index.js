import React from "react"
import {connect} from "react-redux"
import Play from "../../../Icons/Play"
import Pause from "../../../Icons/Pause"
import Stop from "../../../Icons/Stop"
import Time from "./Time"

import {
  startTracker
} from "../../../../../actions/activeTrackers"

@connect((state)=>{
    return {
        tracker: "bla"
    }
},{
    startTracker
})
export default class Clock extends React.Component{
    render(){
        console.log(this.props)
        let statusClass = "tracker-single-status-toggle" + (this.props.running ? " running" : " paused")
        return(
            <div className="tracker-single-clock">
                <div className={statusClass}>
                    <Play onClick={()=>{this.props.startTracker(this.props.tracker.id)}} />
                    { false ? <Pause /> : null }
                </div>
                <Time />
                <div className="tracker-single-stop">
                    <Stop />
                </div>
            </div>
        )
    }
}
