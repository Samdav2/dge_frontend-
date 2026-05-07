"use client";

import { useState, useEffect } from "react";
import { Eye, Download, FileText, Mail, Edit, Check, X } from "lucide-react";

interface ReviewDetailViewProps {
    userId: string;
    onBack: () => void;
}

export default function ReviewDetailView({ userId, onBack }: ReviewDetailViewProps) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [rejectReason, setRejectReason] = useState("");
    const [showRejectInput, setShowRejectInput] = useState(false);

    const fetchDetail = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/admin/kyc/${userId}`);
            const d = await res.json();
            setData(d);
        } catch (err) {
            console.error("Failed to fetch KYC detail:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) fetchDetail();
    }, [userId]);

    const handleAction = async (action: "approve" | "reject") => {
        if (action === "reject" && !rejectReason) {
            setShowRejectInput(true);
            return;
        }
        
        try {
            const res = await fetch(`/api/admin/kyc/${userId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action, reason: rejectReason }),
            });
            if (res.ok) {
                fetchDetail(); // Refresh data
                if (action === "approve") alert("KYC Approved!");
                else {
                    alert("KYC Rejected.");
                    setShowRejectInput(false);
                    setRejectReason("");
                }
            } else {
                const err = await res.json();
                alert(`Error: ${err.error || "Failed to process KYC"}`);
            }
        } catch (err) {
            console.error("KYC action error:", err);
        }
    };

    if (loading) return <div className="h-96 bg-white rounded-2xl animate-pulse mt-8"></div>;

    const name = data?.name || "User";

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <button
                onClick={onBack}
                className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 shadow-sm transition-all flex items-center gap-1 leading-none mb-2 w-fit"
            >
                ← Back to KYC List
            </button>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
                <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-slate-50 border-4 border-amber-100 rounded-full flex items-center justify-center font-bold text-slate-700 text-xl overflow-hidden shadow-md">
                        {name.split(" ").map((n: string) => n[0]).join("")}
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs font-semibold text-blue-500 tracking-tight leading-none mb-1.5 uppercase">User Profile</span>
                        <span className="text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5">{name}</span>
                        <span className="text-[11px] text-slate-400 font-semibold leading-none">
                            Submitted On {data?.submitted_at ? new Date(data.submitted_at).toLocaleDateString() : "—"}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {data?.status === "PENDING" ? (
                        <>
                            <button 
                                onClick={() => handleAction("approve")}
                                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-[11px] flex items-center gap-1.5 shadow-sm transition-all"
                            >
                                <Check size={14} /> Approve KYC
                            </button>
                            <button 
                                onClick={() => setShowRejectInput(!showRejectInput)}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-[11px] flex items-center gap-1.5 shadow-sm transition-all"
                            >
                                <X size={14} /> Reject KYC
                            </button>
                        </>
                    ) : (
                        <span className={`px-4 py-2 rounded-xl font-bold text-[11px] border ${
                            data?.status === "VERIFIED" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                        }`}>
                            STATUS: {data?.status}
                        </span>
                    )}
                </div>
            </div>

            {showRejectInput && (
                <div className="bg-white p-4 rounded-xl border border-red-100 shadow-sm animate-in slide-in-from-top-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">Reason for Rejection</label>
                    <textarea 
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-100 rounded-lg text-xs outline-none focus:border-red-500/50 min-h-[80px]"
                        placeholder="Explain why the document was rejected..."
                    />
                    <div className="flex justify-end gap-2 mt-3">
                        <button onClick={() => setShowRejectInput(false)} className="px-3 py-1.5 text-xs font-bold text-slate-400 hover:text-slate-600">Cancel</button>
                        <button onClick={() => handleAction("reject")} className="px-4 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg">Confirm Rejection</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 select-none animate-fade-in">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none">
                    <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5 uppercase">Personal Information</h4>
                    <div className="space-y-4 pt-1 flex-1">
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Full Name</span>
                            <span className="font-bold text-xs text-slate-800">{name}</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Nationality</span>
                            <span className="font-bold text-xs text-slate-800">{data?.personal_info?.nationality}</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Email Address</span>
                            <span className="font-bold text-xs text-slate-800">{data?.email}</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Address</span>
                            <span className="font-bold text-xs text-slate-800">{data?.personal_info?.address}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none">
                    <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5 uppercase">Submission Metadata</h4>
                    <div className="space-y-4 pt-1 flex-1">
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Submitted On</span>
                            <span className="font-bold text-xs text-slate-800">{data?.submitted_at ? new Date(data.submitted_at).toLocaleString() : "—"}</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Reviewed On</span>
                            <span className="font-bold text-xs text-slate-800">{data?.reviewed_at ? new Date(data.reviewed_at).toLocaleString() : "—"}</span>
                        </div>
                        {data?.rejection_reason && (
                            <div className="flex flex-col leading-tight pt-2 mt-2 border-t border-slate-50">
                                <span className="text-[10px] text-red-400 font-semibold mb-1 uppercase tracking-wider">Rejection Reason</span>
                                <span className="font-bold text-xs text-red-600">{data.rejection_reason}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-6 select-none animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-64 h-36 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-3 relative shadow-inner group">
                            {data?.id_document_url ? (
                                <img src={data.id_document_url} alt="KYC Document" className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-lg flex items-center justify-center text-slate-300 font-bold tracking-widest text-xs">
                                    {data?.id_type} DOCUMENT
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                            <div className="flex flex-col leading-tight">
                                <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Document Type</span>
                                <span className="font-bold text-xs text-slate-800">{data?.id_type}</span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Document Number</span>
                                <span className="font-bold text-xs text-slate-800">{data?.id_value}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 shadow-sm transition-all flex items-center gap-1.5">
                        <Eye size={15} /> <span>View Full Document</span>
                    </button>
                    <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 shadow-sm transition-all flex items-center gap-1.5">
                        <Download size={15} /> <span>Download</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
