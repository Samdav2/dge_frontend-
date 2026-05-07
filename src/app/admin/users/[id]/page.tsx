"use client";

import { useState, useEffect, use } from "react";
import AdminSidebar from "../../components/AdminSidebar";
import {
    Users as UsersIcon, ChevronDown, MoreHorizontal,
    Loader2, AlertCircle, XCircle, CheckCircle2
} from "lucide-react";

import OverviewTab from "../components/OverviewTab";
import ServicesTab from "../components/ServicesTab";
import NegotiationsTab from "../components/NegotiationsTab";
import EscrowsTab from "../components/EscrowsTab";
import TransactionsTab from "../components/TransactionsTab";
import KYCDocumentsTab from "../components/KYCDocumentsTab";
import ReviewsTab from "../components/ReviewsTab";
import Link from "next/link";

type DetailTabType = "Overview" | "Services Listed" | "Negotiations" | "Escrows" | "Transactions" | "KYC Documents" | "Reviews";
type ToastState = { type: "success" | "error"; message: string } | null;

const STATUS_STYLES: Record<string, string> = {
    ACTIVE: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    INACTIVE: "bg-amber-50 text-amber-600 border border-amber-100",
    BANNED: "bg-red-50 text-red-600 border border-red-100",
};

export default function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [detailTab, setDetailTab] = useState<DetailTabType>("Overview");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [actionLoading, setActionLoading] = useState(false);
    const [toast, setToast] = useState<ToastState>(null);

    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(t);
    }, [toast]);

    useEffect(() => {
        async function fetchUser() {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/platform-users/${id}`);
                if (!res.ok) throw new Error("Failed to fetch user details");
                const data = await res.json();
                setSelectedUser({
                    ...data,
                    name: data.username, // mapping for compatibility with existing tabs
                });
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id]);

    const handleUserStatus = async (userId: string, newStatus: string) => {
        setActionLoading(true);
        try {
            const res = await fetch(`/api/admin/platform-users/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error("Failed to update status");
            setToast({ type: "success", message: `User ${newStatus} successfully` });
            setSelectedUser((prev: any) => ({ ...prev, status: newStatus.toUpperCase() }));
        } catch (err: any) {
            setToast({ type: "error", message: err.message });
        } finally {
            setActionLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen bg-[#fafafa]">
                <AdminSidebar />
                <main className="flex-1 flex items-center justify-center">
                    <Loader2 size={32} className="animate-spin text-[#b68512]" />
                </main>
            </div>
        );
    }

    if (error || !selectedUser) {
        return (
            <div className="flex h-screen bg-[#fafafa]">
                <AdminSidebar />
                <main className="flex-1 flex flex-col items-center justify-center gap-4">
                    <AlertCircle size={48} className="text-red-400" />
                    <p className="text-slate-600 font-medium">{error || "User not found"}</p>
                    <Link href="/admin/users" className="text-amber-600 font-bold hover:underline">Back to User List</Link>
                </main>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden select-none relative">
            <AdminSidebar />

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold animate-fade-in ${
                    toast.type === "success"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                }`}>
                    {toast.type === "success" ? <CheckCircle2 size={16} className="shrink-0" /> : <XCircle size={16} className="shrink-0" />}
                    {toast.message}
                </div>
            )}

            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#fafafa] select-none">
                <header className="h-16 pl-16 pr-4 lg:px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2 max-w-[60%]">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512] shrink-0">
                            <UsersIcon size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-none truncate">
                            Users / {selectedUser.username}
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center font-semibold text-slate-700 text-sm border border-slate-200">
                            AD
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-6 flex-1 overflow-y-auto max-w-[1400px] mx-auto w-full animate-fade-in">
                    <Link
                        href="/admin/users"
                        className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 shadow-sm transition-all flex items-center gap-1 w-fit leading-none mb-2"
                    >
                        ← Back to User List
                    </Link>

                    {/* Profile header */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-center gap-5">
                            <div className="w-20 h-20 bg-slate-50 border-4 border-amber-100 rounded-full flex items-center justify-center font-bold text-slate-700 text-xl shadow-md">
                                {selectedUser.username.slice(0, 2).toUpperCase()}
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-xs font-semibold text-blue-500 tracking-tight leading-none mb-1.5">User Profile</span>
                                <span className="text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5">{selectedUser.username}</span>
                                <span className="text-[11px] text-slate-400 font-semibold leading-none">{selectedUser.email}</span>
                                <span className="text-[10px] text-slate-300 font-medium mt-1">Joined {new Date(selectedUser.created_at).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {selectedUser.status !== "ACTIVE" && (
                                <button
                                    disabled={actionLoading}
                                    onClick={() => handleUserStatus(selectedUser.id, "active")}
                                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-[11px] shadow-sm transition-all hover:scale-[1.01] disabled:opacity-60 flex items-center gap-1.5"
                                >
                                    {actionLoading ? <Loader2 size={13} className="animate-spin" /> : null}
                                    Activate User
                                </button>
                            )}
                            {selectedUser.status === "ACTIVE" && (
                                <button
                                    disabled={actionLoading}
                                    onClick={() => handleUserStatus(selectedUser.id, "inactive")}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-[11px] shadow-sm transition-all hover:scale-[1.01] disabled:opacity-60 flex items-center gap-1.5"
                                >
                                    {actionLoading ? <Loader2 size={13} className="animate-spin" /> : null}
                                    Suspend User
                                </button>
                            )}
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-lg font-bold text-[10px] ${STATUS_STYLES[selectedUser.status] ?? STATUS_STYLES.INACTIVE}`}>
                                {selectedUser.status}
                            </span>
                        </div>
                    </div>

                    {/* Tab strip */}
                    <div className="flex items-center gap-2 border-b border-slate-100 w-full overflow-x-auto whitespace-nowrap flex-nowrap pb-0.5">
                        {(["Overview", "Services Listed", "Negotiations", "Escrows", "Transactions", "KYC Documents", "Reviews"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setDetailTab(tab)}
                                className={`px-4 pb-3.5 text-xs font-bold transition-all relative leading-none border-b-2 shrink-0 ${
                                    detailTab === tab
                                        ? "border-[#b68512] text-slate-800"
                                        : "border-transparent text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab content */}
                    <div className="pt-2">
                        {detailTab === "Overview" && <OverviewTab userId={selectedUser.id} user={selectedUser} />}
                        {detailTab === "Services Listed" && <ServicesTab userId={selectedUser.id} />}
                        {detailTab === "Negotiations" && <NegotiationsTab userId={selectedUser.id} />}
                        {detailTab === "Escrows" && <EscrowsTab userId={selectedUser.id} />}
                        {detailTab === "Transactions" && <TransactionsTab userId={selectedUser.id} />}
                        {detailTab === "KYC Documents" && <KYCDocumentsTab userId={selectedUser.id} />}
                        {detailTab === "Reviews" && <ReviewsTab userId={selectedUser.id} />}
                    </div>
                </div>
            </main>
        </div>
    );
}
