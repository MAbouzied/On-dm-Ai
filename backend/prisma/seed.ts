import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create admin (password: admin123) - always update password so re-seed fixes it
  const hashedPassword = await bcrypt.hash("admin123", 10);
  await prisma.admin.upsert({
    where: { email: "admin@ondm.com" },
    update: { password: hashedPassword },
    create: {
      email: "admin@ondm.com",
      password: hashedPassword,
    },
  });

  // Seed services
  const services = [
    {
      slug: "digital-marketing",
      category: "marketing",
      titleEn: "Digital Marketing and Advertising Solutions",
      titleAr: "حلول التسويق الرقمي والإعلان",
      descriptionEn:
        "We design impactful marketing strategies that combine creativity with data-driven insights to boost visibility, generate leads, and grow your brand across digital platforms.",
      descriptionAr:
        "نصمم استراتيجيات تسويقية مؤثرة تجمع بين الإبداع والرؤى القائمة على البيانات لتعزيز الظهور وتوليد العملاء المحتملين ونمو علامتك التجارية.",
      contentEn: "",
      contentAr: "",
      tags: JSON.stringify(["Ads", "Campaigns", "Strategy", "Performance"]),
      backgroundColor: "#C8EBE9",
      isDark: false,
      sortOrder: 0,
    },
    {
      slug: "social-media",
      category: "marketing",
      titleEn: "Social media management",
      titleAr: "إدارة وسائل التواصل الاجتماعي",
      descriptionEn:
        "We craft strategic content, engaging visuals, and targeted campaigns that connect with the right audience.",
      descriptionAr:
        "ننشئ محتوى استراتيجي ومرئيات جذابة وحملات مستهدفة تتصل بالجمهور المناسب.",
      contentEn: "",
      contentAr: "",
      tags: JSON.stringify(["Strategy", "Content", "Campaigns", "Analytics"]),
      backgroundColor: "#FFD670",
      isDark: false,
      sortOrder: 1,
    },
    {
      slug: "ux-design",
      category: "design",
      titleEn: "User Experience Design",
      titleAr: "تصميم تجربة المستخدم",
      descriptionEn:
        "We create intuitive, user-centered interfaces that blend aesthetics with functionality.",
      descriptionAr:
        "ننشئ واجهات بديهية تركز على المستخدم وتجمع بين الجماليات والوظائف.",
      contentEn: "",
      contentAr: "",
      tags: JSON.stringify([
        "UX Research",
        "UI Design",
        "App design",
        "Web design",
        "Prototyping",
        "Usability Testing",
      ]),
      backgroundColor: "#F3E8FF",
      isDark: false,
      sortOrder: 2,
    },
    {
      slug: "web-development",
      category: "software",
      titleEn: "Web development",
      titleAr: "تطوير الويب",
      descriptionEn:
        "We build fast, secure, and scalable websites tailored to your goals.",
      descriptionAr:
        "نبني مواقع ويب سريعة وآمنة وقابلة للتوسع مصممة وفق أهدافك.",
      contentEn: "",
      contentAr: "",
      tags: JSON.stringify(["Frontend", "Backend", "CMS", "Optimization"]),
      backgroundColor: "#D6EADF",
      isDark: false,
      sortOrder: 3,
    },
    {
      slug: "app-development",
      category: "software",
      titleEn: "App development",
      titleAr: "تطوير التطبيقات",
      descriptionEn:
        "We turn ideas into powerful, user-friendly mobile apps that perform flawlessly across devices.",
      descriptionAr:
        "نحول الأفكار إلى تطبيقات جوال قوية وسهلة الاستخدام تعمل بسلاسة على جميع الأجهزة.",
      contentEn: "",
      contentAr: "",
      tags: JSON.stringify(["iOS", "Android"]),
      backgroundColor: "#F9E8C9",
      isDark: false,
      sortOrder: 4,
    },
    {
      slug: "it-business",
      category: "software",
      titleEn: "IT & Business operations management",
      titleAr: "إدارة عمليات تقنية المعلومات والأعمال",
      descriptionEn:
        "We streamline business operations through tailored IT solutions.",
      descriptionAr:
        "نبسط عمليات الأعمال من خلال حلول تقنية مخصصة.",
      contentEn: "",
      contentAr: "",
      tags: JSON.stringify(["Automation", "Cloud", "Integration", "Optimization"]),
      backgroundColor: "#4A2545",
      isDark: true,
      sortOrder: 5,
    },
    {
      slug: "branding",
      category: "design",
      titleEn: "Design & Branding",
      titleAr: "التصميم والعلامة التجارية",
      descriptionEn:
        "From logo design to full visual systems, our team blends creativity with strategy.",
      descriptionAr:
        "من تصميم الشعار إلى الأنظمة البصرية الكاملة، يجمع فريقنا بين الإبداع والاستراتيجية.",
      contentEn: "",
      contentAr: "",
      tags: JSON.stringify(["Brand Identity", "Visual Design", "Guidelines", "Rebranding"]),
      backgroundColor: "#D0E8F2",
      isDark: false,
      sortOrder: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  // Seed homepage config
  const homepageConfigs = [
    { key: "hero.titleEn", value: "Build. Launch. Grow. Everything your digital business needs" },
    { key: "hero.titleAr", value: "ابنِ. أطلق. نمُ. كل ما تحتاجه أعمالك الرقمية" },
    { key: "hero.subtitleEn", value: "Websites, apps, and digital marketing that level up your business." },
    { key: "hero.subtitleAr", value: "مواقع وتطبيقات وتسويق رقمي يرفع مستوى أعمالك." },
    { key: "hero.badge1En", value: "We Build What Brands Dream" },
    { key: "hero.badge2En", value: "Data_Driven Decision Making" },
    { key: "ourStory.badgeEn", value: "Our Story" },
    { key: "ourStory.badgeAr", value: "قصتنا" },
    { key: "ourStory.mainTextEn", value: "Since 2017, ON DM has been a trusted digital solutions agency serving Egypt, Saudi Arabia, and the UAE. We use the latest strategies and data-driven insights to help businesses build a strong online presence." },
    { key: "ourStory.mainTextAr", value: "منذ عام 2017، كانت ON DM وكالة حلول رقمية موثوقة تخدم مصر والسعودية والإمارات." },
    { key: "ourStory.taglineEn", value: "We combine creativity with data to deliver results that matter." },
    { key: "ourStory.taglineAr", value: "نجمع بين الإبداع والبيانات لتقديم نتائج ذات أهمية." },
    { key: "ourStory.stats.years", value: "7+" },
    { key: "ourStory.stats.years.labelEn", value: "Years of experience" },
    { key: "ourStory.stats.years.labelAr", value: "سنوات من الخبرة" },
    { key: "ourStory.stats.employees", value: "30+" },
    { key: "ourStory.stats.employees.labelEn", value: "Team members" },
    { key: "ourStory.stats.employees.labelAr", value: "أعضاء الفريق" },
    { key: "ourStory.stats.products", value: "42+" },
    { key: "ourStory.stats.products.labelEn", value: "Projects delivered" },
    { key: "ourStory.stats.products.labelAr", value: "مشاريع منجزة" },
    { key: "hero.startProjectEn", value: "Start Project" },
    { key: "hero.startProjectAr", value: "ابدأ المشروع" },
    { key: "hero.exploreServicesEn", value: "Explore Services" },
    { key: "hero.exploreServicesAr", value: "استكشف الخدمات" },
    { key: "hero.startProjectHref", value: "/contact" },
    { key: "hero.exploreServicesHref", value: "/services" },
    { key: "servicesIntro.badgeEn", value: "Our Services" },
    { key: "servicesIntro.badgeAr", value: "خدماتنا" },
    { key: "servicesIntro.titleEn", value: "Our Services" },
    { key: "servicesIntro.titleAr", value: "خدماتنا" },
    { key: "servicesIntro.descriptionEn", value: "We offer a full range of digital solutions to help your business grow." },
    { key: "servicesIntro.descriptionAr", value: "نقدم مجموعة كاملة من الحلول الرقمية لمساعدة أعمالك على النمو." },
    { key: "servicesIntro.knowMoreEn", value: "Know More" },
    { key: "servicesIntro.knowMoreAr", value: "اعرف المزيد" },
    { key: "servicesIntro.knowMoreHref", value: "/services" },
    { key: "workIntro.badgeEn", value: "Our Work" },
    { key: "workIntro.badgeAr", value: "أعمالنا" },
    { key: "workIntro.titleEn", value: "Our Work" },
    { key: "workIntro.titleAr", value: "أعمالنا" },
    { key: "workIntro.descriptionEn", value: "Explore our portfolio of successful projects and case studies." },
    { key: "workIntro.descriptionAr", value: "استكشف مجموعة مشاريعنا الناجحة ودراسات الحالة." },
    { key: "workIntro.viewCaseStudiesEn", value: "View Case Studies" },
    { key: "workIntro.viewCaseStudiesAr", value: "عرض دراسات الحالة" },
    { key: "workIntro.viewCaseStudiesHref", value: "/work" },
    { key: "clients.badgeEn", value: "Our Clients" },
    { key: "clients.badgeAr", value: "عملاؤنا" },
    { key: "clients.titleEn", value: "Trusted by leading brands" },
    { key: "clients.titleAr", value: "موثوق من قبل العلامات الرائدة" },
    { key: "clients.descriptionEn", value: "We've helped businesses across industries achieve their digital goals." },
    { key: "clients.descriptionAr", value: "ساعدنا الشركات في مختلف الصناعات على تحقيق أهدافها الرقمية." },
    { key: "blog.badgeEn", value: "Blog" },
    { key: "blog.badgeAr", value: "المدونة" },
    { key: "blog.titleEn", value: "Latest insights" },
    { key: "blog.titleAr", value: "أحدث المقالات" },
    { key: "blog.descriptionEn", value: "Stay updated with our latest articles and industry insights." },
    { key: "blog.descriptionAr", value: "ابقَ على اطلاع بأحدث مقالاتنا ورؤى الصناعة." },
    { key: "blog.exploreBlogEn", value: "Explore Blog" },
    { key: "blog.exploreBlogAr", value: "استكشف المدونة" },
    { key: "blog.readMoreEn", value: "Read More" },
    { key: "blog.readMoreAr", value: "اقرأ المزيد" },
    { key: "blog.exploreBlogHref", value: "/blog" },
  ];

  for (const config of homepageConfigs) {
    await prisma.homepageConfig.upsert({
      where: { key: config.key },
      update: {}, // Never overwrite - preserve dashboard edits
      create: config,
    });
  }

  const partnerCount = await prisma.successPartner.count();
  if (partnerCount === 0) {
    await prisma.successPartner.createMany({
      data: [
        { logoUrl: "/Tfaseel.svg", websiteUrl: "https://tfaseel.com/", label: "Tfaseel", sortOrder: 0 },
        { logoUrl: "/Bubbles.svg", websiteUrl: "https://bubbleskidswear.com/", label: "Bubbles", sortOrder: 1 },
        { logoUrl: "/3abq.svg", websiteUrl: "https://web.3baq.com.sa/", label: "3abq", sortOrder: 2 },
        { logoUrl: "/Wessam-el-shutter.svg", websiteUrl: "https://sa.el-shutter.com/", label: "Wessam El-Shutter", sortOrder: 3 },
      ],
    });
  }

  // Seed contact page config
  const contactPageConfigs = [
    { key: "contact.titleEn", value: "Contact us" },
    { key: "contact.titleAr", value: "تواصل معنا" },
    { key: "contact.descriptionEn", value: "Get in touch with our team. We're here to help." },
    { key: "contact.descriptionAr", value: "تواصل مع فريقنا. نحن هنا لمساعدتك." },
    { key: "contact.whatsappUrl", value: "https://wa.me/201234567890" },
    { key: "contact.phoneNumber", value: "+20 123 456 7890" },
    { key: "contact.meetingUrl", value: "https://calendly.com/ondm" },
    { key: "contact.whatsappTextEn", value: "WhatsApp" },
    { key: "contact.whatsappTextAr", value: "واتساب" },
    { key: "contact.callTextEn", value: "Call" },
    { key: "contact.callTextAr", value: "اتصل" },
    { key: "contact.meetingTextEn", value: "Book a meeting" },
    { key: "contact.meetingTextAr", value: "احجز اجتماعاً" },
    { key: "contact.formHeadingEn", value: "Send us a message" },
    { key: "contact.formHeadingAr", value: "أرسل لنا رسالة" },
    { key: "contact.email", value: "help@ondm.com" },
    { key: "contact.address1En", value: "123 Business St, Cairo, Egypt" },
    { key: "contact.address1Ar", value: "شارع الأعمال 123، القاهرة، مصر" },
    { key: "contact.address2En", value: "Dubai Office, UAE" },
    { key: "contact.address2Ar", value: "مكتب دبي، الإمارات" },
    { key: "contact.mapLatitude", value: "30.0444" },
    { key: "contact.mapLongitude", value: "31.2357" },
    { key: "contact.mapZoom", value: "15" },
    { key: "contact.mapMarkerLatitude", value: "30.0444" },
    { key: "contact.mapMarkerLongitude", value: "31.2357" },
  ];

  for (const config of contactPageConfigs) {
    await prisma.homepageConfig.upsert({
      where: { key: config.key },
      update: {}, // Never overwrite - preserve dashboard edits
      create: config,
    });
  }

  // Seed nav, footer, cta, pages, buttons, colors
  const siteConfigs = [
    { key: "nav.services", value: "Services" },
    { key: "nav.servicesAr", value: "الخدمات" },
    { key: "nav.work", value: "Work" },
    { key: "nav.workAr", value: "أعمالنا" },
    { key: "nav.about", value: "About" },
    { key: "nav.aboutAr", value: "من نحن" },
    { key: "nav.contact", value: "Contact" },
    { key: "nav.contactAr", value: "تواصل" },
    { key: "nav.getInTouch", value: "Get in touch" },
    { key: "nav.getInTouchAr", value: "تواصل معنا" },
    { key: "nav.chatNow", value: "Chat Now" },
    { key: "nav.chatNowAr", value: "تواصل الآن" },
    { key: "nav.megaMenu.title", value: "Our Services" },
    { key: "nav.megaMenu.titleAr", value: "خدماتنا" },
    { key: "nav.megaMenu.description", value: "Explore our digital solutions" },
    { key: "nav.megaMenu.descriptionAr", value: "استكشف حلولنا الرقمية" },
    { key: "nav.megaMenu.viewAll", value: "View All" },
    { key: "nav.megaMenu.viewAllAr", value: "عرض الكل" },
    { key: "nav.megaMenu.categories.software", value: "Software" },
    { key: "nav.megaMenu.categories.softwareAr", value: "البرمجيات" },
    { key: "nav.megaMenu.categories.marketing", value: "Marketing" },
    { key: "nav.megaMenu.categories.marketingAr", value: "التسويق" },
    { key: "nav.megaMenu.categories.design", value: "Design" },
    { key: "nav.megaMenu.categories.designAr", value: "التصميم" },
    { key: "nav.megaMenu.items.webDev", value: "Web Development" },
    { key: "nav.megaMenu.items.webDevAr", value: "تطوير الويب" },
    { key: "nav.megaMenu.items.appDev", value: "App Development" },
    { key: "nav.megaMenu.items.appDevAr", value: "تطوير التطبيقات" },
    { key: "nav.megaMenu.items.itBusiness", value: "IT & Business" },
    { key: "nav.megaMenu.items.itBusinessAr", value: "تقنية المعلومات والأعمال" },
    { key: "nav.megaMenu.items.digitalMarketing", value: "Digital Marketing" },
    { key: "nav.megaMenu.items.digitalMarketingAr", value: "التسويق الرقمي" },
    { key: "nav.megaMenu.items.socialMedia", value: "Social Media" },
    { key: "nav.megaMenu.items.socialMediaAr", value: "وسائل التواصل" },
    { key: "nav.megaMenu.items.branding", value: "Branding" },
    { key: "nav.megaMenu.items.brandingAr", value: "العلامة التجارية" },
    { key: "nav.megaMenu.items.uxDesign", value: "UX Design" },
    { key: "nav.megaMenu.items.uxDesignAr", value: "تصميم تجربة المستخدم" },
    { key: "nav.workMegaMenu.title", value: "Our Work" },
    { key: "nav.workMegaMenu.titleAr", value: "أعمالنا" },
    { key: "nav.workMegaMenu.description", value: "Explore our projects" },
    { key: "nav.workMegaMenu.descriptionAr", value: "استكشف مشاريعنا" },
    { key: "nav.workMegaMenu.viewAll", value: "View All" },
    { key: "nav.workMegaMenu.viewAllAr", value: "عرض الكل" },
    { key: "nav.workMegaMenu.project.link", value: "View Project" },
    { key: "nav.workMegaMenu.project.linkAr", value: "عرض المشروع" },
    { key: "footer.contactInfo.labelEn", value: "Get in touch" },
    { key: "footer.contactInfo.labelAr", value: "تواصل معنا" },
    { key: "footer.contactInfo.titleEn", value: "Contact" },
    { key: "footer.contactInfo.titleAr", value: "تواصل" },
    { key: "footer.contactInfo.emailLabelEn", value: "Email" },
    { key: "footer.contactInfo.emailLabelAr", value: "البريد الإلكتروني" },
    { key: "footer.contactInfo.phoneLabelEn", value: "Phone" },
    { key: "footer.contactInfo.phoneLabelAr", value: "الهاتف" },
    { key: "footer.contactInfo.locationLabelEn", value: "Location" },
    { key: "footer.contactInfo.locationLabelAr", value: "الموقع" },
    { key: "footer.contactInfo.followUsLabelEn", value: "Follow us" },
    { key: "footer.contactInfo.followUsLabelAr", value: "تابعنا" },
    { key: "footer.contactInfo.address1En", value: "123 Business St, Cairo, Egypt" },
    { key: "footer.contactInfo.address1Ar", value: "شارع الأعمال 123، القاهرة، مصر" },
    { key: "footer.contactInfo.address2En", value: "Dubai Office, UAE" },
    { key: "footer.contactInfo.address2Ar", value: "مكتب دبي، الإمارات" },
    { key: "footer.newsletter.titleEn", value: "Stay updated" },
    { key: "footer.newsletter.titleAr", value: "ابقَ على اطلاع" },
    {
      key: "footer.newsletter.descriptionEn",
      value: "Contact us today, and let us help you turn your ideas into tangible results.",
    },
    {
      key: "footer.newsletter.descriptionAr",
      value: "تواصل معنا اليوم، ودعنا نساعدك في تحويل أفكارك إلى نتائج ملموسة",
    },
    { key: "footer.newsletter.placeholderEn", value: "Enter your email" },
    { key: "footer.newsletter.placeholderAr", value: "أدخل بريدك الإلكتروني" },
    { key: "footer.newsletter.subscribeEn", value: "Subscribe" },
    { key: "footer.newsletter.subscribeAr", value: "اشترك" },
    { key: "footer.newsletter.privacyEn", value: "By subscribing you agree to our Privacy Policy" },
    { key: "footer.newsletter.privacyAr", value: "بالتسجيل فإنك توافق على سياسة الخصوصية" },
    { key: "footer.nav.aboutUsEn", value: "About us" },
    { key: "footer.nav.aboutUsAr", value: "من نحن" },
    { key: "footer.nav.servicesEn", value: "Services" },
    { key: "footer.nav.servicesAr", value: "الخدمات" },
    { key: "footer.nav.workEn", value: "Work" },
    { key: "footer.nav.workAr", value: "أعمالنا" },
    { key: "footer.nav.blogEn", value: "Blog" },
    { key: "footer.nav.blogAr", value: "المدونة" },
    { key: "footer.nav.contactUsEn", value: "Contact us" },
    { key: "footer.nav.contactUsAr", value: "تواصل معنا" },
    { key: "footer.copyright", value: "© 2025 ON DM. All rights reserved." },
    { key: "footer.social.show", value: "true" },
    { key: "footer.social.facebook", value: "" },
    { key: "footer.social.tiktok", value: "" },
    { key: "footer.social.snapchat", value: "" },
    { key: "footer.social.instagram", value: "" },
    { key: "footer.social.youtube", value: "" },
    { key: "footer.social.x", value: "" },
    { key: "cta.titleEn", value: "Ready to start?" },
    { key: "cta.titleAr", value: "مستعد للبدء؟" },
    { key: "cta.descriptionEn", value: "Let's build something great together." },
    { key: "cta.descriptionAr", value: "لنبني شيئاً رائعاً معاً." },
    { key: "cta.whatsappEn", value: "WhatsApp" },
    { key: "cta.whatsappAr", value: "واتساب" },
    { key: "cta.callUsEn", value: "Call us" },
    { key: "cta.callUsAr", value: "اتصل بنا" },
    { key: "cta.bookMeetingEn", value: "Book a meeting" },
    { key: "cta.bookMeetingAr", value: "احجز اجتماعاً" },
    { key: "cta.whatsappHref", value: "https://wa.me/201234567890" },
    { key: "cta.callHref", value: "tel:+201234567890" },
    { key: "cta.meetingHref", value: "https://calendly.com/ondm" },
    { key: "about.hero.badgeEn", value: "About" },
    { key: "about.hero.badgeAr", value: "من نحن" },
    { key: "about.hero.titleEn", value: "About us" },
    { key: "about.hero.titleAr", value: "من نحن" },
    { key: "about.hero.descriptionEn", value: "We are a digital solutions agency." },
    { key: "about.hero.descriptionAr", value: "نحن وكالة حلول رقمية." },
    { key: "about.testimonial.quoteEn", value: "Great team to work with." },
    { key: "about.testimonial.quoteAr", value: "فريق رائع للعمل معه." },
    { key: "about.testimonial.nameEn", value: "John Doe" },
    { key: "about.testimonial.nameAr", value: "جون دو" },
    { key: "about.testimonial.roleEn", value: "CEO, Company" },
    { key: "about.testimonial.roleAr", value: "الرئيس التنفيذي، الشركة" },
    { key: "about.features.headingEn", value: "Why choose us" },
    { key: "about.features.headingAr", value: "لماذا تختارنا" },
    { key: "about.features.subheadingEn", value: "We deliver results that matter" },
    { key: "about.features.subheadingAr", value: "نقدم نتائج ذات أهمية" },
    { key: "about.features.feature1.titleEn", value: "Expertise" },
    { key: "about.features.feature1.titleAr", value: "الخبرة" },
    { key: "about.features.feature1.descriptionEn", value: "Years of experience in digital solutions." },
    { key: "about.features.feature1.descriptionAr", value: "سنوات من الخبرة في الحلول الرقمية." },
    { key: "about.features.feature2.titleEn", value: "Innovation" },
    { key: "about.features.feature2.titleAr", value: "الابتكار" },
    { key: "about.features.feature2.descriptionEn", value: "Cutting-edge strategies and technologies." },
    { key: "about.features.feature2.descriptionAr", value: "استراتيجيات وتقنيات متطورة." },
    { key: "about.features.feature3.titleEn", value: "Results" },
    { key: "about.features.feature3.titleAr", value: "النتائج" },
    { key: "about.features.feature3.descriptionEn", value: "Data-driven approach to deliver impact." },
    { key: "about.features.feature3.descriptionAr", value: "نهج قائم على البيانات لتقديم التأثير." },
    { key: "about.team.headingEn", value: "Our Team" },
    { key: "about.team.headingAr", value: "فريقنا" },
    { key: "about.team.subheadingEn", value: "Meet the people behind ON DM" },
    { key: "about.team.subheadingAr", value: "تعرف على فريق ON DM" },
    { key: "about.team.viewAllEn", value: "View All" },
    { key: "about.team.viewAllAr", value: "عرض الكل" },
    { key: "servicesPage.badgeEn", value: "Services" },
    { key: "servicesPage.badgeAr", value: "الخدمات" },
    { key: "servicesPage.titleEn", value: "What we offer" },
    { key: "servicesPage.titleAr", value: "ما نقدمه" },
    { key: "servicesPage.descriptionEn", value: "Comprehensive digital solutions for your business." },
    { key: "servicesPage.descriptionAr", value: "حلول رقمية شاملة لأعمالك." },
    { key: "servicesPage.filters.viewAllEn", value: "View all" },
    { key: "servicesPage.filters.viewAllAr", value: "عرض الكل" },
    { key: "servicesPage.filters.designEn", value: "Design" },
    { key: "servicesPage.filters.designAr", value: "التصميم" },
    { key: "servicesPage.filters.marketingEn", value: "Marketing" },
    { key: "servicesPage.filters.marketingAr", value: "التسويق" },
    { key: "servicesPage.filters.softwareEn", value: "Software" },
    { key: "servicesPage.filters.softwareAr", value: "البرمجيات" },
    { key: "serviceCard.requestPricingEn", value: "Request pricing" },
    { key: "serviceCard.requestPricingAr", value: "طلب عرض أسعار" },
    { key: "serviceCard.viewWorkSamplesEn", value: "View work samples" },
    { key: "serviceCard.viewWorkSamplesAr", value: "عرض عينات العمل" },
    { key: "work.titleEn", value: "Our Work" },
    { key: "work.titleAr", value: "أعمالنا" },
    { key: "work.subtitleEn", value: "Explore our projects" },
    { key: "work.subtitleAr", value: "استكشف مشاريعنا" },
    { key: "workCard.seeFullProjectEn", value: "See full project" },
    { key: "workCard.seeFullProjectAr", value: "عرض المشروع كاملاً" },
    { key: "workCard.seeLiveChannelsEn", value: "See live channels" },
    { key: "workCard.seeLiveChannelsAr", value: "عرض القنوات المباشرة" },
    { key: "workContent.viewFullProjectEn", value: "View full project" },
    { key: "workContent.viewFullProjectAr", value: "عرض المشروع كاملاً" },
    { key: "workPage.viewAllLink", value: "/work" },
    { key: "blogPage.badgeEn", value: "Blog" },
    { key: "blogPage.badgeAr", value: "المدونة" },
    { key: "blogPage.titleEn", value: "Latest insights" },
    { key: "blogPage.titleAr", value: "أحدث المقالات" },
    { key: "blogPage.descriptionEn", value: "Stay updated with our latest articles and insights." },
    { key: "blogPage.descriptionAr", value: "ابقَ على اطلاع بأحدث مقالاتنا ورؤانا." },
    { key: "blogPage.placeholderEn", value: "Enter your email" },
    { key: "blogPage.placeholderAr", value: "أدخل بريدك الإلكتروني" },
    { key: "blogPage.subscribeEn", value: "Subscribe to our newsletter" },
    { key: "blogPage.subscribeAr", value: "اشترك في نشرتنا" },
    { key: "buttons.requestPricing", value: "Request pricing" },
    { key: "buttons.requestPricingAr", value: "طلب عرض أسعار" },
    { key: "buttons.viewWorkSamples", value: "View work samples" },
    { key: "buttons.viewWorkSamplesAr", value: "عرض عينات العمل" },
    { key: "buttons.seeFullProject", value: "See full project" },
    { key: "buttons.seeFullProjectAr", value: "عرض المشروع كاملاً" },
    { key: "colors.primary", value: "#000000" },
    { key: "colors.ctaBg", value: "#000000" },
    { key: "colors.ctaButton", value: "#A8E5E0" },
    { key: "colors.heroBg", value: "#ffffff" },
    { key: "colors.primaryButton", value: "#000000" },
    { key: "colors.footerBg", value: "#0a0a0a" },
  ];

  for (const config of siteConfigs) {
    await prisma.homepageConfig.upsert({
      where: { key: config.key },
      update: {}, // Never overwrite - preserve dashboard edits
      create: config,
    });
  }

  // Seed sample projects
  const projects = [
    {
      slug: "lms-platform",
      type: "software",
      category: "Learning Management System",
      titleEn: "LMS Platform for Education",
      titleAr: "منصة تعليمية لإدارة التعلم",
      descriptionEn:
        "A comprehensive learning management system built for educational institutions with course management, assessments, and analytics.",
      descriptionAr:
        "نظام إدارة تعلم شامل للمؤسسات التعليمية مع إدارة الدورات والتقييمات والتحليلات.",
      imageUrl: null,
      imageUrls: JSON.stringify(["/uploads/project-lms-1.jpg"]),
      tags: JSON.stringify([
        { label: "Software", color: "blue" },
        { label: "Education", color: "green" },
      ]),
      liveUrl: "https://example.com/lms",
      contentEn: "<p>Full project details...</p>",
      contentAr: "<p>تفاصيل المشروع الكاملة...</p>",
      published: true,
      sortOrder: 0,
    },
    {
      slug: "brand-rebrand",
      type: "design",
      category: "Brand Identity",
      titleEn: "Brand Rebrand & Visual Identity",
      titleAr: "إعادة تصميم العلامة التجارية والهوية البصرية",
      descriptionEn:
        "Complete brand refresh including logo, color palette, typography, and brand guidelines for a tech startup.",
      descriptionAr:
        "تحديث كامل للعلامة التجارية يشمل الشعار ونظام الألوان والطباعة وإرشادات العلامة التجارية.",
      imageUrl: null,
      imageUrls: null,
      tags: JSON.stringify([
        { label: "Design", color: "purple" },
        { label: "Branding", color: "orange" },
      ]),
      liveUrl: null,
      contentEn: "",
      contentAr: "",
      published: true,
      sortOrder: 1,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
  }

  // Seed sample blog post
  await prisma.blogPost.upsert({
    where: { slug: "bill-walsh-leadership-lessons" },
    update: {},
    create: {
      slug: "bill-walsh-leadership-lessons",
      titleEn: "Bill Walsh leadership lessons",
      titleAr: "دروس القيادة من بيل والش",
      excerptEn:
        "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
      excerptAr: "هل تريد معرفة أسرار تحويل فريق 2-14 إلى سلالة فائزة بثلاثة سوبر بول؟",
      contentEn: "<p>Full content here...</p>",
      contentAr: "<p>المحتوى الكامل هنا...</p>",
      imageColor: "#F3E5F5",
      tags: JSON.stringify(["Design", "Marketing", "Software"]),
      published: true,
      publishedAt: new Date(),
    },
  });

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
