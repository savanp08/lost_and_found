import React, { useEffect, useState } from "react";
import './AdminClaims.scss';
import { Chart } from 'react-google-charts';
import AdminReportCard from "../../Cards/AdminReportCard/AdminReportCard";
import AdminEditableClaimCard from "../../Cards/AdminEditableClaimCard/AdminEditableClaimCard";
import axios from "axios";
import TextField from '@mui/material/TextField';

const AdminClaims =  ({admin}) =>{

    const [displayReports, setDisplayReports] = useState([]);
    const [claims, setClaims] = useState([]);
    const [displayClaims, setDisplayClaims] = useState([]);
    const [reportsMap,setReports] = useState(new Map());
    const [usersMap, setUsers] = useState(new Map());
    const [claimsMap,setClaimsMap] = useState(new Map());
    const [filterText, setFilterText] = useState("");
    const [count,setCount] = useState(0);
    const [displayPairs,setDisplayPairs] = useState([]);

    useEffect( ()=>{
        async function fetchAllClaims(){
            
            axios.get("/Claim/getAllClaims").then(res=>{
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
        
       
        async function getReports(){
            await axios.get("/Report/getAllReports").then(res=>{
                if(res.data && Array.isArray(res.data)){
                    res.data.map(report=>{
                        reportsMap.set(report._id,report);
                        return 0;
                    })
                    setReports(new Map(reportsMap));
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
                        usersMap.set(user._id,user);
                        return 0;
                    })
                    setUsers(new Map(usersMap));
                }
                console.log("Admin Claim Debug => users fetched => " , res.data);
            }).catch(err=>{
                console.log("error while fetching users => " , err);
            })
        }
        
        getUsers();
        fetchAllClaims();
        getReports();
        
    },[]);

    console.log("Claims debug => adminClaims Claims",claims);
    console.log("Claims debug => AdminClaims Reports",reportsMap);
    console.log("Claims debug => AdminClaims Users",usersMap);

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
            try{
            newMap.set(xClaims.get(tempReports[i]._id)._id,xClaims.get(tempReports[i]._id));
            }catch(err){
                console.log("Error while filtering",err, " for ", tempReports[i]);
            }
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
    <div className="cac24-admin-claims-wrap AA-After"
    id="cac24-admin-claims-wrap"
    
    >
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
                </div>
                
            </div>
            <div className="cac24-ARC-claims-wrap">
                {displayPairs.length>0?(
                    displayPairs.map((value,key)=>{
                        if(value.report.delete.status==="deleted") return null;
                        return(
                            <div className="cac24-claims-each-wrap" key={key}>
                            <AdminEditableClaimCard claim={value.claim} user={usersMap.get(value.claim.userId)} report={value.report}/>
                            <AdminReportCard report={value.report} userX={usersMap.get(value.report.userId)}/>
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
