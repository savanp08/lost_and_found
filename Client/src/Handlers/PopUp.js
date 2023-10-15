import React from "react";

 function handler_login_popup(e){
    document.getElementById("app-popup-main-wrap").classList.add("Hide");
 }

 function open_div(id){
    document.getElementById(id).classList.remove("Hide");
 }

 function add_class(id,clas){
   document.getElementById(id).classList.add(clas);
 }

 function close_div(id){
    document.getElementById(id).classList.add("Hide");
 }

 export {
   handler_login_popup,
   open_div,
   add_class,
   close_div
}
 
