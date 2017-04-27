import React from "react"
import {connect} from "react-redux"
import Header from "./Header"
import Clock from "./Clock"
import "./TrackerSingle.less"

import {addTracker} from "../../../../actions/activeTrackers"

@connect((store)=>({
    store
}),{
    addTracker
})
export default class TrackerSingle extends React.Component{
    static contextTypes = {
        store: React.PropTypes.object.isRequired
    }

    componentDidMount(){
        console.log(this.props)
        this.props.addTracker()
    }
    render(){
        return (
            <div className="tracker-single">
                <Header />
                <Clock />
            </div>
        )
    }
}
