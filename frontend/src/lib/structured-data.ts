export function getOrganizationSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ON DM",
    url: siteUrl,
    description:
      "ON DM - Digital solutions agency serving Egypt, Saudi Arabia, UAE. Web development, apps, digital marketing, and design.",
    foundingDate: "2017",
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Country", name: "Saudi Arabia" },
      { "@type": "Country", name: "United Arab Emirates" },
    ],
  };
}

export function getLocalBusinessSchema(siteUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "ON DM",
    url: siteUrl,
    description: "Digital solutions agency - Web development, apps, digital marketing, and design.",
  };
}
