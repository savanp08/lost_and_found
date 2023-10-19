import React from "react";
import './LeftNav.scss';

const LeftNav = () => {

    return(
        <div className="cln-main-wrap">
            <div className="cln-inner-wrap"
            
            >
                <div className="cln29-add-report-wrap"
                onClick={(e)=>{
                    e.preventDefault();
                    var x = document.getElementById("ar11-addReport-wrap");
                    if(x.classList.contains("Hide")){
                        x.classList.remove("Hide");
                        x.classList.add("Add-Report-After");
                    }
                    else{
                        x.classList.remove("Add-Report-After");
                        x.classList.add("Hide");
                    }
                }}
                >
                         Add
                </div>
                  
            </div>
        </div>
    )
}

export default LeftNav;