import ClaimSchema from "../../Schemas/ClaimSchema";
import express from "express";

const claimRouter = express.Router();

claimRouter.post('/addClaim', async (req,response)=>{
    try{
        console.log("add claim fired",res);
        const claim = ClaimSchema({
            ...req.body.claim
        });

        claim.save()
        .then(res=>{
            console.log("added claim",res);
            response.status(200).send(res);
        }).catch(err=>{
            console.log("error adding claim",err);
            response.status(500).send(err);
        })

    }
    catch(err){
        console.log("error adding claim",err.message);
    }
})

