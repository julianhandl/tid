import React from "react"
import {connect} from "react-redux"
import Header from "./Header"
import Clock from "./Clock"
import Description from "./Description"
import "./TrackerSingle.less"

import {addTracker} from "../../../../actions/activeTrackers"

@connect(({activeTrackers:{trackers}})=>{
    return {
        trackerId: trackers[0].id
    }
},{})
export default class TrackerSingle extends React.Component{
    render(){
        return (
            <div className="tracker-single">
                <Header trackerId={this.props.trackerId} />
                <Clock trackerId={this.props.trackerId} />
                <Description trackerId={this.props.trackerId} />
            </div>
        )
    }
}
