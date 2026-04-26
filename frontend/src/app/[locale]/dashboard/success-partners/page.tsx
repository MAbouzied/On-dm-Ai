"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import apiClient from "@/lib/api-client";

export interface SuccessPartnerRow {
  id: string;
  logoUrl: string;
  websiteUrl: string | null;
  label: string | null;
  sortOrder: number;
}

export default function SuccessPartnersPage() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const [rows, setRows] = useState<SuccessPartnerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<SuccessPartnerRow[]>("/api/success-partners")
      .then((res) => setRows(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Success partners</h1>
        <Link
          href={`/${locale}/dashboard/success-partners/new`}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add partner
        </Link>
      </div>
      <p className="mb-4 text-sm text-gray-600">
        Logos appear in a sliding row on the homepage (logos only). Upload a PNG, WebP, JPEG, or SVG. Optional link opens when visitors click a logo.
      </p>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Logo</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Label (alt)</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Order</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="px-6 py-3">
                  <div className="relative h-10 w-24 bg-gray-50 rounded border border-gray-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.logoUrl} alt="" className="absolute inset-0 m-auto max-h-9 max-w-[90px] object-contain" />
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">{r.label || "—"}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{r.sortOrder}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <Link href={`/${locale}/dashboard/success-partners/${r.id}`} className="text-gray-600 hover:text-gray-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? <p className="p-6 text-sm text-gray-500">No partners yet. Add one or run the database seed.</p> : null}
      </div>
    </div>
  );
}
