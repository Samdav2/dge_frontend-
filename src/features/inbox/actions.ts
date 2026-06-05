"use server"

import { redirect } from "next/navigation";
import { auth } from "@/auth"

// Helper function to get auth headers
async function getAuthHeaders() {
    const session = await auth();

    if (!session || !session.backendToken || (session as any).error === "RefreshAccessTokenError") {
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

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://0.0.0.0:8000';
console.log("Inbox Actions API URL:", apiUrl);

// Get backend token for WebSocket auth
export async function getBackendToken(): Promise<string | null> {
    const session = await auth();
    if (!session || !session.backendToken || (session as any).error === "RefreshAccessTokenError") {
        return null;
    }
    let token = session.backendToken;
    if (typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }
    return token;
}

// Get current user ID from session
export async function getCurrentUserId(): Promise<string | null> {
    const session = await auth();
    return session?.user?.id || null;
}

// Get all conversations for current user
// Note: This endpoint may need to be implemented in backend
// For now, we'll create conversations list from available data
export async function getUserConversations() {
    const session = await auth();
    const userId = session?.user?.id;
    console.log("getUserConversations: Current User ID:", userId);

    const headers = await getAuthHeaders();
    if (!headers) {
        console.log("getUserConversations: No headers (Unauthorized)");
        return { success: false, error: "Unauthorized", data: [] };
    }
    console.log("getUserConversations: Auth Header:", headers.Authorization ? headers.Authorization.substring(0, 20) + "..." : "Missing");

    try {
        const endpoint = `${apiUrl}/conversations/conversations`;
        console.log("Fetching conversations from:", endpoint);
        const response = await fetch(endpoint, {
            method: "GET",
            headers,
            cache: 'no-store' // Ensure we don't get cached empty responses
        });

        console.log("getUserConversations response status:", response.status);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("getUserConversations failed:", errorData);
            return { success: false, error: errorData.detail || "Failed to fetch conversations", data: [] };
        }

        const data = await response.json();
        console.log("getUserConversations success, count:", Array.isArray(data) ? data.length : 'not array');
        return {
            success: true,
            data,
            debug: {
                userId,
                tokenSnippet: headers.Authorization ? headers.Authorization.substring(0, 20) + "..." : "Missing"
            }
        };
    } catch (error) {
        console.error("Get conversations error:", error);
        return { success: false, error: "Network error", data: [] };
    }
}


// Create Conversation
export async function createConversation(data: {
    title?: string;
    type: "private" | "group" | "support";
    recipient_id: string;
    metadataInfo?: Record<string, unknown>;
}) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/conversations/create_conversations`, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to create conversation" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Create conversation error:", error);
        return { success: false, error: "Network error" };
    }
}

// Add Participant to Conversation
export async function addParticipant(data: {
    conversation_id: string;
    user_id: string;
    role?: string;
}) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/conversations/add_conversation_participant`, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to add participant" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Add participant error:", error);
        return { success: false, error: "Network error" };
    }
}

// Get Conversation Participants
export async function getParticipants(conversationId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/conversations/get_conversation_participant/${conversationId}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch participants" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get participants error:", error);
        return { success: false, error: "Network error" };
    }
}

// Create Message
export async function createMessage(data: {
    conversation_id: string;
    sender_id: string;
    content: string;
    content_type: "text" | "image" | "video" | "file";
    reply_to_message_id?: string;
    metadataInfo?: Record<string, unknown>;
}) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/messages/messages/`, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to send message" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Create message error:", error);
        return { success: false, error: "Network error" };
    }
}

// Get Conversation Messages
export async function getMessages(conversationId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/messages/messages/${conversationId}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch messages" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get messages error:", error);
        return { success: false, error: "Network error" };
    }
}

// Update Message
export async function updateMessage(messageId: string, data: {
    content?: string;
    status?: "sent" | "delivered" | "read" | "failed";
}) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/messages/messages/${messageId}`, {
            method: "PUT",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to update message" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Update message error:", error);
        return { success: false, error: "Network error" };
    }
}

// Delete Message
export async function deleteMessage(messageId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/messages/messages/${messageId}`, {
            method: "DELETE",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to delete message" };
        }

        return { success: true };
    } catch (error) {
        console.error("Delete message error:", error);
        return { success: false, error: "Network error" };
    }
}

// Delete Conversation
export async function deleteConversation(conversationId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/conversations/conversations/${conversationId}`, {
            method: "DELETE",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to delete conversation" };
        }

        return { success: true };
    } catch (error) {
        console.error("Delete conversation error:", error);
        return { success: false, error: "Network error" };
    }
}
