import React, { useEffect, useState } from "react";
import "./EditReport.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import { Chip, InputAdornment, Stack } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CustomColors from "../../Data/Options";
import Close from '@mui/icons-material/Close';
import axios from 'axios';
import { ItemTypes } from "../../Data/Options"
import AttachFileIcon from '@mui/icons-material/AttachFile';

const EditReport = () => {
  const report = useSelector(state=> state.report);
  console.log(report);
  const user = useSelector((state) => state.user);
  const [reporterType, setReporterType] = useState("");
  const [Item, setItem] = useState({
    reporterId: null,
    reporterName:
      user.Name.FirstName + user.Name.MiddleName + user.Name.LastName,
    itemDetails: {
      common_type: null,
      colors: [],
      customItemName: null,
      description: null,
      location: {
        allPlacesPossible: [],
        buildingDetails: null,
        university: null,
        street: null,
        apartment: null,
        city: null,
        state: null,
        pinCode: null,
        media: [],
      },
    },
      belongsTo: null,
      claims: [],
      found: {
        status: null,
        userId: null,
      },
      submittedAt: null,
      media: [],
      reporterType: null,
  });

  useEffect(()=>{
    setItem(report);
  },[report])
  
  console.log(Item);


  async function ValidateForm(e){
    e.preventDefault();
    SubmitForm();
  }
  
  async function SubmitForm(){
    
  
    var files = document.getElementById("aer11-item-location-media-input").files;
    const formData = new FormData();
    formData.append('report', JSON.stringify(Item));
    console.log("files =>",files)

    for (const file of files) {
      console.log("Each Image =>",file,file.name);
      formData.append("image", file, file.name);
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

function closeForm(){
  var x = document.getElementById("aer11-EditReport-wrap");
   if(x.classList.contains("Add-EditReport-After"))
   {
    x.classList.remove("Add-EditReport-After");
    x.classList.add("Hide");
   }
  
}

  return (
    <div className="aer11-EditReport-wrap Hide"
        id="aer11-EditReport-wrap"
    >
      <div className="aer11-inner-wrap">
        <div className="aer11-close-wrap"
        id="aer11-close-wrap"
        onClick={(e)=>{
          e.preventDefault();
          closeForm();
        }}
        >
          X
        </div>
        <div className="aer11-h-wrap">
          <div className="aer11-h-title-wrap">
            <span className="aer11-h-title-text">Edit Report</span>
          </div>
        </div>
        <div className="aer11-content-wrap">
          <div className="aer11-content-inner-wrap">
            <div className="aer11-item-wrap">
            <fieldset className="aer11-item-label-wrap">
        <legend className="aer11-item-legend">
                  Ownership
                </legend>
        <div className="aer11-ownership-wrap">
          <div className="aer11-ownership-selct-wrap">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Is the Item Yours
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="report-reporterType"
                value={Item.reporterType}
                label="Is It Yours"
                onChange={(e) => {
                  
                 console.log(Item);
                    setItem({
                      ...Item,
                      reporterName : {...user.Name},
                      reporterId : Item.reporterId,
                      reporterType : e.target.value,
                    })
                  
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
          <span className="aer11-item-ownership-text">
            Select Yes only if u have permission from the actual owner to represent this property
          </span>
        </div>
        </fieldset>
                <fieldset className="aer11-item-label-wrap">
                    <legend className="aer11-item-legend">Type</legend>
              <div className="aer11-item-type-wrap aer11-common-textField-wrap">
              <Autocomplete
       
        id="tags-standard"
        options={ItemTypes}
        getOptionLabel={(option) => {
            console.log(option);
            return option.label }}
        value={Item.itemDetails.common_type}
        limitTags={3}
        onChange={(e,value)=>{
            console.log("ssssss =>",e.target.value)
          setItem({
            ...Item,
            itemDetails:{
              ...Item.itemDetails,
              common_type: value
              
            }
          })
        }}
        renderInput={ params => {
          const { InputProps, ...restParams } = params;
          const { startAdornment, ...restInputProps } = InputProps;
          return (
            <TextField
              label="Item Type"
              { ...restParams }
              InputProps={ {
                ...restInputProps,
                startAdornment: (
                  <div style={{
                    maxHeight: '70px',
                    overflowY: 'auto',
                    minWidth:'230px',
                  }}
                  sx={{
                    minWidth: '230px',
                  }}
                  
                  >
                    {startAdornment}
                  </div>
                ),
              } }
            />
          );
        } }
      />
              </div>
              </fieldset>
              <fieldset className="aer11-item-label-wrap">
                <legend className="aer11-item-legend"> 
                Item Name
                </legend>
              <div className="aer11-item-name-wrap">
                <div className="aer11-item-name-firstName-wrap">
                  <TextField
                    id="report-item-name-Name"
                    label="Item Name"
                    placeholder="Item Name"
                    variant="outlined"
                    value={Item.itemDetails.customItemName}
                    required
                    sx={{
                      minWidth: "230px",
                    }}
                    onChange={(e)=>{
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          customItemName:e.target.value,
                          
                        }
                    })
                    }}
                  />
                </div>
              </div>
              </fieldset>
              <fieldset className="aer11-item-label-wrap">
                <legend className="aer11-item-legend">
                  Item Color
                </legend>

              <div className="aer11-item-color-wrap">
              
      <Autocomplete
        multiple
        id="tags-standard"
        options={CustomColors}
        disableCloseOnSelect
        value={Item.itemDetails.colors}
        limitTags={3}
        onChange={(e,values)=>{
          setItem({
            ...Item,
            itemDetails:{
              ...Item.itemDetails,
              colors: values
              
            }
          })
        }}
        renderInput={ params => {
          const { InputProps, ...restParams } = params;
          const { startAdornment, ...restInputProps } = InputProps;
          return (
            <TextField
              label="Colors"
              { ...restParams }
              InputProps={ {
                ...restInputProps,
                startAdornment: (
                  <div style={{
                    maxHeight: '70px',
                    overflowY: 'auto',
                    minWidth:'230px',
                  }}
                  sx={{
                    minWidth: '230px',
                  }}
                  >
                    {startAdornment}
                  </div>
                ),
              } }
            />
          );
        } }
      />
                <div className="aer11-item-color-depictor-wrap">
                  {/* {
                  Item.colors.map((key,color)=>{
                    return(
                      <div className="aer11-item-color-depictor-singleColor"
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
              <fieldset className="aer11-item-label-wrap label-description-wrap">
              <legend className="aer11-item-legend">
                  Item Description
                </legend>
              <div className="aer11-item-description-wrap">
                <div className="aer11-item-description">
                  <TextField
                    id="report-item-description"
                    label="Describe in Detail"
                    value={Item.itemDetails.description}
                    variant="outlined"
                    required
                    onChange={(e)=>{
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          description :e.target.value,
                        }
                    })
                  }}
                    multiline
                    maxRows={10}
                    sx={{
                      width:'100%',
                      minWidth: "230px",
                      minHeight:'100px',
                    }}
                    minRows={3}
                  />
                </div>
              </div>
              </fieldset>
              <fieldset className="aer11-item-label-wrap">
              <legend className="aer11-item-legend">
                  Item Location
                </legend>
              <div className="aer11-item-location-wrap">
                <div className="aer11-item-location-box all-possible-places">
                <TextField
                    id="report-item-location-all-possible-places"
                    label="All possible Places"
                    variant="outlined"
                    value={Item.itemDetails.location.allPlacesPossible}
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <div className="aer11-item-location-box building-details">
                <TextField
                    id="report-item-location-bullding-details"
                    label="building Details"
                    variant="outlined"
                    sx={{
                      minWidth: "230px",
                    }}
                    onChange={(e)=>{
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                            buildingDetails: e.target.value
                          }
                          
                        }
                    })
                  }}
                  />
                </div>
                <div className="aer11-item-location-box univeristy">
                <TextField
                    id="report-item-location-all-possible-places"
                    label="university"
                    variant="outlined"
                    required
                    value={Item.itemDetails.location.university}
                    sx={{
                      minWidth: "230px",
                    }}
                    onChange={(e)=>{
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                            university: e.target.value
                          }
                          
                        }
                    })
                  }}
                  />
                </div>
                <div className="aer11-item-location-box street">
                <TextField
                    id="report-item-location-street"
                    label="Street"
                    variant="outlined"
                    value={Item.itemDetails.location.street}
                    required
                    sx={{
                      minWidth: "230px",
                    }}
                    onChange={(e)=>{
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                            street: e.target.value
                          }
                          
                        }
                    })
                  }}
                  />
                </div>
                <div className="aer11-item-location-box apartment">
                <TextField
                    id="report-item-location-apartment"
                    label="Apartment"
                    variant="outlined"
                    value={Item.itemDetails.location.apartment}
                    sx={{
                      minWidth: "230px",
                    }}
                    onChange={(e)=>{
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                            apartment: e.target.value
                          }
                        }
                    })
                  }}
                  />
                </div>
                <div className="aer11-item-location-box city">
                <TextField
                    id="report-item-location-city"
                    label="City"
                    variant="outlined"
                    required
                    value={Item.itemDetails.location.city}
                    sx={{
                      minWidth: "230px",
                    }}
                    onChange={(e)=>{
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                            city: e.target.value

                          }
                          
                        }
                    })
                  }}
                  />
                </div>
                <div className="aer11-item-location-box state">
                <TextField
                    id="report-item-location-State"
                    label="State"
                    variant="outlined"
                    required
                    value={Item.itemDetails.location.state}
                    sx={{
                      minWidth: "230px",
                    }}
                    onChange={(e)=>{
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                            state: e.target.value

                          }
                          
                        }
                    })
                  }}
                  />
                </div>
                <div className="aer11-item-location-box pincode">
                <TextField
                    id="report-item-location-pinCode"
                    label="Pin Code"
                    variant="outlined"
                    required
                    value={Item.itemDetails.location.pinCode}
                    sx={{
                      minWidth: "230px",
                    }}
                    onChange={(e)=>{
                      
                      setItem({
                        ...Item,
                        itemDetails :{
                          ...Item.itemDetails,
                          location:{
                            ...Item.itemDetails.location,
                            pinCode: e.target.value
                          }
                          
                        }
                    })
                  }}
                  />
                </div>
                <fieldset className="aer11-item-label-wrap">
                    <legend className="aer11-item-legend">
                        Media
                    </legend>
                <div className="aer11-item-location-media">
                    <div className="aer11-item-media-wrap">
                      <label className="aer11-item-media" htmlFor="aer11-item-location-media-input" >
                        
                          <input type="file" className="aer11-item-fil-icon"  
                          id="aer11-item-location-media-input"
                          accept="image/*"
                          name='files[]'
                          multiple
                          onChange={(e)=>{
                            console.log(e.target.files);
                            console.log(document.getElementById('aer11-item-location-media-input').files);
                            var files = document.getElementById("aer11-item-location-media-input");
                        var media=[];
                        if(files && files.files && Object.keys(files.files).length>0){
                          Object.keys(files.files).forEach(index=>{
                            console.log("Debug MessageMedia->",files.files[index],files.files)
                            media.push(URL.createObjectURL(files.files[index]));
                          })
                        }
                            setItem({
                              ...Item,
                              itemDetails:{
                                ...Item.itemDetails,
                                location:{
                                  ...Item.itemDetails.location,
                                  media: media
                                }
                              }
                            })
                          }}
                          />
                          <AttachFileIcon
                        sx={{
                          cursor: 'pointer',
                          position:'relative',
                        }}
                        onClick={(e)=>{
                          document.getElementById('aer11-item-location-media-input');
                        }}
                        ></AttachFileIcon>
                      </label>
                    </div>
                    <div className="aer11-media-show-input-wrap">
                      {
                        Item.itemDetails.location.media.map((imag,key)=>{

                          return(
                            <div className="aer11-item-location-media-show-each-wrap">
                            <img src={imag} alt="Media Image of location" 
                            className="aer11-item-location-media-show-each"
                            />
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
                </fieldset>
              </div>
              </fieldset>
              <fieldset className="aer11-item-label-wrap">
              <legend className="aer11-item-legend">
                  Submittion Location
                </legend>
              <div className="aer11-item-submit-wrap">
                <div className="aer11-item-submittion-location"></div>
              </div>
              </fieldset>
            </div>
          </div>
        </div>
        
        <div className="aer11-item-submitBbutton-wrap">
          <div className="aer11-item-submitButton"
          onClick={(e)=>[
            ValidateForm(e)
          ]}
          >Report</div>
        </div>
      </div>
    </div>
  );
};

export default EditReport;
