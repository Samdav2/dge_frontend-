"use server"

import { auth } from "@/auth"

// Helper function to get auth headers
async function getAuthHeaders() {
    const session = await auth();

    if (!session || !session.backendToken) {
        return null;
    }

    let token = session.backendToken;
    if (typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }

    return {
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY || "",
    };
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Get Notifications
export async function getNotifications() {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/notifications/notifications/`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch notifications" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get notifications error:", error);
        return { success: false, error: "Network error" };
    }
}

// Mark Notification as Read
export async function markNotificationAsRead(notificationId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/notifications/notifications/${notificationId}/read`, {
            method: "PUT",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to mark notification as read" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Mark notification as read error:", error);
        return { success: false, error: "Network error" };
    }
}

// Delete Notification
export async function deleteNotification(notificationId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/notifications/notifications/${notificationId}`, {
            method: "DELETE",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to delete notification" };
        }

        return { success: true };
    } catch (error) {
        console.error("Delete notification error:", error);
        return { success: false, error: "Network error" };
    }
}
