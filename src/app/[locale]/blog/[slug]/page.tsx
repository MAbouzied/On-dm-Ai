import { setRequestLocale, getTranslations } from "next-intl/server";
import { BlogPostHero } from "@/components/blog/blog-post-hero";
import { BlogPostContent, ContentBlock } from "@/components/blog/blog-post-content";
import { BlogPostAuthor } from "@/components/blog/blog-post-author";
import { LatestPosts } from "@/components/blog/latest-posts";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  // Mock data - in a real app this would come from a CMS or API based on the slug
  const post = {
    date: "13 Jan 2025",
    title: "A conversation with Lucy Bond",
    description:
      "Lucy Bond is an interior designer who started her career in New Zealand, working for large architectural firms. We chatted to her about design and starting her own studio.",
    images: [
      { color: "#F3E5F5", aspect: "vertical" as const }, // Light purple
      { color: "#F9E8C9", aspect: "horizontal" as const }, // Beige
      { color: "#F0F0F0", aspect: "vertical" as const }, // Light gray
      { color: "#D6EADF", aspect: "horizontal" as const }, // Light green
    ],
    content: [
      {
        type: "heading",
        content: "Introduction",
      },
      {
        type: "paragraph",
        content:
          "Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.",
      },
      {
        type: "paragraph",
        content:
          "Eget quis mi enim, leo lacinia pharetra, semper. Eget in <a href='#'>volutpat mollis</a> at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit <a href='#'>tristique risus</a>, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.",
      },
      {
        type: "image",
        color: "#E8F3D6", // Light green placeholder color
        alt: "Interior design workspace",
        caption: "Image courtesy of Mathilde Langevin via <a href='#' class='underline'>Unsplash</a>",
      },
      {
        type: "quote",
        text: "In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.",
        author: "Olivia Rhye",
        role: "Product Designer",
      },
      {
        type: "paragraph",
        content:
          "Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi <a href='#'>bibendum diam</a>. Tempor integer aliquam in vitae malesuada fringilla.",
      },
      {
        type: "paragraph",
        content:
          "Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat <a href='#'>auctor aliquam</a>. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.",
      },
      {
        type: "paragraph",
        content:
          "Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.",
      },
      {
        type: "heading",
        content: "Other resources",
      },
      {
        type: "paragraph",
        content:
          "Sagittis et eu at elementum, quis in. Proin praesent volutpat egestas sociis sit lorem nunc nunc sit. Eget diam curabitur mi ac. Auctor rutrum lacus malesuada massa ornare et. Vulputate consectetur ac ultrices at diam dui eget fringilla tincidunt. Arcu sit dignissim massa erat cursus vulputate gravida id. Sed quis auctor vulputate hac elementum gravida cursus dis.",
      },
      {
        type: "list",
        items: [
          "Lectus id duis vitae porttitor enim <a href='#'>gravida morbi</a>.",
          "Eu turpis <a href='#'>posuere semper feugiat</a> volutpat elit, ultrices suspendisse. Auctor vel in vitae placerat.",
          "Suspendisse maecenas ac <a href='#'>donec scelerisque</a> diam sed est duis purus.",
        ],
      },
      {
        type: "image",
        color: "#F9E8C9", // Beige placeholder color
        alt: "Abstract design",
        caption: "Image courtesy of Michiel Annaert via <a href='#' class='underline'>Unsplash</a>",
      },
      {
        type: "paragraph",
        content:
          "Lectus leo massa amet posuere. Malesuada mattis non convallis quisque. Libero sit et imperdiet bibendum quisque dictum vestibulum in non. Pretium ultricies tempor non est diam. Enim ut enim amet amet integer cursus. Sit ac commodo pretium sed etiam turpis suspendisse at.",
      },
      {
        type: "paragraph",
        content:
          "Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.",
      },
      {
        type: "conclusion",
        title: "Conclusion",
        content: [
          "Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.",
          "Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.",
          "Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.",
          "Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.",
        ],
      },
    ] as ContentBlock[],
    author: {
      name: "Rene Wells",
      role: "Content Writer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80", // Placeholder image
    },
    tags: [
      { label: "Design", color: "purple" as const },
      { label: "Marketing", color: "orange" as const },
      { label: "Software", color: "blue" as const },
    ],
  };

  return (
    <main className="w-full min-h-screen bg-white">
      <BlogPostHero {...post} publishedLabel={t("published")} />
      <BlogPostContent blocks={post.content} />
      <BlogPostAuthor author={post.author} tags={post.tags} />
      <LatestPosts />
    </main>
  );
}
