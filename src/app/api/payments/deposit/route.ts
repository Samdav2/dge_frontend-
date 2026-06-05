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

/** POST /api/payments/deposit?action=initiate|banks|verify-bank|save-bank|delete-bank|history */
export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "initiate";
    const headers = buildHeaders(req);
    let body: any = null;
    try { body = await req.json(); } catch { /* no body */ }

    let backendPath = "";
    if (action === "initiate") backendPath = "/payments/deposit/initiate";
    else if (action === "verify-bank") backendPath = "/payments/bank-account/verify";
    else if (action === "save-bank") backendPath = "/payments/bank-account";
    else return NextResponse.json({ error: "Unknown action" }, { status: 400 });

    const res = await fetch(`${BACKEND}${backendPath}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const action = searchParams.get("action") || "history";
    const headers = buildHeaders(req);

    let backendPath = "";
    if (action === "history") backendPath = "/payments/deposit/history";
    else if (action === "banks") backendPath = "/payments/banks";
    else if (action === "bank-accounts") backendPath = "/payments/bank-account";
    else return NextResponse.json({ error: "Unknown action" }, { status: 400 });

    const res = await fetch(`${BACKEND}${backendPath}`, {
        method: "GET",
        headers,
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const accountId = searchParams.get("account_id");
    if (!accountId) return NextResponse.json({ error: "Missing account_id" }, { status: 400 });
    const headers = buildHeaders(req);
    const res = await fetch(`${BACKEND}/payments/bank-account/${accountId}`, {
        method: "DELETE",
        headers,
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
