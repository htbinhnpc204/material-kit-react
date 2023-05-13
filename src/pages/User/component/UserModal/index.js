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
import { Autocomplete, Input, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import MKBox from "components/MKBox";
import PropTypes from "prop-types";

function UserModal({ user, roles, isOpen, onClose, onSubmit }) {
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

  const refreshState = () => {
    setEmail(user?.email || "");
    setName(user?.name || "");
    setStudentId(user?.studentId || "");
    setAddress(user?.address || "");
    setPhone(user?.phone || "");
    setRole(user?.role || null);
    setDob(dayjs(user?.dob));
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
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{user ? "Edit user" : "Add user"}</DialogTitle>
        <DialogContent>
          <MKBox mb={2}>
            <MKInput
              label="Student ID"
              fullWidth
              value={studentId}
              onChange={handleStudentIdChange}
            />
          </MKBox>
          <MKBox mb={2}>
            <MKInput label="Email" fullWidth value={email} onChange={handleEmailChange} />
          </MKBox>
          <MKBox mb={2}>
            <MKInput label="Name" fullWidth value={name} onChange={handleNameChange} />
          </MKBox>
          <MKBox mb={2}>
            <MKInput label="Phone" fullWidth value={phone} onChange={handlePhoneChange} />
          </MKBox>
          <MKBox mb={2}>
            <MKInput label="Address" fullWidth value={address} onChange={handleAddressChange} />
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
                  label="Gender"
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
                  label="Role"
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </MKBox>
          <MKBox mb={2}>
            <DatePicker label="Date of Birth" value={dob} onChange={handleDobChange} format="LL" />
          </MKBox>
          <MKBox mb={2}>
            <Input type="file" label="Avatar" id="avatar" onChange={handleAvatarChange} />
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

UserModal.propTypes = {
  user: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default UserModal;
