import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addReport:{
        isOpen: false,
        data:null,
        
    },
    addClaim:{
        isOpen: false,
        data:null,
    },
    editReport:{
        isOpen: false,
        data:null,
    },
    editClaim:{
        isOpen: false,
        data:null,
    }
};

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        openForm: (state, action) => {
            state[action.payload.formName].isOpen = true;
            state[action.payload.formName].data = action.payload.data;
        },
        closeForm: (state, action) => {
            state[action.payload.formName].isOpen = false;
            state[action.payload.formName].data = action.payload.data;
        },
    }
});

export const { openForm, closeForm } = formSlice.actions;

export default formSlice.reducer;

