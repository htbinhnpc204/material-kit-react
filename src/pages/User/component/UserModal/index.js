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
import { shadows } from "@mui/system";

// prop-types is a library for typechecking of props
import {
  Autocomplete,
  Box,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";
import { Clear, CloudUpload } from "@mui/icons-material";
import MKAvatar from "components/MKAvatar";

function UserModal({ user, roles, isOpen, onClose, onSubmit }) {
  // eslint-disable-next-line no-undef
  const dayjs = require("dayjs");

  let maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 18);
  maxDate = dayjs(maxDate);

  const [email, setEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState(null);
  const [role, setRole] = useState(null);
  const [gender, setGender] = useState({});

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

  const refreshState = () => {
    setEmail(user?.email || "");
    setName(user?.name || "");
    setStudentId(user?.student_id || "");
    setAddress(user?.address || "");
    setPhone(user?.phone || "");
    setRole(user?.role || null);
    setDob(user?.dob ? dayjs(user?.dob) : null);
    if (user) {
      genderList.map((obj, idx) => {
        if (obj.key === user.gender) {
          setGender(obj);
        }
      });
    } else {
      setGender(genderList[0]);
    }
  };

  const handleSave = () => {
    onSubmit({
      id: user?.id,
      studentId: studentId,
      email: email,
      gender: gender.key,
      name: name,
      phone: phone,
      role: role?.name,
      address: address,
      avatar: avatar,
      dob: dob,
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
      <Dialog fullWidth open={isOpen} onClose={onClose} maxWidth="md">
        <DialogTitle>{user ? "Chỉnh sửa thông tin người dùng" : "Thêm mới"}</DialogTitle>
        <DialogContent>
          <MKBox mt={1} mb={2}>
            <MKInput
              label="Mã sinh viên"
              fullWidth
              value={studentId}
              onChange={handleStudentIdChange}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput label="Email" fullWidth value={email} onChange={handleEmailChange} />
          </MKBox>
          <MKBox mb={2}>
            <MKInput label="Họ tên" fullWidth value={name} onChange={handleNameChange} />
          </MKBox>
          <MKBox mb={2}>
            <MKInput label="Số điện thoại" fullWidth value={phone} onChange={handlePhoneChange} />
          </MKBox>
          <MKBox mb={2}>
            <MKInput label="Địa chỉ" fullWidth value={address} onChange={handleAddressChange} />
          </MKBox>
          <MKBox mb={2}>
            <Autocomplete
              freeSolo
              id="gender"
              value={gender}
              options={genderList}
              getOptionLabel={(option) => option?.value}
              onChange={handleGenderChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Giới tính"
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
              id="role"
              value={role}
              options={roles}
              getOptionLabel={(option) => capitalize(option?.name.replaceAll("_", " "))}
              onChange={handleRoleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Phân quyền"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </MKBox>
          <MKBox mb={2}>
            <DatePicker
              disableFuture
              maxDate={maxDate}
              label="Ngày sinh"
              value={dob ? dob : maxDate}
              onChange={handleDobChange}
              format="LL"
            />
          </MKBox>
          <Typography variant="span">Ảnh đại diện</Typography>
          <MKBox mb={2} style={{ display: "flex" }}>
            <Input
              type="file"
              id="avatar"
              onChange={handleAvatarChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton component="label" htmlFor="avatar" edge="end" size="small">
                    <CloudUpload />
                  </IconButton>
                </InputAdornment>
              }
            />
            {avatar && (
              <>
                <MKAvatar style={{ marginLeft: 32 }} src={URL.createObjectURL(avatar)} />
                <Box>
                  <IconButton onClick={() => setAvatar(null)}>
                    <Clear />
                  </IconButton>
                </Box>
              </>
            )}
          </MKBox>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Hủy</Button>
          <Button onClick={handleSave} color="primary">
            {user ? "Lưu" : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}

UserModal.propTypes = {
  user: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserModal;
