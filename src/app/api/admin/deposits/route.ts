import { NextRequest, NextResponse } from "next/server";

const BACKEND = (process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000").replace("0.0.0.0", "127.0.0.1");
const API_KEY = process.env.BACKEND_API_KEY || "";

const headers = { "Content-Type": "application/json", "X-API-KEY": API_KEY };

/** GET /api/admin/deposits?status=screened_pending&page=1 */
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "";
    const page = searchParams.get("page") || "1";
    const limit = searchParams.get("limit") || "50";

    const params = new URLSearchParams({ page, limit });
    if (status) params.set("status", status);

    const res = await fetch(`${BACKEND}/super_admin/super_admins/deposits?${params}`, {
        method: "GET",
        headers,
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}

/** POST /api/admin/deposits?id=<uuid>&action=approve */
export async function POST(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const action = searchParams.get("action") || "approve";
    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const res = await fetch(`${BACKEND}/super_admin/super_admins/deposits/${id}/${action}`, {
        method: "POST",
        headers,
        cache: "no-store",
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
}
