import BaseLayout from "layouts/sections/components/BaseLayout";
import Class from "pages/Class";

export default function ClassPage() {
  return (
    <BaseLayout
      title="Quản lý lớp học"
      breadcrumb={[{ label: "Trang chủ", route: "/" }, { label: "Quản ký lớp học" }]}
    >
      <Class />
    </BaseLayout>
  );
}
