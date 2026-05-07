import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

function getBackendUrl() {
    let url = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
    if (url.includes("0.0.0.0")) url = url.replace("0.0.0.0", "127.0.0.1");
    return url;
}

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/super_admin/super_admins/preferences`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || "",
                ...(session?.backendToken ? { "Authorization": `Bearer ${session.backendToken}` } : {})
            },
            cache: "no-store"
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("GET preferences backend error:", res.status, errText);
            // Return sensible defaults on failure so UI doesn't break
            return NextResponse.json({ emailNotifs: true, pushNotifs: true, securityAlerts: false });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("GET preferences route error:", error);
        return NextResponse.json({ emailNotifs: true, pushNotifs: true, securityAlerts: false });
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const session = await auth();
        const backendUrl = getBackendUrl();
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/super_admin/super_admins/preferences`, {
            method: "PUT",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "X-API-KEY": apiKey || "",
                ...(session?.backendToken ? { "Authorization": `Bearer ${session.backendToken}` } : {})
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const errText = await res.text();
            console.error("PUT preferences backend error:", res.status, errText);
            return NextResponse.json({ status: "error", error: errText || "Failed to update preferences" }, { status: res.status });
        }

        return NextResponse.json({ status: "success", data: body });
    } catch (error: any) {
        console.error("POST preferences route error:", error);
        return NextResponse.json({ status: "error", error: error.message }, { status: 500 });
    }
}
