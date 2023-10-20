import express, { response } from 'express';
import FoundReportSchema from '../../Schemas/FoundReportSchema.js'; 
import LostReportSchema from '../../Schemas/LostReportSchema.js';
import Joi from 'joi';
import multer from 'multer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import multerUpload from '../../MiddleWares/MulterUpload.js';
import cloudinary from '../../EndWares/Cloudinary.js';
import { addDefaultClaim, addToReport, addToUser } from '../../Controllers/Claims/Claims.js';
import { sendSignUpConfirmationMail } from '../../Controllers/Mailer/Mailer.js';

const reportRouter  = express.Router();

  
  async function addMediaToCloudinary(files) {
    try {
      const uploadPromises = files.map(async (file) => {
        var tempFilePath = `./temp`;
        
  
        return new Promise(async (resolve, reject) => {
           
           cloudinary.uploader.upload_stream( {
            folder: "lost_and_found"
          },
          function(error, result) {
            if(error){
                console.log("Error while uploading each image to cloudinary",error);
                reject(error);
            }
            else{
                console.log("Uploaded Each Image to cloudinary",result.secure_url);
                resolve(result);
            }
              console.log(error, result);
          })
          .end(file.buffer);
           
          });
        });
       

      const URLS = await Promise.all(uploadPromises);
    const secureURLs = URLS.map((result) => result.secure_url);
    return secureURLs;
  } catch (error) {
    console.log('Error while uploading images to Cloudinary:', error);
    return -1;
  }
}
 

reportRouter.post('/addReport', multerUpload.fields([{
    name: "image",
     maxCount: 4
},
{
 name :"ItemImage",
 maxCount: 4
}

]), async (req,response)=>{
    try{
        
        var xx=JSON.parse(req.body.report);
        delete xx._id;
       
        console.log("Found report addition fired",xx);
       
        var newReport  = new FoundReportSchema({
            ...xx, 
            reportId : new mongoose.Types.ObjectId(),
            date : new Date(),
            
        })
        
        
        const joiSchema = Joi.object({
            reporterName : Joi.object({
                firstName :   Joi.string()
                                .pattern(new RegExp('^[a-zA-Z]{1,40}$'))
                                .min(1)
                                .max(40),
                middleName :  Joi.string()
                                .pattern(new RegExp('^[a-zA-Z]{0,40}$'))
                                .min(1)
                                .max(40),
                lastName :  Joi.string()
                                .pattern(new RegExp('^[a-zA-Z]{0,40}$'))
                                .min(1)
                                .max(40),
                                    }),
            itemDetails :  Joi.object({
                common_type: Joi.string()
                                .pattern(new RegExp('^[a-zA-Z]{0,10}$'))
                                .min(1)
                                .max(40),
                colors: Joi.array()
                            .max(100)
                            .items(Joi.string()
                                        .max(30)
                                        .required()),
                cutomItemName: Joi.string()
                                    .max(50)
                                    .min(5)
                                    .required(),
                description : Joi.string().max(800),
                location : Joi.object({
                                    allPlacesPlossible : Joi.array()
                                                            .max(100)
                                                            .items(Joi.string().max(200)),
                buildingDetails: Joi.string().max(100).required(),
                university: Joi.string().max(30),
                street : Joi.string().max(70).required(),
                apartment : Joi.string().max(80),
                city : Joi.string().max(50).required(),
                state : Joi.string().max(50).required(),
                pincode : Joi.string().max(5).required(),
                media:Joi.string(),
                }),
                belongsTo : Joi.string().max(50),
            }),
            found : Joi.object({
                status: Joi.bool(),
                
            }),
            sumbittedAt : Joi.string().max(100),
            claims : Joi.array().items(Joi.string().max(80)),
            media: Joi.array().items(Joi.string()),
            reporterType : Joi.string().max(10).required(),
        });

       
        var yy=req.files["image"];
        var zz=req.files["ItemImage"] || [];
        // console.log("zz => ",zz);
        // console.log("yy => ",yy);
        const addMediaResponse = await addMediaToCloudinary(yy);
        var ItemMedia = [];
        if(zz.length > 0){
          ItemMedia = await addMediaToCloudinary(zz);
        }
        console.log("addMediaResponse => ",addMediaResponse);
        newReport.itemDetails.location.media = addMediaResponse;

        const { value, error } = joiSchema.validate(newReport);
        //console.log("Validation result =>", value, "  error =>",error);
        var reportSave = null;
              try{
          reportSave = await newReport.save();
    }
    catch(err){
        console.log("erorr4 in Found rport addition ", err);
        return response.status(400).send(err.message);
    }
          if(reportSave){
            console.log("New Found Report Saved",reportSave);
            const addClaim = await addDefaultClaim(reportSave);

            if(addClaim.message){
             console.log("Successfully added default claim to the report",addClaim.claim);
             var addtouser = null;
             try{
                 addtouser = await addToUser(addClaim.claim);
             }
             catch(err){
                 console.log("Error in catch1 while adding claim to user",err);
                 return response.status(400).send(err);
             }
             if(addtouser.err){
                 console.log("Error while adding claim to user",addtouser.err);
                 return response.status(400).send(addtouser.err);
             }
             var addtoreport = null;
             try{
                 addtoreport = await addToReport(addClaim.claim);
     
             }
             catch(err){
                 console.log("Error in catch2 while adding claim to report",err);
                 return response.status(400).send(err);
             }
             if(addtoreport.error){
                 console.log("Error while adding claim to report",addtoreport.err);
                 return response.status(400).send(addtoreport.error);
             }
             else{
                    console.log("Successfully added claim to report",addtoreport);
                    return response.status(200).send(reportSave);
             }
            }
            else {
                console.log("Error10 while adding default claim to the report",addClaim.message);
                return response.status(400).send(addClaim.message); }
     
        }
        else{
            console.log("Error 6 found while saving Found Report",err.message);
            return response.status(400).send(err.message);
        }
    }
    catch(err){
        console.log("erorr in Found rport addition ", err);
    }
})

  reportRouter.post('/EditReport' ,multerUpload.fields([{
       name: "image",
        maxCount: 4
  },
  {
    name :"ItemImage",
    maxCount: 4
  }

]), async(req, response)=>{
    try{
        
        var xx=JSON.parse(req.body.report);
        var yy=req.files;
        console.log("Files =>>>>>>",yy);
      //  const addMediaResponse = await addMediaToCloudinary(yy);
       // console.log("addMediaResponse => ",addMediaResponse);
        console.log("Found report edit fired",xx);
       
        var newReport  = new FoundReportSchema({
            ...xx,
        })
        
       // newReport.itemDetails.location.media = addMediaResponse;
       
        const joiSchema = Joi.object({
            reporterName : Joi.object({
                firstName :   Joi.string()
                                .pattern(new RegExp('^[a-zA-Z]{1,40}$'))
                                .min(1)
                                .max(40),
                middleName :  Joi.string()
                                .pattern(new RegExp('^[a-zA-Z]{0,40}$'))
                                .min(1)
                                .max(40),
                lastName :  Joi.string()
                                .pattern(new RegExp('^[a-zA-Z]{0,40}$'))
                                .min(1)
                                .max(40),
                                    }),
            itemDetails :  Joi.object({
                common_type: Joi.string()
                                .pattern(new RegExp('^[a-zA-Z]{0,10}$'))
                                .min(1)
                                .max(40),
                colors: Joi.array()
                            .max(100)
                            .items(Joi.string()
                                        .max(30)
                                        .required()),
                cutomItemName: Joi.string()
                                    .max(50)
                                    .min(5)
                                    .required(),
                description : Joi.string().max(800),
                location : Joi.object({
                                    allPlacesPlossible : Joi.array()
                                                            .max(100)
                                                            .items(Joi.string().max(200)),
                buildingDetails: Joi.string().max(100).required(),
                university: Joi.string().max(30),
                street : Joi.string().max(70).required(),
                apartment : Joi.string().max(80),
                city : Joi.string().max(50).required(),
                state : Joi.string().max(50).required(),
                pincode : Joi.string().max(5).required(),
                media:Joi.string(),
                }),
                belongsTo : Joi.string().max(50),
            }),
            found : Joi.object({
                status: Joi.bool(),
                
            }),
            sumbittedAt : Joi.string().max(100),
            claims : Joi.array().items(Joi.string().max(80)),
            media: Joi.array().items(Joi.string()),
            reporterType : Joi.string().max(10).required(),
        });

        const { value, error } = joiSchema.validate(newReport);
        console.log("Validation result =>", value, "  error =>",error);

        FoundReportSchema.updateOne({_id : newReport._id},{
            $set : newReport
        }).then(res=>{
            console.log("New Found Report Saved",res);
            response.status(200).send(res);
        }).catch(err=>{
            console.log("Error found while saving Found Report",err.message);
            response.status(400).send(err.message);
        })
    }
    catch(err){
        console.log("erorr in Found rport addition ", err);
    }
} )




  reportRouter.get("/getAllReports", async (req,response)=>{
    try{
        console.log("Get all reports fired");
        const allReports = await FoundReportSchema.find();
        console.log("All reports => ",allReports);
        response.status(200).send(allReports);
    }
    catch(err){
        console.log("Error in getting all reports",err);
        response.status(400).send(err);
    } 
  })

  //get Many Reports by userId
    
  reportRouter.get("/getManyReports/:userId", async (req,response)=>{
    try{
        console.log("Get many reports fired for user",req.params.userId);
        const manyReports = await FoundReportSchema.find({userId : req.params.userId});
        console.log("Many reports => ",manyReports);
        
        return response.status(200).send(manyReports);
    }
    catch(err){
        console.log("Error in getting many reports",err);
        return response.status(400).send(err);
    }
   })

  // get one report by id

  reportRouter.get("/getOneReport/:id", async (req,response)=>{
    try{
        console.log("Get one report fired");
        const oneReport = await FoundReportSchema.find({_id : req.params.id});
        response.status(200).send(oneReport);
    }
    catch(err){
        console.log("Error in getting one report",err);
        response.status(400).send(err);
    } 
  });

   reportRouter.post("/getManyReports/In/:userId", async (req,response)=>{
    try{
        console.log("Get many reports fired for user",req.body);
        const manyReports = await FoundReportSchema.find({_id :{
             $in : req.body.reportIds 
            }
        });
        console.log("Many reports => ",manyReports);
        
        return response.status(200).send(manyReports);
    }
    catch(err){
        console.log("Error in getting many reports",err);
        return response.status(400).send(err);
    }
   })


  // delete one report by id

  reportRouter.post("/deleteOneReport", async (req,response)=>{
    try{
        console.log("Delete one report fired",req.body);
        await FoundReportSchema.updateOne({_id : req.body._id},{
            $set : {
                "delete.status" : "deleted"
            }
        }).then(res=>{
            response.status(200).send(res);
            console.log("Deleted one report successfully",res);
        }).catch(err=>{
            console.log("Error in deleting one report",err);
            response.status(400).send(err);
        })

     
    }
    catch(err){
        console.log("Error in deleting one report",err);
        response.status(400).send(err);
    } 
  })

















// reportRouter.post('./Lost/addReport', async (req,response)=>{
//     try{
//         console.log("Lost report addition fired",req.body);
//         const newReport  = new LostReportSchema({
//             ...req.body.report
//         })

//         newReport.save().then(res=>{
//             console.log("New Lost Report Saved",res);
//             response.status(200).send(res);
//         }).catch(err=>{
//             console.log("Error found while saving Lost Report",err.message);
//             response.status(400).send(err.message);
//         })
//     }
//     catch(err){
//         console.log("erorr in Lost rport addition ", err);
//     }
// })

reportRouter.post('/EditReport/one', async (req,response)=>{

    FoundReportSchema.updateOne({ _id : req.body._id},{
        ...req.body
    })
});

reportRouter.post('/EditReport/many', async (req,response)=>{

    FoundReportSchema.updateMany({ _id : req.body._id},{
        ...req.body
    })
});


export default reportRouter