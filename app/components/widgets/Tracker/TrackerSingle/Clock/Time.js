import React from "react"
import {connect} from "react-redux"

@connect(({trackers:{activeTrackers},ticker},props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    let lastLog = tracker.logs[tracker.logs.length-1]
    let active = lastLog.start && lastLog.end === null

    let minutes = tracker.logs.reduce((val,log)=>{
        if(log.total){
            return val + (log.total/1000/60)
        }
        else if(log.start && log.end === null){
            return val + ((ticker - log.start)/1000/60)
        }
        else return val
    },0)

    return {
        active: active,
        minutes: Math.floor(minutes)
    }
},{})
export default class Time extends React.Component{
    shouldComponentUpdate(nextProps){
        return (
            this.props.active === true &&
            this.props.minutes !== nextProps.minutes
        )
    }
    leftPad = val => {
        let padded = `00${val}`
        return padded.substr(padded.length - 2,padded.length)
    }
    render(){
        let hours = Math.floor(this.props.minutes/60)
        let minutes = this.props.minutes - (hours*60)
        return(
            <div className="tracker-clock-time">
                <span>{`${this.leftPad(hours)}`}</span>
                <span>:</span>
                <span>{`${this.leftPad(minutes)}`}</span>
            </div>
        )
    }
}
