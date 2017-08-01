import getPlatform from "./platform"

const titleBarHeight = {
    'mac': 22,
    'windows': 35,
    'linux': 0,
    'unknown': 20
}

const frameWidth = {
    'mac': 0,
    'windows': 13,
    'linux': 0,
    'unknown': 0
}

export default function getScreenSize(pro, win, size){
    let menuVisible = win ? win.isMenuBarVisible() : false
    let menuHeight = !menuVisible || getPlatform(pro) === 'mac' ? 0 : 20
    switch(size){
    case 'extended':
        return {
            width: 320 + frameWidth[getPlatform(pro)],
            height: 500 + titleBarHeight[getPlatform(pro)] + menuHeight
        }
    case 'stats':
        return {
            width: 900 + frameWidth[getPlatform(pro)],
            height: 600 + titleBarHeight[getPlatform(pro)] + menuHeight
        }
    default:
        return {
            width: 320 + frameWidth[getPlatform(pro)],
            height: 168 + titleBarHeight[getPlatform(pro)] + menuHeight
        }
    }
}
