/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";

// Material Kit 2 React examples
import RotatingCard from "examples/Cards/RotatingCard";
import RotatingCardFront from "examples/Cards/RotatingCard/RotatingCardFront";
import RotatingCardBack from "examples/Cards/RotatingCard/RotatingCardBack";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

// Images
import bgFront from "assets/images/rotating-card-bg-front.jpeg";
import bgBack from "assets/images/rotating-card-bg-back.jpeg";

function Information() {
  return (
    <MKBox component="section" py={6} my={6}>
      <Container>
        <Grid container item xs={11} spacing={3} alignItems="center" sx={{ mx: "auto" }}>
          <Grid item xs={12} lg={4} sx={{ mx: "auto" }}>
            <RotatingCard>
              <RotatingCardFront
                image={bgFront}
                icon="touch_app"
                title={
                  <>
                    Các chức năng
                    <br />
                    chính
                  </>
                }
                description="Hệ thống quản lý phòng máy UTE."
              />
              <RotatingCardBack
                image={bgBack}
                title="Tìm hiểu thêm"
                description="Với ứng dụng này, bạn sẽ tiết kiệm lượng lớn thời gian trong quá trình quản lý hệ thống phòng máy tại trường đại học sư phạm kỹ thuật"
                action={{
                  type: "internal",
                  route: "https://fb.me/binhhothai204",
                  label: "Ghé thăm chúng tôi",
                }}
              />
            </RotatingCard>
          </Grid>
          <Grid item xs={12} lg={7} sx={{ ml: "auto" }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="content_copy"
                  title="Quản lý phòng máy"
                  description="Cho phép thực hiện các thao tác quản lý phòng máy như: chỉnh sửa thông tin phòng máy, thêm mới phòng máy, xóa phòng máy, xem các máy tính hiện có trong phòng máy."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="flip_to_front"
                  title="Quản lý lịch sử dụng phòng máy"
                  description="Cho phép giảng viên đăng ký sử dụng phòng máy, đơn đăng ký sử dụng cần được nhân viên tiếp quản phòng máy phê duyệt."
                />
              </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ mt: { xs: 0, md: 6 } }}>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="price_change"
                  title="Xem thời khóa biểu"
                  description="Các sinh viên xem thời khóa biểu, lịch học liên quan đến phòng máy."
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <DefaultInfoCard
                  icon="devices"
                  title="Báo lỗi máy tính"
                  description="Sinh viên thực hiện gửi biểu mẫu báo lỗi nếu phát hiện ra máy tính bị lỗi."
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Information;
