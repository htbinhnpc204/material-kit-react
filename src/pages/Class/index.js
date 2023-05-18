import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

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

import "react-toastify/dist/ReactToastify.css";

function Class() {
  const [classes, setClasses] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");

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
      toast.error("Class name must not be null");
      return;
    }
    api.setJwtToken(helper.getCookie());
    const res = api.post({ path: `${classPath}`, payload: { name: newClassName } });
    res.then(() => {
      toast.success(`Created ${newClassName}!!!`);
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
        toast.success(`Updated ${newClass.name}!!!`);
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
    console.log(id);
  };

  const handleDelete = (delCom) => {
    if (confirm(`Do you want to delete ${delCom.name}`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${classPath}/${delCom.id}` });
      res.then(() => {
        toast.success(`Deleted ${delCom.name}!!!`);
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
              label="Search class"
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
                label="New class name"
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
                Add class
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
                    onClick={() => handleView(_class.id)}
                  >
                    View
                  </MKButton>
                  <MKButton
                    startIcon={<ModeEditOutlinedIcon />}
                    color="success"
                    variant="text"
                    size="small"
                    // onClick={() => handleEdit(_class)}
                  >
                    Edit
                  </MKButton>
                  <MKButton
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={() => handleDelete(_class)}
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

export default Class;
