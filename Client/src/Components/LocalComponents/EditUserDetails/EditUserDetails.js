import React, {useEffect, useState} from "react";
import './This.scss';
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
import { closeForm } from "../../../Store/Slices/FormSlice/FormSlice";


const EditUserDetails = () => {
    const dispatch = useDispatch();
   const navigate = useNavigate();
   
   const [password,setPassword] = useState(null);
   const ExistingUser = useSelector(state => state.user);
   console.log("Existing User =>", ExistingUser);
   const [user,setUser] =useState(initialState_user);
   const isFormOpen = useSelector(state => state.form.editUserDetails.isOpen);
     console.log(user.Name); 
useEffect(()=>{
  if(ExistingUser.userId){
    setUser(ExistingUser);
  }
},[ExistingUser]);

async function EditAccount(e){
    console.log("Editing account with new details", user);
    const { _id, email, ...updatedUser } = user;
    axios.post('/User/UpdateOne', {
        _id: user._id,
        user: updatedUser,
    }).then(res=>{
        console.log("User Updated",res);
        if(res.status === 200){
        dispatch(addUser({
            ...user,
            
        }));
        dispatch(closeForm({
            formName : "editUserDetails",
            data : null,
        }));
    }
    })
}

 if(!isFormOpen) return null;
    return(
        <div className="editSignUp-main-Wrap">
        <div className="signUp-BottomWrap">
            <div className="editUserDetails76-closeForm"

            >
                <div className="signUp-closeFormButton"
                onClick={(e)=>{
                    dispatch(closeForm({
                        formName : "editUserDetails",
                        data : null,
                    }));
                }}
                >
                    X
                </div>
                
            </div>
            <div className="signUp-TitleTextWrap">
                <span className="signUp-TopText">
                    Edit Account
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
                    EditAccount(e);
                 }}
                >Edit</button>
            </div>
            <div className="signUp-HelperWrap">
                <span className="signUp-HelperText" id="signUp-helperText">
                    {}
                </span>
               
            </div>
            </div>
            </div>
    )
}


export default EditUserDetails;