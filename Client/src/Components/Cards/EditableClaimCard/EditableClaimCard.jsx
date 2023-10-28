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
import { initialState_claim, initialState_report, initialState_user } from '../../Data/Schemas';

const AdminEditableClaimCard = (props) => {
    const [claim, setClaim] = useState(props.claim || initialState_claim);
    const [editing, setEditing] = useState(false);
    const [updatedClaim, setUpdatedClaim] = useState(props.claim);
    const [user, setUser] = useState(initialState_user);
    const [claim_user, setClaim_user] = useState(props.user || initialState_user);
    const [flip,setFlip] = useState(false);
    const [report, setReport] = useState(props.report || initialState_report);
   

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedClaim({ ...updatedClaim, [name]: value });
    };

    //console.log("Claim Card debug => ",claim, claim_user);
    
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
        <div className="cuecc34-main-wrap">
            <div className="cuecc34-edit-wrap">
                {editing ? (
                    <AdminClaimEditComponent claim={claim} editing={editing} setEditing={setEditing} />
                ) : (
                    <div className='cuecc34-claim-report-display-wrap'>
                        <div className='cuecc34-claim-options-wrap'>
                            <div className='cuecc34-claim-option-each-wrap'
                            onClick={(e)=>{
                                setFlip(!flip);
                            }}
                            >
                                R
                            </div>
                            <div className='cuecc34-claim-option-each-wrap'
                            onClick={(e)=>{
                                deleteClaim(e);
                            }}
                            >
                                D
                            </div>
                            
                        </div>
                        <div className={'cuecc34-claim-display-wrap' + (flip? " cuecc34-flip-div" : "") }>
                            <div className={'cuecc34-claim-display-front-wrap' +  (flip? " cuecc34-claim-front-after-flip" : "")  }>
                        <fieldset className={'cuecc34-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " cuecc34-claim-deleted-fieldset" : "")}>
                                <legend className='cuecc34-claim-legend-wrap'>Property Name</legend>
                            <div className='cuecc34-claim-propertyName-wrap'>
                                <span className='cuecc34-claim-PropertyName-text cuecc34-preventOverflow'>{
                                    
                                        report.itemDetails.customItemName
                                    

                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'cuecc34-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " cuecc34-claim-deleted-fieldset" : "")}>
                                <legend className='cuecc34-claim-legend-wrap'>Claimant</legend>
                            <div className='cuecc34-claim-claimant-wrap'>
                                <span className='cuecc34-claim-claimant-text cuecc34-preventOverflow'>
                                    Name : { <span className="cuecc34-claim-claimant-name-text">{claim_user.Name.firstName +
                                     (claim_user.Name.middleName? claim_user.Name.lastName : "") + claim_user.Name.lastName}</span>
                                }</span>
                                <span className='cuecc34-claim-claimant-text cuecc34-preventOverflow'>
                                    email : { <span className="cuecc34-claim-claimant-name-text">{claim_user.email}</span>
                                }</span>
                                <span className='cuecc34-claim-claimant-text cuecc34-preventOverflow'>
                                    uniqueId : { <span className="cuecc34-claim-claimant-name-text">{claim_user.UniqueId}</span>
                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'cuecc34-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " cuecc34-claim-deleted-fieldset" : "")}>
                                <legend className='cuecc34-claim-legend-wrap'>Ownership</legend>
                            <div className='cuecc34-claim-ownership-wrap'>
                                <span className='cuecc34-claim-ownership-text cuecc34-preventOverflow'>{
                                    claim.ownership === "User"?
                                    "Owner of property" : "Representing Owner of property"
                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'cuecc34-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " cuecc34-claim-deleted-fieldset" : "")}>
                                <legend className='cuecc34-claim-legend-wrap'>description</legend>
                            <div className='cuecc34-claim-description-wrap'>
                                <span className='cuecc34-claim-description-text cuecc34-preventOverflow'>{
                                    claim.description
                                }</span>
                            </div>
                            </fieldset>
                            <span className="cuecc34-helper-text-wrap"
                            id="cuecc34-helper-text"
                            ></span>
                            <button className="cuecc34-edit-option-button"
                            onClick={()=>{
                                setEditing(true);
                            }}
                            > Edit
                            </button>
                        </div>
                        
                        <div className={'cuecc34-claim-display-back-wrap'  + (flip? " cuecc34-claim-back-after-flip" : "") }
                        
                        >
                            <AdminEdiatableClaimCard_BackCard claimX={claim}/>
                        </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};


const AdminEdiatableClaimCard_BackCard = ({ claimX }) => {

    const [claim, setClaim] = useState(claimX || null);
    const [editBack,setEditBack] = useState(false);

    const submitVirtualAssessment = async (status) => {

        try {
            await axios.post('/Claim/editClaim/AssessmentUpdate/Virtual', {
                ...claim,
                "assessment": {
                    ...claim.assessment,
                    "virtualAssessment": {
                        ...claim.assessment.virtualAssessment,
                        "status": status
                    }
                }

            }).then(res => {
                console.log("Response from virtual assessment claim=> ", res.data)

                

            }).catch(err => {
                console.log("Error from virtual assessment claim=> ", err);
            })
           
        } catch (error) {
            console.error("Error from  virtual assessment claim=>",error);
        }
    }

    const submitInPersonAssessment = async (status) => {
        try {
            await axios.post('/Claim/editClaim/AssessmentUpdate/InPerson', {
                ...claim,
                "assessment": {
                    ...claim.assessment,
                    "inPersonAssessment": {
                        ...claim.assessment.inPersonAssessment,
                        "status": status
                    }
                }
            }).then(res => {
                console.log("Response from inPerson assessment claim=> ", res.data)

                

            }).catch(err => {
                console.log("Error from inPerson assessment claim=> ", err);
            })
           
        } catch (error) {
            console.error("Error from  inPerson assessment claim=>",error);
        }
    }

    async function submitPickUp(status){
        await axios.post("/Claim/editClaim/PickUp",{
            ...claim,
            schedule:{
                ...claim.schedule,
                pickUp:{
                    ...claim.schedule.pickUp,
                    status:status
                }
            }
        })
    }


    if(!claim) return <></>
    return(
        <div className='cuecc34-claim-display-back-main-wrap'>
            {
                !editBack? ( 
            <div className='cuecc34-claim-display-back-display-wrap'>
                <fieldset className={'cuecc34-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " cuecc34-claim-deleted-fieldset" : "")}>
                                <legend className='cuecc34-claim-legend-wrap'>Virtual Assessment</legend>
                            <div className='cuecc34-claim-back-virtualAssessment-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Status :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.assessment.virtualAssessment.status 
                                }</span>
                            </div>
                            <div className='cuecc34-claim-back-virtualAssessment-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Last Update :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.assessment.virtualAssessment.date
                                }</span>
                            </div>
                            <div className='cuecc34-claim-back-virtualAssessment-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Comment :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.assessment.virtualAssessment.comment
                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'cuecc34-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " cuecc34-claim-deleted-fieldset" : "")}>
                                <legend className='cuecc34-claim-legend-wrap'>In Person Assessment</legend>
                            <div className='cuecc34-claim-back-inPersonAssessment-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Status :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.assessment.inPersonAssessment.status 
                                }</span>
                            </div>
                            <div className='cuecc34-claim-back-inPersonAssessment-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Last Update :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.assessment.inPersonAssessment.date
                                }</span>
                            </div>
                            <div className='cuecc34-claim-back-inPersonAssessment-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Comment :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.assessment.inPersonAssessment.comment
                                }</span>
                            </div>
                            <div className='cuecc34-claim-back-inPersonAssessment-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Scheduled On :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.schedule.inPersonAssessment.date
                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'cuecc34-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " cuecc34-claim-deleted-fieldset" : "")}>
                                <legend className='cuecc34-claim-legend-wrap'>Pick Up</legend>
                            <div className='cuecc34-claim-back-pickUp-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Scheduled On :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.schedule.pickUp.date
                                }</span>
                            </div>
                            <div className='cuecc34-claim-back-pickUp-wrap'>
                                <span className='cuecc34-claim-each22-text cuecc34-preventOverflow'>{
                                    
                                    "Status :"
                                }</span>
                                <span className='cuecc34-claim-each22-answer-text cuecc34-preventOverflow'>{
                                    
                                    claim.schedule.pickUp.status
                                }</span>
                            </div>
                            </fieldset>
                            <div className='cuecc34-claim-back-buttons-wrap'>
                                <button className='cuecc34-claim-back-edit-button'
                                onClick={(e)=>{
                                    
                                    setEditBack(true)
                                }}
                                >
                                    {/* Edit */}
                                </button>
                            </div>
            </div>
                ) :(
            <div className='cuecc34-claim-display-back-edit-wrap'>
            
                            </div>
                )
}
        </div>
    )
}




export default AdminEditableClaimCard;


