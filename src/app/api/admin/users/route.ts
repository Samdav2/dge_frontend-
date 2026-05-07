import { NextResponse } from "next/server";

function getBackendUrl() {
    let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    if (backendUrl.includes("0.0.0.0")) {
        backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
    }
    return backendUrl;
}

// List all super admins
export async function GET() {
    try {
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/v1/super_admins/`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            },
            cache: "no-store"
        });

        if (!res.ok) {
            console.error("GET super_admins failed:", res.status, await res.text());
            return NextResponse.json([]);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("GET users route error:", error);
        return NextResponse.json([]);
    }
}

// Create a new super admin (multipart form)
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        // Backend expects multipart form: name, email, password, phone_number, rank, avatar
        const formData = new FormData();
        formData.append("name", body.name || body.full_name || "");
        formData.append("email", body.email || "");
        formData.append("password", body.password || "TempPass123!");
        if (body.phone) formData.append("phone_number", body.phone);
        formData.append("rank", body.rank || "Major");

        const res = await fetch(`${backendUrl}/v1/super_admins/`, {
            method: "POST",
            headers: {
                "X-API-KEY": apiKey || ""
            },
            body: formData
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("POST super_admins failed:", res.status, errText);
            return NextResponse.json({ error: errText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("POST users route error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
