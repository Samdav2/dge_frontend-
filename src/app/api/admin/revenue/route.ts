import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace("0.0.0.0", "127.0.0.1");
const API_KEY = process.env.BACKEND_API_KEY || "";

function buildHeaders(req?: NextRequest) {
    const auth = req?.headers.get("authorization") || "";
    return {
        "Content-Type": "application/json",
        "Authorization": auth,
        "X-API-KEY": API_KEY,
    };
}

/** GET /api/admin/revenue */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "50";
    const event_type = searchParams.get("event_type") || "";

    let url = `${BACKEND}/super_admin/super_admins/revenue?page=${page}&limit=${limit}`;
    if (event_type) {
        url += `&event_type=${event_type}`;
    }

    const res = await fetch(url, {
        method: "GET",
        headers: buildHeaders(req),
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
