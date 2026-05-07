import { NextResponse } from "next/server";

function getBackendUrl() {
    let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    if (backendUrl.includes("0.0.0.0")) {
        backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
    }
    return backendUrl;
}

export async function GET() {
    try {
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/v1/teams/users`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            },
            cache: "no-store"
        });

        if (!res.ok) {
            console.error("GET teams/users failed:", res.status, await res.text());
            return NextResponse.json([]);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("GET teams route error:", error);
        return NextResponse.json([]);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        // TeamUserCreate requires: email, password (and optionally full_name, phone, is_superuser, status)
        const payload = {
            email: body.email,
            password: body.password || "TempPass123!", // default temp password
            full_name: body.name || body.full_name,
            phone: body.phone || null,
            is_superuser: body.is_superuser || false,
            status: body.status || "active"
        };

        const res = await fetch(`${backendUrl}/v1/teams/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey || ""
            },
            body: JSON.stringify(payload)
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("POST teams/users failed:", res.status, errText);
            return NextResponse.json({ error: errText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("POST teams route error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
