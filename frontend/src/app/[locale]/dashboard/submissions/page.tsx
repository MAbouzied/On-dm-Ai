"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/api-client";

interface Submission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  createdAt: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<Submission[]>("/api/contact")
      .then((res) => setSubmissions(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Contact Submissions</h1>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {submissions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                  No submissions yet
                </td>
              </tr>
            ) : (
              submissions.map((s) => (
                <tr key={s.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">{s.name}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{s.email}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{s.phone || "-"}</td>
                  <td className="max-w-xs truncate px-6 py-4 text-sm text-gray-500">{s.message}</td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
