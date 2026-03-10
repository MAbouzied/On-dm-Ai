// NEXT_PUBLIC_API_URL is optional: "" for same-origin (combined deployment), or backend URL for separate deployment
const required = [] as const;

export function validateEnv() {
  if (typeof window !== "undefined") return;
  for (const key of required) {
    if (!process.env[key]) {
      console.warn(`Missing env: ${key}`);
    }
  }
}
