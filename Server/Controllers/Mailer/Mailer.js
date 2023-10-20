import transport from "../../EndWares/NodeMailer.js";

async function sendSignUpConfirmationMail(user){

    try{
      transport().then((transportX) => {
        const mailOptions = {
            from : process.env.google_email,
            to : user.email,
            subject : "Welcome to the Lost & Found",
            text : `Welcome to the Community ${user.name}!, Turn on Notifications to get notified when someone finds your lost item 
            or to receive insant updates if ur around the location of a lost item.`,
        };
        transportX.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log("Contollers/Mailer/Mailer 1 => Error in sending mail", err);        //   1
            }
            else{
                console.log("Mail Sent", info);
            }
        });
      }).catch(err=>{
            console.log("Mailer/Mailer.js => error in transport",err);
      });
    }
    catch(err){
        console.log("Mailer/Mailer 2 => error in getting access token for oAuth2Client",err);   //    2
    }

}

async function sendPasswordResetMail(user){
    try{
        transport().then((transportX) => {
            const mailOptions = {
                from : `Lost & Found || ${process.env.google_email}`,
                to : user.email,
                subject : "Password Reset",
                text : `Hi User,
                Click on the link below to reset your password. 
                If you did not request a password reset, ignore this email.`,
                html : `<a href="http://localhost:3000/User/ResetPassword" > Reset Password </a> `
            };
            transportX.sendMail(mailOptions, (err, info) => {
                if(err){
                    console.log("Contollers/Mailer/Mailer 3 => Error in sending mail", err);        //   3
                }
                else{
                    console.log("Controllers/Mailer/Mailer.js 4=> Mail Sent", info);          //      4
                }
            });
        }).catch(err=>{
                console.log("Mailer/Mailer.js => error in transport",err);
        });
    }
    catch(err){
        console.log("Mailer/Mailer 3 => error in getting access token for oAuth2Client",err);   //    3
    }
}


  async function sendClaimConfirmationMail(Claim,user){

    try{
      transport().then((transportX) => {
        const mailOptions = {
            from : process.env.google_email,
            to : user.email,
            subject : "Claim Confirmation",
            text : `Hi ${user.name},
            Your Claim has been submitted Successfully. 
            .`,
            html: `
            <span> Your Claim will be Assessed by the Custodian and u will receive a notificction 
            asking you to schedule a pick up if the claim is accepted or you will be asked to appear 
            for a in person assessment which has to be scheduled as well</span>
            `
        };
        transportX.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log("Contollers/Mailer/Mailer 5 => Error in sending mail", err);        //   5
            }
            else{
                console.log("Mail Sent", info);
            }
        });
      }).catch(err=>{
            console.log("Mailer/Mailer.js => error in transport",err);
      });
    }
    catch(err){
        console.log("Mailer/Mailer 6 => error in getting access token for oAuth2Client",err);   //    6
    }
  }


  


export {
    sendSignUpConfirmationMail,
    sendPasswordResetMail,
    sendClaimConfirmationMail,
}