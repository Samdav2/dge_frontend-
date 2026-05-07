"use server";

import { auth } from "@/auth";
import {
    SupportTicket,
    SupportTicketCreate,
    SupportTicketUpdate,
    SupportTicketReply,
    SupportTicketReplyCreate
} from "./types";

// Helper function to get auth headers
async function getAuthHeaders() {
    const session = await auth();

    if (!session) {
        console.warn("Support Actions: No session found");
        return null;
    }

    if (!session.backendToken) {
        console.warn("Support Actions: No backendToken found in session");
        return null;
    }

    let token = session.backendToken;
    if (typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }

    const apiKey = process.env.BACKEND_API_KEY;
    if (!apiKey) {
        console.warn("Support Actions: BACKEND_API_KEY is missing from environment");
    }

    return {
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": apiKey || "",
    };
}

// Get current user ID
async function getCurrentUserId(): Promise<string | null> {
    const session = await auth();
    console.log("Support Actions: Session structure in getCurrentUserId:", JSON.stringify({ 
        hasSession: !!session, 
        hasUser: !!session?.user, 
        userId: session?.user?.id,
        // @ts-ignore
        backendUserId: session?.backendUserId 
    }));
    return session?.user?.id || (session as any)?.backendUserId || null;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// List all support tickets for current user
export async function getTickets(): Promise<{ success: boolean; data?: SupportTicket[]; error?: string }> {
    const session = await auth();
    if (!session) {
        console.warn("Support Actions: No session found");
        return { success: false, error: "Unauthorized: No Session", data: [] };
    }
    const isAdmin = (session.user as any)?.role === "admin";
    
    if (!session.backendToken && !isAdmin) {
        console.warn("Support Actions: No backendToken found in session and user is not admin");
        return { success: false, error: "Unauthorized: No Token", data: [] };
    }

    const headers = await getAuthHeaders();
    if (!headers && !isAdmin) {
        return { success: false, error: "Unauthorized: Headers Failed", data: [] };
    }

    // Prepare headers for admin (might only have X-API-KEY)
    const requestHeaders: any = headers || { "X-API-KEY": process.env.BACKEND_API_KEY || "" };

    try {
        const endpoint = isAdmin ? "/super_admin/super_admins/admin-tickets" : "/v1/support/support-tickets/";
        const fullUrl = `${apiUrl}${endpoint}`;
        console.log(`Support Actions: Fetching tickets from ${fullUrl} (isAdmin: ${isAdmin})`);
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: requestHeaders,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch tickets", data: [] };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get tickets error:", error);
        return { success: false, error: "Network error", data: [] };
    }
}

// Get single ticket by ID
export async function getTicket(ticketId: string): Promise<{ success: boolean; data?: SupportTicket; error?: string }> {
    const session = await auth();
    const isAdmin = (session?.user as any)?.role === "admin";

    const headers = await getAuthHeaders();
    if (!headers && !isAdmin) {
        return { success: false, error: "Unauthorized" };
    }

    const requestHeaders: any = headers || { "X-API-KEY": process.env.BACKEND_API_KEY || "" };

    try {
        const endpoint = isAdmin 
            ? `/super_admin/super_admins/admin-tickets/${ticketId}` 
            : `/v1/support/support-tickets/${ticketId}`;
        const fullUrl = `${apiUrl}${endpoint}`;
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: requestHeaders,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch ticket" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get ticket error:", error);
        return { success: false, error: "Network error" };
    }
}

// Create a new support ticket
export async function createTicket(data: Omit<SupportTicketCreate, 'user_id'>): Promise<{ success: boolean; data?: SupportTicket; error?: string }> {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    const userId = await getCurrentUserId();
    if (!userId) {
        return { success: false, error: "User not found" };
    }

    try {
        const fullUrl = `${apiUrl}/v1/support/support-tickets/`;
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                user_id: userId,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to create ticket" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Create ticket error:", error);
        return { success: false, error: "Network error" };
    }
}

// Update a ticket
export async function updateTicket(ticketId: string, data: SupportTicketUpdate): Promise<{ success: boolean; data?: SupportTicket; error?: string }> {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const fullUrl = `${apiUrl}/v1/support/support-tickets/${ticketId}`;
        const response = await fetch(fullUrl, {
            method: "PUT",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to update ticket" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Update ticket error:", error);
        return { success: false, error: "Network error" };
    }
}

// Delete a ticket
export async function deleteTicket(ticketId: string): Promise<{ success: boolean; error?: string }> {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const fullUrl = `${apiUrl}/v1/support/support-tickets/${ticketId}`;
        const response = await fetch(fullUrl, {
            method: "DELETE",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to delete ticket" };
        }

        return { success: true };
    } catch (error) {
        console.error("Delete ticket error:", error);
        return { success: false, error: "Network error" };
    }
}

// Get ticket replies
export async function getTicketReplies(ticketId: string): Promise<{ success: boolean; data?: SupportTicketReply[]; error?: string }> {
    const session = await auth();
    const isAdmin = (session?.user as any)?.role === "admin";
    
    const headers = await getAuthHeaders();
    if (!headers && !isAdmin) {
        return { success: false, error: "Unauthorized", data: [] };
    }

    const requestHeaders: any = headers || { "X-API-KEY": process.env.BACKEND_API_KEY || "" };

    try {
        const endpoint = isAdmin 
            ? `/super_admin/super_admins/admin-tickets/${ticketId}/replies` 
            : `/v1/support/support-tickets/${ticketId}/replies`;
        const fullUrl = `${apiUrl}${endpoint}`;
        const response = await fetch(fullUrl, {
            method: "GET",
            headers: requestHeaders,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch replies", data: [] };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get replies error:", error);
        return { success: false, error: "Network error", data: [] };
    }
}

// Create a reply to a ticket
export async function createReply(ticketId: string, message: string): Promise<{ success: boolean; data?: SupportTicketReply; error?: string }> {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    const userId = await getCurrentUserId();
    const session = await auth();
    console.log(`Support Actions: Creating reply for ticket ${ticketId}. userId: ${userId}, role: ${(session?.user as any)?.role}`);

    if (!userId) {
        return { success: false, error: "User not found (Session Missing ID)" };
    }

    try {
        const fullUrl = `${apiUrl}/v1/support/support-tickets/${ticketId}/replies`;
        const response = await fetch(fullUrl, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message,
                ticket_id: ticketId,
                author_user_id: userId,
                attachments: {},
            } as SupportTicketReplyCreate),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Support Actions: Create reply failed:", response.status, errorData);
            return { success: false, error: errorData.detail || "Failed to create reply" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Create reply error:", error);
        return { success: false, error: "Network error" };
    }
}
