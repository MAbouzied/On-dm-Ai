import { resolveImageUrl, resolveImageUrls } from "./urls.js";
/** Normalize project for API response: imageUrl and imageUrls resolved to full URLs */
export function toProjectResponse(project) {
    let imageUrls = [];
    if (project.imageUrls) {
        try {
            imageUrls = JSON.parse(project.imageUrls);
        }
        catch {
            imageUrls = [];
        }
    }
    else if (project.imageUrl) {
        imageUrls = [project.imageUrl];
    }
    return {
        ...project,
        imageUrl: resolveImageUrl(project.imageUrl),
        imageUrls: resolveImageUrls(imageUrls),
    };
}
