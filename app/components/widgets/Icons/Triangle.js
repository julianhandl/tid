import React from "react"
import Variables from "../../../global.variables.js"

export default class Triangle extends React.Component {
    shouldComponentUpdate(nextProps){
        return this.props.direction !== nextProps.direction
    }
    render() {
        return (
            <svg
                className="icon-triangle"
                height="15px"
                width="15px"
                viewBox="0 0 15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
                style={{
                    "transform": this.props.direction === "up" ? "rotate(0deg)" : "rotate(180deg)"
                }}
            >
                <polygon points="0,15 8,3 15,15"
                    fill={Variables["color-text"]}
                />
            </svg>
        )
    }
}
