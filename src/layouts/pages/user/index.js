import BaseLayout from "layouts/sections/components/BaseLayout";
import User from "pages/User";

export default function LandingPage() {
  return (
    <BaseLayout
      title="Quản lý người dùng"
      breadcrumb={[{ label: "Trang chủ", route: "/" }, { label: "Quản lý người dùng" }]}
    >
      <User />
    </BaseLayout>
  );
}
