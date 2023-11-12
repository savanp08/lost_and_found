import bodyParser from "body-parser";
import  express  from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer';
import * as path from 'path'
import { fileURLToPath } from 'url';
import mongoose from "mongoose";
import authRouter from "./APIs/Auth/Auth.js";
import reportRouter from "./APIs/Item/Reports.js"
import claimRouter from "./APIs/Claim/Claim.js";
import { sendSignUpConfirmationMail } from "./Controllers/Mailer/Mailer.js";
import userRouter from "./APIs/User/User.js";
import gMapRouter from "./APIs/GMap/GMap.js";
import { Server } from "socket.io";
import changeStreams from "./EndWares/Socket.js";
 

dotenv.config();
const server = express();
const port = process.env.PORT || 5000;

server.use(cors({

}))
server.use(express.json());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));


server.use('/Auth',authRouter); 
server.use('/Report', reportRouter);
server.use('/Claim', claimRouter);
server.use('/User', userRouter);
server.use('/GMap', gMapRouter);

const httpServer = server.listen(port, ()=>[
    console.log("listening on port", port)
]);

const DbUri = process.env.DBURI; 
//console.log("DB URI IS: FROM process.env.DBURI ->",process.env.DBURI, "And process.env.DbUri",process.env.DbUri)
mongoose.connect(DbUri || process.env.DbUri,
    {
        useNewUrlParser: true,  
    useUnifiedTopology: true
    }
    ).then( ()=>{
        console.log("Connected to database");
    })
.catch((error) => { 
    console.log(error.message);
});


const domainUrl = "http://localhost:3000";

export{
    domainUrl,
    httpServer,
}


changeStreams();


  