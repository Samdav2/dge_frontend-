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

export interface ServiceFilters {
    status?: string;
    type?: string;
    onlyMine?: boolean;
}

// List Services
export async function listServices(filters: ServiceFilters = {}) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    const params = new URLSearchParams();
    if (filters.status) params.append("status", filters.status);
    if (filters.type) params.append("type", filters.type);
    if (filters.onlyMine !== undefined) params.append("only_mine", String(filters.onlyMine));

    try {
        const response = await fetch(`${apiUrl}/services/services/?${params.toString()}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch services" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("List services error:", error);
        return { success: false, error: "Network error" };
    }
}

// Get Single Service
export async function getService(serviceId: string) {
    const headers = await getAuthHeaders();
    if (!headers) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const response = await fetch(`${apiUrl}/services/services/${serviceId}`, {
            method: "GET",
            headers,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch service" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("Get service error:", error);
        return { success: false, error: "Network error" };
    }
}

// List Categories
export async function listCategories() {
    try {
        const response = await fetch(`${apiUrl}/service_category/categories/`, {
            method: "GET",
            headers: {
                "X-API-KEY": process.env.BACKEND_API_KEY || "",
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return { success: false, error: errorData.detail || "Failed to fetch categories" };
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error("List categories error:", error);
        return { success: false, error: "Network error" };
    }
}
