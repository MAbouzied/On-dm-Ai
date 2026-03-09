"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { WorkCard } from "./work-card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import Button from "../ui/Button";
import { API_URL } from "@/lib/api";
import { getConfigEnAr } from "@/lib/site-config-context";

const FILTERS = [
  { id: "all", label: "View all services" },
  { id: "design", label: "Design" },
  { id: "marketing", label: "Marketing" },
  { id: "software", label: "Software Solutions & Services" },
];

type ProjectTag = { label: string; color: "purple" | "orange" | "blue" };

function parseTags(tagsStr: string | null | undefined): ProjectTag[] {
  if (!tagsStr) return [];
  try {
    const parsed = JSON.parse(tagsStr) as Array<{ label?: string; color?: string }>;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t.label === "string")
      .map((t) => ({
        label: t.label,
        color: (t.color === "purple" || t.color === "orange" || t.color === "blue"
          ? t.color
          : "purple") as ProjectTag["color"],
      }));
  } catch {
    return [];
  }
}

function resolveImageUrl(
  imageUrl: string | null | undefined,
  imageUrls: string | string[] | null | undefined
): string {
  let path = "";
  if (imageUrls) {
    const urls = Array.isArray(imageUrls)
      ? imageUrls
      : (() => {
          try {
            return JSON.parse(imageUrls || "[]") || [];
          } catch {
            return [];
          }
        })();
    path = Array.isArray(urls) && urls[0] ? urls[0] : "";
  }
  if (!path && imageUrl) path = imageUrl;
  if (!path) return "https://placehold.co/800x600/e5e7eb/9ca3af?text=Project";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = API_URL.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

interface ApiProject {
  id: string;
  slug: string;
  type: string;
  category?: string | null;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl?: string | null;
  imageUrls?: string | string[] | null;
  tags: string;
  liveUrl?: string | null;
}

interface WorkListProps {
  projects: ApiProject[];
  locale: string;
  config?: Record<string, string>;
}

export function WorkList({ projects, locale, config = {} }: WorkListProps) {
  const t = useTranslations("work");
  const tWorkCard = useTranslations("workCard");
  const [activeFilter, setActiveFilter] = useState("all");
  const title = getConfigEnAr(config, "work.title", locale, t("title"));
  const subtitle = getConfigEnAr(config, "work.subtitle", locale, t("subtitle"));
  const seeFullProject = getConfigEnAr(config, "workCard.seeFullProject", locale, tWorkCard("seeFullProject"));
  const seeLiveChannels = getConfigEnAr(config, "workCard.seeLiveChannels", locale, tWorkCard("seeLiveChannels"));

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === "all") return true;
    return project.type === activeFilter;
  });

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="mb-16 flex flex-col items-center text-center">
        <span className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
          {subtitle}
        </span>
        <h1 className="mb-12 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          {title}
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
        {filteredProjects.map((project) => {
          const title = locale === "ar" ? project.titleAr : project.titleEn;
          const description =
            locale === "ar" ? project.descriptionAr : project.descriptionEn;
          return (
            <WorkCard
              key={project.id}
              title={title}
              category={project.category ?? ""}
              description={description}
              image={resolveImageUrl(project.imageUrl, project.imageUrls)}
              tags={parseTags(project.tags)}
              slug={project.slug}
              liveUrl={project.liveUrl ?? undefined}
              seeFullProjectLabel={seeFullProject}
              seeLiveChannelsLabel={seeLiveChannels}
            />
          );
        })}
      </div>

      {/* Pagination - only show when more than 4 projects */}
      {filteredProjects.length > 4 && (
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
      )}
    </div>
  );
}
