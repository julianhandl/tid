import React from "react"
import Variables from "../../../global.variables.js"

export default class Check extends React.Component {
    render() {
        return (
            <svg
                className="icon-check"
                height="15px"
                width="15px"
                viewBox="15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
                style={{
                    transform: "rotate(45deg)"
                }}
            >
                <polygon
                    points="8,0 13,0 13,15 3,15 3,10 8,10"
                    fill={Variables["color-success"]}
                />
            </svg>
        )
    }
}
