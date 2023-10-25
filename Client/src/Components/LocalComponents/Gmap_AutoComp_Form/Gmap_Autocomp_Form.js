import { Loader } from "@googlemaps/js-api-loader"
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';




const Gmap_Autocomp_Form = ({handle_selctSearchOption, setGSuggestions}) => {

    const [tempValue, setTempValue] = useState("");

        const {
     ready,
     value,
     suggestions: { status, data },
     setValue,
     clearSuggestions,
     
   } = usePlacesAutocomplete({
     debounce: 300,
     requestOptions: {
        componentRestrictions: { country: 'us' },
        

      }
   });

   useEffect(() => {
    
       async function sendGMapsData_toServer() {
        await axios.post("/GMap/AutoComplete/addData",{
            searchString: value,
            data: data,
        }).then(res=>{
            console.log("gmap debug => seding auto complete data to server places autocomplete res", res);
        }).catch(err=>{
            console.log("gmap debug Error=> seding auto complete data to server places autocomplete err", err);
        })
       }

       if(data.length > 0) sendGMapsData_toServer();

   },[data])

   

   const handler_autoComp_select = async (e, val) => {
       console.log("gmap debug => places autocomplete select", e, val);
       setValue(val);
       clearSuggestions();
       setTempValue(val);

       const result = await getGeocode({ address: val });
       console.log("gmap debug => geocode result", result);
       const { lat, lng } = await getLatLng(result[0]);
       console.log("gmap debug => places autocomplete lat lng", lat, lng);
       setGSuggestions(result);
       handle_selctSearchOption(
        result,lat,lng,val,
          
       )
              
   }

   console.log("gmap debug => places autocomplete ready?", ready," value =>", value, "status =>",status, "data => ",data);

    return(
        <div className="lcgmac42-main-wrap">
            <TextField 
            id="outlined-basic"
            label="Enter Location"
            variant="outlined"
            value={tempValue}
            onChange={(e) =>{
                if(e.target.value.length >3){
                    setValue(e.target.value);
                }
                setTempValue(e.target.value);
                
                
            }}
            />
            <div className="lcgmac42-suggestions-wrap">
                {
                    status === 'OK' && data.length > 0 && data.map((item, index) => (
                        <div key={index} className="lcgmac42-suggestions-item"
                        onClick={(e)=>{
                            handler_autoComp_select(e, item.description);
                        }}
                        >
                            <div className="lcgmac42-suggestions-item-title">
                                {item.description}
                            </div>
                        </div>
                            ))
                }
            </div>
        </div>
    )
}


export default Gmap_Autocomp_Form;

function processPlaceDetails(placeDetails) {

    console.log("Debug mode 1 => ", placeDetails);
    const location = {
      streetAddress1: "",
      streetAddress2: "",
      buildingDetails: "",
      county: "",
      city: "",
      state: "",
      zipCode: "",
      searchAddress:"",
    };
  
    placeDetails.forEach((component) => {
      const longName = component.long_name;
      const types = component.types || [];
  
      if (types.includes("street_number")) {
        location.streetAddress1 = longName;
      } else if (types.includes("route")) {
        location.streetAddress2 = longName;
      } else if (types.includes("neighborhood")) {
        location.buildingDetails = longName;
      } else if (types.includes("locality")) {
        location.city = longName;
      } else if (types.includes("administrative_area_level_2")) {
        location.county = longName;
      } else if (types.includes("administrative_area_level_1")) {
        location.state = longName;
      } else if (types.includes("postal_code")) {
        location.zipCode = longName;
      }
      else if(component.searchAddress){
        location.searchAddress = component.searchAddress
      }
      else if(types.includes("postal_code_suffix")){
        location.zipCode = location.zipCode + "-" + longName;
      }
      
    });
  
    return location ;
  }
  
  const placeDetails = {
    // Your placeDetails data here
  };
  
 

  
  export{
    processPlaceDetails,
  }