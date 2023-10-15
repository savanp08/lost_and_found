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
     const existsResponse = await userExists(req);
     const exists = existsResponse.message;

     if(exists==="true"){
      console.log("Account Already Exists",exists);
      return response.status(400).send("Account Already Exists");
     }
     if(exists==="error"){
      console.log("Error in userExists");
      return response.status(400).send("Error in userExists");
     }
     const x = await SignUp(req);
     if(x.message==="success"){
      console.log("Account Created Successfully");
      return response.status(200).send({
        message : "Account Created Successfully",
        user: x.user,
        token : fetchToken(req.body.email)
      });
     }
     else{
      console.log("Error in SignUp");
      return response.status(400).send("Error in SignUp");
     }
     
}
catch(err){
    console.log("Error in Try while creating new User Account",err);
    response.status(400).send("Account Already Exists");
}
})

authRouter.get("/TokenValidate", async (req, res) => {
    console.log("TokenValidate Called->");
  console.log(req.headers);
    const HeaderToken = req.headers["authorization"];
    const Token = HeaderToken && HeaderToken.split(" ")[1];
    console.log("This is Acquired Token->");
    console.log(Token);
    if (Token===null) { 
      const resval = "NoTokenFound";
      res.send(resval);
      console.log("Invalid Req, Token Not found Checking Password");
    } else {
      var reftoken = false;
  
      jwt.verify(Token, process.env.RefreshToken, (err, UserName) => {
        if (err) {
          console.log(err);
          console.log(UserName);
          res.send("TokenExpired");
        } else {
          reftoken = true;
          console.log(UserName);
  
          console.log(Date.now());
          const resval = "TokenVerified";
          res.send({ resval });
  
          console.log("Token Verified");
        }
      });
    }
  });

  
function fetchToken(UserName) {
    return jwt.sign({ UserName }, process.env.RefreshToken, { expiresIn: "6h" });
  }

  authRouter.get("/:UserType/RefreshToken", async (req, res) => {
    const UserType = req.params.UserType;
    const UserName = req.body.UserName;

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
            await adminSchema.findOne({ email: req.body.email },{ password:1  })
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
                    const AccessToken = fetchToken(req.body.email);
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
            const AccessToken = fetchToken(req.body.email);
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