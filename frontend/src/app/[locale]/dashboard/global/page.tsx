import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

export default function GlobalConfigPage() {
  return (
    <SiteConfigForm
      title="Global (Colors & Buttons)"
      sections={SITE_CONFIG_SECTIONS.global}
    />
  );
}
