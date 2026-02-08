import { cn } from "@/lib/utils";

export type ContentBlock =
  | { type: "heading"; content: string }
  | { type: "paragraph"; content: string }
  | { type: "image"; src?: string; color?: string; alt: string; caption?: string }
  | { type: "quote"; text: string; author: string; role: string }
  | { type: "list"; items: string[] }
  | { type: "conclusion"; title: string; content: string[] };

interface BlogPostContentProps {
  blocks: ContentBlock[];
}

export function BlogPostContent({ blocks }: BlogPostContentProps) {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 md:px-8 pb-12">
      <div className="space-y-6 text-base md:text-lg text-gray-600 leading-relaxed">
        {blocks.map((block, index) => {
          switch (block.type) {
            case "heading":
              return (
                <h2
                  key={index}
                  className="text-2xl font-bold text-black mt-10 first:mt-0"
                >
                  {block.content}
                </h2>
              );
            case "paragraph":
              return (
                <div
                  key={index}
                  className="[&>a]:text-gray-900 [&>a]:underline [&>a]:decoration-gray-400 [&>a]:underline-offset-4 hover:[&>a]:decoration-gray-900 hover:[&>a]:text-black transition-colors"
                  dangerouslySetInnerHTML={{ __html: block.content }}
                />
              );
            case "image":
              return (
                <figure key={index} className="my-10">
                  <div 
                    className="w-full aspect-[4/3] rounded-2xl bg-gray-100 overflow-hidden"
                    style={{ backgroundColor: block.color }}
                  >
                    {block.src && (
                      <img
                        src={block.src}
                        alt={block.alt}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  {block.caption && (
                    <figcaption className="mt-3 text-sm text-gray-500">
                      {/* Parse caption to handle links if needed, for now simple text/html */}
                      <span dangerouslySetInnerHTML={{ __html: block.caption }} />
                    </figcaption>
                  )}
                </figure>
              );
            case "quote":
              return (
                <blockquote key={index} className="my-10 pl-6 border-l-4 border-[#7F56D9]">
                  <p className="text-xl md:text-2xl font-medium text-gray-900 italic mb-4 leading-normal">
                    “{block.text}”
                  </p>
                  <footer className="text-sm text-gray-500">
                    — {block.author}, {block.role}
                  </footer>
                </blockquote>
              );
            case "list":
              return (
                <ol key={index} className="list-decimal list-inside space-y-2 pl-2">
                  {block.items.map((item, i) => (
                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                  ))}
                </ol>
              );
            case "conclusion":
              return (
                <div key={index} className="bg-gray-50 rounded-2xl p-6 md:p-10 my-10">
                  <h3 className="text-xl md:text-2xl font-bold text-black mb-4">
                    {block.title}
                  </h3>
                  <div className="space-y-4">
                    {block.content.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
}
