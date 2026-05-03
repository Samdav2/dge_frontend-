"use client";

import { AdminLoginForm } from "@/features/auth/components/AdminLoginForm";

export default function AdminLoginPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#fafafa] p-6">
            <AdminLoginForm />
        </div>
    );
}
