"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import { UserItem } from "../page";

interface OverviewTabProps {
    userId: string;
    user: UserItem;
}

interface UserDetail {
    username: string;
    email: string;
    status: string;
    email_verified: boolean;
    phone_verified: boolean;
    created_at: string | null;
    kyc_status: string;
    kyc_document_type: string | null;
    kyc_document_number: string | null;
    kyc_expiry_date: string | null;
    kyc_verified_date: string | null;
    kyc_uploaded_date: string | null;
}

interface Wallet {
    id: string;
    type: string;
    balance: number;
}

function fmt(iso: string | null | undefined) {
    if (!iso) return "—";
    try {
        return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
    } catch { return iso; }
}

const WALLET_COLORS: Record<string, { bg: string; text: string; label: string }> = {
    main: { bg: "bg-amber-50/50 border-amber-100/50", text: "text-slate-800", label: "Total Wallet Balance" },
    earning: { bg: "bg-[#b68512] border-transparent text-white", text: "text-white", label: "Earning Wallet" },
    funding: { bg: "bg-orange-500 border-transparent", text: "text-white", label: "Funding Wallet" },
};
const DEFAULT_COLORS = [
    { bg: "bg-amber-50/50 border-amber-100/50", text: "text-slate-800" },
    { bg: "bg-[#b68512] border-transparent", text: "text-white" },
    { bg: "bg-orange-500 border-transparent", text: "text-white" },
];

export default function OverviewTab({ userId, user }: OverviewTabProps) {
    const [detail, setDetail] = useState<UserDetail | null>(null);
    const [wallets, setWallets] = useState<Wallet[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const [detRes, walletRes] = await Promise.all([
                    fetch(`/api/admin/platform-users/${userId}`),
                    fetch(`/api/admin/platform-users/${userId}?tab=wallets`),
                ]);
                if (detRes.ok) setDetail(await detRes.json());
                if (walletRes.ok) setWallets(await walletRes.json());
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [userId]);

    if (loading) return (
        <div className="flex items-center justify-center py-20 text-slate-300">
            <Loader2 size={28} className="animate-spin" />
        </div>
    );
    if (error) return (
        <div className="flex flex-col items-center justify-center py-16 gap-2">
            <AlertCircle size={24} className="text-red-300" />
            <p className="text-xs text-slate-400 font-medium">{error}</p>
        </div>
    );

    const d = detail;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 select-none animate-fade-in">
            {/* Wallet cards */}
            <div className="flex flex-col gap-5 xl:col-span-1">
                {wallets.length > 0 ? wallets.map((w, i) => {
                    const color = DEFAULT_COLORS[i % DEFAULT_COLORS.length];
                    return (
                        <div key={w.id} className={`${color.bg} ${color.text} p-6 rounded-2xl flex flex-col justify-between h-[155px] border hover:scale-[1.01] transition-all cursor-pointer`}>
                            <span className="text-[11px] font-bold uppercase tracking-wider leading-tight opacity-80">
                                {w.type} Wallet
                            </span>
                            <div className="flex flex-col leading-none">
                                <span className="text-3xl font-bold tracking-tight leading-none mb-1 flex items-baseline">
                                    ₦{((w.balance ?? 0) / 100).toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                                </span>
                                <div className="flex items-center justify-between mt-4 bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-white/20 transition-all">
                                    <span className="text-[11px] font-bold leading-tight">View History</span>
                                    <ArrowUpRight size={13} />
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    /* Placeholder cards when no wallet data */
                    <>
                        {[
                            { label: "Total Wallet Balance", bg: "bg-amber-50/50 border-amber-100/50", text: "text-slate-800" },
                            { label: "Earning Wallet Balance", bg: "bg-[#b68512] border-transparent", text: "text-white" },
                            { label: "Funding Wallet", bg: "bg-orange-500 border-transparent", text: "text-white" },
                        ].map((card) => (
                            <div key={card.label} className={`${card.bg} ${card.text} p-6 rounded-2xl flex flex-col justify-between h-[155px] border`}>
                                <span className="text-[11px] font-bold uppercase tracking-wider opacity-70">{card.label}</span>
                                <span className="text-2xl font-bold text-slate-300">₦—</span>
                            </div>
                        ))}
                    </>
                )}
            </div>

            {/* Personal info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 xl:col-span-1">
                <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">Personal Information</h4>
                <div className="space-y-4 pt-1 flex-1">
                    {[
                        { label: "Username", value: d?.username ?? user.name },
                        { label: "Full Name", value: (d?.kyc_first_name && d?.kyc_last_name) ? `${d.kyc_first_name} ${d.kyc_last_name}` : "—" },
                        { label: "Email Address", value: d?.email ?? user.email },
                        { label: "Nationality", value: d?.kyc_nationality ?? "—" },
                        { label: "Address", value: d?.kyc_address ?? "—" },
                        {
                            label: "Email Verification",
                            value: d?.email_verified
                                ? <span className="flex items-center gap-1 font-bold text-xs text-emerald-600">Verified <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse" /></span>
                                : <span className="text-xs text-amber-500 font-bold">Unverified</span>
                        },
                        {
                            label: "Phone Verification",
                            value: d?.phone_verified
                                ? <span className="flex items-center gap-1 font-bold text-xs text-emerald-600">Verified <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse" /></span>
                                : <span className="text-xs text-amber-500 font-bold">Unverified</span>
                        },
                    ].map((row) => (
                        <div key={row.label} className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold leading-none mb-1 uppercase tracking-wider">{row.label}</span>
                            {typeof row.value === "string"
                                ? <span className="font-bold text-xs text-slate-800">{row.value || "—"}</span>
                                : row.value}
                        </div>
                    ))}
                </div>
            </div>

            {/* Account info */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 xl:col-span-1">
                <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">Account Information</h4>
                <div className="space-y-4 pt-1 flex-1">
                    {[
                        { label: "Joined Date", value: fmt(d?.created_at) },
                        { label: "KYC Status", value: (
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] w-fit ${
                                d?.kyc_status === "VERIFIED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : d?.kyc_status === "REJECTED" || d?.kyc_status === "FAILED" ? "bg-red-50 text-red-600 border border-red-100"
                                : "bg-amber-50 text-amber-600 border border-amber-100"
                            }`}>{d?.kyc_status ?? user.kycStatus}</span>
                        )},
                        { label: "Document Type", value: d?.kyc_document_type ?? "—" },
                        { label: "Document Number", value: d?.kyc_document_number ?? "—" },
                        { label: "Date of Birth", value: d?.kyc_date_of_birth ?? "—" },
                        { label: "KYC Submitted", value: fmt(d?.kyc_uploaded_date) },
                        { label: "KYC Reviewed", value: fmt(d?.kyc_verified_date) },
                        ...(d?.kyc_rejection_reason ? [{ label: "Rejection Reason", value: d.kyc_rejection_reason }] : []),
                    ].map((row) => (
                        <div key={row.label} className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold leading-none mb-1 uppercase tracking-wider">{row.label}</span>
                            {typeof row.value === "string"
                                ? <span className="font-bold text-xs text-slate-800">{row.value}</span>
                                : row.value}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
