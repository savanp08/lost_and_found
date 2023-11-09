import {
    createSlice
} from '@reduxjs/toolkit';

const initialState = {
    socket: null,
    status: "Disconnected"
}

const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        addSocket : (state, action) => {
            return {...action.payload};
        },
    }
});

 export default socketSlice.reducer;

    export const {
        addSocket,
    } = socketSlice.actions;
