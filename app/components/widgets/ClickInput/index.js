import React from "react"
import Triangle from "../Icons/Triangle"

export default class ClickInput extends React.Component{
    prev = () => {
        if(this.props.index > 0){
            this.props.onChange(this.props.index - 1)
        }
        else{
            this.props.onChange(this.props.values.length - 1)
        }
    }
    next = () => {
        if(this.props.index < this.props.values.length){
            this.props.onChange(this.props.index + 1)
        }
        else{
            this.props.onChange(0)
        }
    }
    render(){
        let currentItem = this.props.values[this.props.index]
        return (
            <div className="click-input">
                <div className="click-input-control">
                    <Triangle direction="up" />
                    <Triangle direction="down" />
                </div>
                <div
                    className="click-input-label"
                    onClick={this.next}
                >
                    {currentItem || "Select Value"}
                </div>
            </div>
        )
    }
}
