import { resolveImageUrl, resolveImageUrls } from "./urls.js";
/** Normalize blog post for API response: imageUrl and imageUrls resolved to full URLs */
export function toBlogResponse(post) {
    let imageUrls = [];
    if (post.imageUrls) {
        try {
            imageUrls = JSON.parse(post.imageUrls);
        }
        catch {
            imageUrls = [];
        }
    }
    else if (post.imageUrl) {
        imageUrls = [post.imageUrl];
    }
    return {
        ...post,
        imageUrl: resolveImageUrl(post.imageUrl),
        imageUrls: resolveImageUrls(imageUrls),
    };
}
