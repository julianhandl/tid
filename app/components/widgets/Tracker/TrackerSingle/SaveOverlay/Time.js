import React from "react"
import { connect } from "react-redux"
import Close from "../../../Icons/Close"
import {Translation} from "../../../../../i18n/Intl"
import "./Time.less"
import {
    startSaving,
    cancelSaving,
    deleteTracker
} from "../../../../../actions/activeTrackers"
import {
    saveActiveTracker
} from "../../../../../actions/closedTrackers"

@connect(({trackers:{activeTrackers}},props) => ({
    tracker: activeTrackers.find(t => t.id === props.trackerId)
}), {
    startSaving,
    cancelSaving,
    deleteTracker,
    saveActiveTracker
})
export default class Time extends React.Component {
    shouldComponentUpdate() {
        return false
    }
    componentDidMount() {
        let hours = Math.floor(this.props.minutes / 60)
        let minutes = Math.ceil(this.props.minutes - hours * 60)
        this.hourInput.value = hours
        this.minInput.value = minutes
    }
    save = () => {
        let hours = parseInt(this.hourInput.value, 10)
        let minutes = parseInt(this.minInput.value, 10)
        let totalMinutes = (hours*60) + minutes
        if(this.props.projectTracker){
            this.props.saveActiveTracker({
                ...this.props.tracker,
                totalMinutes: totalMinutes
            })
        }
        else{
            this.props.startSaving(this.props.trackerId, totalMinutes)
        }
    }
    render() {
        return (
            <div className="tracker-save-time">
                { this.props.headerComponent || null }
                <div className="tracker-save-time-control">
                    <div className="tracker-delete"
                        onClick={()=>{
                            this.props.deleteTracker(this.props.trackerId)
                        }}
                    ><Translation translation="trash" /></div>
                    <div className="tracker-save-time-input">
                        <input
                            ref={ref => (this.hourInput = ref)}
                            type="text"
                        />
                        <span>:</span>
                        <input
                            ref={ref => (this.minInput = ref)}
                            type="text"
                        />
                    </div>
                    <div className="tracker-save"
                        onClick={this.save}
                    ><Translation translation="save" /></div>
                </div>
            </div>
        )
    }
}
