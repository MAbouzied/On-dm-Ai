import { BlogCard } from "./blog-card";
import { RECENT_POSTS } from "@/lib/constants";

export function RecentPosts() {
  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-black mb-8">Recent blog posts</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Large Vertical Card */}
        <div className="w-full">
          <BlogCard layout="vertical" {...RECENT_POSTS[0]} />
        </div>

        {/* Right Column - Two Horizontal Cards */}
        <div className="flex flex-col gap-8">
          <BlogCard layout="horizontal" {...RECENT_POSTS[1]} />
          <BlogCard layout="horizontal" {...RECENT_POSTS[2]} />
        </div>
      </div>
    </section>
  );
}
