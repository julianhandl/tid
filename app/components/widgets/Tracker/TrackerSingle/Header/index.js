import React from "react"
import Status from "../../../Icons/Status"
import Add from "../../../Icons/Add"
import "./Header.less"

export default class Header extends React.Component{
    render(){
        return(
            <div className="tracker-single-header">
                <Status running={true} />
                <Add />
            </div>
        )
    }
}
