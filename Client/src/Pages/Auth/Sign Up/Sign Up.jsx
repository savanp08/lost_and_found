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

const SignUp = () =>{
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const newId = new mongoose.Types.ObjectId().toString();
   const [password,setPassword] = useState(null);
   const ExistingUser = useSelector(state => state.user);
   console.log("Existing User =>", ExistingUser);
   const [user,setUser] =useState({
    userId: newId,
    email:null,
    Name:{
        firstName:"",
        middleName:"",
        lastName:"",
    },
    userType: null,
    UniqueId: null,
    nanoid: newId,
    occupation: null,
    gender: null,
    ethnicity: null,
    trusted:false,
    location: {
        university: null,
        street: null,
        apartment: null,
        city: null,
        state: null,
        pinCode : null,
    },
    reports: {
        count: 0,
        itemIds:[],
    },
    searches: {
        count: 0,
        searchIds: [],
    },
    Claims: {
        count: 0,
        itemIds: [],
    }
    
   });
     console.log(user.Name); 


    function createAccount(e){
        e.preventDefault();
       var keys = Object.keys(user);
       
       keys = [...keys];
       keys.splice(keys.indexOf("Name"),1);
       keys.splice(keys.indexOf("location"),1);
       keys.splice(keys.indexOf("gender"),1);
       keys.splice(keys.indexOf("ethnicity"),1);
       keys.splice(keys.indexOf("reports"),1);
       keys.splice(keys.indexOf("searches"),1);
       keys.splice(keys.indexOf("Cliams"),1);
       keys.splice(keys.indexOf("userId"),1);
       keys.splice(keys.indexOf("userType"),1);
       keys.splice(keys.indexOf("nanoid"),1);
       keys.splice(keys.indexOf("userName"),1);
       keys.splice(keys.indexOf("trusted"),1);
       for(var i=0; i<keys.length;i++){
        var key = keys[i];
        if(user[key]===null) { console.log("Returning False",key,user[key])
        return false; }
        if((typeof user[key] === 'string' || user[key] instanceof String) && user[key].length<1) { console.log("Returning False",key,user[key])
            return false; }
        console.log(user[key]);
       }
       console.log("Keys of user",keys);
       keys = Object.keys(user.Name);
       keys.splice(keys.indexOf("middleName"),1);
       for(var i=0; i<keys.length;i++){
        var key = keys[i];
        if(user.Name[key]===null) { console.log("Returning False",key,user.Name[key])
        return false; }
        if((typeof user.Name[key] === 'string' || user.Name[key] instanceof String) && user.Name[key].length<1) { console.log("Returning False",key,user.Name[key])
            return false; }
        console.log(user.Name[key]);
       }
       keys = Object.keys(user.location);
       for(var i=0; i<keys.length;i++){
        var key = keys[i];
        if(user.location[key]===null) { console.log("Returning False",key,user[key])
        return false; }
        if((typeof user.location[key] === 'string' || user.location[key] instanceof String) && user.location[key].length<1) { console.log("Returning False",key,user.location[key])
            return false; }
        console.log(user.location[key]);
       }
       submitAccount();
      
    }
    
    async function submitAccount(){
        const Id = new mongoose.Types.ObjectId().toString();
        dispatch(addUser({...user, 
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
            navigate(-2);
        }
      }).catch(error=>{
        console.log("Error while submitting", error);
        var x = document.getElementById("signUp-helperText")
        x.innerHTML = "Account already exists";
    })
      
    }


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
                    <TextField id="SignUp-Name" 
                    label="First Name" 
                    variant="outlined" 
                    required
                    sx={{
                        
                    }}
                    value={user.Name.firstName}
                    onChange={(e)=>{
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
                    value={user.email}
                    onChange={(e)=>{
                        setUser({...user, email : e.target.value});
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
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value);
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
                    sx={{
                        
                    }}
                    value={user.UniqueId}
                    onChange={(e)=>{
                        setUser({...user,UniqueId: e.target.value});
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
                    required
                    sx={{
                        
                    }}
                    value={user.location.street}
                    onChange={(e)=>{
                        setUser({...user,location:{...user.location,street:e.target.value}});
                    }}
                    /> 
                </div>
                <div className="signUp-formButton">
                <TextField id="signUp-Aparatment" 
                    label="Apartment/ House No" 
                    variant="outlined" 
                    required
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
                    required
                    sx={{
                        
                    }}
                    value={user.location.city}
                    onChange={(e)=>{
                        setUser({...user,location:{...user.location,city:e.target.value}});
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