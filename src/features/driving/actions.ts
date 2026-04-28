"use server"

import { auth } from "@/auth"
import { DriverNearbyResponse } from "./types";

// Helper function to get auth headers
async function getAuthHeaders() {
    const session = await auth();
    console.log("ServerAction: getAuthHeaders - Session exists:", !!session);
    console.log("ServerAction: getAuthHeaders - Backend Token exists:", !!session?.backendToken);

    if (!session || !session.backendToken) {
        console.error("ServerAction: getAuthHeaders - No session or token found");
        return null;
    }

    let token = session.backendToken;
    if (typeof token === 'string' && token.startsWith('"') && token.endsWith('"')) {
        token = token.slice(1, -1);
    }

    // Log token length (safe) to verify it's not empty
    console.log("ServerAction: getAuthHeaders - Token length:", token.length);
    console.log("ServerAction: getAuthHeaders - API Key exists:", !!process.env.BACKEND_API_KEY);

    return {
        "Authorization": `Bearer ${token}`,
        "X-API-KEY": process.env.BACKEND_API_KEY || "",
        "Content-Type": "application/json",
    };
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';

export async function getDriversNearby(lat: number, lon: number, radius: number = 5.0): Promise<DriverNearbyResponse[]> {
    console.log(`ServerAction: getDriversNearby called with lat=${lat}, lon=${lon}, radius=${radius}`);

    const headers = await getAuthHeaders();
    if (!headers) {
        console.error("ServerAction: Unauthorized - No session or token");
        throw new Error("Unauthorized");
    }

    // Replace 0.0.0.0 with 127.0.0.1 for server-side fetching if needed
    const targetUrl = `${apiUrl.replace('0.0.0.0', '127.0.0.1')}/driving/drivers/nearby?latitude=${lat}&longitude=${lon}&radius=${radius}`;
    console.log(`ServerAction: Fetching ${targetUrl}`);

    try {
        const response = await fetch(targetUrl, {
            method: 'GET',
            headers,
        });

        if (!response.ok) {
            console.error(`ServerAction: API Error ${response.status}: ${response.statusText}`);
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("ServerAction: Success", data);
        return data;
    } catch (error) {
        console.error("ServerAction: Request Failed:", error);
        throw error;
    }
}

export async function searchLocation(query: string) {
    console.log(`ServerAction: searchLocation called with query=${query}`);

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`,
            {
                headers: {
                    'User-Agent': 'DGE_Frontend/1.0', // Nominatim requires a User-Agent
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Nominatim API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("ServerAction: Search Failed:", error);
        return [];
    }
}

export async function reverseGeocode(lat: number, lon: number) {
    console.log(`ServerAction: reverseGeocode called with lat=${lat}, lon=${lon}`);

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
                headers: {
                    'User-Agent': 'DGE_Frontend/1.0',
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Nominatim API Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.display_name;
    } catch (error) {
        console.error("ServerAction: Reverse Geocode Failed:", error);
        return null;
    }
}
