import React from "react";
import './common.scss';
import './NavBar.css';
import { useDispatch, useSelector } from "react-redux";
import AddReportIcon from "../../Styles/SVGs/post_add_white_48dp.svg";
import {
    logo_test
} from "../../Media/Images/Logo.js";
import {
    useNavigate
} from 'react-router-dom';
import { openForm } from "../../Store/Slices/FormSlice/FormSlice";

const SideNavBar = () => {

    const user = useSelector(state=> state.user);
    const admin = useSelector(state=> state.admin);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log("NavBar debug => ", user._id, admin._id);

    function logout(){
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        navigate("/Login");
        
    }

    return(
        <div className="csn30-SNavBarWrap">
            <div className="csn30-SNavBar-LogoWrap">
            <img className="csn30-icon-svg csn30-img-icon"
                 src={logo_test} alt="Logo" 
                 onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Home");
                 }}
                 />
            </div>
            
                <div className="csn30-SNavBar-IconsWrap">
                <div className="csn30-add-report-wrap"
                
                >
                         <svg 
                         onClick={(e)=>{
                            e.preventDefault();
                            if(user._id){
                            dispatch(openForm({
                                formName: "addReport",
                                
                            }));
                            
                        }
                        else{
                            alert("Please login to add a report");
                        }
                        }}
                         className="csn30-add-report-icon-wrap"
                         xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="48px" viewBox="0 0 20 20" width="48px" fill="#FFFFFF"><g><rect fill="none" height="20" width="20" x="0"/></g><g><g/><g><path d="M14,15H5V6h6V5H5C4.45,5,4,5.45,4,6V15c0,0.55,0.45,1,1,1H14c0.55,0,1-0.45,1-1V9h-1V15z"/><polygon points="7,8 7,9 11,9 12,9 12,8"/><rect height="1" width="5" x="7" y="10"/><rect height="1" width="5" x="7" y="12"/><polygon points="15,3 14,3 14,5 14,5 12,5 12,6 14,6 14,8 15,8 15,6 15,6 17,6 17,5 15,5"/></g></g></svg>
                </div>
                <div className="csn30-icon-wrap-each">
                <svg
                onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Home");
                 }}
                className="csn30-icon-svg"
                xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="44px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/></svg>
                </div>
                <div className={"csn30-icon-wrap-each" + (user._id || admin._id? "" : " Hide")}>
                <svg 
                onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Reports");
                 }}
                className="csn30-icon-svg"
                xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 0 24 24" width="44px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z"/></svg>
                </div>
                <div className="csn30-icon-wrap-account-wrap">
                <svg 
                onClick={(e)=>{
                    if(user._id){
                        e.preventDefault();
                        navigate("/Account");
                    }
                   
                }}
                className="csn30-icon-svg"
                xmlns="http://www.w3.org/2000/svg" height="44px" viewBox="0 0 24 24" width="44px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 5.9c1.16 0 2.1.94 2.1 2.1s-.94 2.1-2.1 2.1S9.9 9.16 9.9 8s.94-2.1 2.1-2.1m0 9c2.97 0 6.1 1.46 6.1 2.1v1.1H5.9V17c0-.64 3.13-2.1 6.1-2.1M12 4C9.79 4 8 5.79 8 8s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 9c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"/></svg>
                  
                </div>

                <div className={"csn30-icon-wrap-each-login-wrap30" + ((user._id || admin._id)? " Hide" : "")}
                  id="csn30-login-icon"
                  >
                <svg 
                onClick={(e)=>{
                    e.preventDefault();
                    navigate("/Login");
 
                }}
                
                className="csn30-icon-svg LogOutIcon-navBar"
                xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
                  </div>
                  <div className={"csn30-icon-wrap-each-login-wrap30" + ((user._id || admin._id)? "" : " Hide")}
                  id="csn30-login-icon"
                  >
                <svg 
                onClick={(e)=>{
                    e.preventDefault();
                    
                    logout();
 
                }}
               
                className="csn30-icon-svg"
                xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="40px" viewBox="0 0 24 24" width="36px" fill="#FFFFFF"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"/></g></svg>
                  </div>



                {/* <div className="csn30-icon-wrap-each">
                <svg className="csn30-icon-svg"
                xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="44px" viewBox="0 0 20 20" width="44px" fill="#FFFFFF"><g><rect fill="none" height="20" width="20"/></g><g><g><path d="M10 5.5c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm0 4.5c-.83 0-1.5-.67-1.5-1.5S9.17 7 10 7s1.5.67 1.5 1.5S10.83 10 10 10z"/><path d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm0 14.5c-1.49 0-2.86-.51-3.96-1.36C7.19 14.42 8.55 14 10 14s2.81.42 3.96 1.14c-1.1.85-2.47 1.36-3.96 1.36zm5.07-2.44c-1.44-.99-3.19-1.56-5.07-1.56s-3.62.58-5.07 1.56C4.04 12.95 3.5 11.54 3.5 10c0-3.58 2.92-6.5 6.5-6.5s6.5 2.92 6.5 6.5c0 1.54-.54 2.95-1.43 4.06z"/></g></g></svg>
                </div> */}
                 
                </div>
            </div>
        
    )
}

export default SideNavBar;