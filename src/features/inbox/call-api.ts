"use server"

import { auth } from "@/auth";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace('0.0.0.0', '127.0.0.1');

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
        "Content-Type": "application/json",
        "X-API-KEY": process.env.BACKEND_API_KEY || "",
    };
}

export interface CallSession {
    id: string;
    conversation_id: string | null;
    initiator_id: string | null;
    call_type: "audio" | "video";
    status: "initiated" | "connected" | "ended" | "missed";
    started_at: string | null;
    ended_at: string | null;
    created_at: string;
    channel_name?: string | null;
}

// Create a new call session (for audit/logging)
export async function createCallSession(
    conversationId: string | null,
    callType: "audio" | "video" = "audio",
    channelName?: string
): Promise<CallSession | null> {
    const headers = await getAuthHeaders();
    if (!headers) return null;

    try {
        const response = await fetch(`${API_URL}/calls/calls/create`, {
            method: "POST",
            headers,
            cache: "no-store",
            body: JSON.stringify({
                conversation_id: conversationId,
                call_type: callType,
                channel_name: channelName,
            }),
        });

        if (!response.ok) {
            console.error("Failed to create call session:", response.status);
            return null;
        }

        return await response.json();
    } catch (error) {
        console.error("Error creating call session:", error);
        return null;
    }
}

// Update call status
export async function updateCallStatus(
    callId: string,
    status: "initiated" | "connected" | "ended" | "missed"
): Promise<boolean> {
    const headers = await getAuthHeaders();
    if (!headers) return false;

    try {
        const response = await fetch(`${API_URL}/calls/calls/${callId}/status/${status}`, {
            method: "PATCH",
            headers,
            cache: "no-store",
        });

        if (!response.ok) {
            console.error("Failed to update call status:", response.status);
            return false;
        }

        return true;
    } catch (error) {
        console.error("Error updating call status:", error);
        return false;
    }
}
