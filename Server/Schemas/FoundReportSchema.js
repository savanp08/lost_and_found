import mongoose from 'mongoose';

const FoundReportSchemaX = mongoose.model({

    reportId:{
        required:true,
        unique: true,
        minlength:1,
        type:mongoose.Types.ObjectId,
        default:null,
    },

    reporterName:{
        firstNAme:{
            type: String,
            unique:false,
            required:true,
            minlength: 1,
        },
        middleName:{
            type:String,
            unique:false,
            required:false,
            minlength:1,
        },
        lastName:{
            type:String,
            unique:false,
            required: true,
            minlength: 1,
        }
        },
        itemDetails:{
            common_type:{
                type:String,
                unique:false,
                required:true,
                minlength:1
            },
            color:{
                type:String,
                unique:false,
                required:true,
                minlength:1
            },
            customItemName:{
                type:String,
                unique:false,
                required:true,
                minlength:1
            },
            loctation:{
                allPlacesPossible:[],
                buildingDetails:{
                    required: false,
                    type: 'string',
                    default: null,
                },
                university: {
                    required: true,
                    type: 'string',
                    minlength: 2,
                    default: null,
                },
                street: {
                    required: true,
                    type: 'string',
                    minlength: 1,
                    default: null,
                },
                apartment: {
                    required: true,
                    type: 'string',
                    minlength: 1,
                    default: null,
                },
                city: {
                    required: true,
                    type: 'string',
                    minlength: 1,
                    default: null,
                },
                state: {
                    required: true,
                    type: 'string',
                    minlength: 1,
                    default: null,
                },
                pinCode : {
                    required: true,
                    type: 'string',
                    minlength: 1,
                    default: null,
                },
                media:[],
            },
            belongsTo:{
                type:String,
            unique:false,
            required: false,
            minlength: 1,
            }
        },
        claims:{
            claimIds:[]
        },
        found:{
            status:{
                type: Boolean,
                required:false,
            },
            userId:{
                type:mongoose.Types.ObjectId,
                required : true,
            }
        },
        submittedAt:{
            type:String,
            required:true,
        },
        media:[],
})


const FoundReportSchema = mongoose.model("FoundReportSchema",FoundReportSchemaX);

export default FoundReportSchema;