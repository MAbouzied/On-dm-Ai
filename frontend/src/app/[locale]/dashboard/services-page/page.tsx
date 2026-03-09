import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

export default function ServicesPageConfig() {
  return (
    <SiteConfigForm
      title="Services Page"
      sections={SITE_CONFIG_SECTIONS.servicesPage}
    />
  );
}
