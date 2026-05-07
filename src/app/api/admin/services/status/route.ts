import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { serviceId, status } = body;

        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) {
            backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        }
        const apiKey = process.env.BACKEND_API_KEY;

        const formData = new URLSearchParams();
        formData.append("service_id", serviceId);
        formData.append("status", status);

        const res = await fetch(`${backendUrl}/super_admin/super_admins/services/status`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "X-API-KEY": apiKey || ""
            },
            body: formData.toString()
        });

        if (!res.ok) {
            const errorText = await res.text();
            return NextResponse.json({ error: errorText || "Failed to update status" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Change status route error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
