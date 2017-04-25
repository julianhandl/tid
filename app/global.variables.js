const red = "#ef7669"
const lightGrey = "#d4d7e0"
const grey = "#353844"
const darkGrey = "#262831"

const colors = {
    "color-text": lightGrey,
    "color-background-main": darkGrey,
    "color-status-running": red,
    "color-status-paused": lightGrey,
    "color-input-dark": grey,
}

const metrics = {
    "padding-main": "15px",
    "padding-input-large": "13px 18px",
    "padding-input": "8px 16px"
}

export default {
    ...colors,
    ...metrics
}
