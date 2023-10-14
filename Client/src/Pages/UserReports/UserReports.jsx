import axios from "axios";
import React ,{useState, useEffect}from "react";
import UserReportCard from "../../Components/Cards/ReportCard/Report";
import './UserReports.scss';

const UserReports = () => {


   const [reports, setReports] = useState([]);

   async function fetchreports(){
       await axios.get("/Report/getAllReports").then(res=>{
        console.log("response from fetch all reports=> ",res.data);
             setReports(res.data);
       }).catch(err=>{
        console.log("error from fetch all reports=> ",err);
       })

   }

   useEffect(()=>{
     fetchreports();
   },[])

    return(
        <div className="ur11-main-wrap">
            <div className="ur11-inner-wrap">
                <div className="ur11-top-wrap">

                </div>
                <div className="ur11-bottom-wrap">
                    <div className="ur11-bottom-header-wrap">

                    </div>
                    <div className="ur11-bottom-body-wrap">
                        <div className="ur11-bottom-body-inner-wrap">
                            {
                                reports.map((report,key)=>{
                                    return(
                                        <UserReportCard key={key} report={report}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default UserReports;