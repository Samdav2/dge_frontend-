"use server";

import { auth } from "@/auth";
import { UserPortfolio, UserPortfolioCreate, UserPortfolioUpdate, PortfolioMedia } from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
const API_KEY = process.env.BACKEND_API_KEY;

async function getAuthHeaders() {
    const session = await auth();
    const token = session?.backendToken;

    // Debug logging
    console.log("ServerAction: getAuthHeaders - Token exists:", !!token);
    console.log("ServerAction: getAuthHeaders - API Key exists:", !!API_KEY);

    return {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY || "",
        "Authorization": token ? `Bearer ${token}` : "",
    };
}

export async function getUserPortfolio(): Promise<UserPortfolio | null> {
    try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${BASE_URL}/portfolio/get_user_portfolio`, {
            method: "GET",
            headers,
            cache: "no-store",
        });

        if (response.status === 404) {
            return null;
        }

        if (!response.ok) {
            console.error("Failed to fetch portfolio:", response.status, await response.text());
            throw new Error("Failed to fetch portfolio");
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        return null;
    }
}

export async function createUserPortfolio(data: UserPortfolioCreate): Promise<UserPortfolio> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/portfolio/create_user_portfolio`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to create portfolio:", response.status, errorText);
        throw new Error(`Failed to create portfolio: ${errorText}`);
    }

    return await response.json();
}

export async function updateUserPortfolio(data: UserPortfolioUpdate): Promise<UserPortfolio> {
    const headers = await getAuthHeaders();
    const response = await fetch(`${BASE_URL}/portfolio/update_user_portfolio`, {
        method: "PATCH",
        headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to update portfolio:", response.status, errorText);
        throw new Error(`Failed to update portfolio: ${errorText}`);
    }

    return await response.json();
}

export async function uploadPortfolioMedia(portfolioId: string, formData: FormData): Promise<PortfolioMedia> {
    const session = await auth();
    const token = session?.backendToken;

    // Note: Content-Type header is NOT set here to let the browser/fetch set the boundary for FormData
    const headers: Record<string, string> = {
        "X-API-KEY": API_KEY || "",
        "Authorization": token ? `Bearer ${token}` : "",
    };

    // Append portfolio_id to query params as per spec
    const url = new URL(`${BASE_URL}/portfolio/create_portfolio_media`);
    url.searchParams.append("portfolio_id", portfolioId);

    console.log("Debug: Uploading media to:", url.toString());
    console.log("Debug: Portfolio ID:", portfolioId);
    // Log formData keys to verify file presence
    for (const pair of formData.entries()) {
        console.log(`Debug: FormData Key: ${pair[0]}, Value: ${pair[1] instanceof File ? `File(name=${pair[1].name}, size=${pair[1].size})` : pair[1]}`);
    }

    const response = await fetch(url.toString(), {
        method: "POST",
        headers,
        body: formData,
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to upload media:", response.status, errorText);
        throw new Error(`Failed to upload media: ${errorText}`);
    }

    return await response.json();
}
