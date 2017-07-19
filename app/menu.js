import { app, Menu, shell, BrowserWindow, dialog } from "electron"
const fs = require("fs")
import getWindowSize from "./utils/windowSize"
import {translate} from "./i18n/Intl.js"
import openProject from "./utils/menu/openProject"

export default class MenuBuilder {
    mainWindow: BrowserWindow;

    constructor(mainWindow: BrowserWindow) {
        this.mainWindow = mainWindow
        this.dispatch = (action) => {
            this.mainWindow.webContents.send("redux", action)
        }

    }

    buildMenu(settings, settingsstore) {
        const getLabel = (value) => {
            return translate(value, settings.language)
        }

        if (process.env.NODE_ENV === "development") {
            this.setupDevelopmentEnvironment()
        }

        const darwin = process.platform === "darwin"

        const subMenuFile = {
            label: getLabel("menu_file"),
            submenu: [
                {
                    label: getLabel("menu_file_open"),
                    accelerator: darwin ? "Command+o" : "Ctrl+o",
                    click: ()=>{
                        dialog.showOpenDialog({
                            title: "Test Title",
                            properties: [
                                'openDirectory',
                            ],
                            message: getLabel("menu_file_open_message"),
                        },(path) => {
                            if(path && path.length === 1){
                                openProject(path[0], settings, settingsstore)
                            }
                        })
                    }
                },{
                    label: getLabel("menu_file_open_recent"),
                    submenu: settings.recentProjects.map(r => ({
                        label: r,
                        click: ()=>{
                            openProject(r, settings, settingsstore)
                        }
                    }))
                },
                { type: "separator" },
                {
                    label: getLabel("menu_file_save"),
                    accelerator: darwin ? "Command+s" : "Ctrl+s",
                },
                { type: "separator" },
                {
                    label: getLabel("menu_file_close"),
                    accelerator: darwin ? "Command+Q" : "Ctrl+Q",
                    click: () => {
                        this.mainWindow.close()
                    }
                }
            ]
        }
        const subMenuView = {
            label: getLabel("menu_view"),
            submenu: [
                {
                    label: getLabel("menu_view_standard"),
                    accelerator: darwin ? "Ctrl+Command+j" : "Ctrl+j",
                    click: () => {
                        let bounds = this.mainWindow.getBounds()
                        this.mainWindow.setBounds({
                            ...bounds,
                            ...getWindowSize(process, this.mainWindow, "default")
                        })
                        this.dispatch({
                            type: 'SET_WINDOW_VIEW',
                            view: 'default'
                        })
                    }
                },
                {
                    label: getLabel("menu_view_extended"),
                    accelerator: darwin ? "Ctrl+Command+k" : "Ctrl+k",
                    click: () => {
                        let bounds = this.mainWindow.getBounds()
                        this.mainWindow.setBounds({
                            ...bounds,
                            ...getWindowSize(process, this.mainWindow, "extended")
                        })
                        this.dispatch({
                            type: 'SET_WINDOW_VIEW',
                            view: 'extended'
                        })
                    }
                },
                {
                    label: getLabel("menu_view_stats"),
                    accelerator: darwin ? "Ctrl+Command+l" : "Ctrl+l",
                    click: () => {
                        let bounds = this.mainWindow.getBounds()
                        this.mainWindow.setBounds({
                            ...bounds,
                            ...getWindowSize(process, this.mainWindow, "stats")
                        })
                        this.dispatch({
                            type: 'SET_WINDOW_VIEW',
                            view: 'stats'
                        })
                    }
                },
            ]
        }
        const subMenuSettings = {
            label: getLabel("menu_settings"),
            submenu: [{
                label: getLabel("menu_settings_language"),
                submenu: [{
                    label: getLabel("menu_settings_language_en"),
                    type: 'radio',
                    checked: settings.language === "en",
                    click: ()=>{
                        this.dispatch({
                            type: "SETTINGS_CHANGE_LANGUAGE",
                            payload: { langKey: "en" }
                        })
                    }
                },{
                    label: getLabel("menu_settings_language_de"),
                    type: 'radio',
                    checked: settings.language === "de",
                    click: ()=>{
                        this.dispatch({
                            type: "SETTINGS_CHANGE_LANGUAGE",
                            payload: { langKey: "de" }
                        })
                    }
                }]
            }]
        }

        let template

        if (darwin) {
            template = this.buildDarwinTemplate(
                subMenuFile,
                subMenuView,
                subMenuSettings
            )
        } else {
            template = this.buildDefaultTemplate(
                subMenuFile,
                subMenuView,
                subMenuSettings
            )
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

    buildDarwinTemplate(subMenuFile, subMenuView, subMenuSettings) {
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

        /*
        const subMenuView = {
            label: "View",
            submenu: [
                {
                    label: "Standard View",
                    accelerator: "Ctrl+Command+j",
                    click: () => {
                        let bounds = this.mainWindow.getContentBounds()
                        this.mainWindow.setContentBounds({
                            ...bounds,
                            ...getWindowSize(process, this.mainWindow, "default")
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
                        let bounds = this.mainWindow.getContentBounds()
                        this.mainWindow.setContentBounds({
                            ...bounds,
                            ...getWindowSize(process, this.mainWindow, "extended")
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
                        let bounds = this.mainWindow.getContentBounds()
                        this.mainWindow.setContentBounds({
                            ...bounds,
                            ...getWindowSize(process, this.mainWindow, "stats")
                        })
                        this.dispatch({
                            type: 'SET_WINDOW_VIEW',
                            view: 'stats'
                        })
                    }
                },
            ]
        }
        */

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
            subMenuFile,
            subMenuEdit,
            subMenuView,
            subMenuSettings,
            // subMenuWindow,
            subMenuHelp
        ]
    }

    buildDefaultTemplate(subMenuFile, subMenuView, subMenuSettings) {
        const templateDefault = [
            subMenuFile,
            subMenuView,
            subMenuSettings,
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
