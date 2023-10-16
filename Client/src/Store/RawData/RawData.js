import { createSlice } from "@reduxjs/toolkit";

const initialState = {
options : [],

};

const rawData = createSlice({
    name: "rawData",
    initialState,
    reducers: {
        addRawData : (state, action) => {
            return {
                ...state,
                ...action.payload,
            }
        },
        removeRawData : (state, action) => {
            return null;
        },
        default: (state, action) => {
            return state
        }
    }
});

export const { addRawData, removeRawData } = rawData.actions;

export default rawData.reducer;