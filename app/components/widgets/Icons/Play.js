import React from "react"

export default class Play extends React.Component {
    render() {
        return (
            <svg
                className="icon-play"
                height="15px"
                width="15px"
                viewBox="15 15"
                onClick={e => {
                    if (this.props.onClick) this.props.onClick(e)
                }}
            >
                <polygon points="1,0 14,8 1,15" fill="#ffffff" />
            </svg>
        )
    }
}
