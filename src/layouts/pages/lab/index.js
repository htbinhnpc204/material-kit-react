import BaseLayout from "layouts/sections/components/BaseLayout";
import Lab from "pages/Lab";

export default function LandingPage() {
  return (
    <BaseLayout
      title="Quản lý phòng máy"
      breadcrumb={[{ label: "Trang chủ", route: "/" }, { label: "Quản lý phòng máy" }]}
    >
      <Lab />
    </BaseLayout>
  );
}
