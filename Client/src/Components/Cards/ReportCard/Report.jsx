import React, { useState } from "react";
import './Report.scss';
import EditReport from "../../GlobalComponents/EditReport/EditReport";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addReport } from "../../../Store/Slices/ReportSlice/ReportSlice";

const UserReportCard = ({report}) => {

    const [displayImages, setDisplayImages] = useState(report.media || []);
    const dispatch = useDispatch();
    

    

    return(
        <div className="curc-card-wrap"
        id={`curc-card-wrap-${toString(report._id)}`}
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
            </div>
            </div>
            </div>
        </div>
      
    </div>

    )
}

export default UserReportCard;