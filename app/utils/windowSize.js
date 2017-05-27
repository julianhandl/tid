import getPlatform from "./platform"

const titleBarHeight = {
    'mac': 22,
    'windows': 20,
    'linus': 20,
    'unknown': 20
}

export default function getScreenSize(pro, size){

    switch(size){
    case 'extended':
        return {
            width: 320,
            height: 500 + titleBarHeight[getPlatform(pro)]
        }
    case 'stats':
        return {
            width: 900,
            height: 600 + titleBarHeight[getPlatform(pro)]
        }
    default:
        return {
            width: 320,
            height: 168 + titleBarHeight[getPlatform(pro)]
        }
    }
}
