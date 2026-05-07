import { NextResponse } from "next/server";

export async function GET() {
    try {
        let backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
        if (backendUrl.includes("0.0.0.0")) {
            backendUrl = backendUrl.replace("0.0.0.0", "127.0.0.1");
        }
        const apiKey = process.env.BACKEND_API_KEY;

        const res = await fetch(`${backendUrl}/super_admin/super_admins/stats`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "X-API-KEY": apiKey || ""
            },
            cache: "no-store"
        });

        if (!res.ok) {
            return NextResponse.json({
                name: "Admin",
                email: "admin@domain.com",
                phone: "09000000000",
                role: "Super Admin",
                status: "ACTIVE"
            });
        }

        // Return a mock/curated profile if real stats works
        return NextResponse.json({
            name: "Admin User",
            email: "admin@gmail.com",
            phone: "+2348000000000",
            role: "Super Admin",
            status: "ACTIVE"
        });
    } catch (error: any) {
        return NextResponse.json({
            name: "Admin User",
            email: "admin@gmail.com",
            phone: "+2348000000000",
            role: "Super Admin",
            status: "ACTIVE"
        });
    }
}
