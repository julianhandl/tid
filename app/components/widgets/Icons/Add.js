import React from "react"
import Variables from "../../../global.variables.js"

export default class Add extends React.Component {
    shouldComponentUpdate(){
        return false
    }
    render() {
        return (
            <svg
                className="icon-add"
                height="15px"
                width="15px"
                viewBox="0 0 15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
            >
                <polygon points="5,0 10,0 10,5 15,5 15,10 10,10 10,15 5,15 5,10 0,10 0,5 5,5"
                    fill={Variables["color-text"]}
                />
            </svg>
        )
    }
}
