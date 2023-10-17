
import express from "express";
import ClaimSchema from "../../Schemas/ClaimSchema.js";
import mongoose from "mongoose";


const claimRouter = express.Router();

claimRouter.post('/addClaim', async (req,response)=>{
    try{ 

        //validate claim with joi
        
        console.log("add claim fired",req.body);
        const claim = new ClaimSchema({
            ...req.body.claim,
            claimId: new mongoose.Types.ObjectId(),
            
        });
          
        claim.save()
        .then(res=>{
            console.log("added claim",res);
           return response.status(200).send(res);
        }).catch(err=>{
            console.log("error adding claim",err);
            return response.status(500).send(err);
        })

    }
    catch(err){
        console.log("error adding claim",err.message);
        return req.status(500).send(err.message);
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




export default claimRouter;

