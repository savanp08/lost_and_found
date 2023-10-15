
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slices/UserSlice/UserSlice.js';
import ReportReducer from '../Slices/ReportSlice/ReportSlice.js'
import RouterReducer from "../Slices/RouterSlice/RouterSlice.js";
import TaskReducer from "../Slices/TaskSlice/TaskSlice.js";

const store = configureStore({
    reducer: {
        user : userReducer,
        report : ReportReducer,
        router : RouterReducer,
        task : TaskReducer,
    }
});

console.log(store.getState());

export default store;