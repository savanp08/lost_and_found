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

const UserAccount = () => {

   
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [displayReports, setDisplayReports] = useState([]);
    const [claims, setClaims] = useState([]);
    const [displayClaims, setDisplayClaims] = useState([]);

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
            const x = user.userId;
            await axios.get(`/Report/getManyReports/${x}`,{
                params:{
                    userId : user.userId
                }
            }).then(res=>{
                console.log("response from fetch all reports=> ",res.data);
                if(Array.isArray(res.data)){
                    setReports(res.data);
                    setDisplayReports(res.data);
                }
            }).catch(err=>{
                     console.log("error from fetch all reports=> ",err);

            })
        }

        async function fetchAllClaims(){
            const x = user.userId;
            await axios.get(`/Claim/getManyClaims/${x}`,{
                params:{
                    userId : user.userId
                }
            }).then(res=>{
                console.log("response from fetch all claims=> ",res.data);
                if(Array.isArray(res.data)){
                    setClaims(res.data);
                    setDisplayClaims(res.data); 
                    // fetchAllReports();
                    
                }
            }).catch(err=>{
                     console.log("error from fetch all claims=> ",err);

            })
        }
        if(user.userId){
        fetchAllClaims();
         fetchAllReports();
        }
        

    },[user])


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
                            displayReports.map((report,key)=>{
                                return(
                                    <AdminReportCard key={key} report={report}/>
                                )
                            })
                        }
                      
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserAccount;