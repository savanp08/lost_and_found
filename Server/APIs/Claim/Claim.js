
import express from "express";
import ClaimSchema from "../../Schemas/ClaimSchema.js";
import mongoose from "mongoose";
import userSchema from "../../Schemas/UserSchema.js";
import { addToReport, addToUser } from "../../Controllers/Claims/Claims.js";


const claimRouter = express.Router();

claimRouter.post('/addClaim', async (req,response)=>{
    try{ 

        //validate claim with joi
        var x=null;
    try{
         x= await ClaimSchema.findOne({userId : req.body.claim.userId , reportId : req.body.claim.reportId});
         console.log("repose from finding claim",x);
    }
    catch(err){
        console.log("error finding claim",err.message);
    }

    if(x){
        console.log("Claim already exists",x);
        return response.status(400).send({ message :"You aready claimed this. Edit the existing claim in your account"});
    }


        
        console.log("add claim fired",req.body.claim);
        const claim = new ClaimSchema({
            ...req.body.claim,
            claimId: new mongoose.Types.ObjectId(),
            
        });
          try{
        var saveClaim =await claim.save();
          }
          catch(err){
            console.log("error adding claim",err);
            return response.status(500).send(err);
          }
          if(saveClaim){
            console.log("adding claim",saveClaim);
            
            
            try{
            var userOp = await addToUser(saveClaim);
            }
            catch(err){
                console.log("error while addtoUser adding claim",err);
                return response.status(500).send(err);
            }
            if(userOp.error){
                console.log("error in userOp adding claim",err);
                return response.status(500).send(err);
            }
           
                console.log("added claim",userOp);
                try{
               var xx = await addToReport(saveClaim);
                }
                catch(err){
                    console.log("error  in catch1 while addtoReport adding claim",err);
                    return response.status(500).send(err);
                }
                if(xx.error){
                    console.log("error in xx.error while addtoReport adding claim",err);
                    return response.status(500).send(err);
                }
                else{
                    console.log("added claim",xx);
                    return response.status(200).send(xx);
                }
               
            

          }
        

    }
    catch(err){
        console.log("error in final catch adding claim",err.message);
        return response.status(500).send(err.message);
    }
})


claimRouter.get(`/getAllClaims`, async (req,response)=>{

    try{
        console.log("get many claims fired");
        const claims = await ClaimSchema.find();
        console.log("fetched claims",claims);
        return response.status(200).send(claims);
    }
    catch(err){
        console.log("error fetching claims",err.message);
        return response.status(500).send(err.message);
    }
})


claimRouter.get(`/getManyClaims/:userId`, async (req,response)=>{

    try{
        console.log("get many claims fired",req.params);
        const claims = await ClaimSchema.find({userId : req.params.userId});
        console.log("fetched claims",claims);
        return response.status(200).send(claims);
    }
    catch(err){
        console.log("error fetching claims",err.message);
        return response.status(500).send(err.message);
    }
})

 claimRouter.post("/editClaim", async (req,response)=>{
    try{
        console.log("edit claim fired",req.body);
        const res  = await ClaimSchema.updateOne({ _id : req.body._id},{...req.body});
        if(res.error){
            console.log("error in edit claim",res.error);
            return response.status(500).send(res.error);

        }
        else{
            console.log("edited claim",res);
            return response.status(200).send(res);
        }
    }
    catch(err){
        console.log("error editing claim",err.message);
        return response.status(500).send(err.message);
    }
 });


  claimRouter.post("/deleteClaim", async (req,response)=>{
    try{       
        console.log("delete claim fired",req.body);
        
        const res  = await ClaimSchema.updateOne({ _id : req.body._id},{
            $set : {
                "delete.status" : "deleted",
            }
        });
        if(res.error){
            console.log("error in delete claim",res.error);
            return response.status(500).send(res.error);
        }
        else{
            console.log("deleted claim",res);
            return response.status(200).send(res);
        }
    }
    catch(err){
        console.log("error deleting claim",err.message);
        return response.status(500).send(err.message);
    }
  });

  claimRouter.post("/editClaim/AssesmentUpdate/Virtual", async (req,response)=>{
    try{
        console.log("edit virtual Assessment claim fired",req.body);
        const res  = await ClaimSchema.updateOne({ _id : req.body._id},{
            $set : {
                "assesment" : req.body.assesment,
            }
        });
        if(res.error){
            console.log("error in edit claim",res.error);
            return response.status(500).send(res.error);

        }
        else{
            console.log("edited claim",res);
            return response.status(200).send(res);
        }
    }
    catch(err){
        console.log("error editing claim",err.message);
        return response.status(500).send(err.message);
    }
  })


export default claimRouter;

