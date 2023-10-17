import express from "express";
import userSchema from "../../Schemas/UserSchema.js";
import jwt from "jsonwebtoken"; 
import adminSchema from '../../Schemas/AdminSchema.js';
import { SignUp, userExists } from "../../Controllers/Auth/Auth.js";

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
     const x =  jwt.verify(Token, process.env.RefreshToken);
     if(x){
        console.log("Token Validated",x);
        var xy = x.UserName || x.email;
        xy = xy.toLowerCase();
        console.log("xy",xy);
        const y = await userExists({email :  xy});
        if(y) {
          console.log("userExists reponse=>>> ",y);
        return response.status(200).send(
          {
            message : "Token Validated",
             user : y.user 
        }
          );
      }
      else{
        return response.status(400).send("Token Not Validated");
      }
     }
     else{
      console.log("Token Not Validated",x);
      return response.status(400).send("Token Not Validated");
     }
    }
    catch(err){
      console.log("Error in Try while validating Token",err);
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
                    response.status(200).send({message : "Logined in", AccessToekn : AccessToken});
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
      
    const x = await userExists(req);
    
    if(x.message==="true" && x.user.password){
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
        response.status(500).send("Incorrect Password");
    }
    }
}
    catch(err){
        console.log("Error in try while login",err);
    }
}
 })


export default authRouter;