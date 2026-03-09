import { resolveImageUrl, resolveImageUrls } from "./urls.js";

/** Normalize project for API response: imageUrl and imageUrls resolved to full URLs */
export function toProjectResponse(project: {
  imageUrl: string | null;
  imageUrls: string | null;
  [key: string]: unknown;
}) {
  let imageUrls: string[] = [];
  if (project.imageUrls) {
    try {
      imageUrls = JSON.parse(project.imageUrls) as string[];
    } catch {
      imageUrls = [];
    }
  } else if (project.imageUrl) {
    imageUrls = [project.imageUrl];
  }

  return {
    ...project,
    imageUrl: resolveImageUrl(project.imageUrl),
    imageUrls: resolveImageUrls(imageUrls),
  };
}
