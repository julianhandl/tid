import React from "react"
import {connect} from "react-redux"
import Header from "./Header"
import Clock from "./Clock"
import "./TrackerSingle.less"

@connect(()=>{},{})
export default class TrackerSingle extends React.Component{
    render(){
        return (
            <div className="tracker-single">
                <Header />
                <Clock />
            </div>
        )
    }
}
