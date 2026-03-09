"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const addImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg,image/png,image/webp";
    input.multiple = false;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      if (file.size > MAX_IMAGE_SIZE) {
        alert("Image must be under 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        editor.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }, [editor]);

  return (
    <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 px-2 py-1">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(
          "rounded px-2 py-1 text-sm font-medium",
          editor.isActive("bold") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        Bold
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(
          "rounded px-2 py-1 text-sm font-medium",
          editor.isActive("italic") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        Italic
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(
          "rounded px-2 py-1 text-sm font-medium",
          editor.isActive("underline") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        Underline
      </button>
      <span className="mx-1 self-center text-gray-300">|</span>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          "rounded px-2 py-1 text-sm font-medium",
          editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        H2
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={cn(
          "rounded px-2 py-1 text-sm font-medium",
          editor.isActive("heading", { level: 3 }) ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        H3
      </button>
      <span className="mx-1 self-center text-gray-300">|</span>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(
          "rounded px-2 py-1 text-sm font-medium",
          editor.isActive("bulletList") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        Bullet
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(
          "rounded px-2 py-1 text-sm font-medium",
          editor.isActive("orderedList") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        Numbered
      </button>
      <span className="mx-1 self-center text-gray-300">|</span>
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Link URL:");
          if (url) editor.chain().focus().setLink({ href: url }).run();
        }}
        className={cn(
          "rounded px-2 py-1 text-sm font-medium",
          editor.isActive("link") ? "bg-gray-200" : "hover:bg-gray-100"
        )}
      >
        Link
      </button>
      <button
        type="button"
        onClick={addImage}
        className="rounded px-2 py-1 text-sm font-medium hover:bg-gray-100"
      >
        Image
      </button>
    </div>
  );
}

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  className?: string;
  dir?: "ltr" | "rtl";
  disabled?: boolean;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Write your content...",
  className,
  dir = "ltr",
  disabled = false,
}: RichTextEditorProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({ openOnClick: false }),
      Image.configure({ inline: true, allowBase64: true }),
    ],
    content: value ?? "",
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none min-h-[120px] px-3 py-2 focus:outline-none",
        dir,
      },
      handlePaste: (view, event) => {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of Array.from(items)) {
          if (item.type.startsWith("image/") && ALLOWED_IMAGE_TYPES.includes(item.type)) {
            const file = item.getAsFile();
            if (file && file.size <= MAX_IMAGE_SIZE) {
              const reader = new FileReader();
              reader.onload = () => {
                const src = reader.result as string;
                editor?.chain().focus().setImage({ src }).run();
              };
              reader.readAsDataURL(file);
              return true;
            }
          }
        }
        return false;
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [disabled, editor]);

  if (!mounted) {
    return (
      <div className={cn("rounded-md border border-gray-300 bg-gray-50", className)}>
        <div className="flex items-center justify-center py-8 text-gray-500">Loading editor...</div>
      </div>
    );
  }

  if (!editor) {
    return (
      <div className={cn("rounded-md border border-gray-300 bg-gray-50", className)}>
        <div className="flex items-center justify-center py-8 text-gray-500">Loading editor...</div>
      </div>
    );
  }

  return (
    <div className={cn("overflow-hidden rounded-md border border-gray-300 bg-white", className)}>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
