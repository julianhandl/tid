import React from "react"
import Variables from "../../../global.variables"

export default class Play extends React.Component {
    shouldComponentUpdate(){
        return false
    }
    render() {
        return (
            <svg
                className="icon-play"
                height="15px"
                width="15px"
                viewBox="0 0 15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
            >
                <polygon points="1,0 14,8 1,15" fill={Variables["color-success"]} />
            </svg>
        )
    }
}
