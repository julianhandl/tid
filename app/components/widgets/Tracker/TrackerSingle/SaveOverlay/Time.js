import React from "react"
import { connect } from "react-redux"
import Close from "../../../Icons/Close"
import {
    startSaving,
    cancelSaving,
    deleteTracker
} from "../../../../../actions/activeTrackers"

@connect(() => ({}), {
    startSaving,
    cancelSaving,
    deleteTracker
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
        this.props.startSaving(this.props.trackerId, totalMinutes)
    }
    render() {
        return (
            <div className="tracker-single-save-time">
                <div className="tracker-single-header">
                    <Close
                        onClick={() => {
                            this.props.cancelSaving(this.props.trackerId)
                        }}
                    />
                    <span />
                </div>
                <div className="tracker-single-save-time-control">
                    <div className="tracker-single-delete"
                        onClick={()=>{
                            this.props.deleteTracker(this.props.trackerId)
                        }}
                    >Trash</div>
                    <div className="tracker-single-save-time-input">
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
                    <div className="tracker-single-save"
                        onClick={this.save}
                    >Save</div>
                </div>
            </div>
        )
    }
}
