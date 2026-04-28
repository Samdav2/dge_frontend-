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

// Create Wallet
export async function createWallet() {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/wallets/create_wallet`, {
            method: "POST",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to create wallet" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Create wallet error:", error);
        return { success: false, error: "Network error" };
    }
}

// Update Wallet (deposit/withdrawal)
export async function updateWallet(walletType: "deposit" | "earnings", amount: number) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/wallets/update_wallet?wallet_type=${walletType}&amount=${amount}`, {
            method: "PATCH",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to update wallet" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Update wallet error:", error);
        return { success: false, error: "Network error" };
    }
}

// Get User Transactions
export async function getUserTransactions() {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/transactions/transactions/user/`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch transactions" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get transactions error:", error);
        return { success: false, error: "Network error" };
    }
}

// Create Transaction
export async function createTransaction(data: {
    wallet_id: string;
    users_id: string;
    type: "deposit" | "withdrawal" | "transfer" | "payment" | "refund" | "escrow_release";
    amount_cents: number;
    reference?: string;
    status: "pending" | "completed" | "failed" | "reversed";
}) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/transactions/transactions/`, {
            method: "POST",
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to create transaction" };
        }

        const result = await response.json();
        return { success: true, data: result };
    } catch (error) {
        console.error("Create transaction error:", error);
        return { success: false, error: "Network error" };
    }
}

// Get User Wallet
export async function getUserWallet() {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/wallets/get_user_wallet`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch wallet" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get wallet error:", error);
        return { success: false, error: "Network error" };
    }
}
