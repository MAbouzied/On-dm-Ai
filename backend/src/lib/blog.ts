import { resolveImageUrl, resolveImageUrls } from "./urls.js";

/** Normalize blog post for API response: imageUrl and imageUrls resolved to full URLs */
export function toBlogResponse(post: {
  imageUrl: string | null;
  imageUrls: string | null;
  [key: string]: unknown;
}) {
  let imageUrls: string[] = [];
  if (post.imageUrls) {
    try {
      imageUrls = JSON.parse(post.imageUrls) as string[];
    } catch {
      imageUrls = [];
    }
  } else if (post.imageUrl) {
    imageUrls = [post.imageUrl];
  }
  return {
    ...post,
    imageUrl: resolveImageUrl(post.imageUrl),
    imageUrls: resolveImageUrls(imageUrls),
  };
}
