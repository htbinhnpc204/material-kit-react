/* eslint-disable no-unused-vars */
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
import { labDetail } from "utils/path";

import { useNavigate, useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function LabDetail() {
  const { id } = useParams();
  const [lab, setLab] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

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

  useEffect(() => {
    if (helper.getCookie()) {
      //   fetchUsers();
    }
  }, [page]);

  return (
    <>
      <MKBox key={"labs"}>
        <Grid container spacing={2} sx={{ my: 4 }}>
          <Grid item xs={12} md={4} lg={4}>
            <Typography variant="h3">Phòng máy: {lab?.name}</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {lab.computers?.map((computer) => (
            <Grid item xs={12} sm={6} md={4} key={computer.id}>
              <Card sx={{ height: "250px" }}>
                <CardHeader title={computer.name} />
                <CardContent>
                  <Typography variant="body2">
                    {/* Chức danh: {roles.find((obj) => obj.key === computer.role)?.value} */}
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
                    // onClick={() => handleView(computer.id)}
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
                    // onClick={() => handleDelete(computer.user)}
                  >
                    Delete
                  </MKButton>
                </MKBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      </MKBox>
    </>
  );
}

export default LabDetail;
