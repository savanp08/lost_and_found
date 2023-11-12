
const initialState_report = {
    _id : null,
  reportId: null,
userId: null,

reporterName:{
    firstNAme: null,
    middleName: null,
    lastName: null,
    },
    coordinates:{
        lat: 32.7310,
        lng: -97.1150,
      },
    itemDetails:{
        common_type: null,
        colors:[],
        customItemName: null,
        description: null,
        location:{
            allPlacesPossible:[],
            buildingDetails: null,
            university: null,
            street: null,
            apartment: null,
            city: null,
            state: null,
            pinCode : null,
            coordinates:{
                lat: 32.7310,
                lng: -97.1150,
              },
            displayAddress: {
                streetAddress1: "",
                  streetAddress2: "",
                  buildingDetails: "",
                  county: "",
                  city: "",
                  state: "",
                  zipCode: "",
                  searchAddress:"",
                  coordinates:{
                    lat: 32.7310,
                    lng: -97.1150,
                  },
                },
            GMapData:{
                rawData: null,
                processedData:{
                    location : null,
                    coordinates : {
                        lat: null,
                        lng: null,
                    },
                },
                rawData_geometric:null ,
                markerMoved: false,
        },
            media:[],
        },
            
            
        belongsTo: null,
    },
    claims:{
        claimIds:[],
        userIds:[]
    },
    found:{
        status: null,
        finishedClaimId: null,
        userId: null,
        
    },
    custodyAt: null,
    media:[],
    reporterType: null,
    visibility: null,
    date: null,
    delete:{
        status: null,
    },
    updates:[],
    
}

const initialState_user = {
    _id : null,
    userId: null,
    email:null,
    password:null,
    Name:{
        firstName:null,
        middleName:null,
        lastName:null,
    },
    userType: null,
    UniqueId: null,
    phone:null,
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
        coordinates : {
            lat: null,
            lng: null,
        },
    },
    reports: {
        count: 0,
        reportIds:[],
    },
    searches: {
        count: 0,
        searchIds: [],
    },
    claims: {
        count: 0,
       reportIds: [],
       claimIds: [],
    },
    verified:{
        status:false,
        date:null,
    },
    
}

const initialState_claim = {
    claimId: null,
    reportId: null,
    userId: null,
    ownership: null,
    description: null,
    delete: {
        status: null,
    },
    status: null,
    assessment: {
        virtualAssessment: {
            status: null,
            comment: null,
            date: null
        },
        inPersonAssessment: {
            status: null,
            comment: null,
            date: null,
            location: null,
            allPossibleLocations: []
        }
    },
    supportingDocuments: [],
    date: null,
    updates: []
};


export {
    initialState_report,
    initialState_user,
    initialState_claim,
}