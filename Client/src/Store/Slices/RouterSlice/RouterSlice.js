import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const RouterSlice = createSlice({

    name:'router',
    initialState,
    reducers:{

        addRoute : (state,action) => {
            state.push(action.payload);
        },
        removeRoute : (state,action) => {
            state.splice(state.indexOf(action.payload),1);
        },
        setRouter : (state,action) => {
            return action.payload;
        }
    }

});

export const { addRoute, removeRoute, setRouter } = RouterSlice.actions;

export default RouterSlice.reducer;