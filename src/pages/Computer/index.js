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
import { computers as computerPath, labs as labPath } from "utils/path";

import api from "utils/api";
import helper from "utils/helper";
import ComputerModal from "./component/ComputerModal";

import "react-toastify/dist/ReactToastify.css";

function Computer() {
  const [computers, setComputers] = useState([]);
  const [labs, setLabs] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedCompuTer, setSelectedComputer] = useState({});

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

  const handleAddComputer = () => {
    setSelectedComputer(null);
    handleOpenModal();
  };

  const handleEdit = (computer) => {
    setSelectedComputer(computer);
    handleOpenModal();
  };

  const handleSaveComputer = (newCom) => {
    const formData = new FormData();
    formData.append("name", newCom.name);
    formData.append("description", newCom.description);
    formData.append("lab_id", newCom.lab.id);

    if (newCom.id) {
      formData.append("_method", "PUT");
      api.setJwtToken(helper.getCookie());
      const res = api.put({
        path: `${computerPath}/${newCom.id}`,
        payload: formData,
      });
      res.then(() => {
        toast.success(`Updated ${newCom.name}!!!`);
        fetchComputers();
      });
    } else {
      api.setJwtToken(helper.getCookie());
      const res = api.post({ path: `${computerPath}`, payload: formData });
      res.then(() => {
        toast.success(`Created ${newCom.name}!!!`);
        fetchComputers();
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

  const handleDelete = (delCom) => {
    if (confirm(`Do you want to delete ${delCom.name}`)) {
      api.setJwtToken(helper.getCookie());
      const res = api.delete({ path: `${computerPath}/${delCom.id}` });
      res.then(() => {
        toast.success(`Deleted ${delCom.name}!!!`);
        fetchComputers();
      });
    }
  };

  const fetchComputers = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${computerPath}?page=${page}&keyword=${keyword}` });
    res.then((response) => {
      setComputers(response.data?.data?.items);
      setPagination(response.data?.data?.pagination);
    });
  };

  const fetchLabs = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${labPath}?page=${page}&keyword=${keyword}` });
    res.then((response) => {
      setLabs(response.data?.data?.items);
    });
  };

  useEffect(() => {
    if (helper.getCookie()) {
      fetchComputers();
      fetchLabs();
    }
  }, [page, keyword]);

  return (
    <>
      <ComputerModal
        computer={selectedCompuTer}
        labs={labs}
        onSubmit={handleSaveComputer}
        onClose={handleCloseModal}
        isOpen={openModal}
      />
      <MKBox key={"labs"}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={12} lg={8}>
            <MKInput
              variant="outlined"
              size="small"
              label="Search computer"
              fullWidth
              value={searchValue}
              onChange={handleSearchChange}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
            <MKButton variant="contained" startIcon={<Add />} onClick={() => handleAddComputer()}>
              Add computer
            </MKButton>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {computers.map((computer) => (
            <Grid item xs={12} sm={6} md={4} key={computer.name}>
              <Card sx={{ height: "250px" }}>
                <CardHeader title={computer.name} />
                <CardContent>
                  <Typography variant="body1">{computer.description}</Typography>
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
                    onClick={() => handleView(computer.id)}
                  >
                    View
                  </MKButton>
                  <MKButton
                    startIcon={<ModeEditOutlinedIcon />}
                    color="success"
                    variant="text"
                    size="small"
                    onClick={() => handleEdit(computer)}
                  >
                    Edit
                  </MKButton>
                  <MKButton
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    color="primary"
                    variant="text"
                    size="small"
                    onClick={() => handleDelete(computer)}
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

export default Computer;
