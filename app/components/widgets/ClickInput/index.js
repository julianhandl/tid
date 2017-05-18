import React from "react"
import Triangle from "../Icons/Triangle"
import {Translation} from "../../../i18n/Intl"
import "./Clickinput.less"

export default class ClickInput extends React.Component{
    prev = () => {
        if(this.props.index > 0){
            let newIndex = this.props.index - 1
            this.props.onChange(newIndex, this.props.values[newIndex])
        }
        else{
            let newIndex = this.props.values.length - 1
            this.props.onChange(newIndex, this.props.values[newIndex])
        }
    }
    next = () => {
        if(this.props.index + 1 < this.props.values.length){
            let newIndex = this.props.index + 1
            this.props.onChange(newIndex, this.props.values[newIndex])
        }
        else{
            this.props.onChange(0, this.props.values[0])
        }
    }
    shouldComponentUpdate(nextProps){
        return this.props.values !== nextProps.values ||
            this.props.index !== nextProps.index
    }
    render(){
        let currentItem = this.props.values[this.props.index]
        return (
            <div className="click-input">
                <div className="click-input-control">
                    <Triangle
                        direction="up"
                        onClick={this.prev}
                    />
                    <Triangle
                        direction="down"
                        onClick={this.next}
                    />
                </div>
                <div
                    className="click-input-label"
                    onClick={this.next}
                >
                    {currentItem || <Translation Translation="select_value" />}
                </div>
            </div>
        )
    }
}
