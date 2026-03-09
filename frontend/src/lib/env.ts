const required = ["NEXT_PUBLIC_API_URL"] as const;

export function validateEnv() {
  if (typeof window !== "undefined") return;
  for (const key of required) {
    if (!process.env[key]) {
      console.warn(`Missing env: ${key}`);
    }
  }
}
