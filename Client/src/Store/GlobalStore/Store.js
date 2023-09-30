import { Store } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../Slices/UserSlice/UserSlice.js';

const store = configureStore({
    reducer: {
        user : userReducer,
    }
});

console.log(store.getState());

export default store;