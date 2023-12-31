
import './App.css';
import RoutesComponent from './Components/Routes/Routes.jsx';
import { NavLink, BrowserRouter as Router, useNavigate } from 'react-router-dom';
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
import { useEffect, useState , createContext } from 'react';
import axios from 'axios';
import { addUser, removeUser } from './Store/Slices/UserSlice/UserSlice';
import AuthFunctions from './Handlers/Auth';
import { 
  GoogleMap, 
  Marker, 
  useLoadScript ,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,

} from "@react-google-maps/api";
import { setIsLoaded } from './Store/Slices/GMapSlice/GMapSlice';
import EditReport from './Components/GlobalComponents/EditReport/EditReport';
import UserEditReport from './Components/LocalComponents/UserEditReport/EditReport';
import { io } from 'socket.io-client';
import { addSocket } from './Store/Slices/SokcetSlice/SocketSlice.js';
import { openForm } from './Store/Slices/FormSlice/FormSlice.js';
import EditUserDetails from './Components/LocalComponents/EditUserDetails/EditUserDetails.js';


// "undefined" means the URL will be computed from the `window.location` object
const socketURL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:5000';

function App() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();
  const [ libraries ] = useState(['places']);
  const [socket,setSocket] = useState(null);
  
  console.log("User SIgned?",user.userId);
  console.log(user);

  useEffect(()=>{
    if(socket === null){
        console.log("socket is null, conneting to socket",socketURL);
        setSocket(io(socketURL))
    }
    if(socket){
      
      console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",socket);
  //     dispatch(addSocket({
  //       socket : socket,
  //       status : "connected"
  //  }));
        socket.on("connect",()=>{
           
            console.log("socket connected",socket);
        })
        socket.on("disconnect",()=>{
            console.log("socket disconnected");
        })
        return () => {
            socket.removeAllListeners();  
            socket.off("connect");
        }
    }
},[socket])

  useEffect(()=>{
    async function fetchUser(){
       const res = await AuthFunctions();
       if(res.message && res.user){
        dispatch(addUser(res.user));
       }
    }
    fetchUser();
  },[])

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries : libraries,
  });

    
  useEffect(()=>{
    if(isLoaded === true){
    console.log("gMaps debug => is Loaded ", isLoaded);
    dispatch(setIsLoaded({
      isLoaded: true,
      status: "Loaded"
    }));
  }
},[isLoaded])

  return (
    <div className="App-Wrap">
       <Router>
      <div className={"app-nav-main-wrap" + (user.userId? "" : "") }>
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
            function: "open_div",
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
     <AddReport 
      user={user}
     />
     <EditReport 
     user = {user}
     />
     <UserEditReport 
     user = {user}
     />
     <EditUserDetails />
     
     {/* <div className="OpaqueBackGround-fullscreen OpaqueBefore"></div> */}
     </div>
     </div>
     
    
     </Router>
    
    </div>
  ); 
}

export default App;
 