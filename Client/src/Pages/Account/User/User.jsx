import React, { useState, useEffect, useMemo, useRef } from "react";
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
import { openForm } from "../../../Store/Slices/FormSlice/FormSlice";

const UserAccount = () => {

   
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [filterText, setFilterText] = useState("");
    const [displayReports, setDisplayReports] = useState([]);
    const [claims, setClaims] = useState([]);
    const [displayClaims, setDisplayClaims] = useState([]);
    const [reportsMap ,setReportsMap] = useState(new Map());
    const [claimsMap ,setClaimsMap] = useState(new Map());
    const [displayType , setDisplayType] = useState("reports");
    const [count,setCount] = useState(0);
    const [displayPairs,setDisplayPairs] = useState([]);

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
    console.log("reportsMap => ",reportsMap);
    console.log("claimsMap => ",claimsMap);

    useEffect(()=>{
        setCount(count+1);
 },[reportsMap,claimsMap])

 
    

    
    useEffect(()=>{
        var tempReports = [];
        var filter= {
            _ids : [],
            textSearch : filterText || "",
        }
        console.log("filter debug => filter => ",filter);
        if(filter.textSearch){
            if(filter._ids.length ===0 ) tempReports = Array.from(reportsMap.values());
                console.log("filter.textSearch => ",filter.textSearch);
                var temp_reports = [];
                tempReports.map((item,key)=>{
                           var nameText="",descriptionText="",locationText="",dateText="", colorText="";
                           var reports = displayReports;
        var x = document.getElementById("ur11-bottom-body-inner-wrap");
        var filteredReports = [];
           var report = item;
            var z = "";
            report.itemDetails.colors.map((color,key)=>{colorText+= color.label + " "; return 0;});
           var reporterNameText = report.reporterName.firstName + " " + report.reporterName.lastName + " " + report.reporterName.middleName || "";
            nameText =  report.itemDetails.customItemName + report.itemDetails.common_type || "";
           descriptionText = report.itemDetails.description || ""; 
           locationText =  report.itemDetails.location.buildingDetails 
           +" " + report.itemDetails.location.university + " " + report.itemDetails.location.street + " " + report.itemDetails.location.apartment
           + " " + report.itemDetails.location.city + " " + report.itemDetails.location.state + " " + report.itemDetails.location.pinCode || "";
           if(!colorText) colorText = "";
             dateText = report.createdAt || "";
             nameText = nameText.toLowerCase();
                descriptionText = descriptionText.toLowerCase();
                locationText = locationText.toLowerCase();
                dateText = dateText.toLowerCase();
                colorText = colorText.toLowerCase();
                reporterNameText = reporterNameText.toLowerCase();
    
              var nameTextMatched = nameText.includes(filter.textSearch.toLowerCase());
                var descriptionTextMatched = descriptionText.includes(filter.textSearch.toLowerCase());
                var locationTextMatched = locationText.includes(filter.textSearch.toLowerCase());
                var dateTextMatched = dateText.includes(filter.textSearch.toLowerCase());
                var colorTextMatched = colorText.includes(filter.textSearch.toLowerCase());
                var reporterNameTextMatched = reporterNameText.includes(filter.textSearch.toLowerCase());
                if(nameTextMatched){
                    temp_reports.push({
                        report : report,
                        priority : 1,
    
                    });
                }  
                 if(descriptionTextMatched){
                    temp_reports.push({
                        report : report,
                        priority : 4,
                    });
                }
                 if(locationTextMatched){
                    temp_reports.push({
                        report : report,
                        priority : 3,
                    });
                }
                 if(dateTextMatched){
                    temp_reports.push({
                        report : report,
                        priority : 2,
                    });
                }
                 if(colorTextMatched){
                    temp_reports.push({
                        report : report,
                        priority : 5,
                    });
                }
                 if(reporterNameTextMatched){
                    temp_reports.push({
                        report : report,
                        priority : 6,
                    });
                }
        })
        console.log("temp_reports => ",temp_reports);
        temp_reports.sort((a,b)=>{
            if(a.priority > b.priority) return -1;
            else if(a.priority === b.priority) return ;
            
        })
        var uniqueTempReports = [];
        var tempMap = new Map();
        temp_reports.map((item,key)=>{
            if(!tempMap.has(item.report._id)){
                tempMap.set(item.report._id,item.report);
                uniqueTempReports.push(item.report);
            }
            return 0;
            });
            console.log("uniqueTempReports => ",uniqueTempReports);
        tempReports =[...uniqueTempReports];
        tempMap.clear();
        uniqueTempReports = [];
        tempReports.map((item,key)=>{
            if(!tempMap.has(item._id)){
                tempMap.set(item._id,item);
                uniqueTempReports.push(item);
            }
            return 0;
            
        });
        
        
        tempReports = [...uniqueTempReports];
        console.log("uniqueTempReports final=> ",tempReports);
    }
    
    
    if(filter.textSearch.length === 0) tempReports = Array.from(reportsMap.values());
    tempReports.sort((a, b) =>{
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        
        if (dateA > dateB) {
          return -1; // Return a negative value to place 'a' before 'b'
        } else if (dateA < dateB) {
          return 1; // Return a positive value to place 'b' before 'a'
        } else {
          return 0; // Dates are equal
        }
      });
      console.log("filter debug => uniquetempReports => ",tempReports);
    setDisplayReports(tempReports);
    var tempClaims = [];
    if(filter.textSearch){
        if(filter._ids.length ===0 ) tempClaims = Array.from(claimsMap.values());
            console.log("filter.textSearch => ",filter.textSearch);
            var temp_claims = [];
            tempClaims.map((item,key)=>{
                       var disscriptionText="";
                          var claim = item;
                            var z = "";
                            disscriptionText = claim.description || "";
                            disscriptionText = disscriptionText.toLowerCase();
                            var disscriptionTextMatched = disscriptionText.includes(filter.textSearch.toLowerCase());
                            if(disscriptionTextMatched){
                                temp_claims.push({
                                    claim : claim,
                                    priority : 1,
                                });
                            }
            }
            )
            temp_claims.sort((a,b)=>{
                if(a.priority > b.priority) return -1;
                else if(a.priority === b.priority) return ;
                
            }
            )
            var uniqueTempClaims = [];
            var tempMap = new Map();
            temp_claims.map((item,key)=>{
                if(!tempMap.has(item.claim._id)){
                    tempMap.set(item.claim._id,item.claim);
                    uniqueTempClaims.push(item.claim);
                }
                return 0;
                });
                console.log("uniqueTempClaims => ",uniqueTempClaims);
            tempClaims =[...uniqueTempClaims];
            tempMap.clear();
            uniqueTempClaims = [];
            tempClaims.map((item,key)=>{
                if(!tempMap.has(item._id)){
                    tempMap.set(item._id,item);
                    uniqueTempClaims.push(item);
                }
                return 0;
                
            });
        }
        
        if(filter.textSearch.length === 0) tempClaims = Array.from(claimsMap.values());
        console.log("filter debug => uniqueTempClaims final=> ",tempClaims);
        var xClaims = new Map();
        var newMap = new Map();
            var yy = Array.from(claimsMap.values());
            yy.map((item,key)=>{
                xClaims.set(item.reportId,item);
                return 0;
            });
            for(var i=0;i<tempReports.length;i++){
                newMap.set(xClaims.get(tempReports[i]._id)._id,xClaims.get(tempReports[i]._id));
            }
        var uniquePairs =[];
        var xtempMap = new Map();
        var x = [];
        tempClaims.map((item,key)=>{
            if(!xtempMap.has(item._id)){
                xtempMap.set(item._id,item);
                x.push(item);
            }
            return 0;
        });
           
            var tempPairs = [];
            newMap.forEach((value,key,index)=>{
                tempPairs.push({
                    claim : value,
                    report : reportsMap.get(value.reportId),
                });
            });

            tempPairs.sort((a,b)=>{
                const dateA = new Date(a.claim.date);
                const dateB = new Date(b.claim.date);
                
                if (dateA > dateB) {
                  return -1; // Return a negative value to place 'a' before 'b'
                } else if (dateA < dateB) {
                  return 1; // Return a positive value to place 'b' before 'a'
                } else {
                  return 0; // Dates are equal
                }
              });
            setDisplayPairs(tempPairs);
            
            
    
        


    
    },[filterText,reportsMap,claimsMap]);

    console.log("displayPairs => ",displayPairs);
 
    return(
        <div className="pua15-main-wrap">
            
                
           
            <div className="pua15-inner-wrap">
                <div className="pua15-header-wrap">
                    <div className="pua15-user-details-wrap">
                        <div className="pua15-user-details-text-wrap">
                            <span className="pua15-user-details-text1221">
                                {user.Name.firstName + " " + user.Name.middleName + " " + user.Name.lastName}
                            </span>
                            <span className="pua15-user-details-text1221">
                                {user.email}
                            </span>
                            <span className="pua15-user-details-text1221">
                                {user.phone} 
                            </span>
                            <span className="pua15-user-details-text1221">
                                { user.location.street + " " + user.location.apartment + " " + user.location.city + " " + user.location.state + " " + user.location.pinCode}
                            </span>
                        </div>
                        <div className="pua15-user-details-edit-btn-wrap">
                            <button className="pua15-user-details-edit-btn"
                            onClick={(e)=>[
                                dispatch(openForm({
                                    formName : "editUserDetails",
                                    data : null,
                                }))
                            ]}
                            >Edit</button>
                        </div>
                    </div>
                    <div className="pua15-stats-wrap">
                        
                    </div>
                </div>
                <div className="pua15-cards-wrap">
                    <div className="pua15-crads-sort-wrap">
                        <div className="pua15-orders-title-wrap">
                            <span className="pua15-orders-title-text">
                                Your Reports and claims
                            </span>
                        </div>
                    <div className="pua15-c-sort-wrap">
        <div className="pua15-c-sort-search-wrap">
          <TextField
            id="pua15-c-sort-search-input"
            label="Search"
            variant="outlined"
            value={filterText || ""}
            placeholder="Search across types, colors, description"
            
            onChange={(e) => {
              setFilterText(e.target.value);
            }}
          />
        </div>
        <div className="pua15-c-sort-filter-wrap">
          <div className="pua15-c-sort-filter-box-wrap">
           
            <div className="pua15-c-sort-filter-options-wrap">
              <div className="pua15-c-sort-filter-date-wrapper"></div>
            </div>
          </div>
        </div>
      </div>
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
                                displayPairs.map((value,key)=>{
                                    if(value.claim.delete.status==="deleted" || value.report.delete.status==="deleted") return null;
                                    return(
                                        <div className="cac24-claims-each-wrap" key={key}>
                                        <EditableClaimCard claim={value.claim} user={user} report={value.report}/>
                                        <AdminReportCard report={value.report} userX={user}/>
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