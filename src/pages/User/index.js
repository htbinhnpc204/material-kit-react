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
import { users as userPath } from "utils/path";

import api from "utils/api";
import helper from "utils/helper";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "react-toastify/dist/ReactToastify.css";

function User() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedLab, setSelectedLab] = useState({});

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
    setSelectedLab(null);
    handleOpenModal();
  };

  const handleEdit = (lab) => {
    setSelectedLab(lab);
    handleOpenModal();
  };

  const handleSaveLab = (newLab) => {
    const formData = new FormData();
    formData.append("name", newLab.name);
    formData.append("description", newLab.description);
    formData.append("manager", newLab.manager.id);
    newLab.avatar && formData.append("avatar", newLab.avatar);

    if (newLab.id) {
      formData.append("_method", "PUT");
      api.setJwtToken(helper.getCookie());
      const res = api.put({
        path: `${userPath}/${newLab.id}`,
        payload: formData,
        isMultipart: true,
      });
      res.then(() => {
        toast.success(`Updated ${newLab.name}!!!`);
        fetchUsers();
      });
    } else {
      api.setJwtToken(helper.getCookie());
      const res = api.post({ path: `${userPath}`, payload: formData, isMultipart: true });
      res.then(() => {
        toast.success(`Created ${newLab.name}!!!`);
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

  const handleView = (id) => {
    console.log(id);
  };

  const handleDelete = (labDelete) => {
    console.log(labDelete);
    if (confirm(`Do you want to delete lab ${labDelete.name}`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${userPath}/${labDelete.id}` });
      res.then(() => {
        toast.success(`Deleted ${labDelete.name}!!!`);
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

  useEffect(() => {
    if (helper.getCookie()) {
      fetchUsers();
    }
  }, [page, keyword]);

  return (
    <>
      <MKBox key={"users"}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={12} lg={8}>
            <MKInput
              variant="outlined"
              size="small"
              label="Search users"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MKButton variant="contained" startIcon={<Add />} onClick={() => handleAddLab()}>
              Add user
            </MKButton>
          </Grid>
        </Grid>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow component="th">
              <TableCell style={{ fontWeight: "bold" }}>#</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="center">
                Gender
              </TableCell>
              <TableCell style={{ fontWeight: "bold" }} align="right" colSpan={3}>
                Action
              </TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            {users.map((user) => {
              let i = 1;
              return (
                <TableRow key={user.id}>
                  <TableCell>{i++}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="center">{user.gender}</TableCell>
                  <TableCell style={{ width: 10 }} align="center">
                    <VisibilityIcon />
                  </TableCell>
                  <TableCell style={{ width: 10 }} align="center">
                    <EditIcon />
                  </TableCell>
                  <TableCell style={{ width: 10 }} align="center">
                    <DeleteIcon />
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

export default User;
