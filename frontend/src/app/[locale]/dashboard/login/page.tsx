"use client";

import { useState } from "react";
import apiClient from "@/lib/api-client";
import { setToken } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await apiClient.post<{ token: string }>("/api/auth/login", {
        email,
        password,
      });
      setToken(data.token);
      const locale = window.location.pathname.split("/")[1] || "en";
      window.location.href = `/${locale}/dashboard`;
    } catch (err: unknown) {
      const axErr = err as { response?: { status?: number }; message?: string };
      if (axErr.response?.status === 401) {
        setError("Invalid email or password");
      } else if (!axErr.response && (axErr.message?.includes("Network") || axErr.message?.includes("timeout"))) {
        setError("Cannot reach server. Make sure the backend is running on port 4000.");
      } else {
        setError(axErr.response?.data?.error || "Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold">ON-DM Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded bg-red-50 p-3 text-sm text-red-600">{error}</div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-500">
          Default: admin@ondm.com / admin123
        </p>
      </div>
    </div>
  );
}
