import sanitizeHtml from "sanitize-html";

const SANITIZE_OPTIONS = {
  allowedTags: [
    "p", "br", "strong", "em", "u", "a", "h2", "h3", "ul", "ol", "li",
    "img", "blockquote", "span", "div",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "class"],
    img: ["src", "alt", "class"],
    "*": ["class"],
  },
};

interface SafeHtmlProps {
  html: string;
  className?: string;
  dir?: "ltr" | "rtl";
}

export function SafeHtml({ html, className, dir }: SafeHtmlProps) {
  const sanitized = sanitizeHtml(html, SANITIZE_OPTIONS);

  return (
    <div
      className={className}
      dir={dir}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
