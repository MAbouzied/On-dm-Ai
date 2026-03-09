import { SiteConfigForm } from "@/components/dashboard/site-config-form";
import { SITE_CONFIG_SECTIONS } from "@/lib/config-keys";

export default function BlogPageConfig() {
  return (
    <SiteConfigForm
      title="Blog Page"
      sections={SITE_CONFIG_SECTIONS.blogPage}
    />
  );
}
