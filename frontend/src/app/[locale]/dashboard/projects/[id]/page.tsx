"use client";

import dynamic from "next/dynamic";

const EditProjectForm = dynamic(
  () =>
    import("./edit-project-form").then((mod) => ({
      default: mod.EditProjectForm,
    })),
  { ssr: false, loading: () => <div>Loading...</div> }
);

export default function EditProjectPage() {
  return <EditProjectForm />;
}
