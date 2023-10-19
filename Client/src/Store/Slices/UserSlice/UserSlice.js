import { createSlice ,nanoid } from '@reduxjs/toolkit';
import{initialState_user} from "../../../Components/Data/Schemas.js";

const initialState = initialState_user;

const userSlice = createSlice({

    name : 'user',
    initialState,
    reducers:{
        addUser : (state, action) => {
             return action.payload;
        },
        getUser : (state,action) => {
            return state;
        },
        removeUser : (state,action) => {
            state = {...initialState};
        },
        updateUser :(state,action) => {
            state =  {...action.payload};
        },
        default : (state, action) => {
            return {...state};
        },
},
});

export const { addUser, removeUser, updateUser,getUser} = userSlice.actions;

export default userSlice.reducer;