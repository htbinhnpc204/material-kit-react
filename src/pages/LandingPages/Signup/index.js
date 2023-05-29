/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import * as yup from "yup";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import { CircularProgress } from "@mui/material";
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
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

function SignUpBasic() {
  const [isLoading, setLoading] = useState(false);

  const yupSchema = yup.object({
    student_id: yup.string().required("Student id is required!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(yupSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    const registerRes = api.post({
      path: auth.reset,
      payload: { student_id: data["student_id"] },
    });
    registerRes
      .then(() => {
        toast.success(`Password reset successfully`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(`Register failed, ${error.data?.errors[0]?.message}`, {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      });
  };

  useEffect(() => {
    if (JSON.parse(helper.getStorage("user"))) {
      navigate("/");
    }
  }, []);

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
                  Cấp lại mật khẩu
                </MKTypography>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox onSubmit={handleSubmit(onSubmit)} component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                      name="student_id"
                      label="Mã sinh viên"
                      {...register("student_id")}
                      fullWidth
                    />
                  </MKBox>
                  <MKBox mt={4} mb={1}>
                    <MKButton
                      type="submit"
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
