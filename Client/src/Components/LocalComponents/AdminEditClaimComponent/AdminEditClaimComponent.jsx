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



const AdminClaimEditComponent = (props , editing, setEditing) => {
    
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
        <div className="lcaec23-main-wrap">
            <div className="lcaec23-close-wrap"
            onClick={(e)=>{
                props.setEditing(false);
            }}
            >
                X
            </div>
            <div className="lcaec23-inner-wrap">
                <div className="lcaec23-header-wrap">
                    <span className="lcaec23-header-title">Claim</span>
                </div>
                
                <div className="lcaec23-body-wrap">
                <fieldset className="lcaec23-fieldset-wrap">
                    <legend className="lcaec23-legend-wrap"> Ownership </legend>
                
                    <div className="lcaec23-ownership-wrap">
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
                id="lcaec23-ownership"
                 placeholder="Assessment Location"
                label="Location"
                value={claim.assessment.inPersonAssessment.location || "None"} 
                
                onChange={(e) => {
                  setClaim({
                  ...claim,
                    assessment: {
                        ...claim.assessment,
                        inPersonAssessment: {
                        ...claim.assessment.inPersonAssessment,
                        location: e.target.value,
                        },
                    },
                  });
                }}
                sx={{
                  maxWidth: "230px",
                  minWidth: "230px",
                }}

              >
                {
                    claim.assessment.inPersonAssessment.allPossibleLocations.map((location, index) => {
                        return (
                          <MenuItem key={index} value={location}>
                            {location}
                          </MenuItem>
                        );
                    })
                }
              </Select>
            </FormControl>
                 <span className="lcaec23-ownership-information-text">Is this Yours(Yes) or are u legally representing its actual owner(No)</span>
                    </div>
                    </fieldset>
                    <fieldset className="lcaec23-fieldset-wrap">   
                    <legend className="lcaec23-legend-wrap"> Description </legend>             
                        <div className="lcaec23-description-wrap">
                            <TextField 
                            id="lcaec23-description-input"
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
                            <span className="lcaec23-description-information-text">Describe the Property and its contents in detail</span>
                    </div>
                    </fieldset>
                   <div className="lcaec23-submitclaim-btn-wrap">
                    <button className="lcaec23-submitclaim-btn"
                    onClick={(e)=>{
                        submitClaim(e);
                    }}
                    >Claim</button>
                    </div>
                    <div className="lcaec23-submit-helper-text-wrap">
                        <span className="lcaec23-submit-helper-text"
                        id="lcaec23-submit-helper-text"
                        >
                            
                        </span>
                    </div>
                    <div className="lcaec23-claim-information-text-wrap">
                        <span className="lcaec23-claim-information-text">
                            This is a virtual veriffication assessment to assess the credibility of your claim and to check if the property is indeed Yours.
                            Restrain from making false claims
                            
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default AdminClaimEditComponent;