import mongoose from "mongoose";

const userSchemaX = new mongoose.Schema({
    userId: {
       
        type: 'string',
        
        default: null,
        unique: true,
    },
    email:{
       
        type: 'string',
        
        default: null,
        unique: true,
    },
    password:{
       
        type: 'string',
        
        default: null,
        unique: false,
    },
    Name:{
        firstName:{
           
            type: 'string',
            
            default: null,
        },
        middleName:{
            required: false,
            type: 'string',
            minlength: 0,
            default: null,
        },
        lastName:{
           
            type: 'string',
            
            default: null,
        },
    },
    userType: {
       
        type: 'string',
        minlength: 1,
        default: null,
    },
    UniqueId: {
       
        type: 'string',
        
        default: null,
        unique: true,
    },
    phone:{
        
        type: 'string',
        
        default: null,
        unique: true,
    
    },
    nanoid: {
       
        type: 'string',
        
        default: null,
        unique: true,
    },
    occupation: {
       
        type: 'string',
        
        default: null,
    },
    gender: {
        required: false,
        type: 'string',
        minlength: 0,
        default: null,
    },
    ethnicity: {
        required: false,
        type: 'string',
        minlength: 0,
        default: null,
    },
    trusted:{
       
        type: Boolean,
        default: false,
    },
    location: {
        university: {
            
            type: 'string',
            
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
        coordinates : {
            lat: {
                
                type: String ,
                default: null,
            },
            lng: {
                
                type:  String,
                default: null,
            },
        },
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
        }
    },
    reports: {
        count: {
            required: false,
            type: Number,
            default: 0,
        },
        reportIds:[{
            type:mongoose.Types.ObjectId,
        }],
    },
    searches: {
        count: {
            required: false,
            type: Number,
            default: 0,
        },
        searchIds:[{
            type:mongoose.Types.ObjectId,
        }],
    },
    claims: {
        count: {
            required: false,
            type: Number,
            default: 0,
        },
        claimIds:[{
            type:mongoose.Types.ObjectId,
        }],
        reportIds:[{
            type:mongoose.Types.ObjectId,
        }]
    },
    verified:{
        status:{
            type:Boolean,
            default:false
        },
        date:{
            type:Date,
            default:null
        },
        },
},{timestamps: true});

const userSchema = mongoose.model('userSchema',userSchemaX);
export default userSchema;