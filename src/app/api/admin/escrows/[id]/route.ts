import { NextResponse, NextRequest } from "next/server";

function getBackendUrl() {
    let url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    if (url.includes("0.0.0.0")) url = url.replace("0.0.0.0", "127.0.0.1");
    return url;
}

function headers(apiKey: string) {
    return { "Accept": "application/json", "X-API-KEY": apiKey };
}

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        if (!id || id === "undefined" || id === "null") {
            return NextResponse.json({ error: "Invalid ID", received: String(id) }, { status: 400 });
        }

        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY || "";

        const res = await fetch(`${backendUrl}/super_admin/super_admins/admin-escrows/${id}`, {
            method: "GET",
            headers: headers(apiKey),
            cache: "no-store",
        });

        if (!res.ok) {
            const errText = await res.text();
            try {
                const errJson = JSON.parse(errText);
                return NextResponse.json(errJson, { status: res.status });
            } catch {
                return NextResponse.json({ error: errText }, { status: res.status });
            }
        }

        return NextResponse.json(await res.json());
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        
        if (!id || id === "undefined" || id === "null") {
            return NextResponse.json({ error: "Invalid ID", received: String(id) }, { status: 400 });
        }

        const body = await req.json();
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY || "";

        const res = await fetch(
            `${backendUrl}/super_admin/super_admins/admin-escrows/${id}/status`,
            {
                method: "POST",
                headers: { ...headers(apiKey), "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        if (!res.ok) {
            const errText = await res.text();
            try {
                const errJson = JSON.parse(errText);
                return NextResponse.json(errJson, { status: res.status });
            } catch {
                return NextResponse.json({ error: errText }, { status: res.status });
            }
        }

        return NextResponse.json(await res.json());
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
