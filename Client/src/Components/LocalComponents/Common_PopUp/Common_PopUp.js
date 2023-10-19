import React, { useState , useEffect } from "react";
import './This.scss';
import { close_div } from "../../../Handlers/PopUp";
import { useSelector } from "react-redux";

const Common_PopUp = ({params}) => {

    const data = useSelector(state => state.rawData.options) || [];
    
    console.log("popup debug =>> data=>",data);

    return(
        <div className="c_p14-main-wrap">
            <div className="c_p14-close-btn-wrap"
            onClick={(e) => {
                close_div("ur11-claim-confirmation-main-wrap");
            }}
            >
                X
            </div>
            
            {
                data.map((option,key)=>{
                    console.log("popup debug =>> ",option);
                    return(
                        <span className="c_p14-child-wrap"
                        style={{
                            ...option.style
                        }}
                        >
                             {option.text}
                        </span>
                    )
                })
                
            }
        </div>
    )
}


export default Common_PopUp;