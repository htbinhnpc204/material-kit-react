/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MKInput from "components/MKInput";
import { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import { Autocomplete, TextField } from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";

function ScheduleModal({ schedule, labs, classes, isOpen, onClose, onSubmit }) {
  const [lab, setLab] = useState(null);
  const [_class, setClass] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [timeUse, setTimeUse] = useState(0);

  const handleTimeUseChange = (event) => {
    setTimeUse(event.target.value);
  };

  const handleTimeStartChange = (value) => {
    setTimeStart(value);
  };

  const handleLabChange = (e, value) => {
    setLab(value);
  };

  const handleClassChange = (e, value) => {
    setClass(value);
  };

  const refreshState = () => {
    setLab(schedule?.lab || null);
    setClass(schedule?.class || null);
    setTimeStart(schedule?.time_start || null);
    setTimeUse(schedule?.time_use || 0);
    // if (schedule) {
    //   genderList.map((obj, idx) => {
    //     if (obj.key === schedule.gender) {
    //       setGender(obj);
    //     }
    //   });
    // } else {
    //   setGender(genderList[0]);
    // }
  };

  const handleSave = () => {
    onSubmit({
      id: schedule?.id,
      lab: lab,
      _class: _class,
      timeStart: timeStart,
      timeUse: timeUse,
    });
  };

  const capitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  useEffect(() => {
    refreshState();
  }, [isOpen]);

  const genderList = [
    { value: "Nam", key: "NAM" },
    { value: "Nữ", key: "NU" },
    { value: "Other", key: "OTHER" },
  ];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{schedule ? "Edit schedule" : "Add schedule"}</DialogTitle>
        <DialogContent>
          <MKBox mt={1} mb={2}>
            <Autocomplete
              freeSolo
              id="lab"
              value={lab}
              options={labs}
              getOptionLabel={(option) => option?.name}
              onChange={handleLabChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Labs"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </MKBox>
          <MKBox mb={2}>
            <Autocomplete
              freeSolo
              id="class"
              value={_class}
              options={classes}
              getOptionLabel={(option) => option?.name}
              onChange={handleClassChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Classes"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </MKBox>
          <MKBox mb={2}>
            <StaticDateTimePicker
              label="Time start"
              value={timeStart}
              onChange={handleTimeStartChange}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              label="Time use"
              type="number"
              fullWidth
              value={timeUse}
              onChange={handleTimeUseChange}
            />
          </MKBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

ScheduleModal.propTypes = {
  schedule: PropTypes.object.isRequired,
  labs: PropTypes.array.isRequired,
  classes: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ScheduleModal;
