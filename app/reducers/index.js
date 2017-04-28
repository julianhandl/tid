// @flow
import { combineReducers } from "redux"
import { routerReducer as routing } from "react-router-redux"
import ticker from "./ticker"
import activeTrackers from "./activeTrackers"

const rootReducer = combineReducers({
    routing,
    ticker,
    activeTrackers
})

export default rootReducer
