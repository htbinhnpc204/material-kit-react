/* eslint-disable no-unused-vars */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import { Divider, Grid } from "@mui/material";
import MKAvatar from "components/MKAvatar";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import PropTypes from "prop-types";
import helper from "utils/helper";

function UserModalView({ user, roles, isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(null);
  const [role, setRole] = useState(null);
  const [gender, setGender] = useState({});

  // eslint-disable-next-line no-undef
  const dayjs = require("dayjs");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleStudentIdChange = (event) => {
    setStudentId(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleDobChange = (value) => {
    console.log(value);
    setDob(value);
  };

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]);
  };

  const handleGenderChange = (e, value) => {
    setGender(value);
  };

  const handleRoleChange = (e, value) => {
    setRole(value);
  };

  const refreshState = () => {};

  const capitalize = (value) => {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };

  const getGenderMap = (gender) =>
    genderList.map((obj, idx) => {
      if (obj.key === gender) {
        return obj.value;
      }
    });

  const getRoleMap = (role) =>
    roleList.map((obj) => {
      if (obj.key === role) {
        return obj.value;
      }
    });

  useEffect(() => {
    refreshState();
  }, [isOpen]);

  const genderList = [
    { value: "Nam", key: "NAM" },
    { value: "Nữ", key: "NU" },
    { value: "Other", key: "OTHER" },
  ];

  const roleList = [
    { value: "Sinh viên", key: "ROLE_SINH_VIEN" },
    { value: "Giáo viên", key: "ROLE_GIAO_VIEN" },
    { value: "Quản trị viên", key: "ROLE_QUAN_TRI" },
    { value: "Đào tạo", key: "ROLE_DAO_TAO" },
  ];

  return (
    <Dialog fullWidth open={isOpen} onClose={onClose} maxWidth="sm">
      <DialogTitle>Đang xem: {user?.name}</DialogTitle>
      <DialogContent>
        <Grid container justifyContent="center" mb={2}>
          <MKBox textAlign="center">
            <MKAvatar
              src={`${helper.getImageSource(user?.avatar)}`}
              alt={`${helper.getImageSource(user?.name || user?.email)}`}
              size="xxl"
              shadow="xl"
            />
          </MKBox>
        </Grid>
        <MKBox textAlign="center">
          <MKTypography variant="h3">{user?.name}</MKTypography>
        </MKBox>
        <Divider />
        <MKBox style={{ marginLeft: 24 }}>
          <MKBox>
            <MKTypography variant="body">Mã sinh viên: {user?.student_id || "trống"}</MKTypography>
          </MKBox>
          <MKBox>
            <MKTypography variant="body">Email: {user?.email || "trống"}</MKTypography>
          </MKBox>
          <MKBox>
            <MKTypography variant="body">Số điện thoại: {user?.phone || "trống"}</MKTypography>
          </MKBox>
          <MKBox>
            <MKTypography variant="body">Địa chỉ: {user?.address || "trống"}</MKTypography>
          </MKBox>
          <MKBox>
            <MKTypography variant="body">
              Chức vụ: {getRoleMap(user?.role?.name) || "trống"}
            </MKTypography>
          </MKBox>
          <MKBox>
            <MKTypography variant="body">
              Giới tính: {getGenderMap(user?.gender) || "trống"}
            </MKTypography>
          </MKBox>
          <MKBox>
            <MKTypography variant="body">
              Ngày sinh: {user?.dob ? new Date(user.dob).toLocaleDateString("en-GB") : "trống"}
            </MKTypography>
          </MKBox>
        </MKBox>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

UserModalView.propTypes = {
  user: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserModalView;
