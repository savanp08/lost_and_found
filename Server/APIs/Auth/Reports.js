import express, { response } from 'express';
import FoundReportSchema from '../../Schemas/FoundReportSchema';
import LostReportSchema from '../../Schemas/LostReportSchema';


const reportRouter  = express.Router();

reportRouter.post('./Found/addReport', async (req,response)=>{
    try{
        console.log("Found report addition fired",req.body);
        const newReport  = new FoundReportSchema({
            ...req.body.report
        })

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

reportRouter.post('./Lost/addReport', async (req,response)=>{
    try{
        console.log("Lost report addition fired",req.body);
        const newReport  = new LostReportSchema({
            ...req.body.report
        })

        newReport.save().then(res=>{
            console.log("New Lost Report Saved",res);
            response.status(200).send(res);
        }).catch(err=>{
            console.log("Error found while saving Lost Report",err.message);
            response.status(400).send(err.message);
        })
    }
    catch(err){
        console.log("erorr in Lost rport addition ", err);
    }
})

