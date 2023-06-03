/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MKInput from "components/MKInput";
import React, { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import { Autocomplete, TextField } from "@mui/material";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import api from "utils/api";
import helper from "utils/helper";

import { schedules as schedulePath, classes as classPath, labs as labPath } from "utils/path";
import { toast } from "react-toastify";

function ScheduleModal({ schedule, labs, classes, isOpen, onClose, onSubmit }) {
  const [lab, setLab] = useState(null);
  const [_class, setClass] = useState(null);
  const [timeStart, setTimeStart] = useState(null);
  const [timeUse, setTimeUse] = useState(0);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);

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
    setTimeStart(dayjs(schedule?.time_start) || null);
    setTimeUse(schedule?.time_use || 0);
  };

  const handleSave = () => {
    if (isDisabled) {
      toast.error("Vui lòng điền đầy đủ thông tin");
    } else {
      let flag = true;
      if (!lab) {
        toast.error("Phòng máy không được bỏ trống");
        flag = false;
      }
      if (timeUse <= 0) {
        toast.error("Thời gian sử dụng phải lớn hơn 0");
        flag = false;
      }

      let start = dayjs(timeStart);
      let end = start.add(timeUse, "hour");
      schedules.forEach((el) => {
        if (!flag) {
          return;
        }
        if (start.isBefore(el.start) && end.isAfter(el.start)) {
          toast.error("Thời gian sử dụng không được trùng");
          flag = false;
        }
      });

      if (flag) {
        onSubmit({
          id: schedule?.id,
          lab: lab,
          _class: _class,
          timeStart: timeStart,
          timeUse: timeUse,
        });
      }
    }
  };

  const fetchSchedules = () => {
    setIsLoading(true);
    api.setJwtToken(helper.getCookie());
    let path;
    if (_class && lab) {
      path = `${schedulePath}/fetch?lab_id=${lab?.id ? lab.id : ""}&class_id=${
        _class?.id ? _class.id : ""
      }`;
    } else if (_class) {
      path = `${classPath}/${_class?.id}/schedules`;
    } else {
      path = `${labPath}/${lab?.id}/schedules`;
    }
    const res = api.get({
      path: path,
    });
    res
      .then((response) => {
        let tmp = [];
        response.data?.data?.items.forEach((element) => {
          let timeStart = dayjs(element.time_start);
          let timeEnd = dayjs(timeStart).add(element.time_use, "hour");
          tmp.push({ start: timeStart, end: timeEnd });
        });
        setSchedules(tmp);
      })
      .catch((error) => console.log(error))
      .finally(setIsLoading(false));
  };

  const isDisable = (date) => {
    return schedules.some((data) => date.isAfter(data.start) && date.isBefore(data.end));
  };

  useEffect(() => {
    refreshState();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      console.log(isLoading || lab === null, lab, isLoading);
      fetchSchedules();
      setIsDisabled(isLoading || lab === null);
    }
  }, [_class, lab, isLoading]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{schedule ? "Chỉnh sửa lịch" : "Đặt lịch sử dụng"}</DialogTitle>
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
                  label="Phòng máy tính"
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
                  label="Lớp học phàn"
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
              disabled={isDisabled}
              renderInput={(props) => <TextField {...props} />}
              minDateTime={dayjs(new Date())}
              shouldDisableTime={(date) => isDisable(date)}
              disablePast
              value={timeStart}
              onChange={handleTimeStartChange}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput
              label="Thời gian sử dụng"
              type="number"
              fullWidth
              value={timeUse}
              onChange={handleTimeUseChange}
            />
          </MKBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={handleSave} color="primary">
            Lưu
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
