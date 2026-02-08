import { BlogCard } from "./blog-card";
import { CTAButton } from "@/components/ui/cta-button";
import { useTranslations } from "next-intl";

export function LatestPosts() {
  const t = useTranslations("blog");

  const posts = [
    {
      title: "UX review presentations",
      excerpt: "How do you create compelling presentations that wow your colleagues and impress your managers?",
      author: "Olivia Rhye",
      date: "20 Jan 2025",
      tags: ["Design", "Marketing", "Software"],
      imageColor: "#D6EADF",
      href: "/blog/ux-review-presentations",
    },
    {
      title: "Migrating to Linear 101",
      excerpt: "Linear helps streamlines software projects, sprints, tasks, and bug tracking. Here's how to get started.",
      author: "Phoenix Baker",
      date: "19 Jan 2025",
      tags: ["Design", "Marketing"],
      imageColor: "#F9E8C9",
      href: "/blog/migrating-to-linear",
    },
    {
      title: "Building your API Stack",
      excerpt: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
      author: "Lana Steiner",
      date: "18 Jan 2025",
      tags: ["Design", "Marketing"],
      imageColor: "#F3E5F5",
      href: "/blog/building-api-stack",
    },
  ];

  return (
    <section className="w-full py-8 md:py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-black">Latest blog posts</h2>
        <CTAButton href="/blog" variant="secondary" showArrow>
          View all posts
        </CTAButton>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Large Vertical Card */}
        <div className="w-full">
          <BlogCard layout="vertical" {...posts[0]} />
        </div>

        {/* Right Column - Two Horizontal Cards */}
        <div className="flex flex-col gap-6">
          <BlogCard layout="horizontal" {...posts[1]} />
          <BlogCard layout="horizontal" {...posts[2]} />
        </div>
      </div>
    </section>
  );
}
