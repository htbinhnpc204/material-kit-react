import BaseLayout from "layouts/sections/components/BaseLayout";
import Schedule from "pages/Schedule";

export default function SchedulePage() {
  return (
    <BaseLayout
      title="Quản lý thời khóa biểu"
      breadcrumb={[{ label: "Trang chủ", route: "/" }, { label: "Quản lý thời khóa biểu" }]}
    >
      <Schedule />
    </BaseLayout>
  );
}
