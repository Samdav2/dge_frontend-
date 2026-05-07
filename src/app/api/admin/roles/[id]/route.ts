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
        const { name, scope, description, status } = body;
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/v1/roles/${id}`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": apiKey || ""
            },
            body: JSON.stringify({
                name,
                scope: scope || "global",
                description,
                status: status || "ACTIVE"
            })
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("PUT role failed:", res.status, errText);
            return NextResponse.json({ error: errText || "Failed to update role" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("PUT role route error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/v1/roles/${id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            }
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("DELETE role failed:", res.status, errText);
            return NextResponse.json({ error: errText || "Failed to delete role" }, { status: res.status });
        }

        return NextResponse.json({ message: "Role deleted successfully" });
    } catch (error: any) {
        console.error("DELETE role route error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
