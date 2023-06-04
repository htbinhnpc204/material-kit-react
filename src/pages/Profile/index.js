/* eslint-disable no-unused-vars */
// @mui material components
import { Divider } from "@mui/material";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKAvatar from "components/MKAvatar";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import ScheduleList from "pages/Schedule/component/List";

// Images
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "utils/api";
import helper from "utils/helper";
import { info } from "utils/path";

function Profile() {
  const [user, setUser] = useState({});

  const fetchInfo = () => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${info}` });
    res.then((response) => {
      setUser(response.data?.data);
      if (response.data?.data !== JSON.parse(helper.getStorage("user"))) {
        helper.setStorage("user", JSON.stringify(response.data?.data));
      }
    });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -20, md: -20 }} textAlign="center">
            <MKAvatar
              src={`${helper.getImageSource(user?.avatar)}`}
              alt={`${user?.name || user?.email}`}
              size="xxl"
              shadow="xl"
            />
          </MKBox>
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={9} lg={9} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="center" alignItems="center" mb={1}>
                <MKTypography variant="h2">{user?.name}</MKTypography>
              </MKBox>
              <Grid container spacing={3} mb={3}>
                <Grid item xs={12} md={6} lg={6}>
                  <MKTypography component="span" variant="body2" color="text">
                    Mã sinh viên:&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {user?.student_id || "Null"}
                  </MKTypography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MKTypography component="span" variant="body2" color="text">
                    Ngày sinh:&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {user?.dob
                      ? new Date(user?.dob).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "Null"}
                  </MKTypography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MKTypography component="span" variant="body2" color="text">
                    Số điện thoại:&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {user?.phone || "Null"}
                  </MKTypography>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <MKTypography component="span" variant="body2" color="text">
                    Giới tính:&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {user?.gender === "NAM" ? "Nam" : "Nữ"}
                  </MKTypography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Profile;
