"use client";

import React, { useState, useEffect } from "react";
import { X, Loader2, User, Tag, Calendar, MessageSquare, ExternalLink, ShieldCheck, TrendingDown } from "lucide-react";

interface NegotiationDetail {
    id: string;
    service: {
        id: string;
        name: string;
        original_price: string;
    };
    initiator: {
        id: string;
        username: string;
        email: string;
    };
    receiver: {
        id: string;
        username: string;
        email: string;
    };
    proposed_price: string;
    message: string | null;
    status: string;
    created_at: string | null;
    updated_at: string | null;
}

interface Props {
    negotiationId: string;
    onClose: () => void;
}

export default function NegotiationDetailModal({ negotiationId, onClose }: Props) {
    const [data, setData] = useState<NegotiationDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/admin/negotiations/${negotiationId}`);
                if (!res.ok) throw new Error("Failed to load negotiation details");
                const d = await res.json();
                setData(d);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [negotiationId]);

    if (!negotiationId) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 select-none">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512]">
                            <TrendingDown size={20} />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-base font-bold text-slate-800 leading-tight">Negotiation Details</h2>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Reference: {negotiationId.slice(0, 8)}</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-slate-300">
                            <Loader2 size={32} className="animate-spin" />
                            <span className="text-xs font-bold text-slate-400">Loading data...</span>
                        </div>
                    ) : error ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3 text-red-400">
                            <X size={32} />
                            <span className="text-xs font-bold">{error}</span>
                        </div>
                    ) : data && (
                        <>
                            {/* Summary Cards */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Original Price</span>
                                    <span className="text-lg font-bold text-slate-500 line-through decoration-red-400/30 decoration-2">{data.service.original_price}</span>
                                </div>
                                <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100/50 flex flex-col gap-1">
                                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider">Proposed Price</span>
                                    <span className="text-xl font-black text-[#b68512]">{data.proposed_price}</span>
                                </div>
                            </div>

                            {/* Service Section */}
                            <section className="space-y-3">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Tag size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Service Information</span>
                                </div>
                                <div className="p-5 rounded-2xl border border-slate-100 bg-white flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800">{data.service.name}</span>
                                        <span className="text-[10px] text-slate-400 font-medium mt-1">ID: {data.service.id}</span>
                                    </div>
                                    <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-slate-100 transition-colors">
                                        <ExternalLink size={16} />
                                    </button>
                                </div>
                            </section>

                            {/* Participants */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <User size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Involved Parties</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Initiator */}
                                    <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 border-2 border-blue-200 flex items-center justify-center font-bold text-blue-600 shrink-0">
                                            {data.initiator.username.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">Initiator</span>
                                            <span className="text-sm font-bold text-slate-800 truncate">{data.initiator.username}</span>
                                            <span className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{data.initiator.email}</span>
                                        </div>
                                    </div>
                                    {/* Receiver */}
                                    <div className="flex items-start gap-4 p-4 rounded-2xl border border-slate-50 bg-slate-50/30">
                                        <div className="w-12 h-12 rounded-full bg-purple-100 border-2 border-purple-200 flex items-center justify-center font-bold text-purple-600 shrink-0">
                                            {data.receiver.username.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div className="flex flex-col min-w-0">
                                            <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest mb-1">Receiver</span>
                                            <span className="text-sm font-bold text-slate-800 truncate">{data.receiver.username}</span>
                                            <span className="text-[11px] text-slate-400 font-medium truncate mt-0.5">{data.receiver.email}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Negotiation Context */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 text-slate-400">
                                    <MessageSquare size={14} />
                                    <span className="text-[10px] font-bold uppercase tracking-wider">Negotiation Context</span>
                                </div>
                                <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 space-y-4">
                                    <div className="flex flex-col gap-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Initial Message</span>
                                        <p className="text-xs text-slate-600 leading-relaxed font-medium bg-white p-3 rounded-xl border border-slate-50">
                                            {data.message || "No initial message provided for this negotiation."}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</span>
                                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full font-bold text-[9px] uppercase tracking-widest ${
                                                data.status === "PENDING" ? "bg-amber-100 text-amber-700" :
                                                data.status === "ACCEPTED" ? "bg-emerald-100 text-emerald-700" :
                                                "bg-red-100 text-red-700"
                                            }`}>
                                                {data.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Initiated On</span>
                                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                                                <Calendar size={12} className="text-slate-300" />
                                                {data.created_at ? new Date(data.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2 text-slate-400">
                        <ShieldCheck size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Audit Trail Verified</span>
                    </div>
                    <button 
                        onClick={onClose}
                        className="px-6 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-bold text-xs transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-slate-200"
                    >
                        Close Detail
                    </button>
                </div>
            </div>
        </div>
    );
}
