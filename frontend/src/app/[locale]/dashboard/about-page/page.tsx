import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

export default function AboutPageConfig() {
  return (
    <SiteConfigForm
      title="About Page"
      sections={SITE_CONFIG_SECTIONS.aboutPage}
    />
  );
}
