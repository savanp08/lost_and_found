import React, { useEffect, useState } from "react";
import './This.scss';
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { close_div, open_div } from "../../../Handlers/PopUp";
import axios from "axios";
import { addTask } from "../../../Store/Slices/TaskSlice/TaskSlice";


const ClaimPopUp = () => {
    console.log("Rerender in claim popup");
    const dispatch = useDispatch();
    const InitialState ={
        ownership: "",
        description: "",
        claimId :null,
        userId : null,
        reportId : null,
    }
    const [claim,setClaim] = useState(InitialState);
    const report = useSelector(state => state.report);
    const user = useSelector(state => state.user);
    
    console.log("claim pop up debug => ",claim,report,user)

    async function submitClaim(e){
        await axios.post('/Claim/addClaim',{
            claim : {
                ...claim,
                reportId: report._id,
                userId: user._id,
            },
            user:{
                ...user
            }
        }).then(res=>{
            console.log("Response from submit claim=> ",res.data);
             
            dispatch(addTask({
                catagory:"claim",
                status: "success",
                progress:"submitted",
                claim: claim,
                task:"function",
                function : "open_div",
                function_params : [""]
            }));
            setClaim(InitialState);
            close_div("ur11-claim-popup-main-min");
            
        }).catch(err=>{
            dispatch(addTask({
                catagory:"claim",
                status: "failed",
                progress:"submitted",
                message : err.response.data.message,
                claim: claim,
                task:"function",
                function : "open_div",
                function_params : [""]
            }));
            close_div("ur11-claim-popup-main-min");
            console.log("Error from submit claim=> ",err);
        })
    }

    useEffect(()=>{
         setClaim(InitialState);
    },[report])
    

    return(
        <div className="ccp12-main-wrap">
            <div className="ccp12-close-wrap"
            onClick={(e)=>{
                close_div("ur11-claim-popup-main-min");
            }}
            >
                X
            </div>
            <div className="ccp12-inner-wrap">
                <div className="ccp12-header-wrap">
                    <span className="ccp12-header-title">Claim</span>
                </div>
                
                <div className="ccp12-body-wrap">
                <fieldset className="ccp12-fieldset-wrap">
                    <legend className="ccp12-legend-wrap"> Ownership </legend>
                
                    <div className="ccp12-ownership-wrap">
                    <FormControl fullWidth
                    sx={{
                        display: 'flex',
                        flexFlow:'row wrap',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    >
              
              <Select
                labelId="demo-simple-select-label"
                id="ccp12-ownership"
                 placeholder="Is It Yours"
                label="Is It Yours"
                value={claim.ownership || "None"} 
                
                onChange={(e) => {
                  setClaim({
                  ...claim,
                    ownership: e.target.value,
                  });
                }}
                sx={{
                  maxWidth: "230px",
                  minWidth: "230px",
                }}

              >
                
                <MenuItem value={"User"}>Yes</MenuItem>
                <MenuItem value={"Other"}>No</MenuItem>
              </Select>
            </FormControl>
                 <span className="ccp12-ownership-information-text">Is this Yours(Yes) or are u legally representing its actual owner(No)</span>
                    </div>
                    </fieldset>
                    <fieldset className="ccp12-fieldset-wrap">   
                    <legend className="ccp12-legend-wrap"> Description </legend>             
                        <div className="ccp12-description-wrap">
                            <TextField 
                            id="ccp12-description-input"
                            label="Description"
                            variant="outlined"
                            placeholder="Describe the Property"
                            multiline
                            
                            rows={4}
                            sx={{
                                width: '100%',
                            }}
                            value={claim.description || ""}
                            onChange={(e)=>{
                                setClaim({
                                   ...claim,
                                    description: e.target.value,
                                })
                            }}
                            />
                            <span className="ccp12-description-information-text">Describe the Property and its contents in detail</span>
                    </div>
                    </fieldset>
                   <div className="ccp12-submitclaim-btn-wrap">
                    <button className="ccp12-submitclaim-btn"
                    onClick={(e)=>{
                        submitClaim(e);
                    }}
                    id="ccp12-submitclaim-btn"
                    >Claim</button>
                    </div>
                    <div className="ccp12-submit-helper-text-wrap">
                        <span className="ccp12-submit-helper-text"
                        id="ccp12-submit-helper-text"
                        >
                            
                        </span>
                    </div>
                    <div className="ccp12-claim-information-text-wrap">
                        <span className="ccp12-claim-information-text">
                            This is a virtual veriffication assessment to assess the credibility of your claim and to check if the property is indeed Yours.
                            Restrain from making false claims
                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ClaimPopUp;