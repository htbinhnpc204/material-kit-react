import BaseLayout from "layouts/sections/components/BaseLayout";
import Computer from "pages/Computer";

export default function LandingPage() {
  return (
    <BaseLayout
      title="Quản lý thiết bị"
      breadcrumb={[{ label: "Trang chủ", route: "/" }, { label: "Quản lý thiết bị" }]}
    >
      <Computer />
    </BaseLayout>
  );
}
