import { useEffect, useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// @mui icons

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKButton from "components/MKButton";
import MKInput from "components/MKInput";
import MKTypography from "components/MKTypography";

// Material Kit 2 React example components
import SimpleFooter from "examples/Footers/SimpleFooter";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";

// Material Kit 2 React page layout routes

// API support
import api from "utils/api";
import helper from "utils/helper";
import { auth, info } from "utils/path";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SignUpBasic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [gender, setGender] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setRePassword(e.target.value);
    }
  };

  const handleGenderChange = (e, value) => {
    setGender(value);
  };

  const handleSubmit = () => {
    if (password !== rePassword) {
      toast.error("Password and re-password does not match !!");
      return;
    }

    setLoading(true);

    const payload = { email: email, password: password, gender: gender.key };
    const registerRes = api.post({ path: auth.register, payload: payload });
    registerRes
      .then((response) => {
        helper.setCookie(response.data.data.access_token);
        api.setJwtToken(helper.getCookie());
        const infoRes = api.get({ path: info });
        infoRes
          .then((response) => {
            helper.setStorage("user", JSON.stringify(response.data?.data));
            toast.success(
              `Register successfully, welcome ${
                response.data?.data?.name || response.data?.data?.email
              }`,
              {
                position: toast.POSITION.BOTTOM_LEFT,
              }
            );

            if (helper.getStorage("user")) {
              setLoading(false);
              navigate("/");
            }
          })
          .catch(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`Register failed, ${error.data?.errors[0]?.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  useEffect(() => {
    setGender(genderList[0]);
    if (JSON.parse(helper.getStorage("user"))) {
      navigate("/");
    }
  }, []);

  const genderList = [
    { value: "Nam", key: "NAM" },
    { value: "Nữ", key: "NU" },
    { value: "Other", key: "OTHER" },
  ];

  return (
    <>
      <DefaultNavbar routes={[]} transparent light />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign Up
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      name="email"
                      type="email"
                      label="Email"
                      value={email}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="password"
                      type="password"
                      label="Password"
                      value={password}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                      name="re-password"
                      type="password"
                      label="Re-enter Password"
                      value={rePassword}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <Autocomplete
                      freeSolo
                      id="gender"
                      value={gender}
                      options={genderList}
                      getOptionLabel={(option) => option?.value}
                      onChange={handleGenderChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Gender"
                          InputProps={{
                            ...params.InputProps,
                            type: "search",
                          }}
                        />
                      )}
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      onClick={handleSubmit}
                      variant="gradient"
                      color={isLoading ? "secondary" : "info"}
                      disabled={isLoading}
                      fullWidth
                      style={{ position: "relative" }}
                    >
                      {isLoading && (
                        <CircularProgress
                          style={{
                            position: "absolute",
                            left: "33%",
                            alignSelf: "center",
                          }}
                          size={"1rem"}
                        />
                      )}
                      sign up
                    </MKButton>
                  </MKBox>
                </MKBox>
                <MKBox mt={3} mb={1} textAlign="center">
                  <MKTypography variant="button" color="text">
                    Already had an account?{" "}
                    <MKTypography
                      component={Link}
                      to="/sign-in"
                      variant="button"
                      color="info"
                      fontWeight="medium"
                      textGradient
                    >
                      Sign up
                    </MKTypography>
                  </MKTypography>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter
          company={{ href: "https://fb.me/binhhothai204", name: "Hồ Thái Bình" }}
          light
        />
      </MKBox>
    </>
  );
}

export default SignUpBasic;
