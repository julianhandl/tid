import React from "react"
import Play from "../../../Icons/Play"
import Pause from "../../../Icons/Pause"
import Stop from "../../../Icons/Stop"
import Time from "./Time"

export default class Clock extends React.Component{
    render(){
        let statusClass = "tracker-single-status-toggle" + (this.props.running ? " running" : " paused")
        return(
            <div className="tracker-single-clock">
                <div className={statusClass}>
                    <Play />
                    <Pause />
                </div>
                <Time />
                <div className="tracker-single-stop">
                    <Stop />
                </div>
            </div>
        )
    }
}
