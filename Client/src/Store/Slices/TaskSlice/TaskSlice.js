import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const TaskSlice = createSlice({
   
    name:'task',
    initialState,
    reducers:{
        addTask : (state,action) => {
            state.push(action.payload);
        },
        removeTask : (state,action) => {
            state.splice(state.indexOf(action.payload),1);
        },
        setTask : (state,action) => {
            return action.payload;
        }
    }
})

export const { addTask, removeTask, setTask } = TaskSlice.actions;

export default TaskSlice.reducer;