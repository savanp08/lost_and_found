
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slices/UserSlice/UserSlice.js';
import ReportReducer from '../Slices/ReportSlice/ReportSlice.js'
import RouterReducer from "../Slices/RouterSlice/RouterSlice.js";
import TaskReducer from "../Slices/TaskSlice/TaskSlice.js";
import RawData from "../RawData/RawData.js";
import AdminSlice from "../Slices/UserSlice/AdminSlice.js";
import GMapSlice from "../Slices/GMapSlice/GMapSlice.js";
import FormSlice from "../Slices/FormSlice/FormSlice.js";
import SocketSlice from "../Slices/SokcetSlice/SocketSlice.js";
const store = configureStore({
    reducer: {
        user : userReducer,
        admin : AdminSlice,
        report : ReportReducer,
        router : RouterReducer,
        task : TaskReducer,
        rawData : RawData,
        gMap : GMapSlice,
        form : FormSlice,
        socket : SocketSlice,
    }
});

console.log(store.getState());

export default store;