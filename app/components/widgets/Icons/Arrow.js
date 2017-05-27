import React from "react"
import Variables from "../../../global.variables.js"

export default class Arrow extends React.Component {
    shouldComponentUpdate(nextProps){
        return this.props.direction !== nextProps.direction
    }
    render() {
        return (
            <svg
                className="icon-arrow"
                height="15px"
                width="15px"
                viewBox="0 0 15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
                style={{
                    "transform": this.props.direction === "right" ? "rotate(180deg)" : "rotate(0deg)"
                }}
            >
                <polygon points="7,0 0,8 7,15 9,13 4,8 9,2"
                    fill={Variables["color-text"]}
                />
            </svg>
        )
    }
}
