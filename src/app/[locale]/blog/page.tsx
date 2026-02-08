import { setRequestLocale } from "next-intl/server";
import { BlogHero } from "@/components/blog/blog-hero";
import { RecentPosts } from "@/components/blog/recent-posts";
import { AllPosts } from "@/components/blog/all-posts";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-[#F9F9F9]">
      <BlogHero />
      <RecentPosts />
      <AllPosts />
    </main>
  );
}
