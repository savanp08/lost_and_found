// create a card that can be edited by the user and then submitted to the database using axios post request. use the state as claim with attributes claimId, userId, reportId, ownership, description.
import React, { useState } from 'react';
import axios from 'axios';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ClaimEditComponent from '../../LocalComponents/ClaimEditComponent/ClaimEditComponent';
import './This.scss';
import AdminClaimEditComponent from '../../LocalComponents/AdminEditClaimComponent/AdminEditClaimComponent';
import { initialState_claim, initialState_user } from '../../Data/Schemas';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';


const AdminEditableClaimCard = (props) => {
    const [claim, setClaim] = useState(props.claim || initialState_claim);
    const [editing, setEditing] = useState(false);
    const [updatedClaim, setUpdatedClaim] = useState(props.claim);
    const [user, setUser] = useState(initialState_user);
    const [claim_user, setClaim_user] = useState(props.user || initialState_user);
    const [flip,setFlip] = useState(false);
   

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedClaim({ ...updatedClaim, [name]: value });
    };

    console.log("Claim Card debug => ",claim, claim_user);
    
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
                            <div className='caecc22-claim-option-each-wrap'
                            onClick={(e)=>{
                                setFlip(!flip);
                            }}
                            >
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
                        <div className={'caecc22-claim-display-wrap' + (flip? " caecc22-flip-div" : "") }>
                            <div className={'caecc22-claim-display-front-wrap' +  (flip? " caecc22-claim-front-after-flip" : "")  }>
                        <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>Property Name</legend>
                            <div className='caecc22-claim-propertyName-wrap'>
                                <span className='caecc22-claim-PropertyName-text caecc22-preventOverflow'>{
                                    
                                        props.report.itemDetails.customItemName
                                    

                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>Claimant</legend>
                            <div className='caecc22-claim-claimant-wrap'>
                                <span className='caecc22-claim-claimant-text caecc22-preventOverflow'>
                                    Name : { <span className="caecc22-claim-claimant-name-text">{claim_user.Name.firstName +
                                     (claim_user.Name.middleName? claim_user.Name.lastName : "") + claim_user.Name.lastName}</span>
                                }</span>
                                <span className='caecc22-claim-claimant-text caecc22-preventOverflow'>
                                    email : { <span className="caecc22-claim-claimant-name-text">{claim_user.email}</span>
                                }</span>
                                <span className='caecc22-claim-claimant-text caecc22-preventOverflow'>
                                    uniqueId : { <span className="caecc22-claim-claimant-name-text">{claim_user.UniqueId}</span>
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
                        
                        <div className={'caecc22-claim-display-back-wrap'  + (flip? " caecc22-claim-back-after-flip" : "") }
                        
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
                console.log("Response from virtual assessment claim=> ", res.data,res.status)
               if(res.status === 200){
                   setClaim({
                          ...claim,
                          assessment:{
                            ...claim.assessment,
                            virtualAssessment:{
                                 ...claim.assessment.virtualAssessment,
                                 status: status
                            }
                          }
                   })

               }
                

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
                console.log("Response from inPerson assessment claim=> ", res.data,res.status)
                if(res.status === 200){
                    setClaim({
                        ...claim,
                        assessment:{
                          ...claim.assessment,
                          inPersonAssessment:{
                               ...claim.assessment.inPersonAssessment,
                               status: status
                          }
                        }
                 })
                }
                

            }).catch(err => {
                console.log("Error from inPerson assessment claim=> ", err);
            })
           
        } catch (error) {
            console.error("Error from  inPerson assessment claim=>",error);
        }
    }

    async function submitPickUp(status){
        await axios.post("/Claim/editClaim/PickUp",{
            claim : {
            ...claim,
            schedule:{
                ...claim.schedule,
                pickUp:{
                    ...claim.schedule.pickUp,
                    status:status
                }
            }
        },
        update :{
            property: "schedule.pickUp.status",
            value: status,
            prev: claim.schedule.pickUp.status
        }
        }).then(res=>{
            console.log("Response from pickUp claim=> ", res.data,res.status)
            if(res.status === 200){
                setClaim({
                    ...claim,
                    schedule:{
                      ...claim.schedule,
                      pickUp:{
                           ...claim.schedule.pickUp,
                           status: status
                      }
                    }
             })
            }
        }).catch(err=>{
            console.log("Error from pickUp claim=> ", err);
        });
    }
    if(claim.schedule.inPersonAssessment.date && typeof claim.schedule.inPersonAssessment.date === "object") {
        console.log("XXXX =>",claim.schedule.inPersonAssessment, claim);
     claim.schedule.inPersonAssessment.date = claim.schedule.inPersonAssessment.date.toISOString(); 
    }

    if(!claim) return <></>
    return(
        <div className={'caecc22-claim-display-back-main-wrap' + (editBack? " caecc22-extend-wrap" : "") }>
            {
                !editBack? ( 
            <div className='caecc22-claim-display-back-display-wrap'>
                <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>Virtual Assessment</legend>
                            <div className='caecc22-claim-back-virtualAssessment-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Status :"
                                }</span>
                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.assessment.virtualAssessment.status 
                                }</span>
                            </div>
                            <div className='caecc22-claim-back-virtualAssessment-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Last Update :"
                                }</span>
                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.assessment.virtualAssessment.date
                                }</span>
                            </div>
                            <div className='caecc22-claim-back-virtualAssessment-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Comment :"
                                }</span>
                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.assessment.virtualAssessment.comment
                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>In Person Assessment</legend>
                            <div className='caecc22-claim-back-inPersonAssessment-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Status :"
                                }</span>
                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.assessment.inPersonAssessment.status 
                                }</span>
                            </div>
                            <div className='caecc22-claim-back-inPersonAssessment-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Last Update :"
                                }</span>
                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.assessment.inPersonAssessment.date
                                }</span>
                            </div>
                            <div className='caecc22-claim-back-inPersonAssessment-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Comment :"
                                }</span>
                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.assessment.inPersonAssessment.comment
                                }</span>
                            </div>
                            <div className='caecc22-claim-back-inPersonAssessment-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Scheduled On :"
                                }</span>
                               

                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.schedule.inPersonAssessment.date
                                }</span>
                            </div>
                            </fieldset>
                            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                                <legend className='caecc22-claim-legend-wrap'>Pick Up</legend>
                            <div className='caecc22-claim-back-pickUp-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Scheduled On :"
                                }</span>
                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.schedule.pickUp.date
                                }</span>
                            </div>
                            <div className='caecc22-claim-back-pickUp-wrap'>
                                <span className='caecc22-claim-each22-text caecc22-preventOverflow'>{
                                    
                                    "Status :"
                                }</span>
                                <span className='caecc22-claim-each22-answer-text caecc22-preventOverflow'>{
                                    
                                    claim.schedule.pickUp.status
                                }</span>
                            </div>
                            </fieldset>
                            <div className='caecc22-claim-back-buttons-wrap'>
                                <button className='caecc22-claim-back-edit-button'
                                onClick={(e)=>{
                                    
                                    setEditBack(true)
                                }}
                                >
                                    Edit
                                </button>
                            </div>
            </div>
                ) :(
            <div className='caecc22-claim-display-back-edit-wrap'>
            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                <div className="caecc22-claim-back-edit-close-wrap"
                onClick={(e)=>{
                    setEditBack(false);
                }}
                >
                    X
                </div>
                                <legend className='caecc22-claim-legend-wrap'>Virtual Assessment</legend>
                            <div className='caecc22-claim-display-virtualAssessment-wrap'>
                                <div className='caecc22-claim-display-virtualAssessment-each-wrap'>
                                    <span className='caecc22-claim-display-virtualAssessment-each-text'>{
                                        "Status : "
                                    }</span>
                                    <span className='caecc22-claim-display-virtualAssessment-each-text'>{
                                        //claim.assessment.virtualAssessment.status
                                    }</span>

                                </div>
                                <div className='caecc22-claim-display-virtualAssessment-each-wrap'>
                                    <span className='caecc22-claim-display-virtualAssessment-each-text'>{
                                        "Comment : "
                                    }</span>
                                    {
                                        <TextField
                                        id="caecc22-claim-display-virtualAssessment-each-textfield"
                                        label="Comment"
                                        variant="outlined"
                                        placeholder="Comment"
                                        multiline
                                        rows='2'
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        value={claim.assessment.virtualAssessment.comment ||  ""}
                                        onChange={(e) => {
                                            setClaim({
                                                ...claim,
                                                  assessment :{
                                                    ...claim.assessment,
                                                      virtualAssessment: {
                                                        ...claim.assessment.virtualAssessment,
                                                          comment: e.target.value
                                                  }
                                                }
                                            })
                                        }}
                                        />
                                    }
                                    <span className='caecc22-claim-display-virtualAssessment-each-text'>{
                                        //claim.assessment.virtualAssessment.status
                                    }</span>
                                    

                                </div>
                                <div className='caecc22-claim-display-virtualAssessment-buttons-wrap'>
                                    <button className='caecc22-claim-display-virtualAssessment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitVirtualAssessment("Accepted");
                                    }}
                                    >{
                                        "Accept"
                                    }</button>
                                    <button className='caecc22-claim-display-virtualAssessment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                         submitVirtualAssessment("Rejected");
                                    }}
                                    >{
                                        "Reject"
                                    }</button>
                                </div>
                                
                            </div>
                            </fieldset>
                            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                            <legend className='caecc22-claim-legend-wrap'>InPerson Assessment</legend>
                            <div className='caecc22-claim-display-inPersonAssessment-wrap'>
                                <div className='caecc22-claim-display-inPersonAssessment-each-wrap'>
                                    <span className='caecc22-claim-display-inPersonAssessment-each-text'>{
                                        "InPerson Assessment"
                                    }</span>
                                    <span className='caecc22-claim-display-inPersonAssessment-each-text'>{
                                        //claim.assessment.inPersonAssessment.status
                                    }</span>

                                </div>
                                <div className='caecc22-claim-display-inPersonAssessment-each-wrap'>
                                    <span className='caecc22-claim-display-inPersonAssessment-each-text'>{
                                        "Comment : "
                                    }</span>
                                    {
                                        <TextField
                                        id="caecc22-claim-display-inPersonAssessment-each-textfield"
                                        label="Comment"
                                        variant="outlined"
                                        placeholder="Comment"
                                        multiline
                                        rows='2'
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                        }}
                                        value={claim.assessment.inPersonAssessment.comment || ""}
                                        onChange={(e) => {
                                         
                                            setClaim({
                                              ...claim,
                                                assessment: {
                                                  ...claim.assessment,
                                                    inPersonAssessment: {
                                                      ...claim.assessment.inPersonAssessment,
                                                        comment: e.target.value
                                                    }
                                                }
                                            })
                                        }}
                                        />
                                    }
                                    <span className='caecc22-claim-display-inPersonAssessment-each-text'>{
                                        //claim.assessment.inPersonAssessment.status
                                    }</span>
                                    </div>
                                    <div className='caecc22-claim-display-inPersonAssessment-each-wrap'>
                                    <span className='caecc22-claim-display-inPersonAssessment-each-text'>{
                                        "Schedule On : "
                                    }</span>
                                     <div className='caecc22-claim-back-inPersonAssessment-date-wrap'>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                 <DemoContainer components={['DatePicker']}>
                                   <DatePicker label="Basic date picker" 
                                   value={dayjs(claim.schedule.inPersonAssessment.date || "")}
                                   onChange={(e)=>{
                                        setClaim({
                                             ...claim,
                                             schedule:{
                                                  ...claim.schedule,
                                                  inPersonAssessment:{
                                                    ...claim.schedule.inPersonAssessment,
                                                    date: e
                                                  }
                                             }
                                        })
                                   }}
                                   />
                                 </DemoContainer>
                               </LocalizationProvider>

                                </div>
                                    {
                                        
                                    }
                                    <span className='caecc22-claim-display-inPersonAssessment-each-text'>{
                                        //claim.assessment.inPersonAssessment.status
                                    }</span>
                                    </div>
                                    <div className='caecc22-claim-display-virtualAssessment-each-wrap'>
                                    <span className='caecc22-claim-display-virtualAssessment-each-text'>{
                                        "Location : "
                                    }</span>
                                    <div className='caecc22-claim-display-virtualAssessment-each-text'>{
                                         <TextField 
                                         id="caecc22-claim-display-virtualAssessment-each-textfield"
                                            label="Location"
                                            variant="outlined"
                                            placeholder="Location"
                                            value={claim.assessment.inPersonAssessment.location || ""}
                                            onChange={(e) => {
                                                setClaim({
                                                    ...claim,
                                                    assessment: {
                                                        ...claim.assessment,
                                                        inPersonAssessment: {
                                                            ...claim.assessment.inPersonAssessment,
                                                            location: e.target.value
                                                        }
                                                    }
                                                })
                                            }}
                                            />
                                    }</div>

                                </div>
                                
                                    {

                                        claim.assessment.inPersonAssessment.status === "Not Initiated"?
                                        (
                                            <div className='caecc22-claim-display-inPersonAssessment-buttons-wrap'>
                                    
                                    <button className='caecc22-claim-display-inPersonAssessment-each-wrap'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitInPersonAssessment("Initiated");
                                    }}
                                    disabled={(claim.assessment.inPersonAssessment.location && claim.schedule.inPersonAssessment.date)? false : true}

                                    >
                                        Initiate
                                    </button>
                                    </div>
                                        ):(
                                    <div className='caecc22-claim-display-inPersonAssessment-buttons-wrap'>
                                    <button className='caecc22-claim-display-inPersonAssessment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitInPersonAssessment("Accepted");
                                        
                                    }}
                                    >{
                                        "Accept"
                                    }</button>
                                    <button className='caecc22-claim-display-inPersonAssessment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitInPersonAssessment("Rejected");
                                    }}
                                    >{
                                        "Reject"
                                    }</button>
                                    </div>
                                        )
                                        }
                                </div>
                                
                            </fieldset>
                            <fieldset className={'caecc22-claim-fieldset-wrap' + (claim.delete.status === "deleted"? " caecc22-claim-deleted-fieldset" : "")}>
                            <legend className='caecc22-claim-legend-wrap'>Pick Up</legend>
                             {

                                        claim.schedule.pickUp.status === "Not Initiated"?
                                        (
                                            <div className='caecc22-claim-display-inPersonAssessment-buttons-wrap'>
                                    
                                    <div className='caecc22-claim-display-inPersonAssessment-each-wrap'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitPickUp("Initiated");
                                    }}
                                    >
                                        Initiate
                                    </div>
                                    </div>
                                        ):(
                                    <div className='caecc22-claim-display-inPersonAssessment-buttons-wrap'>
                                    <button className='caecc22-claim-display-inPersonAssessment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitPickUp("Successful");
                                        
                                    }}
                                    >{
                                        "Successful"
                                    }</button>
                                    <button className='caecc22-claim-display-inPersonAssessment-button'
                                    onClick={(e)=>{
                                        e.preventDefault();
                                        submitPickUp("Failed");
                                    }}
                                    >{
                                        "Failed"
                                    }</button>
                                    </div>
                                        )
                                        }
                            </fieldset>
                            <button className='caecc22-claim-display-back-edit-submit-button'
                            onClick={(e)=>{
                                e.preventDefault();
                                setEditBack(false);
                            }}
                            >
                                Done
                            </button>
                            </div>
                )
}
        </div>
    )
}




export default AdminEditableClaimCard;


