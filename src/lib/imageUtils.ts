// Utility function to get full image URL from backend
export function getBackendImageUrl(imagePath: string | undefined | null): string {
    if (!imagePath) {
        return "https://via.placeholder.com/300x200";
    }

    // If it's already a full URL, return as is
    if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
        return imagePath;
    }

    // Otherwise, prepend the backend URL
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "";

    // Remove trailing slash from backend URL and leading slash from image path
    const cleanBackendUrl = backendUrl.replace(/\/$/, "");
    const cleanImagePath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    return `${cleanBackendUrl}${cleanImagePath}`;
}
