"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import apiClient from "@/lib/api-client";

interface Service {
  id: string;
  slug: string;
  category: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  tags: string;
  backgroundColor: string;
  isDark: boolean;
  sortOrder: number;
}

export default function ServicesPage() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<Service[]>("/api/services")
      .then((res) => setServices(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Link
          href={`/${locale}/dashboard/services/new`}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Service
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title (EN)</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Slug</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {services.map((s) => (
              <tr key={s.id}>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{s.titleEn}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{s.category}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{s.slug}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <Link href={`/${locale}/dashboard/services/${s.id}`} className="text-gray-600 hover:text-gray-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
