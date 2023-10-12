import { createSlice ,nanoid } from '@reduxjs/toolkit';


const initialState = {
   
    userId: null,
    email:null,
    password:null,
    Name:{
        firstName:"Test User",
        middleName:null,
        lastName:null,
    },
    userType: null,
    UniqueId: null,
    nanoid: null,
    occupation: null,
    gender: null,
    ethnicity: null,
    trusted:false,
    location: {
        university: null,
        street: null,
        apartment: null,
        city: null,
        state: null,
        pinCode : null,
    },
    reports: {
        count: 0,
        itemIds:[],
    },
    searches: {
        count: 0,
        searchIds: [],
    },
    Claims: {
        count: 0,
        itemIds: [],
    }
    
};

const userSlice = createSlice({

    name : 'user',
    initialState,
    reducers:{
        addUser : (state, action) => {
            state = {...action.payload};
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