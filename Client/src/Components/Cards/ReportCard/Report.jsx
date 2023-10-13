import React from "react";
import './Report.scss';

const ReportCard = ({report}) => {

    console.log("Each Report => ", report);
    

    return(
        <div className="crc-card-wrap">
            <div className="crc-inner-wrap">
                <div clasName="crc-left-wrap">
                    <div className="crc-left-title-wrap">
                        <span className="crc-left-title">
                            {report.customName}
                        </span>
                    </div>
                    <div className="crc-left-body-wrap">
                       {
                        report.media.map((media,key)=>{
                            return(
                                <img src={media} alt="Report Image" className="crc-left-body-each-img" />
                            )
                        })
                       }
                    </div>
                </div>
                <div clasName="crc-right-wrap">
                    <div className="src-right-body-wrap">
                        <div className="src-right-color-wrap">

                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportCard;