import { app, BrowserWindow, ipcMain } from "electron"
import getWindowSize from "./utils/windowSize"
import MenuBuilder from "./menu"
import SettingsStore from "./utils/SettingsStore"

let mainWindow = null

if (process.env.NODE_ENV === "production") {
    const sourceMapSupport = require("source-map-support")
    sourceMapSupport.install()
}

if (process.env.NODE_ENV === "development") {
    require("electron-debug")()
    const path = require("path")
    const p = path.join(__dirname, "..", "app", "node_modules")
    require("module").globalPaths.push(p)
}

const installExtensions = async () => {
    const installer = require("electron-devtools-installer")
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    const extensions = ["REACT_DEVELOPER_TOOLS", "REDUX_DEVTOOLS"]

    return Promise.all(
        extensions.map(name =>
            installer.default(installer[name], forceDownload)
        )
    ).catch(console.log)
}

app.on("window-all-closed", () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("ready", async () => {
    if (process.env.NODE_ENV === "development") {
        await installExtensions()
    }

    let settingsstore = new SettingsStore((settings, store)=>{
        let sizes = getWindowSize(process, undefined, settings.windowView)

        let browserWidth = sizes.width
        let browserHeight = sizes.height

        if (process.env.NODE_ENV === "development") {
            browserWidth = 1024
            browserHeight = 728
        }

        mainWindow = new BrowserWindow({
            title: 'tid',
            show: false,
            autoHideMenuBar: true,
            width: browserWidth,
            height: browserHeight,
            backgroundColor: '#262831',
            darkTheme: true,
            fullscreenable: false,
        })

        mainWindow.loadURL(`file://${__dirname}/app.html`)

        // @TODO: Use 'ready-to-show' event
        //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
        mainWindow.webContents.on("did-finish-load", () => {
            if (!mainWindow) {
                throw new Error('"mainWindow" is not defined')
            }
            mainWindow.show()
            mainWindow.focus()

            mainWindow.webContents.send("redux", {
                type: 'INIT_SETTINGS',
                payload: {
                    settings: settings
                }
            })

            ipcMain.on("save_settings_prop",(sender, action) => {
                settingsstore.set(action)
            })
        })

        mainWindow.on("closed", () => {
            mainWindow = null
        })

        const menuBuilder = new MenuBuilder(mainWindow)
        menuBuilder.buildMenu(settings, store)

        store.onChange((newSettings)=>{
            menuBuilder.buildMenu(newSettings, store)
        })
    })
})
