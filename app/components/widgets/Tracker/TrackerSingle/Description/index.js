import React from "react"
import {connect} from "react-redux"
import {setTrackerDescription} from "../../../../../actions/activeTrackers"
import "./Description.less"

@connect(({activeTrackers:{trackers}},props)=>{
    let tracker = trackers.find(t => t.id === props.trackerId)
    return {
        description: tracker.description
    }
},{
    setTrackerDescription
})
export default class Description extends React.Component{
    render(){
        return (
            <div className="tracker-single-description">
                <input
                    type="text"
                    value={this.props.description || undefined}
                    placeholder="Give your task a name"
                    onChange={(e)=>{
                        this.props.setTrackerDescription(
                            this.props.trackerId,
                            e.target.value
                        )
                    }}
                />
            </div>
        )
    }
}
