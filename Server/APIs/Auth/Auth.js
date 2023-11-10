import express from "express";
import userSchema from "../../Schemas/UserSchema.js";
import jwt from "jsonwebtoken"; 
import adminSchema from '../../Schemas/AdminSchema.js';
import { SignUp, userExists } from "../../Controllers/Auth/Auth.js";
import { sendSignUpConfirmationMail } from "../../Controllers/Mailer/Mailer.js";

const authRouter = express.Router();
 
authRouter.post('/SignUp', async (req,response)=>{
    console.log("SignUp Called -> ",req.body);

    //validate using joi
 
    try{ 
     const existsResponse = await userExists(req.body.user);
     const exists = existsResponse.message;

     if(exists==="true"){
      console.log("Account Already Exists",exists);
      return response.status(400).send("Account Already Exists");
     }
     if(exists==="error"){
      console.log("Error in userExists");
      return response.status(400).send("Error in userExists");
     }
     else if(exists === "false"){
      console.log("Reponse from userExists",exists);
      const x = await SignUp(req);
      if(x.message==="success"){
        console.log("Account Created Successfully");

        try{
              sendSignUpConfirmationMail(x.user);
        }
        catch(err){
          console.log("APIs/Auth/Auth.js 1 => Error in sending signup confirmation mail",err);     //    1
        }



        return response.status(200).send({
          message : "Account Created Successfully",
          user: x.user,
          token : fetchToken(req.body.user.email.toLowerCase())
        });

        
       }
       else{
        console.log("Error in SignUp");
        return response.status(400).send("Error in SignUp");
       }
     }
    
     
     
}
catch(err){
    console.log("Error in Try while creating new User Account",err);
    response.status(400).send("Account Already Exists");
}
})

authRouter.get("/TokenValidate", async (req, response) => {
  try{
    console.log("TokenValidate Called->");
  console.log(req.headers);
    const HeaderToken = req.headers["authorization"];
    const Token = HeaderToken && HeaderToken.split(" ")[1];
    console.log("This is Acquired Token->");
    console.log(Token);
    var x = null;
    try{
      x =  jwt.verify(Token, process.env.RefreshToken);
    }
    catch(err){

    }
     
     if(x){
        console.log("Token Validated",x);
        var xy = x.UserName || x.email;
        xy = xy.toLowerCase();
        console.log("xy",xy);
        const y = await userExists({email :  xy});
        if(y.user) {
          console.log("userExists reponse=>>> ",y);
        return response.status(200).send(
          {
            message : "Token Validated",
             user : y.user 
        }
          );
      }
      else{
        return response.status(403).send("Token Not Validated");
      }
     }
     else{
      console.log("Token Not Validated",x);
      return response.status(403).send("Token Not Validated");
     }
    }
    catch(err){
      console.log("Error in Try while validating Token",err);
      return response.status(403).send({
        message: null,
        user:null
      });
    }
  });
  authRouter.get("/TokenValidate/Admin", async (req, response) => {
    try{
      console.log("Admin TokenValidate Called->");
    console.log(req.headers);
      const HeaderToken = req.headers["authorization"];
      const Token = HeaderToken && HeaderToken.split(" ")[1];
      console.log("This is Acquired Token->");
      console.log(Token);
      var x = null;
      try{
        x =  jwt.verify(Token, process.env.RefreshToken);
      }
      catch(err){
  
      }
       
       if(x){
          console.log("Token Validated",x);
          var xy = x.UserName || x.email;
          xy = xy.toLowerCase();
          console.log("xy",xy);
          const y = await adminSchema.findOne({email :  xy});
          if(y) {
            console.log("userExists reponse=>>> ",y);
          return response.status(200).send(
            {
              message : "Token Validated",
               user : y
          }
            );
        }
        else{
          console.log("Admin not found Token Not Validated",y);
          return response.status(403).send("Token Not Validated");
        }
       }
       else{
        console.log("Token Not Validated",x);
        return response.status(403).send("Token Not Validated");
       }
      }
      catch(err){
        console.log("Error in Try while validating Token",err);
        return response.status(403).send({
          message: null,
          user:null
        });
      }
    });

  
function fetchToken(email) {
    return jwt.sign({ email }, process.env.RefreshToken, { expiresIn: "6h" });
  }

  authRouter.get("/:UserType/RefreshToken", async (req, res) => {
    const UserType = req.params.UserType;
    const UserName = req.body.email.toLowerCase();

    const AccessToken = fetchToken({ UserName });
    res.status(202).json({ AccessToken: AccessToken });
  });

 authRouter.post('/Login/:userType' , async (req, response) => {
    const type  = req.params.userType;
    if(type === "adminX86109110213") {
        var password ="";
        var exists =false;
          try{
            console.log("Login tried for admin",req.body);
            await adminSchema.findOne({ email: req.body.email.toLowerCase() },{ password:1  })
            .then(res=>{
                console.log("Admin Log in response => ",res);
                if(res){
                exists = true;
                password = res.password;
                }
            }).catch(err=>{
                console.log("Error in Admin Login ",err);

            });
            console.log("admin found",exists);
            if(exists){
                if(password === req.body.password){
                    console.log("User Successfully logged in")
                    const AccessToken = fetchToken(req.body.email.toLowerCase());
                    const adminResponse = await adminSchema.findOne({ email: req.body.email.toLowerCase() });
                    if(adminResponse)
                    return response.status(200).send({message : "Logined in", AccessToken : AccessToken,admin : adminResponse });
                  else return response.status(500).send("Error in fetching admin");
            }
            else{
                console.log("Password Wrong");
                response.status(500).send("Incorrect Password");
            }
            }
          }catch(err){
            console.log("Error while logging in for admin",err);
          }
    }
    else{
    console.log("Login tried for user",req.body);
    try{
      
    const x = await userExists(req.body);
    
    if(x.message==="true" && x.user){
      const password = x.user.password;
        if(password === req.body.password){
            console.log("User Successfully logged in")
            const AccessToken = fetchToken(req.body.email.toLowerCase());
            response.status(200).send({message : "Logined in", AccessToken : AccessToken
            ,user : x.user
          
          });

    }
    else{
        console.log("Password Wrong");
        response.status(500).send("Incorrect Credentials");
    }
    }
    else{
        console.log("User Does Not Exists");
        response.status(500).send("Account Does Not Exists");
    }
}
    catch(err){
        console.log("Error in try while login",err);
    }
}
 })


export default authRouter;