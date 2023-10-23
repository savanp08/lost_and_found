import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoaded :false,

}

const mapSlice = createSlice({
    name: "gMap",
    initialState,
    reducers: {
        setIsLoaded: (state, action) => {
            state.isLoaded = action.payload;
        }
    }
});

export const { setIsLoaded } = mapSlice.actions;

export default mapSlice.reducer;