import mongoose from "mongoose";

const GMapX = new mongoose.Schema({
    searchString:{
        type: String,
        required: true,
    },
    data:{
        type: Array,
        required: true,
    }
},{timestamps:true});

const GMap = mongoose.model("GMap", GMapX);

export default GMap;