
import express from "express";
import ClaimSchema from "../../Schemas/ClaimSchema.js";

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






export default claimRouter;

