import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace("0.0.0.0", "127.0.0.1");
const API_KEY = process.env.BACKEND_API_KEY || "";

const headers = { "Content-Type": "application/json", "X-API-KEY": API_KEY };

/** GET /api/admin/withdrawals?status=pending&page=1 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "";
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "50";

    const params = new URLSearchParams({ page, limit });
    if (status) params.set("status", status);

    const res = await fetch(`${BACKEND}/super_admin/super_admins/withdrawals?${params}`, {
        method: "GET",
        headers,
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}

/** POST /api/admin/withdrawals?id=<uuid>&action=approve|reject */
export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const action = searchParams.get("action");
    if (!id || !action) return NextResponse.json({ error: "Missing id or action" }, { status: 400 });

    let body: any = null;
    try { body = await req.json(); } catch { /* no body needed for approve */ }

    const res = await fetch(`${BACKEND}/super_admin/super_admins/withdrawals/${id}/${action}`, {
        method: "POST",
        headers,
        body: body ? JSON.stringify(body) : undefined,
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
