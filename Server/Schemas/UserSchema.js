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
    Name:{
        FirstName:{
            required: true,
            type: 'string',
            minlength: 2,
            default: null,
        },
        MiddleName:{
            required: false,
            type: 'string',
            minlength: 0,
            default: null,
        },
        LastName:{
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
    nanoid: {
        required: true,
        type: 'string',
        minlength: 3,
        default: null,
        unique: true,
    },
    userName:{
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
    },
    reports: {
        count: {
            required: false,
            type: Number,
            default: 0,
        },
        itemIds:{
            required: false,
            type: [],
            default: [],
        },
    },
    searches: {
        count: {
            required: false,
            type: Number,
            default: 0,
        },
        searchIds:{
            required: false,
            type: [],
            default: [],
        },
    },
    Claims: {
        count: {
            required: false,
            type: Number,
            default: 0,
        },
        claimIds:{
            required: false,
            type: [],
            default: [],
        },
    }
},{timestamps: true});

const userSchema = mongoose.model('userSchema',userSchemaX);
export default userSchema;