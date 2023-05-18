// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Kit 2 React components
import MKAvatar from "components/MKAvatar";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

// Images
import { useEffect, useState } from "react";
import api from "utils/api";
import helper from "utils/helper";
import { info } from "utils/path";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.setJwtToken(helper.getCookie());
    const res = api.get({ path: `${info}` });
    res.then((response) => {
      setUser(response.data?.data);
      if (response.data?.data !== JSON.parse(helper.getStorage("user"))) {
        helper.setStorage("user", JSON.stringify(response.data?.data));
      }
    });
  }, []);

  return (
    <MKBox component="section" py={{ xs: 6, sm: 12 }}>
      <Container>
        <Grid container item xs={12} justifyContent="center" mx="auto">
          <MKBox mt={{ xs: -20, md: -20 }} textAlign="center">
            <MKAvatar
              src={`${helper.getImageSource(user?.avatar)}`}
              alt="Burce Mars"
              size="xxl"
              shadow="xl"
            />
          </MKBox>
          <Grid container justifyContent="center" py={6}>
            <Grid item xs={12} md={7} mx={{ xs: "auto", sm: 6, md: 1 }}>
              <MKBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <MKTypography variant="h3">{user?.name}</MKTypography>
                {/* <MKButton variant="outlined" color="info" size="small">
                  Follow
                </MKButton> */}
              </MKBox>
              <Grid container spacing={3} mb={3}>
                <Grid item>
                  <MKTypography component="span" variant="body2" color="text">
                    Student ID:&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {user?.student_id || "Null"}
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" color="text">
                    Date of birth:&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {user?.dob ? new Date(user?.dob).toDateString() : "Null"}
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" color="text">
                    Phone:&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {user?.phone || "Null"}
                  </MKTypography>
                </Grid>
                <Grid item>
                  <MKTypography component="span" variant="body2" color="text">
                    Gender:&nbsp;
                  </MKTypography>
                  <MKTypography component="span" variant="body2" fontWeight="bold">
                    {user?.gender === "NAM" ? "Male" : "Female"}
                  </MKTypography>
                </Grid>
              </Grid>
              <MKTypography variant="body1" fontWeight="light" color="text">
                Decisions: If you can&apos;t decide, the answer is no. If two equally difficult
                paths, choose the one more painful in the short term (pain avoidance is creating an
                illusion of equality). Choose the path that leaves you more equanimous. <br />
                <MKTypography
                  component="a"
                  href="#"
                  variant="body1"
                  fontWeight="light"
                  color="info"
                  mt={3}
                  sx={{
                    width: "max-content",
                    display: "flex",
                    alignItems: "center",

                    "& .material-icons-round": {
                      transform: `translateX(3px)`,
                      transition: "transform 0.2s cubic-bezier(0.34, 1.61, 0.7, 1.3)",
                    },

                    "&:hover .material-icons-round, &:focus .material-icons-round": {
                      transform: `translateX(6px)`,
                    },
                  }}
                >
                  More about me <Icon sx={{ fontWeight: "bold" }}>arrow_forward</Icon>
                </MKTypography>
              </MKTypography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Profile;
