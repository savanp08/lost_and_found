import axios from "axios";
import React ,{useState, useEffect}from "react";
import UserReportCard from "../../Components/Cards/ReportCard/Report";
import './UserReports.scss';
import TextField from '@mui/material/TextField';
import { FcSearch } from "react-icons/fc";
import { InputAdornment } from "@mui/material";
import {AiOutlineSearch } from "react-icons/ai";
import ClaimPopUp from "../../Components/LocalComponents/ClaimPopUp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";


const UserReports = () => {
   console.log("Rerender in userreports");

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const task = useSelector(state => state.task);
   const [reports, setReports] = useState([]);
   const [displayReports, setDisplayReports] = useState([]);
   const [filter, setFilter] = useState({
    textSearch : "",
    colors : [],
    date : "",
    common_type: "",
   });
    
   
   async function fetchreports(){
       await axios.get("/Report/getAllReports").then(res=>{
        console.log("response from fetch all reports=> ",res.data);
             setReports(res.data);
             setDisplayReports(res.data);
       }).catch(err=>{
        console.log("error from fetch all reports=> ",err);
       })

   }
  
   useEffect(()=>{
    var reports = displayReports;
    var x = document.getElementById("ur11-bottom-body-inner-wrap");
    var filteredReports = [];
    reports.map((report,key) => { 
        var z = "";
        report.itemDetails.colors.map((color,key)=>{z+= color.label + " "; return 0;});
       var y= report.reporterName.firstName + " " + report.reporterName.lastName + " " + report.reporterName.middleName
        + report.itemDetails.common_type + " " +z
       + " " + report.itemDetails.description + " " + report.itemDetails.location.allPlacesPossible + " " + report.itemDetails.location.buildingDetails
       +" " + report.itemDetails.location.university + " " + report.itemDetails.location.street + " " + report.itemDetails.location.apartment
       + " " + report.itemDetails.location.city + " " + report.itemDetails.location.state + " " + report.itemDetails.location.pinCode 
       + " " + report.belongsTo;
       y=y.toLowerCase();
       var map = new Map();
       var words = y.split(" ");
       var filtererwords = filter.textSearch.toLowerCase().split(" ");
       var counter=0;
       console.log("search text=>", words,  "filtererwords=>", filtererwords);
       for(var i=0;i<words.length;i++){
        if(filtererwords.includes(words[i])){
            counter++;
            map.set(words[i],words[i]);
        }
        else {
            for(var j=0;j<filtererwords.length;j++){
                var xx="";
                for(var l=0;l<filtererwords[j].length;l++){ xx+=filtererwords[j][l];
                for(var k=0;k<words.length;k++){
                if(words[k].includes(xx)) {
                    counter++;
                    map.set(words[i],words[i]);
                    break;

                }
                }
                }
            }
            }
    }
        
       if(counter === 0) return 0;
       filteredReports.push({
        count : counter,
        report : report,
       });
    
    })

     filteredReports = filteredReports.sort((a, b) => b.count - a.count);
     filteredReports = filteredReports.map((item) => item.report);
     console.log("filtered reports=> ",filteredReports);
     setReports(filteredReports);

    console.log(x);
   },[filter]);
       

   

  useEffect(()=>{
    if(task[task.length-1].catagory === "claim"){
        if(task.status === "success"){

        }
    }
  },[])

   useEffect(()=>{
     fetchreports();
   },[])

    return(
        <div className="ur11-main-wrap">
            <div className="ur11-inner-wrap">
            <div className="ur11-claim-popup-main-wrap Hide"
            id="ur11-claim-popup-main-min"
            >
                    <ClaimPopUp />
                   </div>
                <div className="ur11-top-wrap">
                  
                </div>
                <div className="ur11-bottom-wrap">
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
                    <div className="ur11-bottom-body-wrap">
                        <div className="ur11-bottom-body-inner-wrap"
                        id="ur11-bottom-body-inner-wrap"
                        >
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