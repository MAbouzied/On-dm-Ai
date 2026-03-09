"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import apiClient from "@/lib/api-client";

interface TeamMember {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  bioEn: string;
  bioAr: string;
  photoUrl: string | null;
  sortOrder: number;
}

export default function TeamPage() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<TeamMember[]>("/api/team")
      .then((res) => setMembers(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Team</h1>
        <Link
          href={`/${locale}/dashboard/team/new`}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Member
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name (EN)</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Role (EN)</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {members.map((m) => (
              <tr key={m.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{m.nameEn}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{m.roleEn}</td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <Link href={`/${locale}/dashboard/team/${m.id}`} className="text-gray-600 hover:text-gray-900">
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
