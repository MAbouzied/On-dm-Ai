import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

export default function NavigationPage() {
  return (
    <SiteConfigForm
      title="Navigation"
      sections={SITE_CONFIG_SECTIONS.navigation}
    />
  );
}
