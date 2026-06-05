"use server"

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { AgoraTokenResponse } from "./call-types";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000').replace('0.0.0.0', '127.0.0.1');

// Helper function to get auth headers
async function getAuthHeaders() {
    const session = await auth();

    if (!session || !session.backendToken || (session as any).error === "RefreshAccessTokenError") {
        redirect("/login");
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

// Get backend JWT token (used internally)
export async function getCallToken(): Promise<string | null> {
    const session = await auth();
    if (!session || !session.backendToken || (session as any).error === "RefreshAccessTokenError") {
        redirect("/login");
    }
    let token = session.backendToken;
    if (typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }
    return token;
}

// Get current user ID
export async function getCallUserId(): Promise<string | null> {
    const session = await auth();
    return session?.user?.id || null;
}

// Fetch an Agora RTC token from the backend
// channelName: unique channel identifier (e.g. derived from conversationId)
// uid: 0 = auto-assign by Agora; role: 1 = Publisher
export async function getAgoraToken(
    channelName: string,
    uid: number = 0,
    role: number = 1,
    expireSeconds: number = 3600
): Promise<AgoraTokenResponse | null> {
    const headers = await getAuthHeaders();
    if (!headers) return null;

    try {
        console.log(`[getAgoraToken] Fetching from ${API_URL}/calls/calls/agora/token...`);
        const response = await fetch(`${API_URL}/calls/calls/agora/token`, {
            method: "POST",
            headers,
            cache: "no-store",
            body: JSON.stringify({
                channel_name: channelName,
                uid,
                role,
                expire_seconds: expireSeconds,
            }),
        });

        if (!response.ok) {
            console.error("Failed to get Agora token:", response.status, await response.text());
            return null;
        }

        const responseData = await response.json() as AgoraTokenResponse;
        console.log(`[getAgoraToken] Success! token fetched for uid ${responseData.uid}`);
        return responseData;
    } catch (error) {
        console.error("[getAgoraToken] Error fetching Agora token:", error);
        return null;
    }
}
