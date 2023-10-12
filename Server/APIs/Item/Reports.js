import express, { response } from 'express';
import FoundReportSchema from '../../Schemas/FoundReportSchema.js'; 
import LostReportSchema from '../../Schemas/LostReportSchema.js';
import Joi from 'joi';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer';


const reportRouter  = express.Router();

cloudinary.config({ 
    cloud_name: process.env.cloud_name, 
    api_key: process.env.api_key, 
    api_secret: process.env.api_secret, 
  });


  const ALLOWED_FORMATS = ['image/*'];
  const storage  = multer.memoryStorage();

  const multerUpload = multer({ 
    storage : storage,
    fileFilter: function(req, file, cb) {
        if (ALLOWED_FORMATS.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Not supported file type!'), false);
        }
      }
  });
  

reportRouter.post('/addReport', multerUpload.array("image",8), async (req,response)=>{
    try{
        console.log(req.body)
        var xx=JSON.parse(req.body.report);
        var yy=req.files;
        console.log("Found report addition fired",xx);
        console.log("Files => ",req.file,req.files);
        const newReport  = new FoundReportSchema({
            // ...req.body
        })
        
        console.log("Schema testing =>",newReport);
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

        newReport.save().then(res=>{
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

    FoundReportSchema.updateOne({ _id : req.body._id},{
        ...req.body
    })
});


export default reportRouter