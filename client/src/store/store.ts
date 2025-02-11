import { configureStore } from "@reduxjs/toolkit"
import registerReducer from "./slices/registerSlice"
import eventCreationReducer from "./slices/eventCreationSlice"

const store = configureStore({
    reducer:{
        // Add reducers here
        register: registerReducer,
        event: eventCreationReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store