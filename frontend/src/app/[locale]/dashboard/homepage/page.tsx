import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

const HOMEPAGE_SECTIONS = [
  ...SITE_CONFIG_SECTIONS.hero,
  ...SITE_CONFIG_SECTIONS.ourStory,
  ...SITE_CONFIG_SECTIONS.servicesIntro,
  ...SITE_CONFIG_SECTIONS.workIntro,
  ...SITE_CONFIG_SECTIONS.clients,
  ...SITE_CONFIG_SECTIONS.blogSection,
];

export default function HomepagePage() {
  return (
    <SiteConfigForm
      title="Homepage"
      sections={HOMEPAGE_SECTIONS}
    />
  );
}
