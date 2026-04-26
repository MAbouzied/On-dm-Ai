import { setRequestLocale } from "next-intl/server";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <p className="text-gray-600">Welcome to the ON-DM admin dashboard.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href={`/${locale}/dashboard/services`}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300"
        >
          <h2 className="font-semibold">Services</h2>
          <p className="mt-1 text-sm text-gray-500">Manage services content</p>
        </a>
        <a
          href={`/${locale}/dashboard/blog`}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300"
        >
          <h2 className="font-semibold">Blog</h2>
          <p className="mt-1 text-sm text-gray-500">Manage blog posts</p>
        </a>
        <a
          href={`/${locale}/dashboard/projects`}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300"
        >
          <h2 className="font-semibold">Projects</h2>
          <p className="mt-1 text-sm text-gray-500">Manage work projects</p>
        </a>
        <a
          href={`/${locale}/dashboard/homepage`}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300"
        >
          <h2 className="font-semibold">Homepage</h2>
          <p className="mt-1 text-sm text-gray-500">Edit homepage sections</p>
        </a>
        <a
          href={`/${locale}/dashboard/success-partners`}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300"
        >
          <h2 className="font-semibold">Success partners</h2>
          <p className="mt-1 text-sm text-gray-500">Upload homepage client logos (marquee)</p>
        </a>
        <a
          href={`/${locale}/dashboard/contact`}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300"
        >
          <h2 className="font-semibold">Contact</h2>
          <p className="mt-1 text-sm text-gray-500">Edit contact page content</p>
        </a>
        <a
          href={`/${locale}/dashboard/team`}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300"
        >
          <h2 className="font-semibold">Team</h2>
          <p className="mt-1 text-sm text-gray-500">Manage team members</p>
        </a>
        <a
          href={`/${locale}/dashboard/submissions`}
          className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-gray-300"
        >
          <h2 className="font-semibold">Submissions</h2>
          <p className="mt-1 text-sm text-gray-500">View contact form submissions</p>
        </a>
      </div>
    </div>
  );
}
