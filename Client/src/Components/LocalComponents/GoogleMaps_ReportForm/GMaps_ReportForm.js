import { 
    GoogleMap, 
    Marker, 
    useLoadScript ,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,

} from "@react-google-maps/api";
import {
    useEffect,
    useState,
    useMemo,
    useRef,
} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setIsLoaded } from "../../../Store/Slices/GMapSlice/GMapSlice";
  
const GMaps_ReprtForm = ({type , }) => {
    
    const dispatch = useDispatch();
    const center = useMemo(() => ({ lat: 32.7292, lng: -97.1152 }), []);
    const mapContainerStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const zoom = useMemo(() => 14, []);
    const options = useMemo(() => ({ 
        disableDefaultUI: true ,
        clickableIcons: false,
        
    
    }), []);
    const gmap = useSelector(state => state.gMap);
    
   




    return(
      
      <div className="lcgm41-main-wrap">
        {
        gmap.isLoaded === false ? (
        <h1>Loading...</h1>
      ) : type === "Form"? (
        <GoogleMap 
        mapContainerClassName="lcgm41-map-container-main"
        center={center}
        zoom={17}
        options={options}
        />
      )
      :
      (
        <GoogleMap 
        mapContainerClassName="lcgm41-map-container-main"
        center={center}
        zoom={1}
        options={options}
        >
        <Marker position={center} />
        </GoogleMap>
      )
    }
       
      </div>
    )
}


export default GMaps_ReprtForm;