import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

export default function CtaPage() {
  return (
    <SiteConfigForm
      title="CTA Section"
      sections={SITE_CONFIG_SECTIONS.cta}
    />
  );
}
