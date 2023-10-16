import React, { useState , useEffect } from "react";
import './This.scss';
import { close_div } from "../../../Handlers/PopUp";
import { useSelector } from "react-redux";

const Common_PopUp = ({params}) => {

    const raw_data = useSelector((state) => state.rawData) || [];
    const [ data , setData ] =  useState([]);



    useEffect(()=>{
        if(Array.isArray(raw_data)){
            setData(raw_data);
        }
    },[raw_data])

    return(
        <div className="c_p14-main-wrap">
            <div className="c_p14-close-btn-wrap"
            onClick={(e) => {
                close_div("ur11-claim-confirmation-main-wrap");
            }}
            >
                X
            </div>
            AAAAAAAAAAAAAAAA
            {
                data.map((option,key)=>{
                    return(
                        <span className="c_p14-child-wrap"
                        sx={{
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