import { Tag } from "@/components/ui/tag";

interface BlogPostAuthorProps {
  author: {
    name: string;
    role: string;
    image?: string;
  };
  tags: {
    label: string;
    color: "purple" | "orange" | "blue";
  }[];
}

export function BlogPostAuthor({ author, tags }: BlogPostAuthorProps) {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 md:px-8 pb-12">
      <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Author Info */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shrink-0">
            {author.image ? (
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300" />
            )}
          </div>
          <div>
            <div className="font-bold text-black">{author.name}</div>
            <div className="text-sm text-gray-500">{author.role}</div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Tag key={index} color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>
    </section>
  );
}
