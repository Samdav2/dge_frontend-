import { NextResponse } from "next/server";

function getBackendUrl() {
    let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    if (backendUrl.includes("0.0.0.0")) {
        backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
    }
    return backendUrl;
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/v1/super_admins/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            }
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("DELETE super admin failed:", res.status, errText);
            return NextResponse.json({ error: errText }, { status: res.status });
        }

        return NextResponse.json({ message: "Admin deleted successfully" });
    } catch (error: any) {
        console.error("DELETE admin user error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;
        const body = await req.json();

        const res = await fetch(`${backendUrl}/v1/super_admins/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": apiKey || ""
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("PUT super admin failed:", res.status, errText);
            return NextResponse.json({ error: errText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("PUT admin user error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

