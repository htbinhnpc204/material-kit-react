import { MKTypography } from "components/MKTypography";
import ScheduleList from "../component/List";
import api from "utils/api";
import helper from "utils/helper";
import { useState } from "react";
import { toast } from "react-toastify";
import Loading from "components/Loading/fullSize";

function ScheduleUser() {
  const [pagination, setPagination] = useState({});
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSchedules = () => {
    setLoading(true);
    api.setJwtToken(helper.getCookie());
    const userStorage = JSON.parse(helper.getStorage("user"));
    const res = api.get({ path: `users/${userStorage.id}/schedules` });
    res
      .then((response) => {
        setSchedules(response.data?.data?.items);
        setPagination(response.data?.data?.pagination);
      })
      .catch(() => {
        toast.error("Lấy danh sách thời khóa biểu thất bại");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <MKTypography variant="h3">Thời khóa biểu</MKTypography>
      {loading && <Loading />}
      {!loading && (
        <ScheduleList
          schedules={schedules}
          fetchSchedules={fetchSchedules}
          pagination={pagination}
        />
      )}
    </>
  );
}

export default ScheduleUser;
