import React, { useEffect, useState } from "react";
import './This.scss';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../../../Store/Slices/ReportSlice/ReportSlice";
import { initialState_report } from "../../Data/Schemas";
import { openForm } from "../../../Store/Slices/FormSlice/FormSlice";

const AdminReportCard = ({report,userX}) => {
    
    const initialState = initialState_report;
    
    const [local_report , setLocalReport] = useState(report || initialState);
    const [displayImages, setDisplayImages] = useState((report? report.media : []) || []);
    const [imageType, setImageType] = useState(0);
    const [flip,setFlip] = useState(false);
    const dispatch = useDispatch();
    const user = userX;
    
    //console.log("Props in admin report card",report,userX);
   // console.log("Rerender in edit report popup", local_report,report);
    

    useEffect(()=>{
        if(report){
        setLocalReport(report);
        setDisplayImages(report.media);
        }
    },[report]);

    function OpenEditReport(e,id){
        e.preventDefault();
       dispatch(addReport(local_report));
       if(id==="admin"){
        dispatch(openForm({
            formName : "editReport",
            data : null,
        }));
    }
    else{
        dispatch(openForm({
            formName : "editUserReport",
            data : local_report,
        }));
    }
    }

    async function deleteReport(e){
        e.preventDefault()
        await axios.post('/Report/deleteOneReport',{_id:local_report._id})
        .then(res=>{
            console.log("Deleted report",res);
            
 
        }).catch(err=>{
            console.log("Error in deleting report",err);
        
        })
    }
   
const auth=(user && ((user._id === local_report.userId) || user.adminId? true : false));
console.log("debug auth 1=> ",auth,user,(user && ((user._id && user._id === local_report.userId) || user.adminId)));
try{
 console.log("debug auth 2=> ",user._id,local_report.userId,user.adminId, user._id === local_report.userId, user.adminId? true : false);
}catch(err){
    console.log("debug auth 3=> ",err);
}
    
if(!user || !local_report) return null;
    return(
        <div className="carc-card-wrap"
        id={`carc-card-wrap-${local_report._id}`}
        >
        <div className= "carc-inner-wrap">
            
                <div className="carc-top-header-wrap">
                    <div className="carc-rportId-text-wrap">
                    <span className="carc-rportId-text">
                        {local_report._id}
                    </span>
                    <div className="carc-rportId-text-icon-wrap"
                    onClick={(e)=>{
                        navigator.clipboard.writeText(local_report._id);
                    }}
                    >
                        Copy Id

                    </div>
                    </div>
                    <span className="carc-left-title">
                        {local_report.itemDetails.customItemName}
                    </span>
                </div>
                
                    <div className="carc-bottom-main-wrap">
                        <div className="carc-options-wrap">
                            <div className="carc-left-Media-Item-Media-wrap"
                            onClick={(e)=>{
                                 if(imageType === 1) setDisplayImages(local_report.itemDetails.location.media);
                                 else setDisplayImages(local_report.media);
                                 setImageType((imageType + 1)%2);
                            }}
                            >
                                I
                            </div>
                            <div className="carc-left-Media-location-media-wrap"
                            onClick={(e)=>{
                               setFlip(!flip);
                           }}
                            >
                                 R
                            </div>
                            <div className={"carc-left-edit-wrap" + (auth? "" : " Hide")}
                            onClick={(e)=>{
                                if(user._id) {
                                    OpenEditReport(e,"user");
                                 }
                                 else{
                                    console.log("debug => opening admin edit report")
                                    OpenEditReport(e,"admin")
                                 }
                           }}
                            >
                                 E
                            </div>
                            <div className={"carc-left-edit-wrap" + (auth? "" : " Hide")}
                            onClick={(e)=>{
                                deleteReport(e);
                           }}
                            >
                                 D
                            </div>
                        </div>
                    
                    <div className={"carc-botom-main-body-wrap" + (flip? " carc-reporteditable-flip-container" : "") }>
                <div className={"carc-left-body-wrap"  + (flip? " carc-reporteditable-front-wrap" : "")  }>
                    <div className="carc-left-Media-Images-wrap">
                    {
                    displayImages.map((media,key)=>{
                        return(
                            <img src={media} alt="Report Image" className="carc-left-body-each-img" />
                        )
                    })
                   }
                    </div>
                    <div className="carc-left-details-wrap">
                        <div className="carc-left-details-each-wrap">
                            <span className="carc-left-details-each-text">
                                Reported On : <span className="carc-left-details-each-text-value">{local_report.date}</span>
                            </span>
                            </div>
                            <div className="carc-left-details-each-wrap">
                            <span className="carc-left-details-each-text">
                                Reported By : <span className="carc-left-details-each-text-value">
                                    {local_report.reporterName.firstName + " " + local_report.reporterName.lastName + " " +
                                    ( local_report.reporterName.middleName? local_report.reporterName.middleName : "") }
                                    </span>
                            </span>
                            </div>
                            <div className="carc-left-details-each-wrap">
                            <span className="carc-left-details-each-text">
                                ownership : <span className="carc-left-details-each-text-value">
                                    {local_report.reporterType === "user"? "Self" : "Other"}
                                    </span>
                            </span>
                            </div>
                            <div className="carc-left-details-each-wrap">
                            <span className="carc-left-details-each-text">
                                Submitted At : <span className="carc-left-details-each-text-value">
                                    {local_report.custodyAt }
                                    </span>
                            </span>
                            </div>

                            <div className="carc-right-location-wrap">
                    <div className="carc-right-location-icon-wrap">
                        Lo:
                    </div>
                    <span className="carc-right-location">
                        {local_report.itemDetails.location.buiildingDetails  + " , "
                        + local_report.itemDetails.location.university  + " , "
                        + local_report.itemDetails.location.street   + " , "
                        + local_report.itemDetails.location.university   + " , "
                        + local_report.itemDetails.location.city   + " , "
                        + local_report.itemDetails.location.state   + " , "
                        + local_report.itemDetails.location.pinCode}
                    </span>
                </div>
                        </div>
                    </div>
                   
                
           
            
            <div className={"carc-right-wrap"  + (flip? " carc-reporteditable-back-wrap" : "")  }>
            <div className="carc-right-body-wrap">
                <div className="carc-right-color-wrap">
                    <div className="carc-right-color-palet-wrap">
                       {
                        local_report.itemDetails.colors.map((color,key)=>{
                            return(
                                <div className="carc-right-color-palet-each-wrap">
                                    <div className="carc-right-color-palet-each"
                                    style={{
                                        backgroundColor: color.code
                                    }}
                                    ></div>
                                </div>
                            )
                        })
                       }
                    </div>
                    <div className="carc-right-color-text-wrap">
                        {
                            local_report.itemDetails.colors.map((color,key)=>{
                                
                                return(
                                    color.label + ", "
                                )
                            })
                        }
                    </div>
                </div>
               
                <div className="carc-right-description-wrap">
                    <div className="carc-right-description-icon-wrap">
                        Des:
                    </div>
                    <span className="carc-right-description">
                        {local_report.itemDetails.description}
                    </span>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
      
    </div>

    )
}

export default AdminReportCard;