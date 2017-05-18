import React from "react"
import Variables from "../../../global.variables.js"

export default class Status extends React.Component {
    shouldComponentUpdate(nextProps){
        return this.props.running !== nextProps.running
    }
    render() {
        let fill = Variables["color-status-paused"]
        if(this.props.running) fill = Variables["color-status-running"]
        return (
            <svg
                className="icon-status"
                height="14px"
                width="14px"
                viewBox="0 0 14 14"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
            >
                <circle cx="7" cy="7" r="7" fill={fill} />
            </svg>
        )
    }
}
