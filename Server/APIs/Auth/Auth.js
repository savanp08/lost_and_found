import express from "express";
import userSchema from "../../Schemas/UserSchema.js";
import jwt from "jsonwebtoken"; 
import adminSchema from '../../Schemas/AdminSchema.js';

const authRouter = express.Router();

authRouter.post('/SignUp', async (req,response)=>{
    try{
        var AccExists = false;
        await userSchema.findOne({ email : req.body.email} , { email :1, password :1})
        .then(res=>{
            console.log("Account Already Exists");
            AccExists = true;
            response.send("Account Already Exists");
        }).catch(err=>{
            console.log("Error searching for user",err.message);
            // res.status(400).send("erorr: " + err.message);
        });
         if(!AccExists){
        const email = req.body.email;
        const AccessToken = jwt.sign({ email }, process.env.AccessToken, {
          expiresIn: "6h",
        });
         
 
    const user = new userSchema({
        ...req.body.user, password: req.body.password
    })
    console.log("Account creation requested for ", user);
    await user.save().then(res=>{
        response.status(200).send({AcessToken : AccessToken});
        console.log("Created new User Account",user," with Id" ,res);
    })
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
    if(userType === "admin") {
        var password ="";
        var exists =false;
          try{
            console.log("Login tried for admin",req.body);
            adminSchema.findOne({ email: req.body.email },{ password:1  })
            .then(res=>{
                console.log("Admin Log in response => ",res);
                exists = true;
        password = res.password;
            }).catch(err=>{
                console.log("Error in Admin Login ",err);

            });
            if(!exists){
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
    var exists = false;
    var password = null;
    await userSchema.findOne({ email : req.body.email} , { password : 1})
    .then(res=>{
        console.log("User Found for Login",res);
        exists = true;
        password = res.password;
    }).catch(err=>{
        console.log("Error while searching for user while login",err);
        response.status(500).send("Not Found");
    });
    if(exists && password){
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
}
    catch(err){
        console.log("Error in try while login",err);
    }
}
 })


export default authRouter;