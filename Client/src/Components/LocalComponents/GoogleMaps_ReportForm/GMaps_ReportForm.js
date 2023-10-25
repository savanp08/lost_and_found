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
import { Loader } from "@googlemaps/js-api-loader";
  
const GMaps_ReprtForm = (props) => {
    const {
        type,
        coordinates,
        Item,
        onLoad,
        setItem,
        SelectedCoordinates,
        markers
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
   if(gmap.isLoaded === false) return <>Loading</>
   

   let content;
   switch(type){
    case "Form" :
      content = (
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
                        },
                        itemDetails:{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                              GMapData:{
                                ...Item.itemDetails.location.GMapData,
                                markerMoved : true,
                              }
                            }
                          }
                    
                      })
          }}

         />

          </GoogleMap>
      );
        break;
        case "EditReport" : 
        content = (
        <GoogleMap 
        mapContainerClassName="lcgm41-map-container-main"
        center={center}
        zoom={16.7}
        options={options}
        onLoad={onLoad3}
        
        >
          {console.log("Coordinates being pass to marker in editform => ", coordinates)}
         <MarkerF position={coordinates.lat? {
          lat : coordinates.lat/1,
          lng : coordinates.lng/1
         } : {}} 
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
                        },
                        itemDetails:{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                              GMapData:{
                                ...Item.itemDetails.location.GMapData,
                                markerMoved : true,
                              }
                            }
                          }
                    
                      })
          }}
         />
         {console.log("SelectedCoordinates being pass to marker in editform => ", SelectedCoordinates)}
         <MarkerF position={SelectedCoordinates.lat? {
          lat : SelectedCoordinates.lat/1,
          lng : SelectedCoordinates.lng/1
         } : {}} 
         />
 
          </GoogleMap>

        );
          break;
          case "UserReports" :
            content= (
            <GoogleMap 
        mapContainerClassName="lcgm41-map-container-main"
        center={center}
        zoom={16.7}
        options={options}
        onLoad={onLoad3}
        
        >
         
         {
          markers.length > 0? 
          <MarkerClusterer 
          options={{
            gridSize: 60,
            minimumClusterSize: 2,
          }}
          >
            {(clusterer) => (
          markers.map((item, index) => (
            <MarkerF key={index} position={item} 
            clusterer={clusterer}
            />
          )) 
            )
              }
          </MarkerClusterer>
          : null
         }

          </GoogleMap>
            );
        break;
        default:<Loader/>
   }
   

    return(
      
      <div className="lcgm41-main-wrap">
         {content}
      </div>
    )
}


export default GMaps_ReprtForm;
