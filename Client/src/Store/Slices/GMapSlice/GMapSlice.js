import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoaded :false,
    status: "Not loaded"
}

const mapSlice = createSlice({
    name: "gMap",
    initialState,
    reducers: {
        setIsLoaded: (state, action) => {
            return  {
                ...state,
                ...action.payload
            
            }
            
        }
    }
});

export const { setIsLoaded } = mapSlice.actions;

export default mapSlice.reducer;