import { createSlice,nanoid } from '@reduxjs/toolkit';
import  {initialState_report} from "../../../Components/Data/Schemas.js";

const initialState = initialState_report;
const ReportSlice = createSlice({
    name: 'report',
    initialState,
    reducers:{
        addReport : (state, action) => {
          
            return {...action.payload};
        },
        getReport : (state, action) => {
            return state;
        }
    }
})

export const { addReport, getReport } = ReportSlice.actions;

export default ReportSlice.reducer;