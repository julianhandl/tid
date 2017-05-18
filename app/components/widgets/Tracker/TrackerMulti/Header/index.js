import React from "react"
import {connect} from "react-redux"
import {Translation} from "../../../../../i18n/Intl"
import Add from "../../../Icons/Add"
import "./HeaderMulti.less"

import {addTracker} from "../../../../../actions/activeTrackers"

@connect(({trackers:{activeTrackers}})=>{
    return {
        runningTrackers: activeTrackers.filter(t => {
            let lastLog = t.logs[t.logs.length - 1]
            return lastLog.start && !lastLog.end
        }).length,
        totalTrackers: activeTrackers.length
    }
},{
    addTracker
})
export default class MultiHeader extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.runningTrackers !== nextProps.runningTrackers ||
            this.props.totalTrackers !== nextProps.totalTrackers
    }
    render(){
        return (
            <div className="tracker-multi-header">
                <span>
                    {this.props.runningTrackers}/{this.props.totalTrackers}
                    &nbsp;<Translation translation="multiple_running" />
                </span>
                <Add onClick={this.props.addTracker} />
            </div>
        )
    }
}
