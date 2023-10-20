import transport from "../../EndWares/NodeMailer.js";
import nodecorn from 'node-cron'
import dotenv from "dotenv";

dotenv.config();

async function sendInPersonAssessmentNotification(user){
    const mailOptions = {
        from : process.env.google_email,
        to : user.email,
        subject : "In-Person Assessment Reminder",
        html : `<h1>Hi ${user.name}</h1>
        <p>Your in-person assessment has been Scheduled tomorrow at .</p>
        <p>Thank you.</p>`
    }
}