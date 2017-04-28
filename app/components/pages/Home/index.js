import React, { Component } from "react"
import {connect} from "react-redux"
import TrackerSingle from "../../widgets/Tracker/TrackerSingle"
import "./Home.less"

import {tick} from "../../../actions/ticker"

@connect(({activeTrackers})=>({
    activeTrackers: activeTrackers.trackers
}),{
    tick
})
export default class Home extends Component {
    startTicker = ()=>{
        this.tickerInterval = setInterval(()=>{
            this.props.tick()
        }, 2000)
    }
    stopTicker = ()=>{
        clearInterval(this.tickerInterval)
    }
    componentDidMount(){
        if(this.props.activeTrackers.length > 0){
            this.startTicker()
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.activeTrackers.length === 0 && nextProps.activeTrackers.length > 0){
            this.startTicker()
        }
        else if(this.props.activeTrackers.lengt > 0 && nextProps.activeTrackers.length === 0){
            this.stopTicker()
        }
    }
    render() {
        return (
            <div>
                <TrackerSingle />
            </div>
        )
    }
}
