import React from "react"
import {connect} from "react-redux"

@connect(({activeTrackers:{trackers},ticker},props)=>{
    let tracker = trackers.find(t => t.id === props.trackerId)
    let lastLog = tracker.logs[tracker.logs.length-1]
    let active = lastLog.start && lastLog.end === null ? true : false

    let minutes = 0
    if(active){
        minutes = tracker.logs.reduce((val,log)=>{
            if(log.start && log.end){
                return val + ((log.end - log.start)/1000/60)
            }
            else if(log.start && log.end === null){
                return val + ((ticker - log.start)/1000/60)
            }
            else return val
        },0)
    }
    return {
        active: active,
        minutes: minutes
    }
},{})
export default class Time extends React.Component{
    shouldComponentUpdate(nextProps){
        return (
            this.props.active === true &&
            this.props.minutes !== nextProps.minutes
        )
    }
    render(){
        let minutes = this.props.minutes
        return(
            <div className="tracker-single-clock-time">
                {minutes > 59 ?
                    `${Math.floor(minutes/60)}:${Math.floor(minutes-(Math.floor(minutes/60)*60))}` :
                    `0:${Math.floor(minutes)}`
                }
            </div>
        )
    }
}
