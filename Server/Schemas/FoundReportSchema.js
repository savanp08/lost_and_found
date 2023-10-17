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
                media:[],
            },
            belongsTo:{
                type:String,
            unique:false,
            required: false,
            
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
},{timestamps:true})


const FoundReportSchema = mongoose.model("FoundReportSchema",FoundReportSchemaX);

export default FoundReportSchema;