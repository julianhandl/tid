// @flow
import { combineReducers } from "redux"
import { routerReducer as routing } from "react-router-redux"
import activeTrackers from "./activeTrackers"

const rootReducer = combineReducers({
    routing,
    activeTrackers
})

export default rootReducer
