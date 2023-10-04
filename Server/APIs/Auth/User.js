import userSchema from "../../Schemas/UserSchema";
import express from "express";

const userRouter  = expressRouter();

userRouter.post('/FindAll', async (req,response)=>{
    try{
        console.log("user search fired",req.body);

        userSchema.find({ _id : req.body._id }).
        then(res=>{
            console.log("users returning to client",res);
            resposne.status(200).send(res);
        }).catch(err=>{
            consoe.log("Error while searching for users",err.message);
        })

    }
    catch(err){
        console.log("error while searching for users",err.message);
    }
})

userRouter.post('./UpdateAll', async (req,response)=>{
    try{
        console.log("user update fired",req.body);
        userSchema.update({ _id : { $in : req.body._id}})
        .then(res=>{
            console.log("users updated",res);
            response.status(200).send(res);
        })
        .catch(err=>{
            consoe.log("error while updating user",err.message);
            response.status(500).send(err.message);
        });

    }
    catch(err){
        console.log("erorr while updating users",err.message);
    }
})

