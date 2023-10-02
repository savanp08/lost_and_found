import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminChats from "../../../Components/Children/AdminChats/AdminChats";
import AdminClaims from "../../../Components/Children/AdminClaims/AdminClaims";
import AdminReports from "../../../Components/Children/AdminReports/AdminReports";
import './Admin.scss';

const Admin = () => {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.user);
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
        <div className="_01-04-01-W">
          <AdminReports  /> 
        </div>
        <div className="_01-04-02-W">
          <AdminClaims />
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