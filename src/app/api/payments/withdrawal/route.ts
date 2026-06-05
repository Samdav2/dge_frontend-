import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace("0.0.0.0", "127.0.0.1");
const API_KEY = process.env.BACKEND_API_KEY || "";

function buildHeaders(req: NextRequest) {
    const auth = req.headers.get("authorization") || "";
    return {
        "Content-Type": "application/json",
        "Authorization": auth,
        "X-API-KEY": API_KEY,
    };
}

/** POST /api/payments/withdrawal */
export async function POST(req: NextRequest) {
    const headers = buildHeaders(req);
    let body: any = null;
    try { body = await req.json(); } catch { /* no body */ }

    const res = await fetch(`${BACKEND}/payments/withdrawal/request`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}

/** GET /api/payments/withdrawal */
export async function GET(req: NextRequest) {
    const headers = buildHeaders(req);
    const res = await fetch(`${BACKEND}/payments/withdrawal/history`, {
        method: "GET",
        headers,
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
