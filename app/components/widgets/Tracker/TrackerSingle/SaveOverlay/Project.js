import React from "react"
import {connect} from "react-redux"
import Close from "../../../Icons/Close"
import Check from "../../../Icons/Check"
import ClickInput from "../../../ClickInput"

import {
    cancelSaving
} from "../../../../../actions/activeTrackers"

@connect(()=>({}),{
    cancelSaving
})
export default class Project extends React.Component{
    render(){
        return (
            <div className="tracker-single-save-project">
                <div className="tracker-single-header">
                    <Close
                        onClick={() => {
                            this.props.cancelSaving(this.props.trackerId)
                        }}
                    />
                    <Check />
                </div>
                <div className="tracker-single-project-selects">
                    <div className="tracker-single-project-select">
                        <label>Project</label>
                        <div>
                            <ClickInput
                                index={0}
                                values={["P1","P2","P3"]}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
