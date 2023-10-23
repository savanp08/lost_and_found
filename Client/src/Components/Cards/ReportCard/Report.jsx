import React, { useEffect, useState } from "react";
import './Report.scss';
import EditReport from "../../GlobalComponents/EditReport/EditReport";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../../../Store/Slices/ReportSlice/ReportSlice";
import { initialState_report } from "../../Data/Schemas";
import { useNavigate } from "react-router-dom";
import {
    open_div
} from "../../../Handlers/PopUp";



const UserReportCard = ({report}) => {
    
    const initialState = initialState_report;
    
    const [local_report , setLocalReport] = useState(report || initialState);
    const [displayImages, setDisplayImages] = useState((report? report.media : []) || []);
    const [flip,setFlip] = useState(false);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user); 
    
    const navigation = useNavigate();
    
    console.log("Rerender in edit report popup", local_report,report);
    

    useEffect(()=>{
        if(report){
        setLocalReport(report);
        setDisplayImages(report.media);
        }
    },[report]);

    async function claimReport(e,report){
        dispatch(addReport(report));
         if(!user.userId) {
            var x = document.getElementById("app-popup-main-wrap");
            if(x.classList.contains("Hide")) {
                x.classList.remove("Hide");
            }
         }
         else{
            open_div("ur11-claim-popup-main-min");
         }
    }

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
                                 setDisplayImages(local_report.itemDetails.location.media);
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
            <div className="curc-right-claim-button-wrap">
                    <button className="curc-right-claim-button"

                    onClick={(e)=>{
                        claimReport(e,report);
                    }}
                    >
                        Claim
                    </button>
                </div>
            </div>
      
    </div>

    )
}

export default UserReportCard;