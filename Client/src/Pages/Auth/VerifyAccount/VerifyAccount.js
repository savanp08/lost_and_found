import axios from "axios";
import React, { useEffect } from "react";
import { Route, Navigate, useLocation } from "react-router-dom";


const VerifyAccount = () =>{

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');


  async function verifyAccount(){
    console.log("verifyAccount called");
     await axios.post('/Auth/VerifyAccount',{
        email : email,
     }).then((res)=>{
         if(res.status===200){
             console.log("Account Verified Successfully");
         }
     }).catch(err=>{
         console.log("Error while Verifying Account",err);
     })
    }

    useEffect(()=>{
      verifyAccount();
    },[])

     return(
         <div>
             <h1>Account Verified Successfully, You can Close this tab now</h1>
             
         </div>
         )
}

export default VerifyAccount