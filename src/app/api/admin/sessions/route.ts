import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function GET(req: NextRequest) {
    try {
        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        const apiKey = process.env.BACKEND_API_KEY;

        const session = await auth();
        console.log("DEBUG: Sessions Route - Session:", JSON.stringify(session, null, 2));
        console.log("DEBUG: Sessions Route - backendToken present:", !!session?.backendToken);

        const res = await fetch(`${backendUrl}/super_admin/super_admins/sessions`, {
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
            console.error("GET sessions backend error:", res.status, errText);
            return NextResponse.json({ error: errText || "Failed to fetch sessions" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Fetch sessions route error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
