import React, { useState } from "react";
import "./AddReport.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";

const AddReport = () => {
  const user = useSelector((state) => state.user);
  const [reporterType, setReporterType] = useState("");
  const [Item, setItem] = useState({
    reporterId: null,
    reporterName:
      user.Name.FirstName + user.Name.MiddleName + user.Name.LastName,
    itemDetails: {
      common_type: null,
      color: null,
      customItemName: null,
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
      belongsTo: null,
      claims: [],
      found: {
        status: null,
        userId: null,
      },
      submittedAt: null,
      media: [],
    },
  });

  return (
    <div className="ar11-addReport-wrap Add-Report-After">
      <div className="ar11-inner-wrap">
        <div className="ar11-h-wrap">
          <div className="ar11-h-title-wrap">
            <span className="ar11-h-title-text">Add Report</span>
          </div>
        </div>
        <div className="ar11-content-wrap">
          <div className="ar11-content-inner-wrap">
            <div className="ar11-item-wrap">
                <fieldset className="ar11-item-label-wrap">
                    <legend className="ar11-item-legend">Type</legend>
              <div className="ar11-item-type-wrap ar11-common-textField-wrap">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={Item.common_type}
                    label="Type"
                    onChange={(e) => {
                      setItem({
                        ...Item,
                        itemDetails: {
                          ...Item.itemDetails,
                          common_type: e.target.value,
                        },
                      });
                    }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
              <div className="ar11-item-name-wrap">
                <div className="ar11-item-name-firstName-wrap">
                  <TextField
                    id="report-item-name-Name"
                    label="Name The Item"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
              </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
              <div className="ar11-item-color-wrap">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Color</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="report-item-color"
                    value={Item.itemDetails.color}
                    label="Color"
                    onChange={(e) => {
                      setItem({
                        ...Item,
                        itemDetails: {
                          ...Item.itemDetails,
                          color: e.target.value,
                        },
                      });
                    }}
                  >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap label-description-wrap">
              <div className="ar11-item-description-wrap">
                <div className="ar11-item-description">
                  <TextField
                    id="report-item-description"
                    label="Describe in Detail"
                    variant="outlined"
                    required="true"
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
              <fieldset className="ar11-item-label-wrap">
                <legend> Location </legend>
              <div className="ar11-item-location-wrap">
                <div className="ar11-item-location-box all-possible-places">
                <TextField
                    id="report-item-location-all-possible-places"
                    label="All possible Places"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <div className="ar11-item-location-box building-details">
                <TextField
                    id="report-item-location-bullding-details"
                    label="building Details"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <div className="ar11-item-location-box univeristy">
                <TextField
                    id="report-item-location-all-possible-places"
                    label="university"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <div className="ar11-item-location-box street">
                <TextField
                    id="report-item-location-street"
                    label="Street"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <div className="ar11-item-location-box apartment">
                <TextField
                    id="report-item-location-apartment"
                    label="Apartment"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <div className="ar11-item-location-box city">
                <TextField
                    id="report-item-location-city"
                    label="City"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <div className="ar11-item-location-box state">
                <TextField
                    id="report-item-location-State"
                    label="State"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <div className="ar11-item-location-box pincode">
                <TextField
                    id="report-item-location-pinCode"
                    label="All possible Places"
                    variant="outlined"
                    required="true"
                    sx={{
                      minWidth: "230px",
                    }}
                  />
                </div>
                <fieldset className="ar11-item-label-wrap">
                    <legend className="ar11-item-legend">
                        Media
                    </legend>
                <div className="ar11-item-location-box media">
                
                </div>
                </fieldset>
              </div>
              </fieldset>
              <fieldset className="ar11-item-label-wrap">
              <div className="ar11-item-submit-wrap">
                <div className="ar11-item-submittion-location"></div>
              </div>
              </fieldset>
            </div>
          </div>
        </div>
        <fieldset className="ar11-item-label-wrap">
        <div className="ar11-ownership-wrap">
          <div className="ar11-ownership-selct-wrap">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Is the Item Yours
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="report-reporterType"
                value={reporterType}
                label="Is It Yours"
                onChange={(e) => {
                  setReporterType(e.target.value);
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
          </span>
        </div>
        </fieldset>
        <div className="ar11-item-submitBbutton-wrap">
          <div className="ar11-item-submitButton">Report</div>
        </div>
      </div>
    </div>
  );
};

export default AddReport;
