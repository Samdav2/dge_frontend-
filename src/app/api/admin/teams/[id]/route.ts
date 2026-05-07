import { NextResponse } from "next/server";

function getBackendUrl() {
    let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    if (backendUrl.includes("0.0.0.0")) {
        backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
    }
    return backendUrl;
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const body = await req.json();
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const payload: any = {};
        if (body.name || body.full_name) payload.full_name = body.name || body.full_name;
        if (body.phone !== undefined) payload.phone = body.phone;
        if (body.status !== undefined) payload.status = body.status?.toLowerCase() || "active";

        const res = await fetch(`${backendUrl}/v1/teams/users/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey || ""
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("PUT team user failed:", res.status, errText);
            return NextResponse.json({ error: errText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("PUT team user error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/v1/teams/users/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            }
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("DELETE team user failed:", res.status, errText);
            return NextResponse.json({ error: errText }, { status: res.status });
        }

        return NextResponse.json({ message: "Team member deleted successfully" });
    } catch (error: any) {
        console.error("DELETE team user error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
