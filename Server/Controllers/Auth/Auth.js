import mongoose from "mongoose";
import userSchema from "../../Schemas/UserSchema.js"; 

async function SignUp(req) {
    try {
        console.log("In function SignUp => Account creation requested for ", req.body);
        const user = new userSchema({
            ...req.body.user,
            password: req.body.password,
            email : req.body.user.email.toLowerCase(),
            UniqueId : req.body.user.UniqueId.toLowerCase(),
        });
        
        console.log("In function SignUp => Account creation requested for ");
        
        const res = await user.save();

        return {
            message: "success",
            user: res,
        };
    } catch (err) {
        console.log("Error in SignUp", err);
        return {
            message: "error",
            error: err.message,
            user : null,
        };
    }
}


async function userExists(req) {
    console.log("In method userExists => Checking if user exists", req);

    try {
        console.log("Searching for user with email", req.email); 
        const res = await userSchema.findOne({ email: req.email.toLowerCase() });

        

        if (res) {
            console.log("Account Already Exists", res); 
            return {
                message: "true",
                user: res,
            }
        } else {
            console.log("Account Does Not Exists",res); 
            return {
                message: "false",
                user: null,
            }
        }
    } catch (err) {
        console.log("Error searching for user", err.message);
        return "error";
    }
}


export {
    SignUp,
    userExists,
}