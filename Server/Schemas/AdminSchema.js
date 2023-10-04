import mongoose from 'mongoose';

const adminSchemaX = new mongoose.Schema({
 
    email:{
        type: 'string',
        required : true,
        minlength: 1,
        default:null,
        unique: true,
    },
    password:{
        type: 'string',
        required : true,
        minlength: 1,
        default:null,
        unique: false,
    },
    adminId :{
        type:'string',
        required: true,
        minlength: 1,
        unique:true,
        default:null,
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
    }
},{timestamps: true});

const adminSchema = mongoose.model("adminschema",adminSchemaX);
export default adminSchema;