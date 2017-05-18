import React from "react"
import Variables from "../../../global.variables"

export default class Pause extends React.Component {
    shouldComponentUpdate(){
        return false
    }
    render() {
        return (
            <svg
                className="icon-pause"
                height="15px"
                width="15px"
                viewBox="0 0 15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
            >
                <polygon points="0,0 6,0 6,15 0,15" fill={Variables["color-warning"]} />
                <polygon points="9,0 15,0 15,15 9,15" fill={Variables["color-warning"]} />
            </svg>
        )
    }
}
