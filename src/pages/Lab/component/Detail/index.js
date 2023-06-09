/* eslint-disable no-unused-vars */
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";

import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import MKBox from "components/MKBox";
import MKButton from "components/MKButton";

import { Add, Error, ErrorOutline, History } from "@mui/icons-material";
import {
  Autocomplete,
  Button,
  CardContent,
  CardHeader,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "utils/api";
import helper from "utils/helper";
import { labDetail } from "utils/path";

import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import ErrorModal from "pages/Computer/component/ErrorModal";
import ErrorHistory from "pages/Computer/component/ErrorHistory";

function LabDetail() {
  const { id } = useParams();
  const [lab, setLab] = useState({});
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const [openErrorHistory, setOpenErrorHistory] = useState(false);
  const [selectedCompuTer, setSelectedComputer] = useState({});

  const navigate = useNavigate();

  const handleCloseErrorModal = () => {
    setOpenErrorModal(false);
  };

  const handleCloseErrorHistory = () => {
    setOpenErrorHistory(false);
  };

  const handleSubmitErrorModal = (errorData) => {
    console.log(errorData);
    if (!errorData.description) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    const res = api.post({
      path: `/computers/${errorData.id}/errors`,
      payload: { description: errorData.description },
    });
    res
      .then(() => {
        toast.success("Báo lỗi máy tính thành công");
        setOpenErrorModal(false);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Báo lỗi thất bại");
      });
  };

  const getAllErrorsByComputer = (id) => {
    api.setJwtToken(helper.getCookie());
    return api.get({ path: `computers/${id}/errors` });
  };

  useEffect(() => {
    if (helper.getCookie()) {
      api.setJwtToken(helper.getCookie());
      const res = api.get({ path: labDetail(id) });
      res
        .then((response) => {
          setLab(response.data?.data);
        })
        .catch(() => {
          toast.error("Lấy thông tin phòng máy thất bại");
          navigate(-1);
        });
    }
  }, []);

  return (
    <>
      <MKBox key={"labs"}>
        <ErrorModal
          computer={selectedCompuTer}
          isOpen={openErrorModal}
          onClose={handleCloseErrorModal}
          onSubmit={handleSubmitErrorModal}
        />
        <ErrorHistory
          computer={selectedCompuTer}
          isOpen={openErrorHistory}
          onClose={handleCloseErrorHistory}
          fetchErrors={getAllErrorsByComputer}
        />
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="h3">Phòng máy: {lab?.name}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {lab.computers?.map((computer) => (
            <Grid item xs={12} sm={6} md={4} key={computer.id}>
              <Card sx={{ height: "250px" }}>
                <Grid
                  container
                  justifyContent="flex-end"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "8px",
                    fontSize: "16px",
                    zIndex: 1,
                  }}
                >
                  <Grid item>
                    <IconButton
                      color="info"
                      onClick={() => {
                        setOpenErrorHistory(true);
                        setSelectedComputer(computer);
                      }}
                      style={{
                        fontSize: "16px",
                        marginRight: "10px",
                      }}
                    >
                      <History />
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton
                      color="error"
                      disabled={!computer.activate}
                      onClick={() => {
                        setSelectedComputer(computer);
                        setOpenErrorModal(true);
                      }}
                      style={{
                        fontSize: "16px",
                        marginRight: "10px",
                      }}
                    >
                      <ErrorOutline /> &nbsp; Báo lỗi
                    </IconButton>
                  </Grid>
                </Grid>
                <CardHeader title={computer.name} />
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                  >
                    Mô tả: {computer.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MKBox>
    </>
  );
}

export default LabDetail;
