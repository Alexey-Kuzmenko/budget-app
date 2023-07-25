import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from './budgetSlice';
import dialogReducer from './dialogSlice';
import navReducer from './navSlice';
import authReducer from './authSlice';


const store = configureStore({
    reducer: {
        budget: budgetReducer,
        dialog: dialogReducer,
        navigation: navReducer,
        authentication: authReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;