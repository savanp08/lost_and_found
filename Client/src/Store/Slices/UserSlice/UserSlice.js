import { createSlice ,nanoid } from '@reduxjs/toolkit';


const initialState = {
   
    userId: null,
    email:null,
    Name:{
        FirstName:null,
        MiddleName:null,
        LastName:null,
    },
    userType: null,
    UniqueId: null,
    nanoid: null,
    userName:null,
    occupation: null,
    gender: null,
    ethnicity: null,
    trusted:null,
    location: {
        university: null,
        street: null,
        apartment: null,
        city: null,
        state: null,
        pinCode : null,
    },
    reports: {
        count: null,
        itemIds:[],
    },
    searches: {
        count: null,
        searchIds: [],
    },
    Claims: {
        count: null,
        itemIds: [],
    }
    
};

const userSlice = createSlice({

    name : 'user',
    initialState,
    reducers:{
        addUser : (state, action) => {
            const user = action.payload.user;
            state.user = user;
        },
        getUser : (state,action) => {
            return state.user;
        },
        removeUser : (state,action) => {
            state.user = initialState;
        },
        updateUser :(state,action) => {
            state.user =  action.payload.user;
        },
        default : (state, action) => {
            return state;
        },
},
});

export const { addUser, removeUser, updateUser,getUser} = userSlice.actions;

export default userSlice.reducer;