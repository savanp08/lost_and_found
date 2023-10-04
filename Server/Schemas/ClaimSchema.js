import mongoose from "mongoose";

const ClaimSchemaX = mongoose.Schema({
    userId:[],
    reportId:{
        type:String,
        required:false,
        unique:true
    }
})

const ClaimSchema  = mongoose.model("claimschema",ClaimSchemaX);

export default ClaimSchema;
