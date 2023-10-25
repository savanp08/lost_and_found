import React, { useEffect, useState } from "react";
import './AdminClaims.scss';
import { Chart } from 'react-google-charts';
import AdminReportCard from "../../Cards/AdminReportCard/AdminReportCard";
import AdminEditableClaimCard from "../../Cards/AdminEditableClaimCard/AdminEditableClaimCard";
import axios from "axios";

const AdminClaims =  () =>{

    const [claims,setClaims] = useState([]);
    const [reports,setReports] = useState(new Map());
    const [users, setUsers] = useState(new Map());

    useEffect( ()=>{
        async function getData(){
            await axios.get("/Claim/getAllClaims").then(res=>{
                setClaims(res.data);
                console.log("claims fetched => " , res.data);
            }).catch(err=>{
                console.log("error while fetching claims => " , err);
            })
        }
        async function getReports(){
            await axios.get("/Report/getAllReports").then(res=>{
                if(res.data && Array.isArray(res.data)){
                    res.data.map(report=>{
                        reports.set(report._id,report);
                        return 0;
                    })
                    setReports(new Map(reports));
                }
                console.log("reports fetched => " , res.data);
            }).catch(err=>{
                console.log("error while fetching reports => " , err);
            })
        }

        async function getUsers(){
            await axios.get("/User/getAllUsers").then(res=>{
                if(res.data && Array.isArray(res.data)){
                    res.data.map(user=>{
                        users.set(user._id,user);
                        return 0;
                    })
                    setUsers(new Map(users));
                }
                console.log("Admin Claim Debug => users fetched => " , res.data);
            }).catch(err=>{
                console.log("error while fetching users => " , err);
            })
        }
        
        getUsers();
        getData();
        getReports();
        
    },[]);

    console.log("Claims debug => adminClaims Claims",claims);
    console.log("Claims debug => AdminClaims Reports",reports);
    console.log("Claims debug => AdminClaims Users",users);

  const chart1Data = [
    ["Type","Number"],
    ["Unseen claims",3],
    ["In Process claims",4],
    ["Unclaimed claims",5],
    ["Completed Claims",7],
  ];
  const chart2Data = [
    ["Type","Number"],
    ["Public Claims",7],
    ["Private Claims",7],
  ];

  console.log(claims);

  return(
    <div className="cac24-admin-claims-wrap AA-After"
    id="cac24-admin-claims-wrap"
    
    >
        <div className="cac24-ARC-inner-wrap">
            <div className="cac24-ARC-header-wrap">
                <div className="cac24-ARC-Hc-wrap">
                    <div className="cac24-ARC-Hstat-wrap">
                        <div className="cac24-ARC-Hstat-text-wrap">
                            <span className="cac24-ARC-Hstat-text">
                                Unseen claims
                            </span>
                            <span className="cac24-ARC-Hstat-text">
                                In Process claims
                            </span>
                            <span className="cac24-ARC-Hstat-text">
                                Unclaimed Things
                            </span>
                            <span className="cac24-ARC-Hstat-text">
                                Public claims
                            </span>
                            <span className="cac24-ARC-Hstat-text">
                                Private claims
                            </span>
                        </div>
                        <div className="cac24-ARC-Hstat-charts-wrap">
                            <div className="co1-ARC-Hstat-chart1-wrap">
                                <Chart
                                chartType="PieChart"
                                data={chart1Data}
                                options={{title : "Progress of claims"}}
                                width={"100%"}
                                height={"100%"}
                                />
                            </div>
                            <div className="co1-ARC-Hstat-chart2-wrap">
                            <Chart
                                chartType="PieChart"
                                data={chart2Data}
                                options={{title : "Types of claims"}}
                                width={"100%"}
                                height={"100%"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="co1-ARC-Hfilter-wrap">

                    </div>
                </div>
                <div className="cac24-ARC-HClose-wrap"
                onClick={(e)=>{
                    e.preventDefault();
                    var x=document.getElementById("cac24-admin-claims-wrap");
                    if(x.classList.contains("AA-After")){
                        x.classList.remove("AA-After");
                        x.classList.add("AA-Before");
                    }
                    else if(x.classList.contains("AA-Before")){
                        x.classList.remove("AA-Before");
                        x.classList.add("AA-After");
                    }
                }}
                >
                    X
                </div>
            </div>
            <div className="cac24-ARC-claims-wrap">
                { claims.length > 0 && reports.size>0?(
                    claims.map((claim,key)=>{
                        return(
                            <div className="cac24-claims-each-wrap" key={key}>
                            <AdminEditableClaimCard claim={claim} user={users.get(claim.userId)} report={reports.get(claim.reportId)}/>
                            <AdminReportCard report={reports.get(claim.reportId)}/>
                            </div>
                        )
                    })
                )
                : "No Data to display"
                }
                
               
            </div>
        </div>
    </div>
)
}


export default AdminClaims;
