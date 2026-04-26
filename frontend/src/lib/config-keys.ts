/**
 * Site config keys for dashboard editing.
 * Format: page.section.field (e.g. nav.services, hero.titleEn)
 */

export interface ConfigField {
  key: string;
  label: string;
  type?: "text" | "textarea" | "color" | "url";
}

export interface ConfigSection {
  title: string;
  fields: ConfigField[];
}

/** Fields with En/Ar suffix (e.g. hero.titleEn, hero.titleAr) */
export function enArField(keyBase: string, label: string, type: "text" | "textarea" = "text"): ConfigField[] {
  return [
    { key: `${keyBase}En`, label: `${label} (EN)`, type },
    { key: `${keyBase}Ar`, label: `${label} (AR)`, type },
  ];
}

/** Fields where base key = EN, keyAr = AR (e.g. nav.services, nav.servicesAr) */
export function baseArField(keyBase: string, label: string): ConfigField[] {
  return [
    { key: keyBase, label: `${label} (EN)`, type: "text" },
    { key: `${keyBase}Ar`, label: `${label} (AR)`, type: "text" },
  ];
}

export const SITE_CONFIG_SECTIONS: Record<string, ConfigSection[]> = {
  navigation: [
    {
      title: "Main Nav",
      fields: [
        ...baseArField("nav.services", "Services"),
        ...baseArField("nav.work", "Work"),
        ...baseArField("nav.about", "About"),
        ...baseArField("nav.contact", "Contact"),
        ...baseArField("nav.getInTouch", "Get In Touch"),
        ...baseArField("nav.chatNow", "Chat Now"),
      ],
    },
    {
      title: "Services Mega Menu",
      fields: [
        ...baseArField("nav.megaMenu.title", "Title"),
        ...baseArField("nav.megaMenu.description", "Description"),
        ...baseArField("nav.megaMenu.viewAll", "View All"),
        ...baseArField("nav.megaMenu.categories.software", "Category: Software"),
        ...baseArField("nav.megaMenu.categories.marketing", "Category: Marketing"),
        ...baseArField("nav.megaMenu.categories.design", "Category: Design"),
        ...baseArField("nav.megaMenu.items.webDev", "Item: Web Dev"),
        ...baseArField("nav.megaMenu.items.appDev", "Item: App Dev"),
        ...baseArField("nav.megaMenu.items.itBusiness", "Item: IT Business"),
        ...baseArField("nav.megaMenu.items.digitalMarketing", "Item: Digital Marketing"),
        ...baseArField("nav.megaMenu.items.socialMedia", "Item: Social Media"),
        ...baseArField("nav.megaMenu.items.branding", "Item: Branding"),
        ...baseArField("nav.megaMenu.items.uxDesign", "Item: UX Design"),
      ],
    },
    {
      title: "Work Mega Menu",
      fields: [
        ...baseArField("nav.workMegaMenu.title", "Title"),
        ...baseArField("nav.workMegaMenu.description", "Description"),
        ...baseArField("nav.workMegaMenu.viewAll", "View All"),
        ...baseArField("nav.workMegaMenu.project.link", "Project Link Text"),
      ],
    },
  ],

  hero: [
    {
      title: "Hero Section",
      fields: [
        ...enArField("hero.title", "Title"),
        ...enArField("hero.subtitle", "Subtitle"),
        ...enArField("hero.startProject", "Start Project Button"),
        ...enArField("hero.exploreServices", "Explore Services Button"),
        { key: "hero.startProjectHref", label: "Start Project Link", type: "url" },
        { key: "hero.exploreServicesHref", label: "Explore Services Link", type: "url" },
        { key: "hero.badge1En", label: "Badge 1", type: "text" },
        { key: "hero.badge2En", label: "Badge 2", type: "text" },
      ],
    },
  ],

  ourStory: [
    {
      title: "Our Story",
      fields: [
        ...enArField("ourStory.badge", "Badge"),
        ...enArField("ourStory.mainText", "Main Text", "textarea"),
        ...enArField("ourStory.tagline", "Tagline"),
        { key: "ourStory.stats.years", label: "Stats: Years Value", type: "text" },
        ...enArField("ourStory.stats.years.label", "Stats: Years Label"),
        { key: "ourStory.stats.employees", label: "Stats: Employees Value", type: "text" },
        ...enArField("ourStory.stats.employees.label", "Stats: Employees Label"),
        { key: "ourStory.stats.products", label: "Stats: Products Value", type: "text" },
        ...enArField("ourStory.stats.products.label", "Stats: Products Label"),
      ],
    },
  ],

  servicesIntro: [
    {
      title: "Services Intro (Home)",
      fields: [
        ...enArField("servicesIntro.badge", "Badge"),
        ...enArField("servicesIntro.title", "Title"),
        ...enArField("servicesIntro.description", "Description"),
        ...enArField("servicesIntro.knowMore", "Know More Button"),
        { key: "servicesIntro.knowMoreHref", label: "Know More Link", type: "url" },
      ],
    },
  ],

  workIntro: [
    {
      title: "Work Intro (Home)",
      fields: [
        ...enArField("workIntro.badge", "Badge"),
        ...enArField("workIntro.title", "Title"),
        ...enArField("workIntro.description", "Description"),
        ...enArField("workIntro.viewCaseStudies", "View Case Studies Button"),
        { key: "workIntro.viewCaseStudiesHref", label: "View Case Studies Link", type: "url" },
      ],
    },
  ],

  clients: [
    {
      title: "Clients Section",
      fields: [
        ...enArField("clients.badge", "Badge"),
        ...enArField("clients.title", "Title"),
        ...enArField("clients.description", "Description"),
      ],
    },
  ],

  blogSection: [
    {
      title: "Blog Section (Home)",
      fields: [
        ...enArField("blog.badge", "Badge"),
        ...enArField("blog.title", "Title"),
        ...enArField("blog.description", "Description"),
        ...enArField("blog.exploreBlog", "Explore Blog Button"),
        ...enArField("blog.readMore", "Read More"),
        { key: "blog.exploreBlogHref", label: "Explore Blog Link", type: "url" },
      ],
    },
  ],

  cta: [
    {
      title: "CTA Section (Footer Band)",
      fields: [
        ...enArField("cta.title", "Title"),
        ...enArField("cta.description", "Description"),
        ...enArField("cta.whatsapp", "WhatsApp Button"),
        ...enArField("cta.callUs", "Call Us Button"),
        ...enArField("cta.bookMeeting", "Book Meeting Button"),
        { key: "cta.whatsappHref", label: "WhatsApp URL (from contact config)", type: "url" },
        { key: "cta.callHref", label: "Call tel: (from contact config)", type: "url" },
        { key: "cta.meetingHref", label: "Meeting URL (from contact config)", type: "url" },
      ],
    },
  ],

  footer: [
    {
      title: "Footer Contact Info",
      fields: [
        ...enArField("footer.contactInfo.label", "Label"),
        ...enArField("footer.contactInfo.title", "Title"),
        ...enArField("footer.contactInfo.emailLabel", "Email Label"),
        ...enArField("footer.contactInfo.phoneLabel", "Phone Label"),
        ...enArField("footer.contactInfo.locationLabel", "Location Label"),
        ...enArField("footer.contactInfo.followUsLabel", "Follow Us Label"),
        ...enArField("footer.contactInfo.address1", "Address 1"),
        ...enArField("footer.contactInfo.address2", "Address 2"),
      ],
    },
    {
      title: "Footer Newsletter",
      fields: [
        ...enArField("footer.newsletter.title", "Title"),
        ...enArField("footer.newsletter.description", "Description"),
        ...enArField("footer.newsletter.placeholder", "Placeholder"),
        ...enArField("footer.newsletter.subscribe", "Subscribe Button"),
        ...enArField("footer.newsletter.privacy", "Privacy Text"),
      ],
    },
    {
      title: "Footer Nav",
      fields: [
        ...enArField("footer.nav.aboutUs", "About Us"),
        ...enArField("footer.nav.services", "Services"),
        ...enArField("footer.nav.work", "Work"),
        ...enArField("footer.nav.blog", "Blog"),
        ...enArField("footer.nav.contactUs", "Contact Us"),
      ],
    },
    {
      title: "Footer Copyright",
      fields: [
        { key: "footer.copyright", label: "Copyright (use <span> for bold)", type: "text" },
      ],
    },
    {
      title: "Footer Social Links",
      fields: [
        { key: "footer.socialLinks", label: "Social Links (JSON: [{name, href, icon}])", type: "textarea" },
      ],
    },
  ],

  servicesPage: [
    {
      title: "Services Page",
      fields: [
        ...enArField("servicesPage.badge", "Badge"),
        ...enArField("servicesPage.title", "Title"),
        ...enArField("servicesPage.description", "Description"),
        ...enArField("servicesPage.filters.viewAll", "Filter: View All"),
        ...enArField("servicesPage.filters.design", "Filter: Design"),
        ...enArField("servicesPage.filters.marketing", "Filter: Marketing"),
        ...enArField("servicesPage.filters.software", "Filter: Software"),
      ],
    },
    {
      title: "Service Card Buttons",
      fields: [
        ...enArField("serviceCard.requestPricing", "Request Pricing"),
        ...enArField("serviceCard.viewWorkSamples", "View Work Samples"),
      ],
    },
  ],

  workPage: [
    {
      title: "Work Page",
      fields: [
        ...enArField("work.title", "Title"),
        ...enArField("work.subtitle", "Subtitle"),
        ...enArField("workCard.seeFullProject", "See Full Project"),
        ...enArField("workCard.seeLiveChannels", "See Live Channels"),
        ...enArField("workContent.viewFullProject", "View Full Project (Home)"),
      ],
    },
  ],

  blogPage: [
    {
      title: "Blog Page",
      fields: [
        ...enArField("blogPage.badge", "Badge"),
        ...enArField("blogPage.title", "Title"),
        ...enArField("blogPage.description", "Description"),
        ...enArField("blogPage.placeholder", "Subscribe Placeholder"),
        ...enArField("blogPage.subscribe", "Subscribe Button"),
      ],
    },
  ],

  aboutPage: [
    {
      title: "About Hero",
      fields: [
        ...enArField("about.hero.badge", "Badge"),
        ...enArField("about.hero.title", "Title"),
        ...enArField("about.hero.description", "Description"),
      ],
    },
    {
      title: "About Testimonial",
      fields: [
        ...enArField("about.testimonial.quote", "Quote"),
        ...enArField("about.testimonial.name", "Name"),
        ...enArField("about.testimonial.role", "Role"),
        { key: "about.testimonial.avatarUrl", label: "Avatar URL", type: "url" },
      ],
    },
    {
      title: "About Features",
      fields: [
        ...enArField("about.features.heading", "Heading"),
        ...enArField("about.features.subheading", "Subheading"),
        ...enArField("about.features.feature1.title", "Feature 1 Title"),
        ...enArField("about.features.feature1.description", "Feature 1 Description"),
        ...enArField("about.features.feature1.item1", "Feature 1 Item 1"),
        ...enArField("about.features.feature1.item2", "Feature 1 Item 2"),
        ...enArField("about.features.feature1.item3", "Feature 1 Item 3"),
        { key: "about.features.feature1.imageUrl", label: "Feature 1 Image URL", type: "url" },
        ...enArField("about.features.feature2.title", "Feature 2 Title"),
        ...enArField("about.features.feature2.description", "Feature 2 Description"),
        ...enArField("about.features.feature2.item1", "Feature 2 Item 1"),
        ...enArField("about.features.feature2.item2", "Feature 2 Item 2"),
        ...enArField("about.features.feature2.item3", "Feature 2 Item 3"),
        { key: "about.features.feature2.imageUrl", label: "Feature 2 Image URL", type: "url" },
        ...enArField("about.features.feature3.title", "Feature 3 Title"),
        ...enArField("about.features.feature3.description", "Feature 3 Description"),
        ...enArField("about.features.feature3.item1", "Feature 3 Item 1"),
        ...enArField("about.features.feature3.item2", "Feature 3 Item 2"),
        ...enArField("about.features.feature3.item3", "Feature 3 Item 3"),
        { key: "about.features.feature3.imageUrl", label: "Feature 3 Image URL", type: "url" },
      ],
    },
    {
      title: "About Team",
      fields: [
        ...enArField("about.team.heading", "Heading"),
        ...enArField("about.team.subheading", "Subheading"),
        ...enArField("about.team.viewAll", "View All Button"),
        { key: "about.team.hideViewAll", label: "Hide View All (true/false)", type: "text" },
      ],
    },
  ],

  global: [
    {
      title: "Global Colors",
      fields: [
        { key: "colors.primary", label: "Primary (buttons, links)", type: "color" },
        { key: "colors.ctaBg", label: "CTA Section Background", type: "color" },
        { key: "colors.ctaButton", label: "CTA Primary Button", type: "color" },
        { key: "colors.footerBg", label: "Footer Bottom Background", type: "color" },
      ],
    },
  ],
};
