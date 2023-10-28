import mongoose from "mongoose";
import FoundReportSchema from "../../Schemas/FoundReportSchema.js";
import ClaimSchema from "../../Schemas/ClaimSchema.js"
import UserSchema from "../../Schemas/UserSchema.js"
import userSchema from "../../Schemas/UserSchema.js";

async function addDefaultClaim(req){
    // console.log("add default claim fired =>",req);
var newClaim = new ClaimSchema({
    claimId: new mongoose.Types.ObjectId(),
    reportId:req._id,
    userId:req.userId,
    ownership:"User",
    description: "This is a system generated description. It is generated on behalf of the user who has reported the lost property"
}); 

   const x  = await newClaim.save();
   if(x && x.claimId){
     return{
         message : true,
         claim : x
     };
   }
   else{
         return{
              message:false,
              claim:null
         }
   }

}

 async function addToUser(req){
    // console.log("Method add to user fired =>",req);
    try{
   var x= await userSchema.updateOne({_id : req.userId},{ 
    $push: {
        "claims.claimIds": req._id,
        "claims.reportIds": req.reportId,
      }
    });
    if(x.error){
        // console.log("In method add to user=> error adding claim to user",x.error);
    return {
        message : false,
        error : err
    }
    }
    else{
        // console.log("In method add to user=> claim added to user",x);
        
    return {
        message : true,
        error : null
    }
    }
}
catch(err){
    // console.log("In method add to user=> error adding claim to user",err);
    return {
        message : false,
        error : err
    }
}
 }


 async function addToReport(req){
    var x = null
    try{
   x = await FoundReportSchema.updateOne({_id : req.reportId},{
          $push:{
            "claims.claimIds" : req._id,
            "claims.userIds" : req.userId,
          }
    })
}
catch(err){
    // console.log("In method add to report=> error in catchX adding claim to report",err);
    return {
        message : false,
        error : err,
    }
}
if(x.error){
    // console.log("In method add to report=> error adding claim to report",x.error);
    return {
        message : false,
        error : x.error,
    }
}
else{ 
    // console.log("In method add to report=> claim added to report",x);
    return {
        message : true,
        error : null,
    }
}

    

 }

async function reportFound(req){
    // console.log("Method add claim to report found fired =>",req);
    try{
        try{
        const x = await FoundReportSchema.updateOne({_id : req.reportId},{
            found : {
                status : true,
                finishedClaimId : req._id,
                userId : req.userId,
            }
        });
        if(x.error){
            // console.log("In method report found=> error in in finding report in adding claim to report",x.error);
            return {
                message : false,
                error : x.error,
            }
        }
        else{
            
        }
        }catch(e){
            // console.log("In method report found=> error in tryX adding claim to report",e);
            return {
                message : false,
                error : e,
            }
        }
        
        
    }
    catch(err){
        // console.log("In method report found=> error in catchX adding claim to report",err);
        return {
            message : false,
            error : err,
        }
    }
}

export {
    addDefaultClaim,
    addToUser,
    addToReport,
    reportFound,
}