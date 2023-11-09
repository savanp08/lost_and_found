import React, { useEffect, useState } from "react";
import './This.scss';
import { Chart } from 'react-google-charts';
import AdminReportCard from "../../Cards/AdminReportCard/AdminReportCard";
import axios from "axios";
import EditReport from "../../GlobalComponents/EditReport/EditReport";
import { useSelector } from "react-redux";
import TextField from '@mui/material/TextField';
import { FcSearch } from "react-icons/fc";
import { InputAdornment } from "@mui/material";
import {AiOutlineSearch } from "react-icons/ai";

const AdminReports =  ({admin}) =>{

    const [reports,setReports] = useState([]);
    const socket = useSelector(state => state.socket.socket);
    const [displayReports, setDisplayReports] = useState([]);
    const [reportsMap , setReportsMap] = useState(new Map());
    
    const [filter, setFilter] = useState({
        textSearch : "",
        colors : [],
        date : "",
        common_type: "",
        coordiantes:{
            lat:null,
            lng:null,
        },
        _ids : [],
       });

    useEffect( ()=>{
        async function fetchreports(){
            await axios.get("/Report/getAllReports").then(res=>{
             console.log("response from fetch all reports=> ",res.data);
                  setReports(res.data);
                  setDisplayReports(res.data);
                  var X = res.data.filter(report=> report.delete.status !== "deleted");
                  X.map((report,key)=>{
                     reportsMap.set(report._id,report);
                     return 0;
                  });
                  setReportsMap(new Map(reportsMap));
            }).catch(err=>{
             console.log("error from fetch all reports=> ",err);
            })
         fetchreports();
        }


        
    },[]);

  const chart1Data = [
    ["Type","Number"],
    ["Unseen Reports",3],
    ["In Process Reports",4],
    ["Unclaimed Reports",5],
    ["Completed Resports",7],
  ];
  const chart2Data = [
    ["Type","Number"],
    ["Public Resports",7],
    ["Private Resports",7],
  ];

  console.log(reports);

  useEffect(()=>{
    var tempReports = []
    if(filter._ids){
            console.log("filter._ids => ",filter._ids);
            var report = [];
            filter._ids.map((id,key)=>{
                    report.push(reportsMap.get(id));
                    return 0;
            });
            console.log("report => ",report);
            if(report){
                    console.log("report => ",report);
            }
            tempReports = report;
    }
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

if(tempReports.length === 0) tempReports = Array.from(reportsMap.values());
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
setDisplayReports(tempReports);

},[filter,reportsMap])

  
  

  useEffect(()=>{
    if(socket){
        socket.on("newReport",(data)=>{
            if(!data) return;
            console.log("MMMMMMMMMMMMMMMMMMMMMMMMMM new report in socket => ",data);
            console.log("MMMMMMMMMMMMMMMMMMMMMMMMMM socket Id => ",socket.id);
            reportsMap.set(data._id,data);
            setReportsMap(new Map(reportsMap));
            var x = reportsMap.values();
            setReports([...x]);
        })
        return () => {
            socket.removeAllListeners();  
            socket.off("newReport");
        }
    }
},[]);

  return(
    <div className="admin-Reports-wrap AA-Before"
    id="car21-admin-Reports-wrap"
    
    >
        <div className="c01-ARC-inner-wrap">
            <div className="c01-ARC-header-wrap">
                <div className="c01-ARC-Hc-wrap">
                    <div className="c01-ARC-Hstat-wrap">
                        <div className="c01-ARC-Hstat-text-wrap">
                            <span className="c01-ARC-Hstat-text">
                                Unseen Reports
                            </span>
                            <span className="c01-ARC-Hstat-text">
                                In Process Reports
                            </span>
                            <span className="c01-ARC-Hstat-text">
                                Unclaimed Things
                            </span>
                            <span className="c01-ARC-Hstat-text">
                                Public Reports
                            </span>
                            <span className="c01-ARC-Hstat-text">
                                Private Reports
                            </span>
                        </div>
                        <div className="c01-ARC-Hstat-charts-wrap">
                            <div className="co1-ARC-Hstat-chart1-wrap">
                                <Chart
                                chartType="PieChart"
                                data={chart1Data}
                                options={{title : "Progress of Reports"}}
                                width={"100%"}
                                height={"100%"}
                                />
                            </div>
                            <div className="co1-ARC-Hstat-chart2-wrap">
                            <Chart
                                chartType="PieChart"
                                data={chart2Data}
                                options={{title : "Types of Reports"}}
                                width={"100%"}
                                height={"100%"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="co1-ARC-Hfilter-wrap">

                    </div>
                </div>
                <div className="c01-ARC-HClose-wrap"
                onClick={(e)=>{
                    e.preventDefault();
                    var x=document.getElementById("car21-admin-Reports-wrap");
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
            <div className="c01-ARC-bottom-wrap32">
            <div className="ur11-bottom-header-wrap">
                        <div className="ur11-search-wrap">
                             <TextField 
                             id="ur11-search-input"
                             label="Search"
                             variant="outlined"
                             placeholder="Search across types, colors, description"
                             onChange={(e)=>{
                                setFilter({
                                    ...filter,
                                    textSearch : e.target.value,
                                })
                             }}
                             InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start"
                                    sx={{
                                        width:'30px',
                                        height:'30px',
                                    }}
                                    >
                                        <AiOutlineSearch 
                                        style={{
                                            width:'30px',
                                            height:'30px',
                                        }}
                                        />
                                    </InputAdornment>
                                ),
                             }}
                             />
                        </div>
                  <div className="ur11-filter-wrap">
                    <div className="ur11-filter-box-wrap">
                        <span className="ur11-filter-box-title">
                            Filter
                        </span>
                        <div className="ur11-filter-options-wrap">
                            <div className="ur11-filter-date-wrapper">

                            </div>
                            <div className="ur11-filter-commontype-wrap">

                            </div>
                            <div className="ur11-filter-colors-wrap">
                                
                            </div>
                        </div>
                    </div>
                    <div className="ur11-filter-selectedOptions-wrap">

                    </div>
                  </div>
                    </div>
            <div className="c01-ARC-Reports-wrap">
                {
                    reports.map((report,key)=>{
                        return(
                            <AdminReportCard report={report} key={key}  userX={admin}  />
                        )
                    })
                }
                
               
            </div>
            </div>
        </div>
    </div>
)
}


export default AdminReports;
