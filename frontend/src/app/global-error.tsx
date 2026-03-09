"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="text-lg text-gray-600">{error.message}</p>
          <button
            onClick={reset}
            className="mt-4 rounded-full bg-black px-6 py-3 text-white hover:bg-gray-800"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
