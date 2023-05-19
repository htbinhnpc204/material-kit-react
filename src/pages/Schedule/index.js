/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

import { Add } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { classes as classPath, labs as labPath, schedules as schedulePath } from "utils/path";

import api from "utils/api";
import helper from "utils/helper";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import moment from "moment";
import ScheduleModal from "./component/ScheduleModal";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [labs, setLabs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});

  const handleSearch = useCallback(
    debounce((value) => {
      value = value.trim();
      setKeyword(value);
      setSearchValue(value);
    }, 1000),
    []
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleAddLab = () => {
    setSelectedSchedule(null);
    handleOpenModal();
  };

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    handleOpenModal();
  };

  const handleSaveSchedule = (newSchedule) => {
    const formData = new FormData();
    formData.append("lab_id", newSchedule.lab?.id);
    formData.append("class_id", newSchedule._class?.id);
    formData.append("time_start", moment(newSchedule?.timeStart?.$d).toISOString());
    formData.append("time_use", newSchedule.timeUse);

    if (newSchedule.id) {
      formData.append("_method", "PUT");
      api.setJwtToken(helper.getCookie());
      const res = api.put({
        path: `${schedulePath}/${newSchedule.id}`,
        payload: formData,
      });
      res.then(() => {
        toast.success(`Updated ${newSchedule.name}!!!`);
        fetchSchedules();
      });
    } else {
      api.setJwtToken(helper.getCookie());
      const res = api.post({ path: `${schedulePath}`, payload: formData });
      res.then(() => {
        toast.success(`Created ${newSchedule.name}!!!`);
        fetchSchedules();
      });
    }
    handleCloseModal();
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleView = (id) => {
    console.log(id);
  };

  const handleDelete = (scheduleDel) => {
    if (confirm(`Do you want to delete schedule ${scheduleDel.name || scheduleDel.email}`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${schedulePath}/${scheduleDel.id}` });
      res.then(() => {
        toast.success(`Deleted ${scheduleDel.name}!!!`);
        fetchSchedules();
      });
    }
  };

  const fetchSchedules = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${schedulePath}?page=${page}&keyword=${keyword}` });
    res.then((response) => {
      setSchedules(response.data?.data?.items);
      setPagination(response.data?.data?.pagination);
    });
  };

  const fetchLabs = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${labPath}` });
    res.then((response) => {
      setLabs(response.data?.data?.items);
    });
  };

  const fetchClasses = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${classPath}` });
    res.then((response) => {
      setClasses(response.data?.data?.items);
    });
  };

  useEffect(() => {
    if (helper.getCookie()) {
      fetchSchedules();
      fetchClasses();
      fetchLabs();
    }
  }, [page, keyword]);

  return (
    <>
      <ScheduleModal
        schedule={selectedSchedule}
        classes={classes}
        labs={labs}
        isOpen={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSaveSchedule}
      />
      <MKBox key={"schedules"}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={12} lg={8}>
            <MKInput
              variant="outlined"
              size="small"
              label="Search schedules"
              fullWidth
              name="search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MKButton variant="contained" startIcon={<Add />} onClick={() => handleAddLab()}>
              Add schedule
            </MKButton>
          </Grid>
        </Grid>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow component="th">
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Lab</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Class</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Scheduler
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Date</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Time use
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right" colSpan={3}>
                Action
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            {schedules.map((schedule, idx) => {
              return (
                <TableRow key={schedule.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{schedule.lab?.name}</TableCell>
                  <TableCell>{schedule.class_res?.name}</TableCell>
                  <TableCell align="center">{schedule.register?.name}</TableCell>
                  <TableCell>
                    {schedule.time_start
                      ? `${new Date(schedule.time_start).toDateString()} -- ${new Date(
                          schedule.time_start
                        ).toLocaleTimeString()}`
                      : "Null"}
                  </TableCell>
                  <TableCell align="center">{schedule.time_use}</TableCell>
                  <TableCell style={{ width: 10, padding: 0 }} align="center">
                    <MKButton color="info" variant="text" size="small">
                      <VisibilityIcon />
                    </MKButton>
                  </TableCell>
                  <TableCell style={{ width: 10, padding: 0 }} align="center">
                    <MKButton
                      color="success"
                      variant="text"
                      size="small"
                      onClick={() => handleEdit(schedule)}
                    >
                      <EditIcon />
                    </MKButton>
                  </TableCell>
                  <TableCell style={{ width: 10, padding: 0 }} align="center">
                    <MKButton
                      color="error"
                      variant="text"
                      size="small"
                      onClick={() => handleDelete(schedule)}
                    >
                      <DeleteIcon />
                    </MKButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <MKBox display="flex" justifyContent="center" mt={3}>
          {pagination && (
            <Pagination
              count={Math.ceil(pagination.total / pagination.per_page)}
              page={page}
              onChange={(_, p) => setPage(p)}
            />
          )}
        </MKBox>
      </MKBox>
    </>
  );
}

export default Schedule;
