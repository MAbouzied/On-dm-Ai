"use client";

import { BlogCard } from "./blog-card";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/lib/constants";

export function AllPosts() {
  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col gap-8 items-center">
        <h2 className="text-2xl font-bold text-black">All blog posts</h2>
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-white p-2 rounded-2xl shadow-sm border border-gray-100 w-full max-w-fit">
          <button className="px-6 py-2.5 rounded-xl bg-black text-white text-sm font-medium transition-colors">
            View all services
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-transparent text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
            Design
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-transparent text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
            Marketing
          </button>
          <button className="px-6 py-2.5 rounded-xl bg-transparent text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
            Software Solutions & Services
          </button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <BlogCard key={index} layout="vertical" {...post} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-100">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        <div className="flex items-center gap-1">
          <button className="w-10 h-10 rounded-lg bg-[#A8E5E0]/20 text-[#00A99D] text-sm font-medium flex items-center justify-center">
            1
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-600 text-sm font-medium flex items-center justify-center hover:bg-gray-50">
            2
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-600 text-sm font-medium flex items-center justify-center hover:bg-gray-50">
            3
          </button>
          <span className="w-10 h-10 flex items-center justify-center text-gray-400">...</span>
          <button className="w-10 h-10 rounded-lg text-gray-600 text-sm font-medium flex items-center justify-center hover:bg-gray-50">
            8
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-600 text-sm font-medium flex items-center justify-center hover:bg-gray-50">
            9
          </button>
          <button className="w-10 h-10 rounded-lg text-gray-600 text-sm font-medium flex items-center justify-center hover:bg-gray-50">
            10
          </button>
        </div>

        <button className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black transition-colors">
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
