import React ,{useState,useEffect} from "react";
import './NavBar.css'
import { useNavigate, useParams } from "react-router";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Left_Menu from "./LeftSideRespNav";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import Badge from '@mui/material/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


var menuStatus = false;
function closeMenuFun(){

}
 
const NavBar = () => {

  const [SearchQuery, setSearchQuery] = useState();
  const [itemCount, setItemCount] = useState(0);
  const history = useNavigate();
  async function searchFun(){
    window.location.replace(`/Query/${SearchQuery}`);
  }
  
  const params = useParams();

  const [TempStatus, setTempStatus] =useState(false);

  function funRouteToProfile (){
    
                
  }
  function reverse(s){
    return s.split("").reverse().join("");
}






 
  useEffect(()=>{
    const UserName = params.UserName;
    if(!UserName){
    let Temp = localStorage.getItem("Cart");
     
        
      if(Temp && Temp.length==0) Temp = "";
      if(Temp && Temp.length)
    console.log("Cart Initial -> Cart Items Fetched from Local Storage",JSON.parse(Temp));
    
     
      
    
     var Parsed;
    if(Temp && Temp.length>0){ 
     Parsed = JSON.parse(Temp);
    }
    else Parsed = [];
    if(!Array.isArray(Parsed)){
        Parsed = [Parsed];
      }
     console.log("Cart Initial -> Parsed from Cart ->",Parsed , "Of length",Parsed.length);
    if(Parsed && Array.isArray(Parsed)) setItemCount(Parsed.length);
    }

    
  },[])

  useEffect(()=>{
    const localStorageSetHandler = function(e) {
      let Temp = localStorage.getItem("Cart");
     
        
      if(Temp && Temp.length==0) Temp = "";
      if(Temp && Temp.length)
      console.log("Cart Count -> Cart Items Fetched from Local Storage",JSON.parse(Temp));
      
       
        
  
       var Parsed;
      if(Temp && Temp.length>0){ 
       Parsed = JSON.parse(Temp);
      }
      else Parsed = [];
      if(!Array.isArray(Parsed)){
          Parsed = [Parsed];
        }
       console.log("Cart Count -> Parsed from Cart ->",Parsed , "Of length",Parsed.length);
      if(Parsed && Array.isArray(Parsed)) setItemCount(Parsed.length);
    };
    
    document.addEventListener("itemInserted", localStorageSetHandler, false);
  },[])

  return(
    <div className="NavBar-Wrapper">
        <div className="NavBar-ContentType">
        {/* <FontAwesomeIcon className="NavBar-DesIcon" icon="fa-solid fa-magnifying-glass-location" /> */}
        <div className="NavBar-IconWrap">
        <svg className="NavBar-DesIcon"
        xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
        <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM288 176c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 48.8 46.5 111.6 68.6 138.6c6 7.3 16.8 7.3 22.7 0c22.1-27 68.6-89.8 68.6-138.6zm-112 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/>
        </svg>
        </div>
        <NavLink to="/" className={isActive=> "NavBar-LinkEle" + (!isActive ? "" : " ActiveEle-NavBar")} >
         Report Found Item
        </NavLink>
        <NavLink to="/" className={isActive=> "NavBar-LinkEle" + (!isActive ? "" : " ActiveEle-NavBar")} >
         Find Lost Item
        </NavLink>
        </div>
      <div className="NavBar-AccountWrap">

     
        <div className="NavBar-AccountOptions">
  <AccountOptions />
    </div>
    
    <div className="NavBar-LoginOptions">
    <NavLink to="/Login" className={isActive=> "NavBar-LinkEle" + (!isActive ? "" : " ActiveEle-NavBar")} >
        Login
        </NavLink>
    </div>
    </div>
    </div>
  )

}

const AccountOptions = () =>{

  const history = useNavigate();
  const params = useParams();

  const [TempStatus, setTempStatus] =useState(false);

  function funRouteToProfile (){
    
                
  }
  function reverse(s){
    return s.split("").reverse().join("");
}

  return(
    <div className="AccountOptions-Wrapper">
       <AccountCircleIcon 
            sx={{ 
              height:'45px',
              width:'45px',
              cursor:'pointer'
            }} 
            onClick={()=>{
              menuStatus=!menuStatus;
              console.log(" MenuStatus is " , TempStatus);
              setTempStatus(menuStatus);
            }}
            />
            <div className={"AccountOptionsMenuContainer" + (TempStatus===true? "" : " Hide")} id="AccountOptionsMenuContainer" >
              <div className="AccountOptionsEle" 
              onClick={()=>{
                var UserName = params.UserName || "";
                
                console.log("Params",params);
                console.log("Url",window.location.href);
                const url= window.location.href;
                const len= url.length;
                var str="";
                for(var i=len-1;i>=0;i--){
                  if(url[i]==='/') break;
                  str+=url[i];
                }
                if(str.length>1 && str!=="Shop"){
                  UserName=reverse(str);
                }
                console.log(UserName , " -> UserName");
                window.location.replace(`/User/${UserName}`);
                funRouteToProfile()
                
              }}
              >
                Profile
              </div>
              <div className="AccountOptionsEle" >
                Reported Items
              </div>
              <div className="AccountOptionsEle" >
               Claims
              </div>
              <div className="AccountOptionsEle" >
                Search History
              </div>
              
            </div>
    </div>
  )
}

const RespNavBar = () =>{
  

  const [SearchQuery, setSearchQuery] = useState();
  const history = useNavigate();
  async function searchFun(){
    window.location.replace(`/Query/${SearchQuery}`);
  }

    return(
        <div className="NavBarResp-Wrapper">
            <div className="NavBarResp-LeftsideOptionsMenu">
             <Left_Menu />
                </div>
            
                <div className="NavBarResp-LoginOptions">
            <NavLink to="/Login" className={isActive=> "NavBar-LinkEle" + (isActive ? "" : " ActiveEle-NavBar")} >
        Login
        </NavLink>
   
            </div>
            
        </div>
    )
}

export default NavBar;
export { RespNavBar } ;