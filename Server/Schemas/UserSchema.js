import mongoose from "mongoose";

const userSchemaX = new mongoose.Schema({
    userId: {
        required: true,
        type: 'string',
        minlength: 3,
        default: null,
        unique: true,
    },
    email:{
        required: true,
        type: 'string',
        minlength: 3,
        default: null,
        unique: true,
    },
    password:{
        required: true,
        type: 'string',
        minlength: 3,
        default: null,
        unique: false,
    },
    Name:{
        firstName:{
            required: true,
            type: 'string',
            minlength: 2,
            default: null,
        },
        middleName:{
            required: false,
            type: 'string',
            minlength: 0,
            default: null,
        },
        lastName:{
            required: true,
            type: 'string',
            minlength: 2,
            default: null,
        },
    },
    userType: {
        required: true,
        type: 'string',
        minlength: 1,
        default: null,
    },
    UniqueId: {
        required: true,
        type: 'string',
        minlength: 3,
        default: null,
        unique: true,
    },
    phone:{
        
        type: 'string',
        minlength: 3,
        default: null,
        unique: true,
    
    },
    nanoid: {
        required: true,
        type: 'string',
        minlength: 3,
        default: null,
        unique: true,
    },
    occupation: {
        required: true,
        type: 'string',
        minlength: 3,
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
        required: true,
        type: Boolean,
        default: false,
    },
    location: {
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
    }
},{timestamps: true});

const userSchema = mongoose.model('userSchema',userSchemaX);
export default userSchema;