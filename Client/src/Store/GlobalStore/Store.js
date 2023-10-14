
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slices/UserSlice/UserSlice.js';
import ReportReducer from '../Slices/ReportSlice/ReportSlice.js'

const store = configureStore({
    reducer: {
        user : userReducer,
        report : ReportReducer,
    }
});

console.log(store.getState());

export default store;