import React, { useState } from "react";
import './Report.scss';
import EditReport from "../../GlobalComponents/EditReport/EditReport";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addReport } from "../../../Store/Slices/ReportSlice/ReportSlice";
import { useNavigate, useNavigation } from "react-router-dom";

const UserReportCard = ({report}) => {

    const [displayImages, setDisplayImages] = useState(report.media || []);
    const dispatch = useDispatch();
    const user  = useSelector(state => state.user);
    const navigation = useNavigate();

    async function claimReport(e,report){
         if(!user.userId) {
            var x = document.getElementById("app-popup-main-wrap");
            if(x.classList.contains("Hide")) {
                x.classList.remove("Hide");
                x.innerHTML = "Please Login to claim this report";
            }
         }
         else{
            await axios.post("/Claim/addClaim",{
                report: report
            }).then(res => {
                console.log("response from claim report=> ",res.data);

            }).catch(err => {
                console.log("error from claim report=> ",err);
            })
         }
    }

    return(
        <div className="curc-card-wrap"
        id={`curc-card-wrap-${report._id}`}
        >
        <div className="curc-inner-wrap">
            
        <div className="curc-left-Media-wrap">
                        <div className="curc-left-Media-switch-wrap">
                            <div className="curc-left-Media-Item-Media-wrap"
                            onClick={(e)=>{
                                 setDisplayImages(report.itemDetails.location.media);
                            }}
                            >
                                I
                            </div>
                            <div className="curc-left-Media-location-media-wrap"
                            onClick={(e)=>{
                               
                           }}
                            >
                                 R
                            </div>
                            
                        </div>
                    </div>
                    <div className="curc-content-wrap">
            <div className="curc-left-wrap">
                <div className="curc-left-title-wrap">
                    <span className="curc-left-title">
                        {report.itemDetails.customItemName}
                    </span>
                </div>
                <div className="curc-left-body-wrap">
                    
                    <div className="curc-left-Media-Images-wrap">
                    {
                    displayImages.map((media,key)=>{
                        return(
                            <img src={media} alt="Report Image" className="curc-left-body-each-img" />
                        )
                    })
                   }
                    </div>
                   
                </div>
            </div>
            
            <div className="curc-right-wrap">
            <div className="curc-right-body-wrap">
                <div className="curc-right-color-wrap">
                    <div className="curc-right-color-palet-wrap">
                       {
                        report.itemDetails.colors.map((color,key)=>{
                            return(
                                <div className="curc-right-color-palet-each-wrap">
                                    <div className="curc-right-color-palet-each"
                                    style={{
                                        backgroundColor: color.code
                                    }}
                                    ></div>
                                </div>
                            )
                        })
                       }
                    </div>
                    <div className="curc-right-color-text-wrap">
                        {
                            report.itemDetails.colors.map((color,key)=>{
                                
                                return(
                                    color.label + ", "
                                )
                            })
                        }
                    </div>
                </div>
                <div className="curc-right-location-wrap">
                    <div className="curc-right-location-icon-wrap">
                        Lo:
                    </div>
                    <span className="curc-right-location">
                        {report.itemDetails.location.buiildingDetails  + " , "
                        + report.itemDetails.location.university  + " , "
                        + report.itemDetails.location.street   + " , "
                        + report.itemDetails.location.university   + " , "
                        + report.itemDetails.location.city   + " , "
                        + report.itemDetails.location.state   + " , "
                        + report.itemDetails.location.pinCode}
                    </span>
                </div>
                <div className="curc-right-description-wrap">
                    <div className="curc-right-description-icon-wrap">
                        Des:
                    </div>
                    <span className="curc-right-description">
                        {report.itemDetails.description}
                    </span>
                </div>
                <div className="curc-right-claim-button-wrap">
                    <button className="curc-right-claim-button"
                    disabled={report.found.status}
                    onClick={(e)=>{
                        claimReport(e,report);
                    }}
                    >
                        {
                            report.found.status? "Claimed" : "Claim"
                        }
                    </button>
                </div>
            </div>
            </div>
            </div>
        </div>
      
    </div>

    )
}

export default UserReportCard;