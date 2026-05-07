import { NextResponse } from "next/server";

export async function GET() {
    try {
        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) {
            backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        }
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/teams/users`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            },
            cache: "no-store"
        });

        if (!res.ok) {
            return NextResponse.json([]);
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("GET team users route error:", error);
        return NextResponse.json([]);
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) {
            backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        }
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/teams/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey || ""
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text();
            return NextResponse.json({ error: errText }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("POST team users route error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
