import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminChats from "../../../Components/Children/AdminChats/AdminChats";
import AdminClaims from "../../../Components/Children/AdminClaims/AdminClaims";
import AdminFoundReports from "../../../Components/Children/AdminFoundReports/AdminFoundReports";
import AdminReports from "../../../Components/Children/AdminReports/AdminReports";
import './Admin.scss';
import { addAdmin } from "../../../Store/Slices/UserSlice/AdminSlice";
import {AdminAuthFunctions} from "../../../Handlers/Auth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.user);
  const admin = useSelector(state=> state.admin);
  const navigate = useNavigate();

  useEffect(()=>{
    async function verifyAdmin(){
      const x = await AdminAuthFunctions();
      console.log("Admin debug Auth Response=> ",x);
      if(x.message){
        dispatch(addAdmin(x.user));
      }
      else{
        console.log("Admin debug Auth Response=> ",x);
        navigate("/AdminLoginX86109110213");
      }
    }
    
    verifyAdmin()
   },[])

  return(
    <div className="aa-AdminWrap">
      <div className="aa-AdminWrap-In1">
        
      
     <div className="aa-TopWrap">
      <div className="aa-topwrap-inner">
          <div className="aa-header-title-wrap">
            <span className="aa-header-title">
            { "Welcome Back " }
            {user.FirstName? user.FirstName: "XX" + user.LastName? user.LastName: " XX"}
            </span>
          </div>
          <div className="aa-header-content-wrap">
          <div className="aa-header-statslist-wrap">
             <span className="aa-header-statslist-discr">
              Here is what happened while you were away
             </span>
             <div className="aa-header-statslist-X">
              <div className="aa-header-satstext-box">
                <span className="aa-header-statstext-text">
                  { "New Reports" } 
                </span>
              </div>
              <div className="aa-header-statslist-box">
                <span className="aa-header-statstext-text">
                  { "New Claims" } 
                </span>
              </div>
              <div className="aa-header-statslist-box">
                <span className="aa-header-statstext-text">
                  { "New Queries" } 

                </span>
              </div>
              <div className="aa-header-statslist-box">
                <span className="aa-header-statstext-text">
                  { "New Messages" }    {" from "} {"chats"}
                </span>
              </div>

             </div>
          </div>
          <div className="aa-header-onlinestats-wrap">
            <div className="aa-heder-onlinestatus">

            </div>
          </div>
          </div>
     </div>
     {/* <div className="01-03-01-W">
      <div className="01-03-01-01">
        Online status
      </div>
     </div> */}
     </div>

     <div className="BottomWrap">
        <div className="_01-04-01-W"
        
        >
          <AdminReports  admin={admin}/> 
        </div>
        
        <div className="_01-04-03-W">
          <AdminFoundReports  /> 
        </div>
        <div className="_01-04-02-W">
          <AdminClaims  admin={admin}/>
        </div>
        <div className="_01-04-03-W">
          <AdminChats  />
        </div>
     </div>

     </div>
     
    </div>
  )

}

export default Admin;