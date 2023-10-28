import userSchema from "../../Schemas/UserSchema.js";
import express from "express";

const userRouter  = express.Router();

userRouter.get('/getAllUsers', async (req,response)=>{
    try{
        // console.log("user search fired",req.body);

        userSchema.find().
        then(res=>{
            // console.log("users returning to client",res);
            return response.status(200).send(res);
        }).catch(err=>{
            consoe.log("Error while searching for users",err.message);
            return response.status(500).send(err.message);
        })

    }
    catch(err){
        // console.log("error while searching for users",err.message);
        return response.status(500).send(err.message);
    }
})

userRouter.post('./UpdateAll', async (req,response)=>{
    try{
        // console.log("user update fired",req.body);
        userSchema.update({ _id : { $in : req.body._ids}},{
            $set : {
                ...req.body
            }
        })
        .then(res=>{
            // console.log("users updated",res);
            response.status(200).send(res);
        })
        .catch(err=>{
            consoe.log("error while updating user",err.message);
            response.status(500).send(err.message);
        });

    }
    catch(err){
        // console.log("erorr while updating users",err.message);
    }
})

  userRouter.get(`/getManyUsers/:userId`, async (req,response)=>{
    try{
        // console.log("get many users fired",req.params);
        const users = await userSchema.find({_id : {
            $in : req.params._ids
        }});
        // console.log("fetched users",users);
        return response.status(200).send(users);
    }
    catch(err){
        // console.log("error fetching users",err.message);
        return response.status(500).send(err.message);
    }
  })

 userRouter.get("/getOneUser/:userId", async (req,response)=>{
   // console.log("get one user fired",req.params);
    try{
        const user = await userSchema.findOne({_id : req.params._id});
        // console.log("fetched user",user);
        return response.status(200).send(user);
    }
    catch(err){
        // console.log("error fetching one user",err.message);
    }
 })


 export default userRouter;