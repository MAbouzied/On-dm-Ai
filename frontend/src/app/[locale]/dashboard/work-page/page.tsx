import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

export default function WorkPageConfig() {
  return (
    <SiteConfigForm
      title="Work Page"
      sections={SITE_CONFIG_SECTIONS.workPage}
    />
  );
}
