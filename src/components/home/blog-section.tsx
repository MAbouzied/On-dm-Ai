import Image from "next/image";
import { LocalizedLink } from "../localized-link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Badge from "../ui/Badge";
import { Span } from "../ui/Text";

export async function BlogSection() {
  const t = await getTranslations("blog");

  const posts = [
    {
      id: "post1",
      image: "/blog-image.png",
      categoryColor: "bg-[#EBF7FF] text-secondary",
    },
    {
      id: "post2",
      image: "/blog-image.png",
      categoryColor: "bg-[#FFEFCF] text-secondary",
    },
  ];

  return (
    <section className="container w-full bg-[#F8F8F8] z-20 py-4 px-4 md:px-8  mx-auto flex flex-col items-center">
      <Badge>{t("badge")}</Badge>

      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight text-center">
        {t("title")}
      </h2>

      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed text-center">
        {t("description")}
      </p>

      <LocalizedLink
        href="/blog"
        className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors mb-16"
      >
        {t("exploreBlog")}
      </LocalizedLink>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-4 group cursor-pointer rounded-2xl border p-6 pb-8 bg-white border-[#EAEAEA]"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={post.image}
                alt={t(`posts.${post.id}.title`)}
                width={554}
                height={364}
              />
            </div>

            <div className="flex flex-col items-start gap-3 mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${post.categoryColor}`}
              >
                {t(`posts.${post.id}.category`)}
              </span>

              <h3>
                <Span variant="B2">{t(`posts.${post.id}.title`)}</Span>
              </h3>

              <div className="flex items-center gap-2 text-gray-900 font-medium mt-2">
                <Span variant="B4" className="text-gray-900 poppins-font">
                  {t("readMore")}
                </Span>
                <ArrowUpRight className="size-6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
