import React, { useState, useEffect } from "react";
import './This.scss';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import AuthFunctions from "../../../Handlers/Auth";
import { addUser } from "../../../Store/Slices/UserSlice/UserSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminReportCard from "../../../Components/Cards/AdminReportCard/AdminReportCard";
import EditReport from "../../../Components/LocalComponents/UserEditReport/EditReport";
import EditableClaimCard from "../../../Components/Cards/EditableClaimCard/EditableClaimCard";

const UserAccount = () => {

   
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [displayReports, setDisplayReports] = useState([]);
    const [claims, setClaims] = useState([]);
    const [displayClaims, setDisplayClaims] = useState([]);
    const [reportsMap ,setReportsMap] = useState(new Map());
    const [claimsMap ,setClaimsMap] = useState(new Map());
    const [displayType , setDisplayType] = useState("reports");
    const [count,setCount] = useState(0);

    useEffect(()=>{
        
        async function authVerify(){
            const flag = await AuthFunctions();
            if(flag.message){
             console.log("Auth Debug => user is signed in ",flag);
             dispatch(addUser(flag.user));
            }
            else{
             console.log("Auth Debug => user is not signed in ",flag);
              navigate("/Login");
            }
        }
        authVerify();
    },[]);

    useEffect(()=>{
       
        async function fetchAllReports(){
            const x = user._id;
            await axios.post(`/Report/getManyReports/In/${x}`,{
                
                    reportIds : user.claims.reportIds,
                
            }).then(res=>{
                console.log("response from fetch all reports=> ",res.data);
                if(res.data && Array.isArray(res.data)){
                    res.data.forEach(report=>{
                        reportsMap.set(report._id,report);
                    })
                    setReportsMap(new Map(reportsMap));
                }
            }).catch(err=>{
                     console.log("error from fetch all reports=> ",err);

            })
        }

       

        async function fetchAllClaims(){
            const x = user._id;
            await axios.post(`/Claim/getManyClaims/In/${x}`,{
                
                    claimIds : user.claims.claimIds,
                
            }).then(res=>{
                console.log("response from fetch all claims=> ",res.data);
                if(res.data && Array.isArray(res.data)){
                    res.data.forEach(claim=>{
                        claimsMap.set(claim._id,claim);
                    })
                    setClaimsMap(new Map(claimsMap));
                }
            }).catch(err=>{
                     console.log("error from fetch all claims=> ",err);

            })
        }
        
        fetchAllClaims();
         fetchAllReports();
        

    },[user])

    useEffect(()=>{
        setCount(count+1);
 },[reportsMap,claimsMap])

    const SortComponent = () => {

        return(
            <div className="pua15-c-sort-wrap">
                <div className="pua15-c-sort-search-wrap">
                    <TextField 
                    id="pua15-c-sort-search-input"
                    label="Search"
                    variant="outlined"
                    placeholder="Search across types, colors, description" 
                    InputProps={{
                        style: {
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            color: 'white',
                            fontFamily: 'Roboto'
                        }
                    }}
                    />
                </div>
                <div className="pua15-c-sort-filter-wrap">
                    <div className="pua15-c-sort-filter-box-wrap">
                        Filter
                        <div className="pua15-c-sort-filter-options-wrap">
                            <div className="pua15-c-sort-filter-date-wrapper">

                            </div>
                </div>
            </div>
            </div>
            </div>
        )
    }
 
    return(
        <div className="pua15-main-wrap">
            <div className="pua15-editReport-wrap"
            
           id="pua15-editReport-wrap"
            >
                <EditReport />
            </div>
            <div className="pua15-inner-wrap">
                <div className="pua15-header-wrap">
                    <div className="pua15-stats-wrap">

                    </div>
                </div>
                <div className="pua15-cards-wrap">
                    <div className="pua15-crads-sort-wrap">
                        <SortComponent />
                    </div>
                    <div className="pua15-cards-content-wrap">
                        {
                            // displayType === "reports"? (
                                
                            //         Array.from(reportsMap).map(([key,report])=>{
                            //             return(
                            //                 <AdminReportCard key={key} report={report}/>
                            //             )
                            //         })
                                
                            // ):(
                                Array.from(claimsMap).map(([key,claim])=>{
                                    return(
                                        <div className="cac24-claims-each-wrap" key={key}>
                                        <EditableClaimCard claim={claim} user={user} report={reportsMap.get(claim.reportId)}/>
                                        <AdminReportCard report={reportsMap.get(claim.reportId)}/>
                                        </div>
                                    )
                                })
                    //        )
                        }
                   
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAccount;