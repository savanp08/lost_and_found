import { Server } from "socket.io";
import { httpServer } from "../server.js";
import mongoose from "mongoose";
import express from "express";
import FoundReportSchema from "../Schemas/FoundReportSchema.js";
import ClaimSchema from "../Schemas/ClaimSchema.js"


const changeStreams = () =>{
const io = new Server(httpServer, { 
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        credentials: true
    },
    allowEIO3: true
 });

const DBConnection = mongoose.connection;

DBConnection.once('open',   ()=> {
    console.log(`Data Base Connection Established Successfully`);


 const DBchange_foundreport = DBConnection.collection('foundreportschemas');
 const changeStream_foundreports = DBchange_foundreport.watch();
 
    changeStream_foundreports.on('change', (change)=>{
        console.log("Change in DB",change);
        if(change.operationType === 'insert'){
            const report = change.fullDocument;
            console.log("Report",report);
            io.emit('newReport',report);
        } 
        else if(change.operationType === 'update'){
            const report = change.fullDocument;
            console.log("Report",report);
            io.emit('newReport',report);
        }
        else if(change.operationType === 'delete'){
            const report = change.fullDocument;
            console.log("Report",report);
            io.emit('newReport',report);
        }
        else{
            console.log("Change in DB",change);
        }

       

    })

   
    const DBchange_claims = DBConnection.collection('claimschemas');
    const changeStream_claims = DBchange_claims.watch();
    
       changeStream_claims.on('change', (change)=>{
           console.log("Change in DB",change);
           if(change.operationType === 'insert'){
               const claim = change.fullDocument;
               console.log("claim",claim);
               io.emit('newClaim',claim);
           } 
           else if(change.operationType === 'update'){
               const claim = change.fullDocument;
               console.log("claim",claim);
               io.emit('newClaim',claim);
           }
           else if(change.operationType === 'delete'){
               const claim = change.fullDocument;
               console.log("claim",claim);
               io.emit('newClaim',claim);
           }
           else{
               console.log("Change in DB",change);
           }




});

});

}

export default changeStreams;