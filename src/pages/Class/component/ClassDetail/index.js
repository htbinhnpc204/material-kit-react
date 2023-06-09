import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import { Add } from "@mui/icons-material";
import { Autocomplete, CardContent, CardHeader, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "utils/api";
import helper from "utils/helper";
import { classes as classPath, classUsers, users as userPath } from "utils/path";

import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function ClassDetail() {
  const { id } = useParams();
  const [_class, setClass] = useState({});
  const [classUser, setClassUser] = useState([]);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  const handleView = (id) => {
    console.log(id);
  };

  const fetchUsers = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${classUsers(id)}?page=${page}` });
    res.then((response) => {
      setClassUser(response.data?.data?.items);
      setPagination(response.data?.data?.pagination);
    });
  };

  const fetchUsersList = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${userPath}?per_page=99999` });
    res.then((response) => {
      setUsers(response.data?.data?.items);
    });
  };

  const handleAddUserToClass = () => {
    if (!user || !role) {
      toast.error("Hãy chọn người dùng và chức danh trước khi thêm!!");
      return;
    }
    const formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("role", role.key);
    api.setJwtToken(helper.getCookie());
    const res = api.post({ path: `${classUsers(_class.id)}`, payload: formData });
    res.then(() => {
      setUser(null);
      setRole(null);
      toast.success(`Thêm ${user.name} vào lớp thành công!!!`);
      fetchUsers();
    });
  };

  const fetchClassDetails = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${classPath}/${id}` });
    res
      .then((response) => {
        setClass(response.data?.data);
      })
      .catch(() => {
        toast.error("Fetch class details failed");
      });
  };

  const handleDelete = (userDel) => {
    console.log(userDel);
    if (confirm(`Bạn có muốn xóa sinh viên ${userDel.name} ra khỏi lớp`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${classUsers(_class.id)}/${userDel.id}` });
      res.then(() => {
        toast.success(`Đã xóa ${userDel.name} khỏi lớp!!!`);
        fetchUsers();
      });
    }
  };

  useEffect(() => {
    if (helper.getCookie()) {
      fetchClassDetails();
      fetchUsersList();
    }
  }, []);

  useEffect(() => {
    if (helper.getCookie()) {
      fetchUsers();
    }
  }, [page]);

  const roles = [
    { key: "GIANG_VIEN", value: "Giảng viên" },
    { key: "LOP_TRUONG", value: "Lớp trưởng" },
    { key: "BI_THU", value: "Bí thư" },
    { key: "THANH_VIEN", value: "Thành viên" },
  ];

  return (
    <>
      <MKBox key={"labs"}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="h3">Lớp: {_class?.name}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={8}
            lg={8}
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, alignItems: "center" }}
          >
            <Grid item xs={6} md={9} lg={9}>
              <Autocomplete
                freeSolo
                id="role"
                value={user}
                options={users}
                defaultValue={users[0]}
                getOptionLabel={(option) => option.name}
                onChange={(evn, selected) => setUser(selected)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Sinh viên"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6} md={6} lg={3}>
              <Autocomplete
                freeSolo
                id="role"
                value={role}
                options={roles}
                defaultValue={roles[0]}
                getOptionLabel={(option) => option.value}
                onChange={(evn, selected) => setRole(selected)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Chức danh"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Grid>
            <MKButton
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleAddUserToClass()}
            >
              Thêm
            </MKButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {classUser.map((clsUser) => (
            <Grid item xs={12} sm={6} md={4} key={clsUser.user.name}>
              <Card sx={{ height: "250px" }}>
                <CardHeader title={clsUser.user.name} />
                <CardContent>
                  <Typography variant="body2">
                    Chức danh: {roles.find((obj) => obj.key === clsUser.role)?.value}
                  </Typography>
                </CardContent>
                <MKBox
                  style={{
                    marginTop: "auto",
                    marginLeft: "auto",
                    marginBottom: 5,
                    marginRight: 5,
                  }}
                >
                  <MKButton
                    startIcon={<VisibilityOutlinedIcon />}
                    color="info"
                    variant="text"
                    size="small"
                    onClick={() => handleView(clsUser.id)}
                  >
                    View
                  </MKButton>
                  <MKButton
                    startIcon={<ModeEditOutlinedIcon />}
                    color="success"
                    variant="text"
                    size="small"
                  >
                    Edit
                  </MKButton>
                  <MKButton
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={() => handleDelete(clsUser.user)}
                  >
                    Delete
                  </MKButton>
                </MKBox>
              </Card>
            </Grid>
          ))}
        </Grid>
        <MKBox display="flex" justifyContent="center" mt={3}>
          <Pagination
            count={Math.ceil(pagination.total / pagination.per_page)}
            page={page}
            onChange={(_, p) => setPage(p)}
          />
        </MKBox>
      </MKBox>
    </>
  );
}

export default ClassDetail;
