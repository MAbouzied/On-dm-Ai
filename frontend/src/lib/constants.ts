import DesignTool from "@/icons/DesignTool";
import ServiceMonitor from "@/icons/Monitor";
import Phone from "@/icons/Phone";
import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  Zap,
  Briefcase,
  FileText,
  Share2,
  PenTool,
  Aperture,
  Smartphone,
  Settings,
} from "lucide-react";

// ============================================
// Navigation & Menu Constants
// ============================================

export interface ServiceMenuItem {
  href: string;
  icon: LucideIcon;
  translationKey: string;
}

export interface ServiceCategory {
  translationKey: string;
  items: ServiceMenuItem[];
}

export const SERVICE_CATEGORIES: Record<string, ServiceCategory> = {
  software: {
    translationKey: "megaMenu.categories.software",
    items: [
      {
        href: "/services/web-development",
        icon: Monitor,
        translationKey: "megaMenu.items.webDev",
      },
      {
        href: "/services/app-development",
        icon: Zap,
        translationKey: "megaMenu.items.appDev",
      },
      {
        href: "/services/it-business",
        icon: Briefcase,
        translationKey: "megaMenu.items.itBusiness",
      },
    ],
  },
  marketing: {
    translationKey: "megaMenu.categories.marketing",
    items: [
      {
        href: "/services/digital-marketing",
        icon: FileText,
        translationKey: "megaMenu.items.digitalMarketing",
      },
      {
        href: "/services/social-media",
        icon: Share2,
        translationKey: "megaMenu.items.socialMedia",
      },
    ],
  },
  design: {
    translationKey: "megaMenu.categories.design",
    items: [
      {
        href: "/services/branding",
        icon: PenTool,
        translationKey: "megaMenu.items.branding",
      },
      {
        href: "/services/ux-design",
        icon: Aperture,
        translationKey: "megaMenu.items.uxDesign",
      },
    ],
  },
} as const;

// ============================================
// Services Grid Constants
// ============================================

import type { ComponentType } from "react";

export interface ServiceGridItem {
  icon: ComponentType<any>;
  translationKey: string;
  bgColor: string;
  textColor?: string;
  iconColor?: string;
  roundedCorner: string;
  colSpan?: number;
}

export const SERVICES_GRID: ServiceGridItem[] = [
  {
    icon: DesignTool,
    translationKey: "digitalMarketing",
    bgColor: "#C6E9EB",
    roundedCorner:
      "rounded-tl-4 rounded-tr-[100px] rounded-br-[32px] rounded-bl-[32px]",
  },
  {
    icon: DesignTool,
    translationKey: "socialMedia",
    bgColor: "#FFD16C",
    roundedCorner: "rounded-bl-[5rem]",
  },
  {
    icon: DesignTool,
    translationKey: "uxDesign",
    bgColor: "#F5E6FE",
    roundedCorner: "rounded-bl-[5rem]",
    colSpan: 2,
  },
  {
    icon: ServiceMonitor,
    translationKey: "webDev",
    bgColor: "#D3E8DF",
    roundedCorner: "rounded-tr-[5rem]",
  },
  {
    icon: Phone,
    translationKey: "appDev",
    bgColor: "#F8EACD",
    roundedCorner: "rounded-tl-[5rem]",
  },
  {
    icon: DesignTool,
    translationKey: "itBusiness",
    bgColor: "#542344",
    textColor: "text-white",
    iconColor: "text-white",
    roundedCorner: "rounded-br-[5rem]",
    colSpan: 2,
  },
];

// ============================================
// Services List Page Constants
// ============================================

export interface ServiceListItem {
  category: string;
  title: string;
  description: string;
  tags: string[];
  backgroundColor: string;
  isDark?: boolean;
}

export const SERVICES_LIST: ServiceListItem[] = [
  {
    category: "Marketing",
    title: "Digital Marketing and Advertising Solutions",
    description:
      "We design impactful marketing strategies that combine creativity with data-driven insights to boost visibility, generate leads, and grow your brand across digital platforms.",
    tags: ["Ads", "Campaigns", "Strategy", "Performance"],
    backgroundColor: "#C8EBE9",
  },
  {
    category: "Marketing",
    title: "Social media management",
    description:
      "We craft strategic content, engaging visuals, and targeted campaigns that connect with the right audience — driving awareness, loyalty, and measurable results.",
    tags: ["Strategy", "Content", "Campaigns", "Analytics"],
    backgroundColor: "#FFD670",
  },
  {
    category: "Design",
    title: "User Experience Design",
    description:
      "We create intuitive, user-centered interfaces that blend aesthetics with functionality — ensuring seamless navigation, engagement, and satisfaction across every digital touchpoint.",
    tags: [
      "UX Research",
      "UI Design",
      "App design",
      "Web design",
      "Prototyping",
      "Usability Testing",
    ],
    backgroundColor: "#F3E8FF",
  },
  {
    category: "Software Solutions & Services",
    title: "Web development",
    description:
      "We build fast, secure, and scalable websites tailored to your goals — blending cutting-edge technology with elegant design to deliver exceptional online experiences.",
    tags: ["Frontend", "Backend", "CMS", "Optimization"],
    backgroundColor: "#D6EADF",
  },
  {
    category: "Software Solutions & Services",
    title: "App development",
    description:
      "We turn ideas into powerful, user-friendly mobile apps that perform flawlessly across devices — helping businesses connect, engage, and grow through digital innovation.",
    tags: ["iOS", "Android"],
    backgroundColor: "#F9E8C9",
  },
  {
    category: "Software Solutions & Services",
    title: "IT & Business operations management",
    description:
      "We streamline business operations through tailored IT solutions that improve efficiency, reduce costs, and ensure reliable performance across your digital infrastructure.",
    tags: ["Automation", "Cloud", "Integration", "Optimization"],
    backgroundColor: "#4A2545",
    isDark: true,
  },
  {
    category: "Design",
    title: "Design & Branding",
    description:
      "From logo design to full visual systems, our team blends creativity with strategy to shape powerful brand identities that inspire trust and recognition across every touchpoint.",
    tags: ["Brand Identity", "Visual Design", "Guidelines", "Rebranding"],
    backgroundColor: "#D0E8F2",
  },
];

// ============================================
// Blog Constants
// ============================================

export interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  tags: string[];
  imageColor: string;
  slug?: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Bill Walsh leadership lessons",
    excerpt:
      "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
    author: "Alec Whitten",
    date: "17 Jan 2025",
    tags: ["Design", "Marketing", "Software"],
    imageColor: "#F3E5F5",
  },
  {
    title: "PM mental models",
    excerpt:
      "Mental models are simple expressions of complex processes or relationships.",
    author: "Demi Wilkinson",
    date: "16 Jan 2025",
    tags: ["Design", "Marketing", "Software"],
    imageColor: "#F0F0F0",
  },
  {
    title: "How collaboration makes us better designers",
    excerpt:
      "Collaboration can make our teams stronger, and our individual designs better.",
    author: "Natali Craig",
    date: "14 Jan 2025",
    tags: ["Design", "Marketing", "Software"],
    imageColor: "#F9E8C9",
  },
  {
    title: "Our top 10 Javascript frameworks to use",
    excerpt:
      "JavaScript frameworks make development easy with extensive features and functionalities.",
    author: "Drew Cano",
    date: "13 Jan 2025",
    tags: ["Design", "Marketing", "Software"],
    imageColor: "#D6EADF",
  },
];

export const RECENT_POSTS: BlogPost[] = [
  {
    title: "UX review presentations",
    excerpt:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    author: "Olivia Rhye",
    date: "20 Jan 2025",
    tags: ["Design", "Marketing", "Software"],
    imageColor: "#D6EADF",
  },
  {
    title: "Migrating to Linear 101",
    excerpt:
      "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
    author: "Phoenix Baker",
    date: "19 Jan 2025",
    tags: ["Design", "Marketing", "Software"],
    imageColor: "#F9E8C9",
  },
  {
    title: "Building your API Stack",
    excerpt:
      "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
    author: "Lana Steiner",
    date: "18 Jan 2025",
    tags: ["Design", "Marketing"],
    imageColor: "#F3E5F5",
  },
];

// ============================================
// Footer Navigation
// ============================================

export interface FooterLink {
  href: string;
  labelKey: string;
}

export const FOOTER_LINKS: FooterLink[] = [
  { href: "/about", labelKey: "aboutUs" },
  { href: "/services", labelKey: "services" },
  { href: "/work", labelKey: "work" },
  { href: "/blog", labelKey: "blog" },
  { href: "/contact", labelKey: "contactUs" },
];

// ============================================
// Social Links
// ============================================

export interface SocialLink {
  name: string;
  href: string;
  icon: "facebook" | "instagram" | "twitter";
}

export const SOCIAL_LINKS: SocialLink[] = [
  { name: "Facebook", href: "#", icon: "facebook" },
  { name: "Instagram", href: "#", icon: "instagram" },
  { name: "Twitter", href: "#", icon: "twitter" },
];

// ============================================
// Tag Colors
// ============================================

export const TAG_COLORS: Record<string, string> = {
  Design: "bg-[#F3E5F5] text-[#9C27B0]",
  Marketing: "bg-[#FFF8E1] text-[#FF8F00]",
  Software: "bg-[#E1F5FE] text-[#0288D1]",
  default: "bg-gray-100 text-gray-700",
};

export function getTagColor(tag: string): string {
  return TAG_COLORS[tag] || TAG_COLORS.default;
}
