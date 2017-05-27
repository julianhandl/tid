import React from "react"
import {connect} from "react-redux"
import {Translation, translate} from "../../../../../i18n/Intl"
import ClickInput from "../../../ClickInput"
import Arrow from "../../../Icons/Arrow"
import {
    startSaving,
    cancelSaving,
    setTrackerProject,
    setSavedTrackerProject,
} from "../../../../../actions/activeTrackers"

@connect(({
    trackers:{activeTrackers},
    settings
},props)=>{
    let tracker = activeTrackers.find(t => t.id === props.trackerId)
    return {
        tracker: tracker,
        lang: settings.language
    }
},{
    startSaving,
    setTrackerProject,
    setSavedTrackerProject
})
export default class Project extends React.Component{
    shouldComponentUpdate(nextProps){
        return this.props.tracker !== nextProps.tracker ||
            this.props.projects !== nextProps.projects
    }
    render(){
        return (
            <div className="tracker-multi-project-select">
                <Arrow
                    direction="left"
                    onClick={()=>{
                        this.props.startSaving(this.props.trackerId, null)
                    }}
                />
                <label><Translation translation="project" /></label>
                <ClickInput
                    index={this.props.tracker.project === null ? 1 : this.props.tracker.project}
                    values={this.props.projects}
                    onChange={(index)=>{
                        this.props.setTrackerProject(this.props.trackerId,index)
                    }}
                />
                <Arrow
                    direction="right"
                    onClick={()=>{
                        this.props.setSavedTrackerProject(this.props.trackerId)
                    }}
                />
            </div>
        )
    }
}
