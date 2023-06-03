/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import { Add } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import { useEffect, useState } from "react";
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
  const [openModal, setOpenModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});

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
    console.log(newSchedule);
    const formData = new FormData();
    formData.append("lab_id", newSchedule.lab?.id);
    formData.append("class_id", newSchedule._class ? newSchedule._class.id : null);
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
    const res = api.get({ path: `${schedulePath}?page=${page}` });
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
  }, [page]);

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
          <Grid item xs={12} md={12} lg={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MKButton variant="contained" startIcon={<Add />} onClick={() => handleAddLab()}>
              Thêm lịch sử dụng
            </MKButton>
          </Grid>
        </Grid>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow component="th">
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Phòng máy</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Lớp học</TableCell>
              <TableCell align="center" style={{ fontWeight: "bold" }}>
                Người đặt
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Ngày</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Thời gian sử dụng
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right" colSpan={3}>
                Hành động
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
                      : "Trống"}
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
