import express from "express";
import userSchema from "../../Schemas/UserSchema.js";

const authRouter = express.Router();

authRouter.post('/SignUp', async (req,response)=>{
    try{
    const user = new userSchema({
        ...req.body.user
    })
    console.log("Account creation requested for ", user);
    user.save().then(res=>{
        response.status(200).send(res);
        console.log("Created new User Account",user," with Id" ,res);
    })

}
catch(err){
    console.log("Error in Try while creating new User Account",err);
}
})



export default authRouter;