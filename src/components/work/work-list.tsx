"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { WorkCard } from "./work-card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Button from "../ui/Button";

// Mock data - replace with real data later
const PROJECTS = [
  {
    id: "1",
    title: "uplift",
    category: "Learning Management System",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image: "/uplift.png",
    tags: [
      { label: "Design", color: "purple" },
      { label: "Marketing", color: "orange" },
      { label: "Software", color: "blue" },
    ] as const,
    slug: "uplift-lms",
    liveUrl: "https://example.com",
    type: "software",
  },
  {
    id: "2",
    title: "uplift",
    category: "Learning Management System",
    description:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    image: "/uplift.png",
    tags: [
      { label: "Design", color: "purple" },
      { label: "Marketing", color: "orange" },
      { label: "Software", color: "blue" },
    ] as const,
    slug: "uplift-lms-2",
    liveUrl: "https://example.com",
    type: "design",
  },
  // Add more mock items as needed
];

const FILTERS = [
  { id: "all", label: "View all services" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "software", label: "Software Solutions & Services" },
];

export function WorkList() {
  const t = useTranslations("work");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredProjects = PROJECTS.filter((project) => {
    if (activeFilter === "all") return true;
    return project.type === activeFilter;
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          {t("subtitle")}
        </span>
        <h1 className="mb-12 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {t("title")}
        </h1>

        {/* Filters */}
        <Tabs value={activeFilter} onValueChange={setActiveFilter}>
          <TabsList>
            {FILTERS.map((filter) => (
              <TabsTrigger key={filter.id} value={filter.id} asChild>
                <Button
                  className="py-2! px-3! h-fit! rounded-2xl! shadow-none"
                  variant="light"
                  BorderType="None"
                >
                  {filter.label}
                </Button>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Projects Grid */}
      <div className="flex flex-col gap-12">
        {filteredProjects.map((project) => (
          <WorkCard
            key={project.id}
            title={project.title}
            category={project.category}
            description={project.description}
            image={project.image}
            tags={project.tags}
            slug={project.slug}
            liveUrl={project.liveUrl}
          />
        ))}
      </div>

      {/* Pagination - Visual only for now */}
      <div className="mt-16 flex items-center justify-between border-t border-gray-200 pt-8">
        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
          ← Previous
        </button>
        <div className="flex items-center gap-2">
          <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-sm font-medium text-blue-600">
            1
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
            2
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
            3
          </button>
          <span className="text-gray-400">...</span>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
            8
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
            9
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
            10
          </button>
        </div>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900">
          Next →
        </button>
      </div>
    </div>
  );
}
