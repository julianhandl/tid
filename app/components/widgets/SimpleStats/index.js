import React from "react"
import {connect} from "react-redux"

@connect(()=>({}),{})
export default class SimpleStats extends React.Component{
    render(){
        return(
            <div className="simplestats">
                Simplestats
            </div>
        )
    }
}
