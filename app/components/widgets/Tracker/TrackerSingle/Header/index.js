import React from "react"
import {connect} from "react-redux"
import Status from "../../../Icons/Status"
import Add from "../../../Icons/Add"
import "./Header.less"

import {addTracker} from "../../../../../actions/activeTrackers"

@connect(({trackers:{activeTrackers}},props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    let lastLog = tracker.logs[tracker.logs.length-1]
    return {
        running: lastLog.start && lastLog.end === null,
    }
},{
    addTracker
})
export default class Header extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.running !== nextProps.running
    }
    render(){
        return(
            <div className="tracker-single-header">
                <Status running={this.props.running} />
                <Add onClick={this.props.addTracker} />
            </div>
        )
    }
}
