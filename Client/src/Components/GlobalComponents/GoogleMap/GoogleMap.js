import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

 


const MapComponent = ()=>{

    const center = useMemo(() => ({ lat: 32.7292, lng: -97.1152 }), []);
    const mapContainerStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const zoom = useMemo(() => 14, []);
    const options = useMemo(() => ({ 
        disableDefaultUI: true ,
        clickableIcons: false,
        
    
    }), []);
    

const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  return (
    <div className="cgm40-main-wrap">
      {!isLoaded ? (
        <h1>Loading...</h1>
      ) : (
        <GoogleMap
          mapContainerClassName="cgm40-map-container-main"
          center={center}
          zoom={17}
          options={options}
        />
      )}
    </div>
  );

}


export default MapComponent;