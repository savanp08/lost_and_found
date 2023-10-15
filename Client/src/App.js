
import './App.css';
import RoutesComponent from './Components/Routes/Routes.jsx';
import { NavLink, BrowserRouter as Router } from 'react-router-dom';
import NavBar from './Components/NavBar/NavBar/NavBar.js';
import { RespNavBar} from './Components/NavBar/NavBar/NavBar.js'
import FOoterStand from './Components/Footer/Footer';
import { useDispatch, useSelector } from 'react-redux';
import SideNavBar from './Components/NavBar/NavBar';
import AddReport from './Components/GlobalComponents/AddReport/AddReport';
import LeftNav from './Components/NavBar/LeftNav/LeftNav';
import { handler_login_popup } from './Handlers/PopUp';
import { addRoute } from './Store/Slices/RouterSlice/RouterSlice.js'
import { addTask } from './Store/Slices/TaskSlice/TaskSlice';
import { open_div } from './Handlers/PopUp';

function App() {

  const userSigned = useSelector(state => state.user.userId);
  const dispatch = useDispatch();
  
  console.log("User SIgned?",userSigned);
  console.log(useSelector(state=>state.user))
  return (
    <div className="App-Wrap">
       <Router>
      <div className={"app-nav-main-wrap" + (userSigned? "" : "") }>
     {/* { userSigned?
      <NavBar /> : null
     } */}
     {/* {
      userSigned? <RespNavBar /> : null
     } */}
     <LeftNav/>
     </div>
     <div className='Content-InApp'>
      <div className="SNav-AppWrap">
     <SideNavBar/>
     </div>
     <div className='Content-MainWrapper'>
     <div className='app-popup-main-wrap Hide'
     id="app-popup-main-wrap"
     >
      <div className='app-popup-close-btn-wrap'>
        <span className='app-popup-close-btn'
        onClick={(e)=>{
          dispatch(addRoute("/Login"));
          dispatch(addTask({
            task:"function",
            catagory:"claim",
            status:"success",
            progress:"begun",
            function: open_div,
            function_params : [""],
          }))
          handler_login_popup(e);
        }}
        >
          X
        </span>
        
      </div>
      <span className='app-popup-text'
      
      >
       To Claim this Report  
      </span>
      <NavLink to='/Login' className='app-popup-text navlink-popup'
      onClick={(e)=>{
        
         handler_login_popup(e);
      }}
      >
        Login
      </NavLink>
      <span className='app-popup-text'>
        to your Account
      </span>
     </div>
     <RoutesComponent/>
     {/* <div className='App-FooterWrap'>
     <FOoterStand/>
     </div> */}
     <AddReport />
     {/* <div className="OpaqueBackGround-fullscreen OpaqueBefore"></div> */}
     </div>
     </div>
     
    
     </Router>
    
    </div>
  ); 
}

export default App;
 