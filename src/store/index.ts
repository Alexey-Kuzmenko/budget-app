import { configureStore } from "@reduxjs/toolkit";
import budgetReducer from "./budgetSlice";
import dialogReducer from "./dialogSlice";

const store = configureStore({
    reducer: {
        budget: budgetReducer,
        dialog: dialogReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store