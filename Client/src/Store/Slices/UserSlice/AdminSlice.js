import { createSlice ,nanoid } from '@reduxjs/toolkit';


const initialState = {
   
    adminId: null,
    email:null,
    _id : null,
    Name:{
        firstName:"Test Admin",
        middleName:null,
        lastName:null,
    },  
};

const adminSlice = createSlice({

    name : 'admin',
    initialState,
    reducers:{
        addAdmin : (state, action) => {
             return action.payload;
        },
        getAdmin : (state,action) => {
            return state;
        },
        removeAdmin : (state,action) => {
            return {...initialState};
        },
        updateAdmin :(state,action) => {
            return {...action.payload};
        },
        default : (state, action) => {
            return {...state};
        },
},
});

export const { addAdmin, removeAdmin, updateAdmin,getAdmin} = adminSlice.actions;

export default adminSlice.reducer;