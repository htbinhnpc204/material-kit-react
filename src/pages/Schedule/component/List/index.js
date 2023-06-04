import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Table, TableRow, TableCell, TableBody, Pagination, Typography } from "@mui/material";
import MKButton from "components/MKButton";
import api from "utils/api";
import helper from "utils/helper";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { classes as classPath, labs as labPath, schedules as schedulePath } from "utils/path";
import { toast } from "react-toastify";
import ScheduleModal from "../ScheduleModal";
import moment from "moment/moment";
import { CheckCircleTwoTone } from "@mui/icons-material";
import MKBox from "components/MKBox";
import { Link } from "react-router-dom";

const ScheduleList = ({ schedules, pagination, fetchSchedules, page, setPage }) => {
  const [labs, setLabs] = useState([]);
  const [classes, setClasses] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const user = JSON.parse(helper.getStorage("user"));

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    handleOpenModal();
  };

  const handleApprove = (schedule) => {
    console.log(schedule);
    if (helper.getCookie()) {
      api.setJwtToken(helper.getCookie());
      const res = api.get({ path: `${schedulePath}/${schedule.id}/approve` });
      res
        .then(() => {
          toast.success("Đã chấp thuân thời khóa biểu");
        })
        .catch(() => {
          toast.error("Gặp lỗi khi chấp thuận thời khóa biểu");
        });
    }
  };

  const handleSaveSchedule = (newSchedule) => {
    console.log(newSchedule);
    const formData = new FormData();
    formData.append("lab_id", newSchedule.lab?.id);
    formData.append("class_id", newSchedule._class ? newSchedule._class.id : null);
    formData.append("time_start", moment(newSchedule?.timeStart?.$d).toISOString());
    formData.append("time_use", newSchedule.timeUse);

    let res;

    api.setJwtToken(helper.getCookie());
    if (newSchedule.id) {
      formData.append("_method", "PUT");
      res = api.put({
        path: `${schedulePath}/${newSchedule.id}`,
        payload: formData,
      });
    } else {
      res = api.post({ path: `${schedulePath}`, payload: formData });
    }

    res
      .then(() => {
        toast.success(`Thành công!!!`);
        fetchSchedules();
      })
      .catch(() => {
        toast.error(`Thất bại!!`);
      });
    handleCloseModal();
  };

  const handleDelete = (scheduleDel) => {
    if (confirm(`Do you want to delete schedule ${scheduleDel.name || scheduleDel.email}`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${schedulePath}/${scheduleDel.id}` });
      res
        .then(() => {
          toast.success(`Deleted ${scheduleDel.name}!!!`);
          fetchSchedules();
        })
        .catch(() => {
          toast.error("Thất bại!!");
        });
    }
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

      <Table aria-label="simple table" style={{ marginBottom: "16px" }}>
        <TableBody>
          <TableRow component="th">
            <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Phòng máy</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Lớp học</TableCell>
            <TableCell align="center" style={{ fontWeight: "bold" }}>
              Người đặt
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align={"center"}>
              Ngày
            </TableCell>
            <TableCell style={{ fontWeight: "bold" }} align="center">
              Thời gian
            </TableCell>
            {user?.role?.name.toLowerCase() !== "role_sinh_vien" && (
              <>
                <TableCell style={{ fontWeight: "bold" }}>Tình trạng</TableCell>
                <TableCell style={{ fontWeight: "bold" }} align="right" colSpan={3}>
                  Hành động
                </TableCell>
              </>
            )}
          </TableRow>
        </TableBody>
        <TableBody>
          {schedules.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>
                <Typography variant="body1">Không có lịch học nào</Typography>
              </TableCell>
            </TableRow>
          )}
          {schedules.map((schedule, idx) => {
            return (
              <TableRow key={schedule.id}>
                <TableCell>{idx + 1}</TableCell>
                <TableCell>
                  <Link to={`/labs/${schedule.lab.id}`} replace>
                    {schedule.lab?.name}
                  </Link>
                </TableCell>
                <TableCell>{schedule.class_res?.name}</TableCell>
                <TableCell align="center">{schedule.register?.name}</TableCell>
                <TableCell>
                  {schedule.time_start
                    ? `${new Date(schedule.time_start).toLocaleDateString("vi-VN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} -- ${new Date(schedule.time_start).toLocaleTimeString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}`
                    : "Trống"}
                </TableCell>
                <TableCell align="center">{schedule.time_use}</TableCell>
                {user?.role?.name.toLowerCase() !== "role_sinh_vien" &&
                  schedule.register.id === user.id && (
                    <>
                      <TableCell>{schedule.approved ? "Đã duyệt" : "Chưa duyệt"}</TableCell>
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
                    </>
                  )}
                {user?.role?.name.toLowerCase() === "role_quan_tri" && (
                  <TableCell style={{ width: 10, padding: 0 }} align="center">
                    <MKButton
                      disabled={schedule.approved}
                      color="success"
                      variant="text"
                      size="small"
                      onClick={() => handleApprove(schedule)}
                    >
                      <CheckCircleTwoTone />
                    </MKButton>
                  </TableCell>
                )}
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
    </>
  );
};

ScheduleList.propTypes = {
  schedules: PropTypes.object.isRequired,
  fetchSchedules: PropTypes.func.isRequired,
  pagination: PropTypes.object.isRequired,
  page: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default ScheduleList;
