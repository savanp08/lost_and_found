import React from "react";
import { useState } from "react";
import './Auth.css'
// import './Common.scss';
import SVG_1 from '../.././../Media/SVGs/Searching_Person.svg';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { NavLink, useNavigate } from "react-router-dom";
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { addUser } from "../../../Store/Slices/UserSlice/UserSlice";
import mongoose from "mongoose";
import { initialState_user } from "../../../Components/Data/Schemas";

const SignUp = () =>{
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const newId = new mongoose.Types.ObjectId().toString();
   const [password,setPassword] = useState(null);
   const [validate, setValidate] = useState(new Map());
   const ExistingUser = useSelector(state => state.user);
   console.log("Existing User =>", ExistingUser);
   const [user,setUser] =useState(initialState_user);
     console.log(user.Name); 


    function createAccount(e){
        e.preventDefault();
      
       submitAccount();
      
    }
    
    async function submitAccount(){
        const Id = new mongoose.Types.ObjectId().toString();
        const { _id, ...rest } = user;
        dispatch(addUser({...rest, 
            trusted : user.occupation==="Staff",
            userType : "user",
            password : password,
            nanoid : Id,
            userId : Id
        }));
        console.log("Sending API request to Create Account",{...user, trusted : user.occupation==="Staff" , userType : "user"});
      await axios.post('/Auth/SignUp', {
        user: {...user, 
            trusted : user.occupation==="Staff",
            userType : "user",
            password : password,
            nanoid : Id,
            userId : Id
        },
        password : password
      }).then(response=>{
        console.log(response.data);
        if(response.data && (typeof response.data.token === 'string' || response.data.token instanceof String) && response.data.message === "Account Created Successfully"){
            localStorage.setItem(`token` , response.data.token);
            dispatch(addUser(response.data.user));
            navigate('/Reports');
        }
      }).catch(error=>{
        console.log("Error while submitting", error);
        var x = document.getElementById("signUp-helperText")
        x.innerHTML = "Account already exists";
    })
      
    }
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);

}

console.log("validate signup debug => ", validate, validate.length);

    return (
        <div className="signUp-wrap">
            <div className="signUp-topWrap">
           <div className="bckImg-wrap">
            <div className="signUp-topImgTextWrap">
                <span className="signUp-topImgText">
                    Lost & Found
                </span>
            </div>
            <div className="signUp-TopImgWrap">
            <img className="bckImg" src={SVG_1} />
            </div>
            <div className="signUp-ImgBtmTextWrap">
                <span className="signUp-ImgBtmText">
                    Don't Look elsewhere We got you covered
                </span>
            </div>
            </div>
            <div className="signUp-topRightWrap">
            <div className="signUp-topTextWrap">
            <div className="signUp-TopTextBox1">
                <span className="signUp-TopText1">
                Welcome to Lost & Found, a platform dedicated to help you find your lost things
                </span>
                
            </div>
            <div className="signUp-TopRight-signUpButton">
                <button type="button" className="signUp-TopRight-signUpBut">
                    Sign Up
                </button>
                <span className="signUp-TopRight-signUpButText">
                    Create your account and get started
                </span>
            </div>
            <div className="signUp-topRight-TextBox2">
            <span className="signUp-TopText2">
                Welcome to Lost & Found, a platform dedicated to help you find your lost things
                </span>
            </div>
            </div>
            </div>
            </div>
            <div className="signUp-BottomWrap">
            <div className="signUp-TitleTextWrap">
                <span className="signUp-TopText">
                    Create Account
                </span>
            </div>
            <div className="signUp-box">
                <div className="signUp-innerBox">
                    <fieldset className="signUp-boxLabel">
                    <legend className="signUp-nameLabel">
                        Name
                    </legend>
                    
                   <div className="signUp-nameWrap">
                    
                    <div className="signUp-formButton">
                    <TextField id="user-signUp-firstName" 
                    label="First Name" 
                    variant="outlined" 
                    required
                    sx={{
                        
                    }}
                    value={user.Name.firstName}
                    onChange={(e)=>{
                        
                        if(e.target.value.length>0) setValidate(new Map(validate.set("firstName",true)));
                        else setValidate(new Map(validate.delete("firstName")));
                         setUser({...user, Name : {...user.Name, firstName : e.target.value}})
                        
                    }}
                    /> 
                    </div>
                    <div className="signUp-formButton">
                    <TextField id="signIp-MiddleName" 
                    label="Middle Name" 
                    variant="outlined" 
                    sx={{
                        
                    }}
                    value={user.Name.middleName}
                    onChange={(e)=>{
                         setUser({...user, Name : {...user.Name, middleName : e.target.value}})
                        
                    }}
                    />
                    </div>
                    <div className="signUp-formButton">
                    <TextField id="signUp-lastName"  
                    label="Last Name" 
                    variant="outlined" 
                    required
                    sx={{
                        
                    }}
                    value={user.Name.lastName}
                    onChange={(e)=>{
                         setUser({...user, Name : {...user.Name, lastName : e.target.value}})
                        
                    }}
                    />
                    </div>
                   </div>
                   </fieldset>
                   <fieldset className="signUp-boxLabel">
                    <legend className="signUp-nameLabel">
                        Email
                    </legend>
                <div className="signUp-emailWrap signUp-wrapsB"> 
                <div className="signUp-formButton">
                <TextField id="signUp-email" 
                    label="Email" 
                    variant="outlined" 
                    required
                    sx={{
                        
                    }}
                    error={user.email && !validateEmail(user.email)}
                    aria-errormessage="Enter a valid email"
                    helperText={user.email && !validateEmail(user.email) ? "Enter a valid email" : ""}
                    value={user.email}
                    onChange={(e)=>{
                        setUser({...user, email : e.target.value});
                        if(validateEmail(e.target.value)) setValidate(new Map(validate.set("email",true)));
                        else setValidate(new Map(validate.delete("email")));
                    }}
                    /> 
                    </div>
                </div>
                </fieldset>
                <fieldset className="signUp-boxLabel">
                    <legend className="signUp-nameLabel">
                        Password
                    </legend>
                <div className="signUp-password signUp-wrapsB">
                <div className="signUp-formButton">
                <TextField id="signUp-Password"  
                    label="Password" 
                    variant="outlined" 
                    required
                    sx={{
                        width:'218px'
                    }}
                    error={password && password.length<6}
                    aria-errormessage="Password must be atleast 6 characters long"
                    helperText={password && password.length<6 ? "Password must be atleast 6 characters long" : ""}
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
                        
                       if(e.target.value.length>5) setValidate(new Map(validate.set("password",true)));
                       else setValidate(new Map(validate.delete("password")));
                    }}
                    /> 
                </div>
                    
                </div>
                </fieldset>
                <fieldset className="signUp-boxLabel">
                    <legend className="signUp-nameLabel">
                        Unique Id
                    </legend>
                <div className="signUp-uniqueId signUp-wrapsB">
                <div className="signUp-formButton">
                <TextField id="signUp-UniqueId"  
                    label="Unique Id" 
                    variant="outlined" 
                    required
                    placeholder="University Id, Passport, DL, ...."
                    sx={{
                        
                    }}
                    value={user.UniqueId}
                    onChange={(e)=>{
                        setUser({...user,UniqueId: e.target.value});
                        
                        if(e.target.value.length>0) setValidate(new Map(validate.set("UniqueId",true)));
                        else setValidate(new Map(validate.delete("UniqueId")));
                    }}
                    /> 
                </div>
                    
                </div>
                </fieldset>
                <fieldset className="signUp-boxLabel">
                    <legend className="signUp-nameLabel">
                        Mobile Number
                    </legend>
                <div className="signUp-uniqueId signUp-wrapsB">
                <div className="signUp-formButton">
                <TextField id="signUp-mobileNo"  
                    label="mobile" 
                    variant="outlined" 
                    required={true}
                    placeholder="Mobile Number"
                    sx={{
                        
                    }}
                    value={user.phone}
                    onChange={(e)=>{
                        setUser({...user,phone: e.target.value});
                        
                        if(e.target.value.length>0) setValidate(new Map(validate.set("phone",true)));
                        else setValidate(new Map(validate.delete("phone")));
                    }}
                    /> 
                </div>
                    
                </div>
                </fieldset>
                <fieldset className="signUp-boxLabel">
                    <legend className="signUp-nameLabel">
                        Location
                    </legend>
                <div className="signUp-location signUp-wrapsB">
                <div className="signUp-formButton">
                <TextField id="signUp-Univeristy" 
                    label="University" 
                    variant="outlined" 
                    required
                    sx={{
                        
                    }}
                    value={user.location.university}
                    onChange={(e)=>{
                        setUser({...user,location:{...user.location,university:e.target.value}});
                        
                    }}
                    /> 
                </div>
                <div className="signUp-formButton">
                <TextField id="signUp-street" 
                    label="Street" 
                    variant="outlined" 
                    required={true}
                    sx={{
                        
                    }}
                    value={user.location.street}
                    onChange={(e)=>{
                        setUser({...user,location:{...user.location,street:e.target.value}});
                        
                       if(e.target.value.length>0) setValidate(new Map(validate.set("street",true)));
                       else setValidate(new Map(validate.delete("street")));
                    }}
                    /> 
                </div>
                <div className="signUp-formButton">
                <TextField id="signUp-Aparatment" 
                    label="Apartment/ House No" 
                    variant="outlined" 
                    required={true}
                    sx={{
                        
                    }}
                    value={user.location.apartment}
                    onChange={(e)=>{
                        setUser({...user,location:{...user.location,apartment:e.target.value}});

                    }}
                    /> 
                </div>
                <div className="signUp-formButton">
                <TextField id="signUp-city" 
                    label="City" 
                    variant="outlined" 
                    required={true}
                    sx={{
                        
                    }}
                    value={user.location.city}
                    onChange={(e)=>{
                        setUser({...user,location:{...user.location,city:e.target.value}});
                        
                        if(e.target.value.length>0) setValidate(new Map(validate.set("city",true)));
                        else setValidate(new Map(validate.delete("city")));
                    }}
                    /> 
                </div>
                <div className="signUp-formButton">
                <TextField id="signUp-State" 
                    label="State" 
                    variant="outlined" 
                    required
                    sx={{
                        
                    }}
                    value={user.location.state}
                    onChange={(e)=>{
                        setUser({...user,location:{...user.location,state:e.target.value}});
                        
                        if(e.target.value.length>0) setValidate(new Map(validate.set("state",true)));
                        else setValidate(new Map(validate.delete("state")));
                    }}
                    /> 
                </div>
                <div className="signUp-formButton">
                <TextField id="signUp-pincode" 
                    label="Pincode" 
                    variant="outlined" 
                    required
                    sx={{
                        
                    }}
                    value={user.location.pinCode}
                    onChange={(e)=>{
                        setUser({...user,location:{...user.location,pinCode:e.target.value}});
                        
                        if(e.target.value.length>0) setValidate(new Map(validate.set("pinCode",true)));
                        else setValidate(new Map(validate.delete("pinCode")));
                    }}
                    /> 
                </div>
                    
                </div>
                </fieldset>
                <fieldset className="signUp-boxLabel">
                    <legend className="signUp-nameLabel">
                        Occupation
                    </legend>
                <div className="signUp-uniqueId signUp-wrapsB">
                <div className="signUp-formButton">
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Occupation</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="signUp-occupation"
          sx={{
            width:'220px'
          }}
          value={user.occupation}
          label="Occupation"
          onChange={(e)=>{
            setUser({...user,occupation:e.target.value});
          }}
        >
          <MenuItem value={"Staff"}>Faculty/Staff</MenuItem>
          <MenuItem value={"Student"}>Student</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
                </div>
                    
                </div>
                </fieldset>
                <fieldset className="signUp-boxLabel">
                    <legend className="signUp-nameLabel">
                        Optional
                    </legend>
                <div className="signUp-Optional signUp-wrapsB">
                <div className="signUp-formButton">
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="signUp-gender"
          sx={{
            width:'220px'
          }}
          value={user.gender}
          label="Gender"
          onChange={(e)=>{
            setUser({...user,gender:e.target.value});
          }}
        >
          <MenuItem value={"Male"}>Male</MenuItem>
          <MenuItem value={"Female"}>Female</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
                </div>
                <div className="signUp-formButton">
                <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Ethnicity</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="signUp-ethnicity"
          sx={{
            width:'220px'
          }}
          value={user.ethnicity}
          label="Age"
          onChange={(e)=>{
            setUser({...user,ethnicity:e.target.value});
          }}
        >
          <MenuItem value={"Asian"}>Asian</MenuItem>
          <MenuItem value={"Black or African American"}>Black or African America</MenuItem>
          <MenuItem value={"American Indian"}>American Indian</MenuItem>
          <MenuItem value={"white"}>White</MenuItem>
          <MenuItem value={"Hispanic"}>Hispanic</MenuItem>
          <MenuItem value={"Other"}>Other</MenuItem>
        </Select>
      </FormControl>
                </div>
                </div>
                </fieldset>
                </div>
            </div>
            <div className="signUp-ButtonWrap">
                <button type="button" className="signUp-Button" 
                id="signUp-Button"
                disabled={validate.size<9}
                 onClick={(e)=>{
                    createAccount(e);
                 }}
                >Sign Up</button>
            </div>
            <div className="signUp-HelperWrap">
                <span className="signUp-HelperText" id="signUp-helperText">
                    {}
                </span>
                <div className="signUp-LoginWrap">
                    <span className="signUp-LoginText">
                        Already Have an Account? {" Sign in "}
                        </span>
                    <NavLink to={"/Login"} className="signUp-LoginText">
                        Here
                    </NavLink>
                </div>
            </div>
            </div>
        </div>
    )
}

export default SignUp;