/* eslint-disable no-unused-vars */
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

import { Add } from "@mui/icons-material";
import { Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { roles as rolePath, users as userPath } from "utils/path";

import moment from "moment";
import api from "utils/api";
import helper from "utils/helper";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "react-toastify/dist/ReactToastify.css";
import { info } from "utils/path";
import UserModalView from "./component/ModalView";
import UserModal from "./component/UserModal";

function User() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isShowModalView, setShowModalView] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [roles, setRoles] = useState([]);

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
    setShowModalView(false);
  };

  const handleAddLab = () => {
    setSelectedUser(null);
    handleOpenModal();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    handleOpenModal();
  };

  const handleSaveUser = (newUser) => {
    console.log(newUser);
    const formData = new FormData();
    formData.append("email", newUser.email);
    formData.append("studentId", newUser.studentId);
    formData.append("name", newUser.name);
    formData.append("phone", newUser.phone);
    formData.append("address", newUser.address);
    formData.append("role", newUser.role);
    formData.append("gender", newUser.gender);
    newUser.dob && formData.append("dob", moment(newUser?.dob?.$d).toISOString());
    newUser.avatar && formData.append("avatar", newUser.avatar);

    if (newUser.id) {
      formData.append("_method", "PUT");
      api.setJwtToken(helper.getCookie());
      const res = api.put({
        path: `${userPath}/${newUser.id}`,
        payload: formData,
        isMultipart: true,
      });
      res.then(() => {
        const storageUser = JSON.parse(helper.getStorage("user"));
        if (newUser.id == storageUser.id) {
          api.get({ path: info }).then((response) => {
            helper.setStorage(response.data?.data);
          });
        }
        toast.success(`Updated ${newUser.name}!!!`);
        fetchUsers();
      });
    } else {
      api.setJwtToken(helper.getCookie());
      const res = api.post({ path: `${userPath}`, payload: formData, isMultipart: true });
      res.then(() => {
        toast.success(`Tạo mới thành công, ${newUser.name}!!!`);
        fetchUsers();
      });
    }
    handleCloseModal();
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setShowModalView(true);
  };

  const handleDelete = (userDelete) => {
    if (confirm(`xác nhận xóa người dùng ${userDelete.name || userDelete.email}`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${userPath}/${userDelete.id}` });
      res.then(() => {
        toast.success(`Xóa thành công ${userDelete.name}!!!`);
        fetchUsers();
      });
    }
  };

  const fetchUsers = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${userPath}?page=${page}&keyword=${keyword}` });
    res.then((response) => {
      setUsers(response.data?.data?.items);
      setPagination(response.data?.data?.pagination);
    });
  };

  const fetchRoles = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${rolePath}` });
    res.then((response) => {
      setRoles(response.data?.data?.items);
    });
  };

  useEffect(() => {
    if (helper.getCookie()) {
      fetchUsers();
      fetchRoles();
    }
  }, [page, keyword]);

  const genderList = [
    { value: "Nam", key: "NAM" },
    { value: "Nữ", key: "NU" },
    { value: "Other", key: "OTHER" },
  ];

  return (
    <>
      <UserModalView user={selectedUser} isOpen={isShowModalView} onClose={handleCloseModal} />
      <UserModal
        user={selectedUser}
        roles={roles}
        isOpen={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSaveUser}
      />
      <MKBox key={"users"}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={8} lg={8}>
            <MKInput
              variant="outlined"
              size="small"
              label="Tìm kiếm người dùng"
              fullWidth
              name="search"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={4} lg={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MKButton variant="contained" startIcon={<Add />} onClick={() => handleAddLab()}>
              Thêm mới
            </MKButton>
          </Grid>
        </Grid>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow component="th">
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Họ tên</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Giới tính
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right" colSpan={3}>
                Hành động
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            {users.map((user, idx) => {
              return (
                <TableRow key={user.id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">
                    {genderList.find((g) => g.key === user.gender)?.value}
                  </TableCell>
                  <TableCell style={{ width: 10, padding: 0 }} align="center">
                    <MKButton
                      color="info"
                      variant="text"
                      size="small"
                      onClick={() => handleView(user)}
                    >
                      <VisibilityIcon />
                    </MKButton>
                  </TableCell>
                  <TableCell style={{ width: 10, padding: 0 }} align="center">
                    <MKButton
                      color="success"
                      variant="text"
                      size="small"
                      onClick={() => handleEdit(user)}
                    >
                      <EditIcon />
                    </MKButton>
                  </TableCell>
                  <TableCell style={{ width: 10, padding: 0 }} align="center">
                    <MKButton
                      color="error"
                      variant="text"
                      size="small"
                      onClick={() => handleDelete(user)}
                    >
                      <DeleteIcon />
                    </MKButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {users.length === 0 && <Typography variant="h5">Không có người dùng nào</Typography>}
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

export default User;
