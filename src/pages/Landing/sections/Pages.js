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
import MKBadge from "components/MKBadge";
import MKTypography from "components/MKTypography";

function Pages() {
  return (
    <MKBox component="section" py={6}>
      <Container>
        <Grid
          container
          item
          xs={12}
          lg={12}
          flexDirection="column"
          alignItems="center"
          sx={{ my: 6, mx: "auto", px: 0.75 }}
        >
          <MKBadge
            variant="contained"
            color="info"
            badgeContent="Chủ sở hữu"
            container
            sx={{ textAlign: "center", mb: 2 }}
          />
          <MKTypography variant="h2" fontWeight="bold" mb={3}>
            Giới thiệu bản thân
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Chào mừng bạn đến với website của Hồ Thái Bình! Hồ Thái Bình tự hào giới thiệu đến bạn
            trang web quản lý hệ thống phòng máy dành cho trường Đại học Sư phạm Kỹ thuật.
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Trang web này đã được xây dựng với mục đích cung cấp một giải pháp hiệu quả và tiện lợi
            để quản lý thông tin và lịch sử dụng các phòng máy trong trường. Hồ Thái Bình cam kết
            mang đến cho sinh viên và giảng viên một trải nghiệm trực tuyến thuận tiện, giúp họ dễ
            dàng truy cập thông tin cần thiết và đặt lịch sử dụng phòng máy một cách đơn giản.
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Với trang web quản lý hệ thống phòng máy của Hồ Thái Bình, sinh viên và giảng viên có
            thể xem thời khóa biểu học tập của các phòng máy trong trường một cách dễ dàng. Thông
            tin về các buổi học, môn học và giờ học được hiển thị một cách rõ ràng, giúp họ quản lý
            thời gian và lựa chọn phòng máy phù hợp cho nhu cầu học tập của mình.
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Ngoài ra, trang web cũng cung cấp chức năng quản lý thông tin chi tiết về các phòng máy
            trong trường. Sinh viên và giảng viên có thể tìm hiểu về cơ sở vật chất, số lượng máy
            tính, thiết bị và các thông tin khác về từng phòng máy.
          </MKTypography>
          <MKTypography variant="body1" color="text">
            Điều này giúp họ có cái nhìn tổng quan về trang bị và điều kiện sử dụng của mỗi phòng
            máy. Đặc biệt, trang web còn cung cấp chức năng đặt lịch sử dụng phòng máy. Sinh viên và
            giảng viên có thể đăng nhập vào hệ thống và đặt lịch sử dụng phòng máy dựa trên nhu cầu
            học tập và giảng dạy của mình. Hệ thống sẽ cung cấp các lịch trống và thông báo xác nhận
            sau khi đặt lịch thành công, giúp họ quản lý thời gian sử dụng phòng máy một cách thuận
            tiện.
          </MKTypography>
        </Grid>
      </Container>
    </MKBox>
  );
}

export default Pages;
