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
import AdminClaimEditComponent from '../../LocalComponents/AdminEditClaimComponent/AdminEditClaimComponent';


const AdminEditableClaimCard = ({ claim }) => {
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

    async function deleteClaim() {
        await axios.post('/Claim/deleteClaim', { _id: claim._id })
            .then(res => {
                console.log("Deleted claim", res);
                if (res.status === 200) {
                    console.log("Deleted claim", res);
                }
                else{
                    console.log("Error in deleting claim", res);
                }
            }).catch(err=>{

                console.log("Error in deleting claim", err);
            })
    }

    return (
        <div className="caecc22-main-wrap">
            <div className="caecc22-edit-wrap">
                {editing ? (
                    <AdminClaimEditComponent claim={claim} editing={editing} setEditing={setEditing} />
                ) : (
                    <div className='caecc22-claim-report-display-wrap'>
                        <div className='caecc22-claim-options-wrap'>
                            <div className='caecc22-claim-option-each-wrap'>
                                R
                            </div>
                            <div className='caecc22-claim-option-each-wrap'
                            onClick={(e)=>{
                                deleteClaim(e);
                            }}
                            >
                                D
                            </div>
                            
                        </div>
                        <div className='caecc22-claim-display-wrap'>
                            <div className='caecc22-claim-display-front-wrap'>
                        <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>Property Claimed</legend>
                            <div className='caecc22-claim-propertyName-wrap'>
                                <span className='caecc22-claim-PropertyName-text caecc22-preventOverflow'>{
                                    "Property Name"

                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>Ownership</legend>
                            <div className='caecc22-claim-ownership-wrap'>
                                <span className='caecc22-claim-ownership-text caecc22-preventOverflow'>{
                                    claim.ownership === "User"?
                                    "Owner of property" : "Representing Owner of property"
                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>description</legend>
                            <div className='caecc22-claim-description-wrap'>
                                <span className='caecc22-claim-description-text caecc22-preventOverflow'>{
                                    claim.description
                                }</span>
                            </div>
                            </fieldset>
                            <span className="caecc22-helper-text-wrap"
                            id="caecc22-helper-text"
                            ></span>
                            <button className="caecc22-edit-option-button"
                            onClick={()=>{
                                setEditing(true);
                            }}
                            > Edit

                            </button>
                        </div>
                        </div>
                        <div className='caecc22-claim-display-back-wrap'>
                            <AdminEdiatableClaimCard_BackCard claimX={claim}/>
                        </div>
                       
                    </div>
                )}
            </div>
        </div>
    );
};


const AdminEdiatableClaimCard_BackCard = ({ claimX }) => {
    const [claim, setClaim] = useState(claimX || null);


    const submitVirtualAssesment = async (status) => {

        try {
            await axios.post('/Claim/editClaim/AssesmentUpdate/Virtual', {
                ...claim,
                "assessment": {
                    ...claim.assessment,
                    "virtualAssesment": {
                        ...claim.assessment.virtualAssesment,
                        "status": status
                    }
                }

            }).then(res => {
                console.log("Response from virtual assesment claim=> ", res.data)

                

            }).catch(err => {
                console.log("Error from virtual assesment claim=> ", err);
            })
           
        } catch (error) {
            console.error("Error from  virtual assesment claim=>",error);
        }
    }

    const submitInPersonAssessment = async (status) => {
        try {
            await axios.post('/Claim/editClaim/AssesmentUpdate/InPerson', {
                ...claim,
                "assessment": {
                    ...claim.assessment,
                    "inPersonAssesment": {
                        ...claim.assessment.inPersonAssesment,
                        "status": status
                    }
                }
            }).then(res => {
                console.log("Response from inPerson assesment claim=> ", res.data)

                

            }).catch(err => {
                console.log("Error from inPerson assesment claim=> ", err);
            })
           
        } catch (error) {
            console.error("Error from  inPerson assesment claim=>",error);
        }
    }


    if(!claim) return <></>
    return(
        <div className='caecc22-claim-display-back-main-wrap'>
            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>Virtual Assesment</legend>
                            <div className='caecc22-claim-display-virtualAssesment-wrap'>
                                <div className='caecc22-claim-display-virtualAssesment-each-wrap'>
                                    <span className='caecc22-claim-display-virtualAssesment-each-text'>{
                                        "Status : "
                                    }</span>
                                    <span className='caecc22-claim-display-virtualAssesment-each-text'>{
                                        //claim.assessment.virtualAssesment.status
                                    }</span>

                                </div>
                                <div className='caecc22-claim-display-virtualAssesment-each-wrap'>
                                    <span className='caecc22-claim-display-virtualAssesment-each-text'>{
                                        "Comment : "
                                    }</span>
                                    {
                                        <TextField
                                        id="caecc22-claim-display-virtualAssesment-each-textfield"
                                        label="Comment"
                                        variant="outlined"
                                        placeholder="Comment"
                                        multiline
                                        rows='2'
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        value={"None"}
                                        onChange={(e) => {
                                            //setClaim({
                                            //...claim,
                                            //description: e.target.value,
                                            //})
                                        }}
                                        />
                                    }
                                    <span className='caecc22-claim-display-virtualAssesment-each-text'>{
                                        //claim.assessment.virtualAssesment.status
                                    }</span>

                                </div>
                                <div className='caecc22-claim-display-virtualAssesment-buttons-wrap'>
                                    <button className='caecc22-claim-display-virtualAssesment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitVirtualAssesment("Accepted");
                                    }}
                                    >{
                                        "Accept"
                                    }</button>
                                    <button className='caecc22-claim-display-virtualAssesment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                         submitVirtualAssesment("Rejected");
                                    }}
                                    >{
                                        "Reject"
                                    }</button>
                                </div>
                                
                            </div>
                            </fieldset>
                            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                            <legend className='caecc22-claim-legend-wrap'>InPerson Assesment</legend>
                            <div className='caecc22-claim-display-inPersonAssesment-wrap'>
                                <div className='caecc22-claim-display-inPersonAssesment-each-wrap'>
                                    <span className='caecc22-claim-display-inPersonAssesment-each-text'>{
                                        "InPerson Assesment"
                                    }</span>
                                    <span className='caecc22-claim-display-inPersonAssesment-each-text'>{
                                        //claim.assessment.inPersonAssesment.status
                                    }</span>

                                </div>
                                <div className='caecc22-claim-display-inPersonAssesment-each-wrap'>
                                    <span className='caecc22-claim-display-inPersonAssesment-each-text'>{
                                        "Comment : "
                                    }</span>
                                    {
                                        <TextField
                                        id="caecc22-claim-display-inPersonAssesment-each-textfield"
                                        label="Comment"
                                        variant="outlined"
                                        placeholder="Comment"
                                        multiline
                                        rows='2'
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        value={"None"}
                                        onChange={(e) => {
                                            //setClaim({
                                            //...claim,
                                            //description: e.target.value,
                                            //})
                                        }}
                                        />
                                    }
                                    <span className='caecc22-claim-display-inPersonAssesment-each-text'>{
                                        //claim.assessment.inPersonAssesment.status
                                    }</span>
                                    </div>
                                
                                    {

                                        claim.assessment.virtualAssesment.status === "Not Initiated"?
                                        (
                                            <div className='caecc22-claim-display-inPersonAssesment-buttons-wrap'>
                                    
                                    <div className='caecc22-claim-display-inPersonAssesment-each-wrap'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitInPersonAssessment("Initiated");
                                    }}
                                    >
                                        Initiate
                                    </div>
                                    </div>
                                        ):(
                                    <div className='caecc22-claim-display-inPersonAssesment-buttons-wrap'>
                                    <button className='caecc22-claim-display-inPersonAssesment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setClaim({
                                            ...claim,
                                            "assessment": {
                                                ...claim.assessment,
                                                "inPersonAssesment": {
                                                    ...claim.assessment.inPersonAssesment,
                                                    "status": "Accepted"
                                                }
                                            }
                                        })
                                        
                                    }}
                                    >{
                                        "Accept"
                                    }</button>
                                    <button className='caecc22-claim-display-inPersonAssesment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        setClaim({
                                            ...claim,
                                            "assessment": {
                                                ...claim.assessment,
                                                "inPersonAssesment": {
                                                    ...claim.assessment.inPersonAssesment,
                                                    "status": "Rejected"
                                                }
                                            }
                                        })
                                    }}
                                    >{
                                        "Reject"
                                    }</button>
                                    </div>
                                        )
                                        }
                                </div>
                                        
                                
                                  
                            
                            </fieldset>
        </div>
    )
}




export default AdminEditableClaimCard;


