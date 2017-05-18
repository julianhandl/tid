import React from "react"
import {connect} from "react-redux"
import {translate} from "../../../../../i18n/Intl"
import {setTrackerDescription} from "../../../../../actions/activeTrackers"
import "./Description.less"

@connect(({trackers:{activeTrackers},settings},props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    return {
        description: tracker.description,
        lang: settings.language
    }
},{
    setTrackerDescription
})
export default class Description extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.description !== nextProps.description
    }
    render(){
        return (
            <div className="tracker-description">
                <input
                    type="text"
                    value={this.props.description || undefined}
                    placeholder={translate("give_tracker_a_name",this.props.lang)}
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
