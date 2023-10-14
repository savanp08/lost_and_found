import { createSlice,nanoid } from '@reduxjs/toolkit';

const initialState = {
    _id:null,
    reporterId: null,
    reporterName: {
      firstName: null,
      middleName: null,
      lastName: null,
    },
    itemDetails: {
      common_type: null,
      colors: [],
      customItemName: null,
      description: null,
      location: {
        allPlacesPossible: [],
        buildingDetails: null,
        university: null,
        street: null,
        apartment: null,
        city: null,
        state: null,
        pinCode: null,
        media: [],
      },
    },
      belongsTo: null,
      claims: [],
      found: {
        status: null,
        userId: null,
      },
      submittedAt: null,
      media: [],
      reporterType: null,
    
};

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