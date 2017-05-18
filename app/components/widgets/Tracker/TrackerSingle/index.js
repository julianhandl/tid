import React from "react"
import {connect} from "react-redux"
import Header from "./Header"
import Clock from "./Clock"
import Description from "./Description"
import SaveOverlay from "./SaveOverlay"
import "./TrackerSingle.less"

@connect(({trackers:{activeTrackers}})=>{
    let tracker = activeTrackers[0]
    let lastLog = tracker.logs[tracker.logs.length-1]

    return {
        running: lastLog.end === null,
        trackerId: tracker.id
    }
},{})
export default class TrackerSingle extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.running !== nextProps.running ||
            this.props.trackerId !== nextProps.trackerId
    }
    renderContent = () => {
        if(this.props.running){
            return <div className="tracker-single-content">
                <Header trackerId={this.props.trackerId} />
                <Clock trackerId={this.props.trackerId} />
            </div>
        }
        else{
            return <div className="tracker-single-content save">
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
