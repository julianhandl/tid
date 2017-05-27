import getPlatform from "./platform"

const titleBarHeight = {
    'mac': 22,
    'windows': 20,
    'linux': 0,
    'unknown': 20
}

export default function getScreenSize(pro, win, size){
    let menuVisible = win ? win.isMenuBarVisible() : false
    let menuHeight = !menuVisible || getPlatform(pro) === 'mac' ? 0 : 25
    switch(size){
    case 'extended':
        return {
            width: 320,
            height: 500 + titleBarHeight[getPlatform(pro)] + menuHeight
        }
    case 'stats':
        return {
            width: 900,
            height: 600 + titleBarHeight[getPlatform(pro)] + menuHeight
        }
    default:
        return {
            width: 320,
            height: 168 + titleBarHeight[getPlatform(pro)] + menuHeight
        }
    }
}
