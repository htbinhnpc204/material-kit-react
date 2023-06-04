import BaseLayout from "layouts/sections/components/BaseLayout";
import LabDetail from "pages/Lab/component/Detail";

export default function LabDetailPage() {
  return (
    <BaseLayout
      breadcrumb={[
        { label: "Trang chủ", route: "/" },
        { label: "Quản lý phòng máy", route: "/labs" },
        { label: "Chi tiết phòng máy" },
      ]}
    >
      <LabDetail />
    </BaseLayout>
  );
}
