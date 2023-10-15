import mongoose from "mongoose";
import userSchema from "../../Schemas/UserSchema.js"; 

async function SignUp(req) {
    try {
        const user = new userSchema({
            ...req.body.user,
            password: req.body.password,
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
    try {
        const res = await userSchema.findOne({ email: req.body.email });

        console.log("Account Already Exists", res);

        if (res) {
            return {
                message: "true",
                user: res,
            }
        } else {
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