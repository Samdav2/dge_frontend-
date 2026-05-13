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

// List My Escrows
export async function listMyEscrows() {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/escrow/escrows/`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch escrows" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("List escrows error:", error);
        return { success: false, error: "Network error" };
    }
}

// Create Escrow
export async function createEscrow(data: {
    payment_negotiation_id: string;
    payer_wallet_id: string;
    payee_wallet_id: string;
    amount_cents: number;
    reference?: string;
}) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/escrow/escrows/`, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to create escrow" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Create escrow error:", error);
        return { success: false, error: "Network error" };
    }
}

// Get Escrow
export async function getEscrow(escrowId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/escrow/escrows/${escrowId}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch escrow" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get escrow error:", error);
        return { success: false, error: "Network error" };
    }
}

// Release Escrow
export async function releaseEscrow(escrowId: string, payload?: { rating?: number; review_comment?: string; direct_message?: string }) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/escrow/escrows/${escrowId}/release`, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: payload ? JSON.stringify(payload) : undefined,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to release escrow" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Release escrow error:", error);
        return { success: false, error: "Network error" };
    }
}

// Refund Escrow
export async function refundEscrow(escrowId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/escrow/escrows/${escrowId}/refund`, {
            method: "POST",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to refund escrow" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Refund escrow error:", error);
        return { success: false, error: "Network error" };
    }
}

// Dispute Escrow
export async function disputeEscrow(escrowId: string, payload?: { direct_message?: string }) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/escrow/escrows/${escrowId}/dispute`, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: payload ? JSON.stringify(payload) : undefined,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to dispute escrow" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Dispute escrow error:", error);
        return { success: false, error: "Network error" };
    }
}
