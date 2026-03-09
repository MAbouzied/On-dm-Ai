import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

export default function FooterPage() {
  return (
    <SiteConfigForm
      title="Footer"
      sections={SITE_CONFIG_SECTIONS.footer}
    />
  );
}
