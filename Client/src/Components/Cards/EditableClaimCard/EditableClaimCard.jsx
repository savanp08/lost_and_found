// create a card that can be edited by the user and then submitted to the database using axios post request. use the state as claim with attributes claimId, userId, reportId, ownership, description.
import React, { useState } from 'react';
import axios from 'axios';
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClaimEditComponent from '../../LocalComponents/ClaimEditComponent/ClaimEditComponent';
import './This.scss';


const EditableClaimCard = ({ claim }) => {
    const [editing, setEditing] = useState(false);
    const [updatedClaim, setUpdatedClaim] = useState(claim);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedClaim({ ...updatedClaim, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/Claim/editClaim', updatedClaim).then(res=>{
                   console.log("Response from edit claim=> ",res.data)
                   
                       setEditing(false);
                   
            }).catch(err=>{
                     console.log("Er`ror from edit claim=> ",err);
            })
            setEditing(false);
        } catch (error) {
            console.error(error);
        }
    };

    function editClaim() {

    }

    return (
        <div className="cecc17-main-wrap">
            <div className="cecc17-edit-wrap">
                {editing ? (
                    <ClaimEditComponent claim={claim} editing={editing} setEditing={setEditing} />
                ) : (
                    <div className='cecc17-claim-report-display-wrap'>
                        <div className='cecc17-claim-display-wrap'>
                        <fieldset className='cecc17-claim-fieldset-wrap'>
                                <legend className='cecc17-claim-legend-wrap'>Property Claimed</legend>
                            <div className='cecc17-claim-propertyName-wrap'>
                                <span className='cecc17-claim-PropertyName-text cecc17-preventOverflow'>{
                                    "Property Name"

                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className='cecc17-claim-fieldset-wrap'>
                                <legend className='cecc17-claim-legend-wrap'>Ownership</legend>
                            <div className='cecc17-claim-ownership-wrap'>
                                <span className='cecc17-claim-ownership-text cecc17-preventOverflow'>{
                                    claim.ownership === "User"?
                                    "Owner of property" : "Representing Owner of property"
                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className='cecc17-claim-fieldset-wrap'>
                                <legend className='cecc17-claim-legend-wrap'>description</legend>
                            <div className='cecc17-claim-description-wrap'>
                                <span className='cecc17-claim-description-text cecc17-preventOverflow'>{
                                    claim.description
                                }</span>
                            </div>
                            </fieldset>
                            <span className="cecc17-helper-text-wrap"
                            id="cecc17-helper-text"
                            ></span>
                            <button className="cecc17-edit-option-button"
                            onClick={()=>{
                                setEditing(true);
                            }}
                            > Edit

                            </button>
                        </div>
                       
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditableClaimCard;


