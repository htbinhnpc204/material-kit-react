import BaseLayout from "layouts/sections/components/BaseLayout";
import ClassDetail from "pages/Class/component/ClassDetail";

export default function ClassPage() {
  return (
    <BaseLayout
      breadcrumb={[
        { label: "Trang chủ", route: "/" },
        { label: "Quản ký lớp học", route: "/classes" },
        { label: "Chi tiết lớp" },
      ]}
    >
      <ClassDetail />
    </BaseLayout>
  );
}
