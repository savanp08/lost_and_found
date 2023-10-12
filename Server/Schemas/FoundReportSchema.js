import mongoose from 'mongoose';

const FoundReportSchemaX = new mongoose.Schema({

    reportId:{
        
        unique: true,
        minlength:1,
        type:mongoose.Types.ObjectId,
        default:null,
    },

    reporterName:{
        firstNAme:{
            type: String,
            unique:false,
            
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
            required: false,
            minlength: 1,
        }
        },
        itemDetails:{
            common_type:{
                type:String,
                unique:false,
                
                minlength:1
            },
            colors:[],
            customItemName:{
                type:String,
                unique:false,
                
                minlength:1
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
                    minlength: 1,
                    default: null,
                },
                apartment: {
                    
                    type: 'string',
                    minlength: 1,
                    default: null,
                },
                city: {
                    
                    type: 'string',
                    minlength: 1,
                    default: null,
                },
                state: {
                    
                    type: 'string',
                    minlength: 1,
                    default: null,
                },
                pinCode : {
                    
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
            finishedClaimId:{
                type:mongoose.Types.ObjectId
            },
            
        },
        submittedAt:{
            type:String,
            
        },
        media:[],
        reporterType:{
            type:String,
        },
        visibility:{
            type:String,
        }
})


const FoundReportSchema = mongoose.model("FoundReportSchema",FoundReportSchemaX);

export default FoundReportSchema;