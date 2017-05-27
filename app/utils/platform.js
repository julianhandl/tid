export default function getPlatform(proc){
    switch (proc.platform) {
    case 'win32':
        return 'windows'
    case 'darwin':
        return 'mac'
    case 'linux':
        return 'linux'
    default:
        return 'unknow'
    }
}
