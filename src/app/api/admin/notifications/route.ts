import { NextResponse } from "next/server";

export async function GET() {
    try {
        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) {
            backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        }
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/super_admin/super_admins/notifications`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            },
            cache: "no-store"
        });

        if (!res.ok) {
            const errText = await res.text();
            return NextResponse.json({ error: errText || "Failed to fetch notifications" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Fetch notifications route error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, message, recipients, type } = body;

        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) {
            backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        }
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/super_admin/super_admins/notifications`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": apiKey || ""
            },
            body: JSON.stringify({ title, message, recipients, type })
        });

        if (!res.ok) {
            const errText = await res.text();
            return NextResponse.json({ error: errText || "Failed to create notification" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Create notification route error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const notification_id = searchParams.get("notification_id");

        if (!notification_id) {
            return NextResponse.json({ error: "Missing notification_id search param" }, { status: 400 });
        }

        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) {
            backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        }
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/super_admin/super_admins/notifications/${notification_id}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            }
        });

        if (!res.ok) {
            const errText = await res.text();
            return NextResponse.json({ error: errText || "Failed to delete notification" }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error: any) {
        console.error("Delete notification route error:", error);
        return NextResponse.json({ error: error.message || "Something went wrong" }, { status: 500 });
    }
}
