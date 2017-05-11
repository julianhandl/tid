import React, { Component } from "react"
import {connect} from "react-redux"
import TrackerSingle from "../../widgets/Tracker/TrackerSingle"
import "./Home.less"

import {tick} from "../../../actions/ticker"

@connect(({activeTrackers, ticker})=>({
    activeTrackers: activeTrackers.trackers,
    ticker: ticker
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
    shouldComponenUpdate(nextProps){
        return this.props.activeTrackers !== nextProps.activeTrackers
    }
    componentWillReceiveProps(nextProps){
        let runningTrackers = nextProps.activeTrackers.filter(t => {
            return !t.totalMinutes
        })

        if(
            runningTrackers.lengt > 0 &&
            !this.props.ticker
        ){
            this.startTicker()
        }
        else if(
            runningTrackers.length === 0
        ){
            this.stopTicker()
        }
    }
    componentWillUnmount(){
        this.stopTicker()
    }
    renderTrackers = () => {
        let trackers = this.props.activeTrackers
        if(trackers.length > 1){
            return <div>Multi</div>
        }
        else if(trackers.length === 1){
            return <TrackerSingle trackerId={trackers[0].id} />
        }
        else{
            return <div>No trackers</div>
        }
    }
    render() {
        return (
            <div>
                {this.renderTrackers()}
            </div>
        )
    }
}
