// @flow
import { combineReducers } from "redux"
import { routerReducer as routing } from "react-router-redux"
import ticker from "./ticker"
import trackers from "./trackers"
import projects from "./projects"
import clients from "./clients"
import settings from "./settings"

const rootReducer = combineReducers({
    routing,
    ticker,
    trackers,
    projects,
    clients,
    settings
})

export default rootReducer
