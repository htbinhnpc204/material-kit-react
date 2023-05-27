import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";

import { Add } from "@mui/icons-material";
import { CardContent, CardHeader, Typography } from "@mui/material";
import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { classes as classPath } from "utils/path";

import api from "utils/api";
import helper from "utils/helper";

import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import CommonActions from "components/CommonAction";

function Class() {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = useCallback(
    debounce((value) => {
      value = value.trim();
      setKeyword(value);
      setSearchValue(value);
    }, 1000),
    []
  );

  const handleAddClass = () => {
    if (newClassName.trim().length == 0) {
      toast.error("Tên lớp không được để trống");
      return;
    }
    api.setJwtToken(helper.getCookie());
    const res = api.post({ path: `${classPath}`, payload: { name: newClassName } });
    res.then(() => {
      toast.success(`Tạo thành công, ${newClassName}!!!`);
      fetchComputers();
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleSaveClass = (newClass) => {
    const formData = new FormData();
    formData.append("name", newClass.name);

    if (newClass.id) {
      formData.append("_method", "PUT");
      api.setJwtToken(helper.getCookie());
      const res = api.put({
        path: `${classPath}/${newClass.id}`,
        payload: formData,
      });
      res.then(() => {
        toast.success(`Đã cập nhât lớp ${newClass.name}!!!`);
        fetchComputers();
      });
    }
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchValue(value);
    handleSearch(value);
  };

  const handleNewClassNameChange = (event) => {
    setNewClassName(event.target.value);
  };

  const handleView = (id) => {
    navigate(`${id}`);
  };

  const handleDelete = (delClass) => {
    if (confirm(`Bán có muốn xóa lớp ${delClass.name}`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${classPath}/${delClass.id}` });
      res.then(() => {
        toast.success(`Đã xóa lớp ${delClass.name}!!!`);
        fetchComputers();
      });
    }
  };

  const fetchComputers = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${classPath}?page=${page}&keyword=${keyword}` });
    res.then((response) => {
      setClasses(response.data?.data?.items);
      setPagination(response.data?.data?.pagination);
    });
  };

  useEffect(() => {
    if (helper.getCookie()) {
      fetchComputers();
    }
  }, [page, keyword]);

  return (
    <>
      <MKBox key={"labs"}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={6} lg={4}>
            <MKInput
              variant="outlined"
              size="small"
              label="Tìm kiếm lớp học"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={8} mx={{ display: "flex", gap: 16 }}>
            <Grid
              item
              xs={9}
              md={7}
              lg={9}
              pl={2}
              style={{ borderLeft: "2px solid black", height: "95%" }}
            >
              <MKInput
                variant="outlined"
                size="small"
                label="Tên lớp"
                fullWidth
                value={newClassName}
                onChange={handleNewClassNameChange}
              />
            </Grid>
            <Grid item xs={3} md={5} lg={3}>
              <MKButton
                style={{ width: "100%" }}
                variant="contained"
                startIcon={<Add />}
                onClick={() => handleAddClass()}
              >
                Thêm mới
              </MKButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {classes.map((_class) => (
            <Grid item xs={12} sm={6} md={4} key={_class.name}>
              <Card sx={{ height: "250px" }}>
                <CardHeader title={_class.name} />
                <CardContent>
                  <Typography variant="body1">{_class.description}</Typography>
                </CardContent>
                <CommonActions
                  // handleEdit={handleEdit}
                  handleView={handleView}
                  handleDelete={handleDelete}
                  entity={_class}
                ></CommonActions>
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

export default Class;
