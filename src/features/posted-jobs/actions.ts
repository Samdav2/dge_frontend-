"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface PostedJob {
    id: string;
    user_id: string;
    title: string;
    description: string;
    category_id: string;
    min_price_cents: number;
    max_price_cents: number;
    image?: string | null;
    status: "open" | "assigned" | "completed" | "cancelled";
    created_at: string;
    bid_count?: number;
    user?: { id: string; username: string };
    category?: { id: string; name: string; icon?: string | null };
}

export interface PostedJobBid {
    id: string;
    service_id: string;
    initiator_id: string;
    receiver_id: string;
    negotiation_type: string;
    proposed_price_cents: number;
    message?: string | null;
    status: string;
    created_at: string;
    updated_at: string;
    posted_job_id?: string | null;
    services?: any;
    initiator?: any;
    receiver?: any;
}

async function getHeaders() {
    const session = await auth();
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.backendToken}`,
    };
}

export async function listOpenPostedJobs(params?: {
    category_id?: string;
    search?: string;
}): Promise<{ success: boolean; data?: PostedJob[]; error?: string }> {
    try {
        const query = new URLSearchParams();
        if (params?.category_id) query.set("category_id", params.category_id);
        if (params?.search) query.set("search", params.search);

        const res = await fetch(
            `${API_URL}/posted_jobs/?${query.toString()}`,
            {
                // No auth header — this is a public endpoint
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            }
        );

        if (!res.ok) return { success: false, error: await res.text() };
        return { success: true, data: await res.json() };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function getPostedJob(
    id: string
): Promise<{ success: boolean; data?: PostedJob; error?: string }> {
    try {
        const res = await fetch(`${API_URL}/posted_jobs/${id}`, {
            headers: { "Content-Type": "application/json" },
            cache: "no-store",
        });
        if (!res.ok) return { success: false, error: await res.text() };
        return { success: true, data: await res.json() };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function getMyPostedJobs(): Promise<{
    success: boolean;
    data?: PostedJob[];
    error?: string;
}> {
    try {
        const res = await fetch(`${API_URL}/posted_jobs/me`, {
            headers: await getHeaders(),
            cache: "no-store",
        });
        if (!res.ok) return { success: false, error: await res.text() };
        return { success: true, data: await res.json() };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function createPostedJob(payload: {
    title: string;
    description: string;
    category_id: string;
    min_price_cents: number;
    max_price_cents: number;
    image?: string;
}): Promise<{ success: boolean; data?: PostedJob; error?: string }> {
    try {
        const res = await fetch(`${API_URL}/posted_jobs/`, {
            method: "POST",
            headers: await getHeaders(),
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ detail: res.statusText }));
            return { success: false, error: err.detail || JSON.stringify(err) };
        }
        revalidatePath("/dashboard/my-jobs");
        revalidatePath("/dashboard/marketplace");
        return { success: true, data: await res.json() };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function cancelPostedJob(
    id: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch(`${API_URL}/posted_jobs/${id}`, {
            method: "DELETE",
            headers: await getHeaders(),
        });
        if (!res.ok) return { success: false, error: await res.text() };
        revalidatePath("/dashboard/my-jobs");
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function getJobBids(
    jobId: string
): Promise<{ success: boolean; data?: PostedJobBid[]; error?: string }> {
    try {
        const res = await fetch(`${API_URL}/posted_jobs/${jobId}/bids`, {
            headers: await getHeaders(),
            cache: "no-store",
        });
        if (!res.ok) return { success: false, error: await res.text() };
        return { success: true, data: await res.json() };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function bidOnPostedJob(
    jobId: string,
    payload: { service_id: string; proposed_price_cents: number; message?: string }
): Promise<{ success: boolean; data?: PostedJobBid; error?: string }> {
    try {
        const res = await fetch(
            `${API_URL}/price_negotiation/posted_job/${jobId}/bid`,
            {
                method: "POST",
                headers: await getHeaders(),
                body: JSON.stringify(payload),
            }
        );
        if (!res.ok) {
            const err = await res.json().catch(() => ({ detail: res.statusText }));
            return { success: false, error: err.detail || JSON.stringify(err) };
        }
        return { success: true, data: await res.json() };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function acceptBid(
    bidId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch(`${API_URL}/price_negotiation/${bidId}`, {
            method: "PATCH",
            headers: await getHeaders(),
            body: JSON.stringify({ status: "accepted" }),
        });
        if (!res.ok) {
            const err = await res.json().catch(() => ({ detail: res.statusText }));
            return { success: false, error: err.detail || JSON.stringify(err) };
        }
        revalidatePath("/dashboard/my-jobs");
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function rejectBid(
    bidId: string
): Promise<{ success: boolean; error?: string }> {
    try {
        const res = await fetch(`${API_URL}/price_negotiation/${bidId}`, {
            method: "PATCH",
            headers: await getHeaders(),
            body: JSON.stringify({ status: "rejected" }),
        });
        if (!res.ok) return { success: false, error: await res.text() };
        revalidatePath("/dashboard/my-jobs");
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}
