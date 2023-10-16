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
    }
})

const ClaimSchema  = mongoose.model("claimschema",ClaimSchemaX);

export default ClaimSchema;
