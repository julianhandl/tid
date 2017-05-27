import {ipcRenderer} from "electron"
import React from "react"
import { render } from "react-dom"
import { hashHistory } from "react-router"
import { AppContainer } from "react-hot-loader"
import { syncHistoryWithStore } from "react-router-redux"
import Root from "./containers/Root"
import configureStore from "./store/configureStore"
import "./global.less"

export const store = configureStore()
const history = syncHistoryWithStore(hashHistory, store)

ipcRenderer.on("redux", (event, action)=>{
    store.dispatch(action)
})

render(
    <AppContainer>
        <Root store={store} history={history} />
    </AppContainer>,
    document.getElementById("root")
)

if (module.hot) {
    module.hot.accept("./containers/Root", () => {
        const NextRoot = require("./containers/Root") // eslint-disable-line global-require
        render(
            <AppContainer>
                <NextRoot store={store} history={history} />
            </AppContainer>,
            document.getElementById("root")
        )
    })
}
