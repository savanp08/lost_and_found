import { 
    GoogleMap, 
    Marker, 
    useLoadScript ,
    DirectionsRenderer,
    Circle,
    MarkerClusterer,
    MarkerF

} from "@react-google-maps/api";
import {
    useEffect,
    useState,
    useMemo,
    useRef,
    useCallback,
} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setIsLoaded } from "../../../Store/Slices/GMapSlice/GMapSlice";
  
const GMaps_ReprtForm = (props) => {
    const {
        type,
        coordinates,
        Item,
        onLoad,
        setItem,
    } = props;
    const dispatch = useDispatch();
    const center = useMemo(() => ({ lat: 32.7292, lng: -97.1152 }), []);
    const mapContainerStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const zoom = useMemo(() => 14, []);
    const options = useMemo(() => ({ 
        disableDefaultUI: true ,
        clickableIcons: false,
        
    
    }), []);
    const gmap = useSelector(state => state.gMap);
    console.log("Gmap debug => GMaps_reportForm params =>", type, coordinates,Item,props);
   const onLoad3 = useCallback((map)=>{
    console.log("gmap debug => ZZZZZZZZZZZZZZZZZZZZz",gmap, new Date().toTimeString());
    onLoad(map)
   },[]);
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
        onLoad={onLoad3}
        
        >
         <MarkerF position={coordinates} 
         draggable={true}
          onDragEnd={(e)=>{
              console.log("gmap debug => marker drag end", e);
              const { lat, lng } = e.latLng;
              console.log("gmap debug => marker drag end lat lng", lat(), lng());
              setItem({
                ...Item,
                        coordinates:{
                          lat : lat(),
                          lng : lng()
                        }
                    
                      })
          }}
         />

          </GoogleMap>
      )
      :
      (
        // <GoogleMap 
        // mapContainerClassName="lcgm41-map-container-main"
        // center={center}
        // zoom={1}
        // options={options}
        // >
       
        // </GoogleMap>
        null
      )
    }
       
      </div>
    )
}


export default GMaps_ReprtForm;
