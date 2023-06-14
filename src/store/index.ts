import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";
import dialogReducer from "./dialogSlice";
import navSlice from "./navSlice";

const store = configureStore({
    reducer: {
        budget: budgetReducer,
        dialog: dialogReducer,
        navigation: navSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store