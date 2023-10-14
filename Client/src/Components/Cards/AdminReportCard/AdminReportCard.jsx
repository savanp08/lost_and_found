import React, { useState } from "react";
import './This.scss';
import EditReport from "../../GlobalComponents/EditReport/EditReport";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addReport } from "../../../Store/Slices/ReportSlice/ReportSlice";

const AdminReportCard = ({report}) => {

    const [displayImages, setDisplayImages] = useState(report.media || []);
    const dispatch = useDispatch();
    function OpenEditReport(e){
        e.preventDefault();
       dispatch(addReport(report));
        var x = document.getElementById("aer11-EditReport-wrap");
        console.log(x);
        if(x && x.classList.contains("Hide")){
            x.classList.remove("Hide");
            x.classList.add("Add-EditReport-After");
        }
    }

    async function deleteReport(e){
        e.preventDefault()
        await axios.post('/Report/deleteOneReport',{_id:report._id})
        .then(res=>{
            console.log("Deleted report",res);
            if(res.status === 200) {
                document.getElementById(`carc-card-wrap-${toString(report._id)}`).style.display = "none !important";
            }
 
        })
    }

    return(
        <div className="carc-card-wrap"
        id={`carc-card-wrap-${toString(report._id)}`}
        >
        <div className="carc-inner-wrap">
            
            <div className="carc-left-wrap">
                <div className="carc-left-title-wrap">
                    <span className="carc-left-title">
                        {report.itemDetails.customItemName}
                    </span>
                </div>
                <div className="carc-left-body-wrap">
                    <div className="carc-left-Media-wrap">
                        <div className="carc-left-Media-switch-wrap">
                            <div className="carc-left-Media-Item-Media-wrap"
                            onClick={(e)=>{
                                 setDisplayImages(report.itemDetails.location.media);
                            }}
                            >
                                I
                            </div>
                            <div className="carc-left-Media-location-media-wrap"
                            onClick={(e)=>{
                               
                           }}
                            >
                                 R
                            </div>
                            <div className="carc-left-edit-wrap"
                            onClick={(e)=>{
                                OpenEditReport(e);
                           }}
                            >
                                 E
                            </div>
                            <div className="carc-left-edit-wrap"
                            onClick={(e)=>{
                                deleteReport(e);
                           }}
                            >
                                 D
                            </div>
                        </div>
                    </div>
                    <div className="carc-left-Media-Images-wrap">
                    {
                    displayImages.map((media,key)=>{
                        return(
                            <img src={media} alt="Report Image" className="carc-left-body-each-img" />
                        )
                    })
                   }
                    </div>
                   
                </div>
            </div>
            
            <div className="carc-right-wrap">
            <div className="carc-right-body-wrap">
                <div className="carc-right-color-wrap">
                    <div className="carc-right-color-palet-wrap">
                       {
                        report.itemDetails.colors.map((color,key)=>{
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
                            report.itemDetails.colors.map((color,key)=>{
                                
                                return(
                                    color.label + ", "
                                )
                            })
                        }
                    </div>
                </div>
                <div className="carc-right-location-wrap">
                    <div className="carc-right-location-icon-wrap">
                        Lo:
                    </div>
                    <span className="carc-right-location">
                        {report.itemDetails.location.buiildingDetails  + " , "
                        + report.itemDetails.location.university  + " , "
                        + report.itemDetails.location.street   + " , "
                        + report.itemDetails.location.university   + " , "
                        + report.itemDetails.location.city   + " , "
                        + report.itemDetails.location.state   + " , "
                        + report.itemDetails.location.pinCode}
                    </span>
                </div>
                <div className="carc-right-description-wrap">
                    <div className="carc-right-description-icon-wrap">
                        Des:
                    </div>
                    <span className="carc-right-description">
                        {report.itemDetails.description}
                    </span>
                </div>
            </div>
            </div>
        </div>
      
    </div>

    )
}

export default AdminReportCard;