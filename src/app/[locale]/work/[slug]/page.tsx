import { WorkPostHero } from '@/components/work/work-post-hero';
import { WorkPostContent, WorkContentBlock } from '@/components/work/work-post-content';
import { LatestWork } from '@/components/work/latest-work';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function WorkDetailsPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  // Mock data - in a real app, fetch based on slug
  const post = {
    date: '13 Jan 2025',
    title: 'BAQ LEARNING',
    description: 'Lucy Bond is an Interior designer who started her career in New Zealand, working for large architectural firms. We chatted to her about design and starting her own studio.',
    tags: [
      { label: 'Application', color: 'yellow' },
      { label: 'Website', color: 'outline' },
      { label: 'Social media Ads', color: 'outline' },
      { label: 'Operation', color: 'outline' },
    ] as const,
    images: [
      '', // Placeholder for purple
      '', // Placeholder for beige
      '', // Placeholder for gray
    ],
    content: [
      {
        type: 'heading',
        content: 'Introduction',
      },
      {
        type: 'paragraph',
        content: 'Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.',
      },
      {
        type: 'paragraph',
        content: 'Eget quis mi enim, leo lacinia pharetra, semper. Eget in <a href="#">volutpat mollis</a> at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit <a href="#">tristique risus</a>, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.',
      },
      {
        type: 'image',
        color: '#E8F5E9', // Light green placeholder
        alt: 'Interior design workspace',
        caption: 'Image courtesy of Mathilde Langevin via',
        captionLink: 'https://unsplash.com',
        captionLinkText: 'Unsplash',
      },
      {
        type: 'quote',
        text: 'In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.',
        author: 'Olivia Rhye',
        role: 'Product Designer',
      },
      {
        type: 'paragraph',
        content: 'Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi <a href="#">bibendum diam</a>. Tempor integer aliquam in vitae malesuada fringilla.',
      },
      {
        type: 'paragraph',
        content: 'Elit nisi in eleifend sed nisi. Pulvinar at orci, proin imperdiet commodo consectetur convallis risus. Sed condimentum enim dignissim adipiscing faucibus consequat, urna. Viverra purus et erat <a href="#">auctor aliquam</a>. Risus, volutpat vulputate posuere purus sit congue convallis aliquet. Arcu id augue ut feugiat donec porttitor neque. Mauris, neque ultricies eu vestibulum, bibendum quam lorem id. Dolor lacus, eget nunc lectus in tellus, pharetra, porttitor.',
      },
      {
        type: 'paragraph',
        content: 'Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus. Quis velit eget ut tortor tellus. Sed vel, congue felis elit erat nam nibh orci.',
      },
      // Web Development Section
      {
        type: 'section-header',
        tag: 'Web development',
        tagColor: 'green',
      },
      {
        type: 'heading',
        content: 'Tools',
      },
      {
        type: 'paragraph',
        content: 'Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.',
      },
      {
        type: 'discovery-card',
        color: '#D1E8E2', // Light green/teal
        title: 'Start discovery our work',
        buttonText: 'View live site',
        buttonLink: '#',
        caption: 'Image courtesy of Michiel Annaert via',
        captionLink: 'https://unsplash.com',
        captionLinkText: 'Unsplash',
      },
      // Social Media Ads Section
      {
        type: 'section-header',
        tag: 'Social media Ads',
        tagColor: 'yellow',
        socials: true,
      },
      {
        type: 'heading',
        content: 'Tools',
      },
      {
        type: 'paragraph',
        content: 'Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.',
      },
      {
        type: 'discovery-card',
        color: '#F9EBC7', // Light yellow/beige
        title: 'Start discovery our work',
        buttonText: 'View live Channels',
        buttonLink: '#',
        caption: 'Image courtesy of Michiel Annaert via',
        captionLink: 'https://unsplash.com',
        captionLinkText: 'Unsplash',
      },
      // IT & Operation Management Section
      {
        type: 'section-header',
        tag: 'IT & Operation management',
        tagColor: 'purple',
      },
      {
        type: 'heading',
        content: 'Tools',
      },
      {
        type: 'paragraph',
        content: 'Pharetra morbi libero id aliquam elit massa integer tellus. Quis felis aliquam ullamcorper porttitor. Pulvinar ullamcorper sit dictumst ut eget a, elementum eu. Maecenas est morbi mattis id in ac pellentesque ac.',
      },
      {
        type: 'image',
        color: '#F3E5F5', // Light purple
        alt: 'IT & Operation management',
        caption: 'Image courtesy of Michiel Annaert via',
        captionLink: 'https://unsplash.com',
        captionLinkText: 'Unsplash',
      },
      // Conclusion Section
      {
        type: 'conclusion',
        title: 'Conclusion',
        content: [
          'Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.',
          'Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.',
          'Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor.',
          'Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.',
        ],
      },
    ] as WorkContentBlock[],
  };

  return (
    <main className="min-h-screen bg-white pt-24">
      <WorkPostHero
        date={post.date}
        title={post.title}
        description={post.description}
        tags={post.tags}
        images={post.images}
      />
      <WorkPostContent blocks={post.content} />
      <LatestWork />
    </main>
  );
}
