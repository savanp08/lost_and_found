import React from "react";
import './common.scss';
import './NavBar.css';
import { useSelector } from "react-redux";


const SideNavBar = () => {

    const user = useSelector(state=> state.user);

    return(
        <div className="SNavBarWrap">
            <div className="SNavBar-LogoWrap">

            </div>
            <div className="SNavBar-IconsWrap">
                <div className="SNavBar-IconWrap">
                <div className="csn30-add-report-wrap"
                onClick={(e)=>{
                    e.preventDefault();
                    if(user._id){
                    var x = document.getElementById("ar11-addReport-wrap");
                    if(x.classList.contains("Hide")){
                        x.classList.remove("Hide");
                        x.classList.add("Add-Report-After");
                    }
                    else{
                        x.classList.remove("Add-Report-After");
                        x.classList.add("Hide");
                    }
                }
                else{
                    alert("Please login to add a report");
                }
                }}
                >
                         Add
                </div>
                </div>
            </div>
        </div>
    )
}

export default SideNavBar;