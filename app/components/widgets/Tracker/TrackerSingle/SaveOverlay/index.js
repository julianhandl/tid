import React from "react"
import {connect} from "react-redux"
import Time from "./Time"
import Project from "./Project"
import "./SaveOverlay.less"

@connect(({trackers:{activeTrackers}},props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    return {
        saving: !!tracker.totalMinutes,
        minutes: tracker.logs.reduce((min, log)=>{
            return min + (log.total / 1000 / 60)
        },0)
    }
},{
})
export default class SaveOverlay extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.saving !== nextProps.saving ||
            this.props.trackerId !== nextProps.trackerId ||
            this.props.minutes !== nextProps.minutes
    }
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
