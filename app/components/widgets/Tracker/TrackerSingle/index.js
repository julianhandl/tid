import React from "react"
import {connect} from "react-redux"
import Header from "./Header"
import Clock from "./Clock"
import Description from "./Description"
import SaveOverlay from "./SaveOverlay"
import "./TrackerSingle.less"

import {addTracker} from "../../../../actions/activeTrackers"

@connect(({activeTrackers:{trackers}})=>{
    let tracker = trackers[0]
    return {
        running: tracker.logs[tracker.logs.length-1].end === null,
        trackerId: tracker.id
    }
},{})
export default class TrackerSingle extends React.Component{
    renderContent = () => {
        if(this.props.running){
            return <div>
                <Header trackerId={this.props.trackerId} />
                <Clock trackerId={this.props.trackerId} />
            </div>
        }
        else{
            return <div>
                <SaveOverlay trackerId={this.props.trackerId} />
            </div> // saving state
        }
    }
    render(){
        return (
            <div className="tracker-single">
                {this.renderContent()}
                <Description trackerId={this.props.trackerId} />
            </div>
        )
    }
}
