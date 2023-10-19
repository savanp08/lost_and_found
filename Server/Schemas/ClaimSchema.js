import mongoose from "mongoose";
 
const ClaimSchemaX = new mongoose.Schema({
    claimId:{
        type:mongoose.Types.ObjectId,
        required:true,
        unique:true
    },
    reportId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
        
    },
    ownership:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    delete:{
        status:{
            type:String,
            default:"active",
        }
    },
    status:{
        type:String,
        default:"pending",
    },
    assesment:{
        virtualAssesment:{
            status:{
                type:String,
                default:"Not Initiated",
            },
            comment:{
                type:String
            },
            date:{
                type:Date,
            }
        },
        inPersonAssessment:{
            status:{
                type:String,
                default:"Not Initiated",
            },
            comment:{
                type:String
            },
            date:{
                type:Date,
            },
            location:{
                type:String,
            },
            }
        },
    },
    supportingDocuments:[{
        type:String,
    }],
    date:{
        type: Date,
        default: Date.now(),
    },
    updates:[{
        type:String,
    }],
},{timestamps:true})

const ClaimSchema  = mongoose.model("claimschema",ClaimSchemaX);

export default ClaimSchema;
