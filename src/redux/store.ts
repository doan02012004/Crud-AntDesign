
import { combineReducers, configureStore } from '@reduxjs/toolkit'

import antReducer from './features/antSlice'
const rootReducers = combineReducers({
    ant: antReducer
})

const store = configureStore({
    reducer:rootReducers
})

export default store