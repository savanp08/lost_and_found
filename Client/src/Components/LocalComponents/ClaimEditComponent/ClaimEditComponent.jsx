import React, { useState } from "react";
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


const ClaimEditComponent = (props , editing, setEditing) => {
    
    const dispatch = useDispatch();
    const [claim,setClaim] = useState( props.claim || {
        ownership: "",
        description: "",
        claimId :null,
        userId : null,
        reportId : null,
    });
    const report = useSelector(state => state.report);
    const user = useSelector(state => state.user);

    console.log("Rerender in edit claim popup", claim , props);
    
    async function submitClaim(e){
        await axios.post('/Claim/editClaim',{
            ...claim,
        }).then(res=>{
            console.log("Response from submit claim=> ",res.data);
            props.setEditing(false);
            
            
        }).catch(err=>{
            console.log("Error from submit claim=> ",err);
        })
    }
    

    return(
        <div className="lccec19-main-wrap">
            <div className="lccec19-close-wrap"
            onClick={(e)=>{
                props.setEditing(false);
            }}
            >
                X
            </div>
            <div className="lccec19-inner-wrap">
                <div className="lccec19-header-wrap">
                    <span className="lccec19-header-title">Claim</span>
                </div>
                
                <div className="lccec19-body-wrap">
                <fieldset className="lccec19-fieldset-wrap">
                    <legend className="lccec19-legend-wrap"> Ownership </legend>
                
                    <div className="lccec19-ownership-wrap">
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
                id="lccec19-ownership"
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
                 <span className="lccec19-ownership-information-text">Is this Yours(Yes) or are u legally representing its actual owner(No)</span>
                    </div>
                    </fieldset>
                    <fieldset className="lccec19-fieldset-wrap">   
                    <legend className="lccec19-legend-wrap"> Description </legend>             
                        <div className="lccec19-description-wrap">
                            <TextField 
                            id="lccec19-description-input"
                            label="Description"
                            variant="outlined"
                            placeholder="Describe the Property"
                            multiline
                            
                            rows='4'
                            sx={{
                                width: '100%',
                                height: '100%',
                            }}
                            value={claim.description || ""}
                            onChange={(e)=>{
                                setClaim({
                                   ...claim,
                                    description: e.target.value,
                                })
                            }}
                            />
                            <span className="lccec19-description-information-text">Describe the Property and its contents in detail</span>
                    </div>
                    </fieldset>
                   <div className="lccec19-submitclaim-btn-wrap">
                    <button className="lccec19-submitclaim-btn"
                    onClick={(e)=>{
                        submitClaim(e);
                    }}
                    >Claim</button>
                    </div>
                    <div className="lccec19-submit-helper-text-wrap">
                        <span className="lccec19-submit-helper-text"
                        id="lccec19-submit-helper-text"
                        >
                            
                        </span>
                    </div>
                    <div className="lccec19-claim-information-text-wrap">
                        <span className="lccec19-claim-information-text">
                            This is a virtual veriffication assessment to assess the credibility of your claim and to check if the property is indeed Yours.
                            Restrain from making false claims
                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ClaimEditComponent;