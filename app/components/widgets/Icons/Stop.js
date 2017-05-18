import React from "react"
import Variables from "../../../global.variables"

export default class Stop extends React.Component {
    shouldComponentUpdate(){
        return false
    }
    render() {
        return (
            <svg
                className="icon-stop"
                height="15px"
                width="15px"
                viewBox="0 0 15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
            >
                <polygon points="0,0 15,0 15,15 0,15"
                    fill={Variables["color-danger"]}
                />
            </svg>
        )
    }
}
