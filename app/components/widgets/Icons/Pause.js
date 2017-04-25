import React from "react"

export default class Pause extends React.Component {
    render() {
        return (
            <svg
                className="icon-pause"
                height="15px"
                width="15px"
                viewBox="15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
            >
                <polygon points="0,0 6,0 6,15 0,15" fill="#ffffff" />
                <polygon points="9,0 15,0 15,15 9,15" fill="#ffffff" />
            </svg>
        )
    }
}
