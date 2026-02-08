import { cn } from "@/lib/utils";
import Image from "next/image";
import { Tag } from "@/components/ui/tag";
import { ArrowUpRight, ChevronDown, Facebook, Instagram, Twitter } from "lucide-react";

export type WorkContentBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "image"; src?: string; color?: string; alt: string; caption?: string; captionLink?: string; captionLinkText?: string }
  | { type: "quote"; text: string; author: string; role: string }
  | { type: "section-header"; tag: string; tagColor: "green" | "yellow" | "purple"; socials?: boolean }
  | { type: "discovery-card"; color: string; title: string; buttonText: string; buttonLink: string; imageSrc?: string; caption?: string; captionLink?: string; captionLinkText?: string }
  | { type: "conclusion"; title: string; content: string[] };

interface WorkPostContentProps {
  blocks: WorkContentBlock[];
}

export function WorkPostContent({ blocks }: WorkPostContentProps) {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="space-y-8 text-lg leading-relaxed text-gray-600">
          {blocks.map((block, index) => {
            switch (block.type) {
              case "heading":
                return (
                  <h2
                    key={index}
                    className="mt-12 text-3xl font-bold text-gray-900 first:mt-0"
                  >
                    {block.content}
                  </h2>
                );
              case "paragraph":
                return (
                  <div
                    key={index}
                    className="[&>a]:font-medium [&>a]:text-gray-900 [&>a]:underline [&>a]:decoration-gray-300 [&>a]:underline-offset-4 hover:[&>a]:decoration-gray-900"
                    dangerouslySetInnerHTML={{ __html: block.content }}
                  />
                );
              case "image":
                return (
                  <figure key={index} className="my-12">
                    <div
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] bg-gray-100"
                      style={{ backgroundColor: block.color }}
                    >
                      {block.src && (
                        <Image
                          src={block.src}
                          alt={block.alt}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    {block.caption && (
                      <figcaption className="mt-4 text-sm text-gray-500">
                        {block.caption}{" "}
                        {block.captionLink && (
                          <a
                            href={block.captionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-gray-300 underline-offset-4 hover:text-gray-900 hover:decoration-gray-900"
                          >
                            {block.captionLinkText || "Link"}
                          </a>
                        )}
                      </figcaption>
                    )}
                  </figure>
                );
              case "quote":
                return (
                  <blockquote
                    key={index}
                    className="my-12 border-l-4 border-purple-600 pl-6"
                  >
                    <p className="mb-4 text-2xl font-medium italic text-gray-900">
                      "{block.text}"
                    </p>
                    <footer className="text-sm font-medium text-gray-500">
                      — {block.author}, {block.role}
                    </footer>
                  </blockquote>
                );
              case "section-header":
                return (
                  <div key={index} className="mt-16 mb-8 flex items-center justify-between">
                    <Tag color={block.tagColor}>{block.tag}</Tag>
                    {block.socials && (
                      <div className="flex gap-3">
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                          <Facebook className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                          <Instagram className="h-4 w-4" />
                        </button>
                        <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                          <Twitter className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              case "discovery-card":
                return (
                  <figure key={index} className="my-12">
                    <div
                      className="relative aspect-[4/3] w-full overflow-hidden rounded-[32px] p-8 flex items-end"
                      style={{ backgroundColor: block.color }}
                    >
                      {block.imageSrc && (
                        <Image
                          src={block.imageSrc}
                          alt={block.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      
                      {/* Overlay Card */}
                      <div className="relative z-10 w-full rounded-[24px] bg-white/90 backdrop-blur-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <span className="text-lg font-medium text-gray-900">{block.title}</span>
                        <a
                          href={block.buttonLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-[#A7E0D8] px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-[#96d0c8]"
                        >
                          {block.buttonText}
                          {block.buttonText.includes("Channels") ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </a>
                      </div>
                    </div>
                    {block.caption && (
                      <figcaption className="mt-4 text-sm text-gray-500">
                        {block.caption}{" "}
                        {block.captionLink && (
                          <a
                            href={block.captionLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline decoration-gray-300 underline-offset-4 hover:text-gray-900 hover:decoration-gray-900"
                          >
                            {block.captionLinkText || "Link"}
                          </a>
                        )}
                      </figcaption>
                    )}
                  </figure>
                );
              case "conclusion":
                return (
                  <div key={index} className="my-16 rounded-[32px] bg-gray-50 p-8 sm:p-12">
                    <h2 className="mb-8 text-3xl font-bold text-gray-900">
                      {block.title}
                    </h2>
                    <div className="space-y-6 text-gray-600">
                      {block.content.map((paragraph, pIndex) => (
                        <p key={pIndex}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </div>
    </section>
  );
}
