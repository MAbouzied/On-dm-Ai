"use client";

import dynamic from "next/dynamic";

const EditBlogForm = dynamic(
  () => import("./edit-blog-form").then((mod) => ({ default: mod.EditBlogForm })),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export default function EditBlogPage() {
  return <EditBlogForm />;
}
