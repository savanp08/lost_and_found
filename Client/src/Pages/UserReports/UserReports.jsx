import axios from "axios";
import React ,{useState, useEffect, useRef}from "react";
import UserReportCard from "../../Components/Cards/ReportCard/Report";
import './UserReports.scss';
import TextField from '@mui/material/TextField';
import { FcSearch } from "react-icons/fc";
import { InputAdornment } from "@mui/material";
import {AiOutlineSearch } from "react-icons/ai";
import ClaimPopUp from "../../Components/LocalComponents/ClaimPopUp/ClaimPopUp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Common_PopUp from "../../Components/LocalComponents/Common_PopUp/Common_PopUp";
import { open_div } from "../../Handlers/PopUp";
import { removeTask } from "../../Store/Slices/TaskSlice/TaskSlice";
import { addRawData } from "../../Store/RawData/RawData";
import AuthFunctions from "../../Handlers/Auth";
import { addUser } from "../../Store/Slices/UserSlice/UserSlice";
import GMaps_ReprtForm from "../../Components/LocalComponents/GoogleMaps_ReportForm/GMaps_ReportForm";
import UserEditReport from "../../Components/LocalComponents/UserEditReport/EditReport";




const UserReports = () => {
   console.log("Rerender in userreports");

   const navigate = useNavigate();
   const dispatch = useDispatch();
   const user = useSelector(state => state.user);
   const task = useSelector(state => state.task);
   const socket = useSelector(state => state.socket.socket);
   const [reports, setReports] = useState([]);
   const [displayReports, setDisplayReports] = useState([]);
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
   const mapRef = useRef(null);
   const gMap = useSelector((state)=> state.gMap);
   const [markers , setMarkers] = useState([]);
   const [reportsMap , setReportsMap] = useState(new Map());

   useEffect(()=>{
    async function authVerify(){
        const flag = await AuthFunctions();
        if(flag.message){
         console.log("Auth Debug => user is signed in ",flag);
         dispatch(addUser(flag.user));
        }
        else{
         console.log("Auth Debug => user is not signed in ",flag);
        //  navigate("/Login");
        }
    }
    // authVerify();
    
   },[])

    useEffect(()=>{
       // console.log("reportsMap => ",reportsMap , "reportsMap.values() => ",Array.from(reportsMap.values()));
        if(reportsMap && reportsMap.size > 0){
           // console.log("reportsMap X=> ",reportsMap);
            var arr = []
            var x=Array.from(reportsMap.values());
          x.forEach(report=>{
           // console.log("report => ",report);
            try{
                  var x = report.itemDetails.location.displayAddress.coordinates;
                  if(x.lat)
                  arr.push({
                coordinates : x,
                _id : report._id,
                 });
            }
            catch(err){
                console.log("Error pushing coordinate to arr",err);
            }
          })
          setMarkers(arr);
        }
    },[reportsMap])

   
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

   }

  
  
   useEffect(()=>{
    
   },[filter]);
       

   

  useEffect(()=>{
     console.log("task=> ",task);
        const currentTask = task[task.length-1];
        if(currentTask.catagory === "claim"){
    
        if(currentTask.progress === "submitted"){
            if(currentTask.status === "success"){
                open_div("ur11-claim-confirmation-main-wrap");
                dispatch(removeTask());
                var options = [{
                    text: "Your Claim has been Submitted Successfully",
                    style: {
                        color: 'green',
                        fontSize:'30px',
                    }
                },
                {
                    text : ` An email contating the response details and further instructions has been sent to your email address + ${user.email}`,
                    style: {
                        color: 'black',
                        fontSize:'16px',
                    }
                },
                {
                    text: " The Custodians will verify your Claim and you will then receive an email shortly",
                    style : {
                        color: 'black',
                        fontSize:'25px',
                    }
                }
            
            ];
            dispatch(addRawData({options: options}));
            }
            else if(currentTask.status === "failed"){

                open_div("ur11-claim-confirmation-main-wrap");
                dispatch(removeTask());
                var options = [{
                    text: currentTask.message,
                    style: {
                        color: 'black',
                        fontSize:'30px',
                    }
                },
                
            
            ];
            dispatch(addRawData({options: options}));
            }
        }
        else if(currentTask.progress === "begun"){
            if(currentTask.status === "success"){
                if(!document.getElementById("ur11-claim-popup-main-min").classList.contains("Hide"))
                open_div("ur11-claim-popup-main-min");
                dispatch(removeTask());
            }
        
    }
    }
  },[task])

   useEffect(()=>{
     fetchreports();
   },[])

   const onLoad = ((map,) => {
    if(map)
    mapRef.current = map
   
    console.log("map debug onLoad callback adddrag => ",gMap,mapRef.current);
    
    
  });

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
        console.log("MMMMMMMMMMMMMMMMMMMMMMMMMM socket => ",socket);
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
        <div className="ur11-main-wrap"
        id="pur11-main-wrap"
        >
            <div className="ur11-inner-wrap">
            <div className="ur11-claim-popup-main-wrap Hide"
            id="ur11-claim-popup-main-min"

            >
                    <ClaimPopUp />
                   </div>
                   <div className="ur11-claim-confirmation-main-wrap Hide"
                   id="ur11-claim-confirmation-main-wrap"
                   >
                    
                        
                        <Common_PopUp />
                    
                   </div>
                <div className="ur11-top-wrap">
                 <GMaps_ReprtForm 
                 type={"UserReports"}
                 onLoad={onLoad}
                 markers = {markers}
                 reportsMap = {reportsMap} 
                 setFilter = {(item)=>{
                    var id_arr = [];
                    item.map((item,i)=>{
                        id_arr.push(item);
                        return item;
                    })
                    console.log("set Filter Ids : " + id_arr);
                    setFilter({
                        ...filter,
                        coordinates : item.coordinates,
                        _ids : id_arr
                 })}}
                 />
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
                             {
                                filter._ids.length>0? (<span className="ur11-filter-selected-removable"
                                onClick={(e)=>{
                                    setFilter({
                                        ...filter,
                                        _ids : [],
                                    })
                                }}
                                >
                                    Map
                                </span>) : null
                             }
                    </div>
                  </div>
                    </div>
                    <div className="ur11-bottom-body-wrap">
                        <div className="ur11-bottom-body-inner-wrap"
                        id="ur11-bottom-body-inner-wrap"
                        >
                            {
                               displayReports.map((report,key)=>{
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