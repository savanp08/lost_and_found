import { Loader } from "@googlemaps/js-api-loader"
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';




const Gmap_Autocomp_Form = ({gSuggestions, setGSuggestions}) => {

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
   })

   const handler_autoComp_select = async (e, val) => {
       console.log("gmap debug => places autocomplete select", e, val);
       setValue(val);
       clearSuggestions();

       const result = await getGeocode({ address: val });
       console.log("gmap debug => places autocomplete result", result);
       const { lat, lng } = await getLatLng(result[0]);
       console.log("gmap debug => places autocomplete lat lng", lat, lng);
   }

   console.log("gmap debug => places autocomplete ready?", ready," value =>", value, "status =>",status, "data => ",data);

    return(
        <div className="lcgmac42-main-wrap">
            <TextField 
            id="outlined-basic"
            label="Enter Location"
            variant="outlined"
            value={value || tempValue}
            onChange={(e) =>{
                if(e.target.value.length <3){
                    setTempValue(e.target.value);
                }
                else
                setValue(e.target.value);
                
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