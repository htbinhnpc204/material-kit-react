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

import moment from "moment";
import ScheduleModal from "./component/ScheduleModal";
import ScheduleList from "./component/List";

function Schedule() {
  const [schedules, setSchedules] = useState([]);
  const [labs, setLabs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const user = JSON.parse(helper.getStorage("user"));

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
        toast.success(`Cập nhật lịch học thành công!!!`);
        fetchSchedules();
      });
    } else {
      api.setJwtToken(helper.getCookie());
      const res = api.post({ path: `${schedulePath}`, payload: formData });
      res.then(() => {
        toast.success(`Tạo lịch học thành công!!!`);
        fetchSchedules();
      });
    }
    handleCloseModal();
  };

  const handleDelete = (scheduleDel) => {
    if (confirm(`Xác nhận xóa lịch học này`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${schedulePath}/${scheduleDel.id}` });
      res.then(() => {
        toast.success(`Xóa thành công!!!`);
        fetchSchedules();
      });
    }
  };

  const fetchSchedules = () => {
    api.setJwtToken(helper.getCookie());
    let path = `users/${user.id}/schedules?page=${page}`;
    if (user.role.name === "ROLE_QUAN_TRI" || user.role.name === "ROLE_DAO_TAO") {
      path = `${schedulePath}?page=${page}`;
    }
    const res = api.get({ path: path });
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
            <MKButton
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleAddLab()}
              color={"info"}
              disabled={user?.role?.name === "ROLE_SINH_VIEN"}
            >
              Thêm lịch sử dụng
            </MKButton>
          </Grid>
        </Grid>
        <ScheduleList
          schedules={schedules}
          pagination={pagination}
          fetchSchedules={fetchSchedules}
        />
      </MKBox>
    </>
  );
}

export default Schedule;
