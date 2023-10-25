import mongoose from 'mongoose';

const FoundReportSchemaX = new mongoose.Schema({

    reportId:{
        unique: true,
        minlength:1,
        type:mongoose.Types.ObjectId,
        default:null,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        default:null,
        required:true,
    },

    reporterName:{
        firstNAme:{
            type: String,
            unique:false,
        },
        middleName:{
            type:String,
            unique:false,
            required:false,
        },
        lastName:{
            type:String,
            unique:false,
            required: false,
        }
        },
        coordinates:{
            lat:{
                type: String,
                default: null,
            },
            lng:{
                type: String,
                default: null,
            },
        },
        itemDetails:{
            common_type:{
                type:String,
                unique:false,
            },
            colors:[],
            customItemName:{
                type:String,
                unique:false,
            },
            description:{
                type:String,
            },
            location:{
                allPlacesPossible:[],
                buildingDetails:{
                    required: false,
                    type: 'string',
                    default: null,
                },
                university: {
                    type: 'string', 
                    minlength: 2,
                    default: null,
                },
                street: {
                    type: 'string', 
                    default: null,
                },
                apartment: {
                    type: 'string',
                    default: null,
                },
                city: {
                    type: 'string',
                    default: null,
                },
                state: {
                    type: 'string',
                    default: null,
                },
                pinCode : {
                    type: 'string',
                    default: null,
                },
                coordinates : {
                    lat: {
                        type: String,
                        default: null,
                    },
                    lng: {
                        type: String,
                        default: null,
                    },
                },
                displayAddress: {
                    type:Object,
                },
                GMapData:{
                    rawData:{
                        type : Object
                    },
                    processedData:{
                        location:{
                            type: Object
                        },
                        coordinates:{
                            lat:{
                                type: String,
                                default: null,
                            },
                            lng:{
                                type: String,
                                default: null,
                            },
                        }
                    },
                    rawData_geometric:{
                        type: Object,
                    },
                    markerMoved:{
                        type: Boolean,
                        default: false,
                    },
                },
                media:[],
            },
            belongsTo:{
                type:String,
            unique:false,
            required: false,
            }  
        },
        claims:{
            claimIds:[{
                type:mongoose.Types.ObjectId,
            }],
            userIds:[{
                type: String,
            }]
        },
        found:{
            status:{
                type: Boolean,
            },
            finishedClaimId:{
                type:mongoose.Types.ObjectId
            },
            userId:{
                type:mongoose.Types.ObjectId
            }
            
        },
        custodyAt:{
            type:String,
            
        },
        media:[],
        reporterType:{
            type:String,
        },
        visibility:{
            type:String,
        },
        date:{
            type: Date,
            default: Date.now(),
        },
        delete:{
            status:{
                type:String,
                default:"active"
            }
        },
        updates:[{
            type:String,
        }],
},{timestamps:true})


const FoundReportSchema = mongoose.model("FoundReportSchema",FoundReportSchemaX);

export default FoundReportSchema;