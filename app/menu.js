import { app, Menu, shell, BrowserWindow } from "electron"
import getWindowSize from "./utils/windowSize"

export default class MenuBuilder {
    mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow
        this.dispatch = (action) => {
            this.mainWindow.webContents.send("redux", action)
        }
    }

    buildMenu() {
        if (process.env.NODE_ENV === "development") {
            this.setupDevelopmentEnvironment()
        }

        let template

        if (process.platform === "darwin") {
            template = this.buildDarwinTemplate()
        } else {
            template = this.buildDefaultTemplate()
        }

        const menu = Menu.buildFromTemplate(template)
        Menu.setApplicationMenu(menu)

        return menu
    }

    setupDevelopmentEnvironment() {
        this.mainWindow.openDevTools()
        this.mainWindow.webContents.on("context-menu", (e, props) => {
            const { x, y } = props

            Menu.buildFromTemplate([
                {
                    label: "Inspect element",
                    click: () => {
                        this.mainWindow.inspectElement(x, y)
                    }
                }
            ]).popup(this.mainWindow)
        })
    }

    buildDarwinTemplate() {
        const subMenuAbout = {
            label: "tid - Tracker",
            submenu: [
                {
                    label: "About tid",
                    selector: "orderFrontStandardAboutPanel:"
                },
                { type: "separator" },
                { label: "Services", submenu: [] },
                { type: "separator" },
                {
                    label: "Hide tid",
                    accelerator: "Command+H",
                    selector: "hide:"
                },
                {
                    label: "Hide Others",
                    accelerator: "Command+Shift+H",
                    selector: "hideOtherApplications:"
                },
                { label: "Show All", selector: "unhideAllApplications:" },
                { type: "separator" },
                {
                    label: "Quit",
                    accelerator: "Command+Q",
                    click: () => {
                        app.quit()
                    }
                }
            ]
        }
        const subMenuEdit = {
            label: "Edit",
            submenu: [
                { label: "Undo", accelerator: "Command+Z", selector: "undo:" },
                {
                    label: "Redo",
                    accelerator: "Shift+Command+Z",
                    selector: "redo:"
                },
                { type: "separator" },
                { label: "Cut", accelerator: "Command+X", selector: "cut:" },
                { label: "Copy", accelerator: "Command+C", selector: "copy:" },
                {
                    label: "Paste",
                    accelerator: "Command+V",
                    selector: "paste:"
                },
                {
                    label: "Select All",
                    accelerator: "Command+A",
                    selector: "selectAll:"
                }
            ]
        }

        const subMenuView = {
            label: "View",
            submenu: [
                {
                    label: "Standard View",
                    accelerator: "Ctrl+Command+j",
                    click: () => {
                        let bounds = this.mainWindow.getBounds()
                        this.mainWindow.setBounds({
                            ...bounds,
                            ...getWindowSize(process, "default")
                        })
                        this.dispatch({
                            type: 'SET_WINDOW_VIEW',
                            view: 'default'
                        })
                    }
                },
                {
                    label: "Extended View",
                    accelerator: "Ctrl+Command+k",
                    click: () => {
                        let bounds = this.mainWindow.getBounds()
                        this.mainWindow.setBounds({
                            ...bounds,
                            ...getWindowSize(process, "extended")
                        })
                        this.dispatch({
                            type: 'SET_WINDOW_VIEW',
                            view: 'extended'
                        })
                    }
                },
                {
                    label: "Statistics View",
                    accelerator: "Ctrl+Command+l",
                    click: () => {
                        let bounds = this.mainWindow.getBounds()
                        this.mainWindow.setBounds({
                            ...bounds,
                            ...getWindowSize(process, "stats")
                        })
                        this.dispatch({
                            type: 'SET_WINDOW_VIEW',
                            view: 'stats'
                        })
                    }
                },
            ]
        }

        const subMenuWindow = {
            label: "Window",
            submenu: [
                {
                    label: "Minimize",
                    accelerator: "Command+M",
                    selector: "performMiniaturize:"
                },
                {
                    label: "Close",
                    accelerator: "Command+W",
                    selector: "performClose:"
                },
                { type: "separator" },
                { label: "Bring All to Front", selector: "arrangeInFront:" }
            ]
        }
        const subMenuHelp = {
            label: "Help",
            submenu: [
                {
                    label: "Learn More",
                    click() {
                        shell.openExternal("http://electron.atom.io")
                    }
                },
                {
                    label: "Documentation",
                    click() {
                        shell.openExternal(
                            "https://github.com/atom/electron/tree/master/docs#readme"
                        )
                    }
                },
                {
                    label: "Community Discussions",
                    click() {
                        shell.openExternal(
                            "https://discuss.atom.io/c/electron"
                        )
                    }
                },
                {
                    label: "Search Issues",
                    click() {
                        shell.openExternal(
                            "https://github.com/atom/electron/issues"
                        )
                    }
                }
            ]
        }

        return [
            subMenuAbout,
            subMenuEdit,
            subMenuView,
            subMenuWindow,
            subMenuHelp
        ]
    }

    buildDefaultTemplate() {
        const templateDefault = [
            {
                label: "&File",
                submenu: [
                    {
                        label: "&Open",
                        accelerator: "Ctrl+O"
                    },
                    {
                        label: "&Close",
                        accelerator: "Ctrl+W",
                        click: () => {
                            this.mainWindow.close()
                        }
                    }
                ]
            },
            {
                label: "&View",
                submenu: process.env.NODE_ENV === "development"
                    ? [
                        {
                            label: "&Reload",
                            accelerator: "Ctrl+R",
                            click: () => {
                                this.mainWindow.webContents.reload()
                            }
                        },
                        {
                            label: "Toggle &Full Screen",
                            accelerator: "F11",
                            click: () => {
                                this.mainWindow.setFullScreen(
                                      !this.mainWindow.isFullScreen()
                                  )
                            }
                        },
                        {
                            label: "Toggle &Developer Tools",
                            accelerator: "Alt+Ctrl+I",
                            click: () => {
                                this.mainWindow.toggleDevTools()
                            }
                        }
                    ]
                    : [
                        {
                            label: "Toggle &Full Screen",
                            accelerator: "F11",
                            click: () => {
                                this.mainWindow.setFullScreen(
                                      !this.mainWindow.isFullScreen()
                                  )
                            }
                        }
                    ]
            },
            {
                label: "Help",
                submenu: [
                    {
                        label: "Learn More",
                        click() {
                            shell.openExternal("http://electron.atom.io")
                        }
                    },
                    {
                        label: "Documentation",
                        click() {
                            shell.openExternal(
                                "https://github.com/atom/electron/tree/master/docs#readme"
                            )
                        }
                    },
                    {
                        label: "Community Discussions",
                        click() {
                            shell.openExternal(
                                "https://discuss.atom.io/c/electron"
                            )
                        }
                    },
                    {
                        label: "Search Issues",
                        click() {
                            shell.openExternal(
                                "https://github.com/atom/electron/issues"
                            )
                        }
                    }
                ]
            }
        ]

        return templateDefault
    }
}
