
import express from "express";
import ClaimSchema from "../../Schemas/ClaimSchema.js";
import mongoose from "mongoose";
import userSchema from "../../Schemas/UserSchema.js";
import { addToReport, addToUser, reportFound } from "../../Controllers/Claims/Claims.js";
import FoundReportSchema from "../../Schemas/FoundReportSchema.js";
import { sendClaimConfirmationMail } from "../../Controllers/Mailer/Mailer.js";


const claimRouter = express.Router();

claimRouter.post('/addClaim', async (req,response)=>{
    try{ 

        //validate claim with joi
        var x=null;
    try{
         x= await ClaimSchema.findOne({userId : req.body.claim.userId , reportId : req.body.claim.reportId});
         // // console.log("repose from finding claim",x);
    }
    catch(err){
        // // console.log("error finding claim",err.message);
    }

    if(x){
        // // console.log("Claim already exists",x);
        return response.status(400).send({ message :"You aready claimed this. Edit the existing claim in your account"});
    }


        
        // // console.log("add claim fired",req.body.claim);
        const claim = new ClaimSchema({
            ...req.body.claim,
            claimId: new mongoose.Types.ObjectId(),
            
        });
          try{
        var saveClaim =await claim.save();
          }
          catch(err){
            // console.log("error adding claim",err);
            return response.status(500).send(err);
          }
          if(saveClaim){
            // console.log("adding claim",saveClaim);
            
            
            try{
            var userOp = await addToUser(saveClaim);
            }
            catch(err){
                // console.log("error while addtoUser adding claim",err);
                return response.status(500).send(err);
            }
            if(userOp.error){
                // console.log("error in userOp adding claim",err);
                return response.status(500).send(err);
            }
           
                // console.log("added claim",userOp);
                try{
               var xx = await addToReport(saveClaim);
                }
                catch(err){
                    // console.log("error  in catch1 while addtoReport adding claim",err);
                    return response.status(500).send(err);
                }
                if(xx.error){
                    // console.log("error in xx.error while addtoReport adding claim",err);
                    return response.status(500).send(err);
                }
                else{
                    // console.log("added claim",xx);
                    try{
                          sendClaimConfirmationMail(saveClaim,req.body.user);
                    }
                    catch(err){
                        // console.log("Error APIs/Claim/Claim.js => 90 error in catch2 while addtoReport adding claim",err);  // 90
                        return response.status(500).send(err);
                    }
                    return response.status(200).send(xx);
                }
               
            

          }
        

    }
    catch(err){
        // console.log("error in final catch adding claim",err.message);
        return response.status(500).send(err.message);
    }
})


claimRouter.get(`/getAllClaims`, async (req,response)=>{

    try{
        // console.log("get many claims fired");
        const claims = await ClaimSchema.find();
        // console.log("fetched claims",claims);
        return response.status(200).send(claims);
    }
    catch(err){
        // console.log("error fetching claims",err.message);
        return response.status(500).send(err.message);
    }
})


claimRouter.get(`/getManyClaims/:userId`, async (req,response)=>{

    try{
        // console.log("get many claims fired",req.params);
        const claims = await ClaimSchema.find({userId : req.params.userId});
        // console.log("fetched claims",claims);
        return response.status(200).send(claims);
    }
    catch(err){
        // console.log("error fetching claims",err.message);
        return response.status(500).send(err.message);
    }
})


   claimRouter.post("/getManyClaims/In/:userId", async (req,response)=>{
    try{
        // console.log("get many claims fired",req.body);
        const claims = await ClaimSchema.find({_id : 
           { $in:     
            req.body.claimIds  }
        });
        // console.log("fetched claims",claims);
        return response.status(200).send(claims);
    }
    catch(err){
        // console.log("error fetching claims",err.message);
        return response.status(500).send(err.message);
    }
   })


 claimRouter.post("/editClaim", async (req,response)=>{
    try{
        // console.log("edit claim fired",req.body);
        const res  = await ClaimSchema.updateOne({ _id : req.body._id},{...req.body});
        if(res.error){
            // console.log("error in edit claim",res.error);
            return response.status(500).send(res.error);

        }
        else{
            // console.log("edited claim",res);
            return response.status(200).send(res);
        }
    }
    catch(err){
        // console.log("error editing claim",err.message);
        return response.status(500).send(err.message);
    }
 });


  claimRouter.post("/deleteClaim", async (req,response)=>{
    try{       
        // console.log("delete claim fired",req.body);
        
        const res  = await ClaimSchema.updateOne({ _id : req.body._id},{
            $set : {
                "delete.status" : "deleted",
            }
        });
        if(res.error){
            // console.log("error in delete claim",res.error);
            return response.status(500).send(res.error);
        }
        else{
            // console.log("deleted claim",res);
            return response.status(200).send(res);
        }
    }
    catch(err){
        // console.log("error deleting claim",err.message);
        return response.status(500).send(err.message);
    }
  });

  claimRouter.post("/editClaim/AssessmentUpdate/Virtual", async (req,response)=>{
    try{
        // console.log("edit virtual Assessment claim fired",req.body);
        const res  = await ClaimSchema.updateOne({ _id : req.body._id},{
            $set : {
                "assessment" : {...req.body.assessment,  "virtualAssessment.date" : Date.now() }
            },
                $push : {
                    updates : "Virtual Assessment Updated",
                },
            
        });
        if(res.error){
            // console.log("error in edit claim",res.error);
            return response.status(500).send(res.error);

        }
        else{
            // console.log("edited claim",res);
            return response.status(200).send(res);
        }
    }
    catch(err){
        // console.log("error editing claim",err.message);
        return response.status(500).send(err.message);
    }
  })

  claimRouter.post("/editClaim/AssessmentUpdate/InPerson", async (req,response)=>{
    try{
        var update = "In Person Assessment Updated";
        if(req.body.assessment.inPersonAssessment.status === "Initiated"){
            update = "In Person Assessment is required at "+
            req.body.assessment.inPersonAssessment.location+"  on "
            +req.body.assessment.inPersonAssessment.date;
        }
        // console.log("edit In Person Assessment claim fired",req.body);
        const res  = await ClaimSchema.updateOne({ _id : req.body._id},{
            $set : {
                "assessment" : {...req.body.assessment,  "inPersonAssessment.date" : Date.now() }
            },
                $push : {
                    updates : update,
                },
        });
        if(res.error){
            // console.log("error in edit claim",res.error);
            return response.status(500).send(res.error);

        }
        else{
            // console.log("edited claim",res);
            if(req.body.assessment.inPersonAssessment.status === "Accepted"){
                try{
                    var x = req.body;
                    delete x._id;
                    var reportUpdated = await FoundReportSchema.updateOne({_id : req.body.reportId},{
                        $set : {
                            ...x,
                        }
                    });
                }
                catch(err){
                    // console.log("Error in updating report about new final claim",err.message);
                    return response.status(500).send(err.message);
                }
            }
        }
    }
    catch(err){
        // console.log("error editing claim",err.message);
        return response.status(500).send(err.message);
    }
  })


   claimRouter.post("/editClaim/PickUp", async (req, response)=>{
    try{
        var x = {
            ...req.body.claim
        }
        delete x._id;
        // console.log("edit pick up claim fired",req.body);
        
        try{
          x=await ClaimSchema.updateOne({ _id : req.body.claim._id},{
            ...x,
        });
        }
    
    catch(err){
        // console.log("Error APIs/Claim/Claims.js => 13 In catch in edit",err.message);   // 13
        return response.status(500).send(err.message);
    }
    if(x.error){
        // console.log("Error APIs/Claim/Claims.js => 14 In catch",x.error)   // 14
        return response.status(500).send(x.error);
    }
    else{
        // console.log("APIs/Claim/Claims.js => 15 edited claim",x);    // 15
        if(req.body.claim.schedule.pickUp.status === "Successful"){
            var y = req.body.update;
            if(y.property === "schedule.pickUp.status"){
               if(y.status !== y.prev){
                if(y.value === "Successful"){
                    const z = await reportFound(req.body.claim);
                }
               }
            }
        }
        return response.status(200).send(x);
    }
}
    catch(err){
        // console.log("Error APIs/Claim/Claims.js => 12 In catch",err)     // 12
    }
   })

export default claimRouter;

