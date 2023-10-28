import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./This.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { Chip, InputAdornment, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CustomColors from "../../Data/Options";
import Close from '@mui/icons-material/Close';
import axios from 'axios';
import { ItemTypes } from "../../Data/Options"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useNavigate } from "react-router-dom";
import AuthFunctions from "../../../Handlers/Auth";
import { addUser } from "../../../Store/Slices/UserSlice/UserSlice";
import { initialState_report } from "../../Data/Schemas";
import GMaps_ReprtForm from "../../LocalComponents/GoogleMaps_ReportForm/GMaps_ReportForm";
import Gmap_Autocomp_Form, { processPlaceDetails } from "../../LocalComponents/Gmap_AutoComp_Form/Gmap_Autocomp_Form";
import { Marker } from "@react-google-maps/api";
import {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import { closeForm } from "../../../Store/Slices/FormSlice/FormSlice";



const UserEditReport = ({params}) => {
  console.log("Rerender in Edit report");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const gMapX = useSelector((state)=> state.gMap);
  const [gMap,setGMap] = useState(gMapX);
  const report = useSelector((state)=> state.report);
  const form = useSelector((state)=> state.form);
  const [reporterType, setReporterType] = useState("");
  const [Item, setItem] = useState(
    report ||
    {
    ...initialState_report,
    userId : user._id,
    reportName : user.Name,
  });
  const [gSuggestions, setGSuggestions] = useState();
  const mapRef = useRef(null);
  const [displayAddress, setDisplayAddress] = useState(
  report? report.itemDetails.location.displayAddress : 
    {
    streetAddress1: "",
      streetAddress2: "",
      buildingDetails: "",
      county: "",
      city: "",
      state: "",
      zipCode: "",
      searchAddress:"",
      coordinates:{
        lat: null,
        lng: null,
      },
      place_id:null
  });
  const [addressType , setAddressType] = useState("None");
  const [centreCoordinates, setCentreCoordinates] = 
             useState({ lat : Item.itemDetails.location.displayAddress.coordinates.lat,
                        lng : Item.itemDetails.location.displayAddress.coordinates.lng
                      });
 

  useEffect(()=>{
     setGMap(gMapX);
     console.log("Setting map state as => ", gMapX, gMap)
  },[gMapX])

 console.log("Item Debug =>",Item, "Report =>",report);
  
  const onLoad = ((map,) => {
    if(map)
    mapRef.current = map
   
    console.log("map debug onLoad callback adddrag => ",gMap,mapRef.current);
    
    if(gMap.isLoaded && mapRef.current){
      mapRef.current.panTo(displayAddress.coordinates)
    addDragEvent();
    }
    
  });

  useEffect(() => {
    if (report) {
      setItem(report);
      setCentreCoordinates(report.itemDetails.location.displayAddress.coordinates);
      setDisplayAddress(report.itemDetails.location.displayAddress)
    }
  }, [report]);
  
console.log("Item debug =>",Item,displayAddress) 
  useEffect(()=>{
    async function authVerify(){
      const flag = await AuthFunctions();
      if(flag.message){
       console.log("Auth Debug in add  report => user is signed in ",flag);
       dispatch(addUser(flag.user));
      }
      else{
       console.log("Auth Debug in add report=> user is not signed in ",flag);
        navigate("/Login");
      }
  }
  
   //authVerify();
  },[])

  async function ValidateForm(e){
    e.preventDefault();
    SubmitForm();
  }
  
  async function SubmitForm(){
    
    
    var files = document.getElementById("ar11-item-location-media-input").files;
    var itemFiles = document.getElementById("ar11-item-property-media-input").files;
    const formData = new FormData();
    
    formData.append('report', JSON.stringify({
      ...Item,
      userId : user._id,
      itemDetails:{
        ...Item.itemDetails,
        location:{
          ...Item.itemDetails.location,
          displayAddress: displayAddress,
        }
      }
    }));
    console.log("submitting display address => " ,displayAddress);
    console.log("files =>",files)

    for (const file of files) {
      console.log("Each Image =>",file,file.name);
      formData.append("image", file, file.name);
    }
    for (const file of itemFiles) {
      console.log("Each Item Image =>",file,file.name);
      formData.append("ItemImage", file, file.name);
    }
      console.log("Debugging FileUpload->  Type of ->",)
    //  formData.append("image",NewFiles);
      console.log("Debugging FileUpload-> New Files Array->",formData.getAll("image"));

    await axios.post('/Report/EditReport',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }
    ).then(res=>{
      console.log("Reponse from add report api => ",res);

    }).catch(err=>{
      console.log("Error while adding report => ",err);
    })
  }

function handler_closeForm(){
  dispatch(closeForm({
    formName: "editUserReport",
    isOpen: false,
  }))
}
async function addDragEvent(){
  console.log("Debug Message map Event Listener outer fired=> ",mapRef.current,gMap.isLoaded);
  if(gMap.isLoaded === true && mapRef.current){
    console.log("Debug Message map Event Listener fired=> ",mapRef.current);
  mapRef.current.addListener('dragend', (e)=>{
    console.log("Debug Message map Event Listener event=> ",e);
    console.log("Debug Message map Event Listener coordinates=> ",mapRef.current.getCenter().lat(),mapRef.current.getCenter().lng());
    setItem({
      ...Item,
      coordinates:{
        lat : mapRef.current.getCenter().lat(),
        lng : mapRef.current.getCenter().lng()
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
})
// mapRef.current.addListener('click', (e)=>{

// })
  }
}

function getLat(lat){
  if(typeof lat === "function") return lat();
  return lat/1;
}
function getLng(lng){
  if(typeof lng === "function") return lng();
  return lng/1;
}

useEffect(()=>{
  console.log("map debug onLoad adddrag => ",gMap, mapRef.current);
  if(gMap.isLoaded === true && mapRef.current){
    addDragEvent();
    console.log("Panning to ",centreCoordinates)
      try{
      mapRef.current.panTo({
        lat : centreCoordinates/1,
        lng : centreCoordinates/1
      });
      }
      catch(err){
        console.log("Error while centering map to initial coordinates in onload callback",err);
      }
    }
},[gMap,mapRef.current, onLoad])

     
    async function populateAddressWithLatLng(address) {
      setAddressType("LatLng");
      console.log("Debug Message user chosen gmap option: reverse geocode=> ",Item,displayAddress);
      var x = Item.itemDetails.location.GMapData.rawData_geometric;
      var y = x;
      var flag = true;
      var lat=Item.coordinates.lat,lng=Item.coordinates.lng;
      if(Item.itemDetails.location.GMapData.markerMoved)  flag=false
     
    if(flag===false){
       console.log("caution : fetching geocoded data for", lat, lng);
       x = await getGeocode({location : { 
        lat: Item.coordinates.lat,
        lng: Item.coordinates.lng
        }})
        console.log("Data from geocode api => ",x);
        setItem({
          ...Item,
          itemDetails:{
          ...Item.itemDetails,
            location:{
            ...Item.itemDetails.location,
              GMapData: {
                ...Item.itemDetails.location.GMapData,
                rawData_geometric: x,
                markerMoved : false,
              },
            
            }
          }
          
        })
       
    }
    var a = processPlaceDetails(
      x[0].address_components,
      
    )
    console.log("Data setting for displauAddress => ",{...a, coordinates:{lat,lng}});
     setDisplayAddress({
      ...a,
      coordinates:{
        lat: lat,
        lng: lng
      },
      place_id:x[0].place_id
     })
     panToCoordinates({lat,lng});
  }

  function panToCoordinates(coordinates){
     mapRef.current.panTo(coordinates)
  }
  
  function populateAddressWithSearch(){
    console.log("Debug Message user chosen gmap option: Search Fill=> ",Item);
    setAddressType("Search");
    mapRef.current.panTo({ 
      lat: Item.itemDetails.location.GMapData.processedData.coordinates.lat,
      lng: Item.itemDetails.location.GMapData.processedData.coordinates.lng,
    });
    mapRef.current.setZoom(15);
    setDisplayAddress({
      ...Item.itemDetails.location.GMapData.processedData.location,
      coordinates : Item.itemDetails.location.GMapData.processedData.coordinates,
      place_id : Item.itemDetails.location.GMapData.rawData[0].place_id
    })
      }

      function fillAddress(location){
         const loc = {
          allPlacesPossible: [location.searchAddress],
    buildingDetails: location.buildingDetails,
    university: null,
    street: location.streetAddress1 + location.streetAddress2,
    apartment: null,
    city: location.city,
    state: location.state,
    pinCode: location.zipCode,
    coordinates: location.coordinates,
         }
         setItem({
            
         })
      }





  if(form.editUserReport.isOpen===false) return null;
  return (
    <div className="gcaer26-EditReport-wrap" id="ar11-addReport-wrap">
      <div className="ar11-inner-wrap">
        <div
          className="ar11-close-wrap"
          id="ar11-close-wrap"
          onClick={(e) => {
            e.preventDefault();
            handler_closeForm();
          }}
        >
          X 
        </div>
        <div className="ar11-h-wrap">
          <div className="ar11-h-title-wrap">
            <span className="ar11-h-title-text">Edit Report</span>
          </div>
        </div>
        <div className="ar11-content-wrap">
          <div className="ar11-content-inner-wrap">
            <div className="ar11-item-wrap">

              <fieldset className="ar11-item-label-wrap">
                <legend className="ar11-item-legend">Ownership</legend>
                <div className="ar11-ownership-wrap">
                  <div className="ar11-ownership-selct-wrap">
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Is the Item Yours
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="report-reporterType"
                        value={Item.reporterType || ""}
                        label="Is It Yours"
                        onChange={(e) => {
                          const x =
                            e.target.value === "User" ? user.userId : null;
                          setItem({
                            ...Item,
                            reporterName: { ...user.Name },
                            reporterId: user.reporterId,
                            reporterType: e.target.value,
                            claims: {
                              ...Item.claims,
                              userIds:
                                e.target.value === "User" ? [user.userId] : [],
                            },
                          });
                        }}
                        sx={{
                          width: "100%",
                          minWidth: "230px",
                        }}
                      >
                        <MenuItem value={"User"}>Yes</MenuItem>
                        <MenuItem value={"Other"}>No</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <span className="ar11-item-ownership-text">
                    Select Yes only if u have permission from the actual owner
                    to represent this property
                  </span>
                </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
                <legend className="ar11-item-legend">Type</legend>
                <div className="ar11-item-type-wrap ar11-common-textField-wrap">
                  <Autocomplete
                    id="tags-standard"
                    options={ItemTypes}
                    getOptionLabel={(option) => option.label || ""}
                    value={{
                      label: Item.itemDetails.common_type || "",
                    }}
                    limitTags={3}
                    onChange={(e, value) => {
                      console.log("ssssss =>", e.target.value);
                      setItem({
                        ...Item,
                        itemDetails: {
                          ...Item.itemDetails,
                          common_type: value.label,
                        },
                      });
                    }}
                    renderInput={(params) => {
                      const { InputProps, ...restParams } = params;
                      const { startAdornment, ...restInputProps } = InputProps;
                      return (
                        <TextField
                          label="Item Type"
                          {...restParams}
                          InputProps={{
                            ...restInputProps,
                            startAdornment: (
                              <div
                                style={{
                                  maxHeight: "70px",
                                  overflowY: "auto",
                                  minWidth: "230px",
                                }}
                                sx={{
                                  minWidth: "230px",
                                }}
                              >
                                {startAdornment}
                              </div>
                            ),
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
                <legend className="ar11-item-legend">Item Name</legend>
                <div className="ar11-item-name-wrap">
                  <div className="ar11-item-name-firstName-wrap">
                    <TextField
                      id="report-item-name-Name"
                      label="Name The Item"
                      variant="outlined"
                      value={Item.itemDetails.customItemName || ""}
                      required
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setItem({
                          ...Item,
                          itemDetails: {
                            ...Item.itemDetails,
                            customItemName: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
                <legend className="ar11-item-legend">Item Color</legend>

                <div className="ar11-item-color-wrap">
                  <Autocomplete
                    multiple
                    id="tags-standard"
                    options={CustomColors}
                    disableCloseOnSelect
                    value={Item.itemDetails.colors}
                    limitTags={3}
                    onChange={(e, values) => {
                      setItem({
                        ...Item,
                        itemDetails: {
                          ...Item.itemDetails,
                          colors: values,
                        },
                      });
                    }}
                    renderInput={(params) => {
                      const { InputProps, ...restParams } = params;
                      const { startAdornment, ...restInputProps } = InputProps;
                      return (
                        <TextField
                          label="Colors"
                          {...restParams}
                          InputProps={{
                            ...restInputProps,
                            startAdornment: (
                              <div
                                style={{
                                  maxHeight: "70px",
                                  overflowY: "auto",
                                  minWidth: "230px",
                                }}
                                sx={{
                                  minWidth: "230px",
                                }}
                              >
                                {startAdornment}
                              </div>
                            ),
                          }}
                        />
                      );
                    }}
                  />

                  <div className="ar11-item-color-depictor-wrap">
                    {/* {
                  Item.colors.map((key,color)=>{
                    return(
                      <div className="ar11-item-color-depictor-singleColor"
                      style={{
                        
                      }}
                      >

                      </div>
                    )
                  })
                } */}
                  </div>
                </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap label-description-wrap">
                <legend className="ar11-item-legend">Item Description</legend>
                <div className="ar11-item-description-wrap">
                  <div className="ar11-item-description">
                    <TextField
                      id="report-item-description"
                      label="Describe in Detail"
                      variant="outlined"
                      required
                      value={Item.itemDetails.description || ""}
                      onChange={(e) => {
                        setItem({
                          ...Item,
                          itemDetails: {
                            ...Item.itemDetails,
                            description: e.target.value,
                          },
                        });
                      }}
                      multiline
                      maxRows={10}
                      sx={{
                        width: "100%",
                        minWidth: "230px",
                        minHeight: "100px",
                      }}
                      minRows={3}
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
                <legend className="ar11-item-legend">Google Maps Search</legend>
                <div className="ar11-gmaps-wrap">
                  {console.log("Debug Item Message => ", gMap)}
                  {gMap.isLoaded ? (
                    <GMaps_ReprtForm
                      type="EditReport"
                      onLoad={onLoad}
                      coordinates={{
                        lat: Item.coordinates.lat || 32.7325,
                        lng: Item.coordinates.lng || -97.11383,
                      }}
                      SelectedCoordinates={Item.itemDetails.location.displayAddress.coordinates}
                      Item={Item}
                      setItem={setItem}
                    />
                  ) : (
                    "Loading..."
                  )}
                  {gMap.isLoaded ? (
                    <Gmap_Autocomp_Form
                    handle_selctSearchOption={(data, lat, lng, value) => {
                        console.log(
                          "set data debug => Setting Data as => ",
                          data,
                          lat,
                          lng,
                          "Item",
                          Item
                        );
                        setItem({
                          ...Item,
                          itemDetails: {
                            ...Item.itemDetails,
                            location: {
                              ...Item.itemDetails.location,
                              GMapData: {
                                rawData: data,
                                processedData: {
                                  location: processPlaceDetails(
                                    data? data[0]? 
                                    [...data[0].address_components  , {searchAddress : value}] : [] : []

                                  ),
                                  coordinates: {
                                    lat: lat,
                                    lng: lng,
                                  },
                                },
                              },
                            },
                          },
                        });
                        mapRef.current.panTo({
                          lat:
                            lat ||
                            Item.itemDetails.location.GMapData.processedData
                              .coordinates.lat ||
                            32.7325,
                          lng:
                            lng ||
                            Item.itemDetails.location.GMapData.processedData
                              .coordinates.lng ||
                            -97.11383,
                        });
                        mapRef.current.setZoom(18);
                      }}
                      setGSuggestions={setGSuggestions}
                    ></Gmap_Autocomp_Form>
                  ) : (
                    "Loading AutoComplete..."
                  )}
                  {}
                </div>
                <div className="ar11-gmaps-gsearch-wrap"></div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
                <legend className="ar11-item-legend">Item Location</legend>

                {Item.itemDetails.location.GMapData.processedData.coordinates
                  .lat === Item.coordinates.lat &&
                Item.itemDetails.location.GMapData.processedData.coordinates
                  .lng === Item.coordinates.lng ? null : (
                  <div className="ar11-Gmap-location-check-wrap">
                    <button
                      className="ar11-Gmap-location-check-btn"
                      onClick={(e) => {
                        populateAddressWithLatLng()
                      }}
                    >
                      Use Marker Corrdinates
                    </button>
                    <button className="ar11-Gmap-location-check-btn"
                    onClick={(e)=>{
                      populateAddressWithSearch();
                    }}
                    >
                      Use Search Corrdinates
                    </button>
                  </div>
                )}

                <div className="ar11-item-location-wrap">
                  <div className="ar11-item-location-box ar11-locationall-possible-places">
                    <TextField
                      id="report-item-location-all-possible-places"
                      label="All possible Places"
                      variant="outlined"
                      value={displayAddress.searchAddress || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-location-building-details">
                    <TextField
                      id="report-item-location-bullding-details"
                      label="building Details"
                      variant="outlined"
                      value={displayAddress.buildingDetails || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          buildingDetails: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-univeristy">
                    <TextField
                      id="report-item-location-university"
                      label="university"
                      variant="outlined"
                      required
                      value={displayAddress.university || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          university: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-street">
                    <TextField
                      id="report-item-location-street"
                      label="Street"
                      variant="outlined"
                      value={displayAddress.street || ""}
                      required
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          street: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-apartment">
                    <TextField
                      id="report-item-location-apartment"
                      label="Apartment"
                      variant="outlined"
                      value={displayAddress.apartment || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          apartment: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-city">
                    <TextField
                      id="report-item-location-city"
                      label="City"
                      variant="outlined"
                      required
                      value={displayAddress.city || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          city: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-state">
                    <TextField
                      id="report-item-location-State"
                      label="State"
                      variant="outlined"
                      required
                      value={displayAddress.state || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          state: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-pincode">
                    <TextField
                      id="report-item-location-pinCode"
                      label="Pin Code"
                      variant="outlined"
                      required
                      value={displayAddress.zipCode || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          zipCode: e.target.value,
                        })
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-pincode">
                    <TextField
                      id="report-item-location-pinCode"
                      label="Latitude"
                      variant="outlined"
                      required
                      value={displayAddress.coordinates.lat || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          coordinates: {
                            ...displayAddress.coordinates,
                            lat: e.target.value,
                          },
                        
                        })
                      }}
                    />
                  </div>
                  <div className="ar11-item-location-box ar11-pincode">
                    <TextField
                      id="report-item-location-pinCode"
                      label="Longitude"
                      variant="outlined"
                      required
                      value={displayAddress.coordinates.lng || ""}
                      sx={{
                        minWidth: "230px",
                      }}
                      onChange={(e) => {
                        setDisplayAddress({
                          ...displayAddress,
                          coordinates: {
                            ...displayAddress.coordinates,
                            lat: e.target.value,
                          },
                        
                        })
                      }}
                    />
                  </div>
                  <fieldset className="ar11-item-label-wrap">
                    <legend className="ar11-item-legend">Location Media</legend>
                    <div className="ar11-item-location-media">
                      <div className="ar11-item-media-wrap">
                        <label
                          className="ar11-item-media"
                          htmlFor="ar11-item-location-media-input"
                        >
                          <input
                            type="file"
                            className="ar11-item-fil-icon"
                            id="ar11-item-location-media-input"
                            accept="image/*"
                            name="files[]"
                            multiple
                            onChange={(e) => {
                              console.log(e.target.files);
                              console.log(
                                document.getElementById(
                                  "ar11-item-location-media-input"
                                ).files
                              );
                              var files = document.getElementById(
                                "ar11-item-location-media-input"
                              );
                              var media = [];
                              if (
                                files &&
                                files.files &&
                                Object.keys(files.files).length > 0
                              ) {
                                Object.keys(files.files).forEach((index) => {
                                  console.log(
                                    "Debug MessageMedia->",
                                    files.files[index],
                                    files.files
                                  );
                                  media.push(
                                    URL.createObjectURL(files.files[index])
                                  );
                                });
                              }
                              setItem({
                                ...Item,
                                itemDetails: {
                                  ...Item.itemDetails,
                                  location: {
                                    ...Item.itemDetails.location,
                                    media: media,
                                  },
                                },
                              });
                            }}
                          />
                          <AttachFileIcon
                            sx={{
                              cursor: "pointer",
                              position: "relative",
                            }}
                            onClick={(e) => {
                              document.getElementById(
                                "ar11-item-location-media-input"
                              );
                            }}
                          ></AttachFileIcon>
                        </label>
                      </div>
                      <div className="ar11-media-show-input-wrap">
                        {Item.itemDetails.location.media.map((imag, key) => {
                          return (
                            <div className="ar11-item-location-media-show-each-wrap">
                              <img
                                src={imag}
                                alt="Media Image of location"
                                className="ar11-item-location-media-show-each"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </fieldset>
                </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
                <legend className="ar11-item-legend">Property Media</legend>
                <div className="ar11-item-location-media">
                  <div className="ar11-item-media-wrap">
                    <label
                      className="ar11-item-media"
                      htmlFor="ar11-item-property-media-input"
                    >
                      <input
                        type="file"
                        className="ar11-item-fil-icon"
                        id="ar11-item-property-media-input"
                        accept="image/*"
                        name="ItemFiles[]"
                        multiple
                        onChange={(e) => {
                          console.log(e.target.files);
                          console.log(
                            document.getElementById(
                              "ar11-item-property-media-input"
                            ).files
                          );
                          var files = document.getElementById(
                            "ar11-item-property-media-input"
                          );
                          var media = [];
                          if (
                            files &&
                            files.files &&
                            Object.keys(files.files).length > 0
                          ) {
                            Object.keys(files.files).forEach((index) => {
                              console.log(
                                "Debug MessageMedia->",
                                files.files[index],
                                files.files
                              );
                              media.push(
                                URL.createObjectURL(files.files[index])
                              );
                            });
                          }
                          setItem({
                            ...Item,
                            media: media,
                          });
                        }}
                      />
                      <AttachFileIcon
                        sx={{
                          cursor: "pointer",
                          position: "relative",
                        }}
                        onClick={(e) => {
                          document.getElementById(
                            "ar11-item-property-media-input"
                          );
                        }}
                      ></AttachFileIcon>
                    </label>
                  </div>
                  <div className="ar11-media-show-input-wrap">
                    {Item.media.map((imag, key) => {
                      return (
                        <div className="ar11-item-location-media-show-each-wrap">
                          <img
                            src={imag}
                            alt="Media Image of Property"
                            className="ar11-item-location-media-show-each"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
                <legend className="ar11-item-legend">
                  Submittion Location
                </legend>
                <div className="ar11-item-submit-wrap">
                  <div className="ar11-item-submittion-location"></div>
                  <TextField
                    id="add-report-item-submittion-location"
                    label="Submittion Location"
                    variant="outlined"
                    required
                    placeholder="Location where you will be submitting the item"
                    sx={{
                      minWidth: "230px",
                    }}
                    value={Item.custodyAt || ""}
                    onChange={(e) => {
                      setItem({
                        ...Item,
                        custodyAt: e.target.value,
                      });
                    }}
                  />
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="ar11-item-submitBbutton-wrap">
          <div
            className="ar11-item-submitButton"
            onClick={(e) => [ValidateForm(e)]}
          >
            Edit
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserEditReport;
