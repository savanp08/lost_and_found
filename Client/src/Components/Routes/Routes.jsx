import React from "react";
import { Routes, Route , Link } from "react-router-dom";
import SignUp from "../../Pages/Auth/Sign Up/Sign Up";
import Home from "../../Pages/Home/Home";
import '../../App.css';
import Login from '../../Pages/Auth/Login/Login.jsx';
import Admin from "../../Pages/Account/Admin/Admin";
import FOoterStand from "../Footer/Footer.js";
import AdminReports from "../Children/AdminReports/AdminReports";
import AdminLogin from "../../Pages/Auth/Login/Admin";
import AddReport from "../GlobalComponents/AddReport/AddReport";
import UserReportCard from "../Cards/ReportCard/Report";
import UserReports from "../../Pages/UserReports/UserReports";
import UserAccount from "../../Pages/Account/User/User";
const RoutesComponent = () =>{

    return (
        <div className="Routes-Wrap">
            <Routes >
                <Route exact path="/" element = {<Home/> } />
                <Route exact path="/SignUp" element = { <SignUp/> } />
                <Route exact path="/Login" element = { <Login/> } />
                <Route exaxt path="/Admin/Account" element = { <Admin/> } />
                <Route exaxt path="/Reports" element = {  <UserReports/> } />
                <Route exaxt path="/Test" element ={ <AdminReports/> } />
                <Route exaxt path="/AdminLoginX86109110213" element = { <AdminLogin/> } />
                <Route exaxt path="/Account" element = { <UserAccount /> } />
                <Route exaxt path="/AddReport" element = { <AddReport/> } />
            </Routes>
            
        </div>
    )
}

export default RoutesComponent;