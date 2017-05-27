import React, { Component } from "react"
import {connect} from "react-redux"
import TrackerSingle from "../../widgets/Tracker/TrackerSingle"
import TrackerMulti from "../../widgets/Tracker/TrackerMulti"
import MultiHeader from "../../widgets/Tracker/TrackerMulti/Header"
import {Translation} from "../../../i18n/Intl"
import "./Home.less"

import {tick} from "../../../actions/ticker"

@connect(({trackers, ticker, settings})=>({
    activeTrackers: trackers.activeTrackers,
    runningTrackersLength: trackers.activeTrackers.filter(t=>{
        let lastLog = t.logs[t.logs.length-1]
        return lastLog.start && lastLog.end === null
    }).length,
    ticker: ticker,
    windowView: settings.windowView
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
        this.tickerInterval = null
    }
    componentDidMount(){
        if(this.props.runningTrackersLength > 0){
            this.startTicker()
        }
    }
    shouldComponenUpdate(nextProps){
        return this.props.activeTrackers !== nextProps.activeTrackers
    }
    componentWillReceiveProps(nextProps){
        if(this.props.runningTrackersLength !== nextProps.runningTrackersLength &&
            nextProps.runningTrackersLength > 0 && !this.tickerInterval
        ){
            this.startTicker()
        }
        else if(this.props.runningTrackersLength !== nextProps.runningTrackersLength &&
            nextProps.runningTrackersLength === 0 && this.tickerInterval
        ){
            this.stopTicker()
        }
    }
    componentWillUnmount(){
        this.stopTicker()
    }
    renderTracker = () => {
        let trackers = this.props.activeTrackers
        if(trackers.length > 1){
            return <div className="tracker-multi-wrapper">
                <MultiHeader />
                <div className="tracker-multi-container">
                    {this.props.activeTrackers.map(t => {
                        return <TrackerMulti trackerId={t.id} />
                    })}
                </div>
            </div>
        }
        else if(trackers.length === 1){
            return <TrackerSingle trackerId={trackers[0].id} />
        }
        else{
            return <div><Translation translation="no_tracker" /></div>
        }
    }
    render(){
        let view = this.props.windowView
        let classes = `tid-homepage tid-homepage-view-${view}`
        return (
            <div className={classes}>
                {this.renderTracker()}
            </div>
        )
    }
}
