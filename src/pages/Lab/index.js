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
import { labs as labPath } from "utils/path";

import api from "utils/api";
import helper from "utils/helper";
import LabModal from "./component/LabModal";
import "react-toastify/dist/ReactToastify.css";
import CommonActions from "components/CommonAction";

function Lab() {
  const [labs, setLabs] = useState([]);
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
        path: `${labPath}/${newLab.id}`,
        payload: formData,
      });
      res.then(() => {
        toast.success(`Cập nhật thành công ${newLab.name}!!!`);
        fetchLabs();
      });
    } else {
      api.setJwtToken(helper.getCookie());
      const res = api.post({ path: `${labPath}`, payload: formData });
      res.then(() => {
        toast.success(`Thêm mới thành công ${newLab.name}!!!`);
        fetchLabs();
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
    if (confirm(`Xác nhận xóa phòng máy ${labDelete.name}`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${labPath}/${labDelete.id}` });
      res.then(() => {
        toast.success(`Đã xóa ${labDelete.name}!!!`);
        fetchLabs();
      });
    }
  };

  const fetchLabs = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${labPath}?page=${page}&keyword=${keyword}` });
    res.then((response) => {
      setLabs(response.data?.data?.items);
      setPagination(response.data?.data?.pagination);
    });
  };

  useEffect(() => {
    if (helper.getCookie()) {
      fetchLabs();
    }
  }, [page, keyword]);

  return (
    <>
      <LabModal
        lab={selectedLab}
        isOpen={openModal}
        onClose={handleCloseModal}
        onSubmit={handleSaveLab}
      />
      <MKBox key={"labs"}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={12} lg={8}>
            <MKInput
              variant="outlined"
              size="small"
              label="Tìm kiếm phòng máy"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MKButton
              color="info"
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleAddLab()}
            >
              Thêm mới
            </MKButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {labs.map((lab) => (
            <Grid item xs={12} sm={6} md={4} key={lab.id}>
              <Card
                sx={{ height: "300px" }}
                style={{
                  boxShadow: "5px 6px 7px 2px rgba(0,0,0,0.3)",
                  "-webkit-box-shadow": "5px 6px 7px 2px rgba(0,0,0,0.3)",
                  "-moz-box-shadow": "5px 6px 7px 2px rgba(0,0,0,0.3)",
                }}
              >
                <CardHeader title={lab.name} />
                <CardContent>
                  <Typography variant="body2">Quản lý bởi: {lab.manager.name}</Typography>
                  <Typography variant="body2">Số lượng máy: {lab.computers?.length}</Typography>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                  >
                    {lab.description}
                  </Typography>
                </CardContent>
                <CommonActions
                  handleEdit={handleEdit}
                  handleView={handleView}
                  handleDelete={handleDelete}
                  entity={lab}
                ></CommonActions>
              </Card>
            </Grid>
          ))}
          {labs.length === 0 && (
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="h3" ml={2}>
                Không có phòng máy nào
              </Typography>
            </Grid>
          )}
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

export default Lab;
