import { NextResponse, NextRequest } from "next/server";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { password } = body;

        if (!password) {
            return NextResponse.json({ error: "Password is required" }, { status: 400 });
        }

        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/super_admin/super_admins/change-password`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey || "",
                ...(session?.backendToken ? { "Authorization": `Bearer ${session.backendToken}` } : {})
            },
            body: JSON.stringify({ user_id: session.user.id, password })
        });

        if (!res.ok) {
            const errText = await res.text();
            return NextResponse.json({ error: errText || "Failed to change password" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Change password route error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
