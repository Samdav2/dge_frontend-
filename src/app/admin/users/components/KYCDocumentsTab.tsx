"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, Eye, Download, FileText } from "lucide-react";

interface KYCDetail {
    kyc_status: string;
    kyc_document_type: string | null;
    kyc_document_number: string | null;
    kyc_date_of_birth: string | null;
    kyc_nationality: string | null;
    kyc_address: string | null;
    kyc_verified_date: string | null;
    kyc_uploaded_date: string | null;
    kyc_document_url: string | null;
    kyc_rejection_reason: string | null;
}

function fmt(iso: string | null | undefined) {
    if (!iso) return "—";
    try { return new Date(iso).toLocaleDateString("en-GB"); } catch { return iso; }
}

export default function KYCDocumentsTab({ userId }: { userId: string }) {
    const [data, setData] = useState<KYCDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/admin/platform-users/${userId}`)
            .then(r => r.json()).then(d => setData(d))
            .catch(e => setError(e.message)).finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-slate-300" /></div>;
    if (error) return <div className="flex flex-col items-center py-12 gap-2"><AlertCircle size={20} className="text-red-300" /><p className="text-xs text-slate-400">{error}</p></div>;

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex flex-col">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">KYC Documents</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">Verification documents submitted by the user</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-4xl">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    {/* Document preview */}
                    <div className="w-64 h-36 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-3 shadow-inner">
                        {data?.kyc_document_url ? (
                            <img src={data.kyc_document_url} alt="KYC Document" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-lg flex items-center justify-center text-slate-300 font-bold tracking-widest text-xs">
                                {data?.kyc_document_type?.toUpperCase() ?? "NO DOCUMENT"}
                            </div>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                        {[
                            { label: "Document Type", value: data?.kyc_document_type ?? "—" },
                            { label: "Document Number", value: data?.kyc_document_number ?? "—" },
                            { label: "Date of Birth", value: data?.kyc_date_of_birth ?? "—" },
                            { label: "Nationality", value: data?.kyc_nationality ?? "—" },
                            { label: "KYC Submitted", value: fmt(data?.kyc_uploaded_date) },
                            { label: "KYC Reviewed", value: fmt(data?.kyc_verified_date) },
                            {
                                label: "KYC Status",
                                value: (
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] w-fit ${
                                        data?.kyc_status === "VERIFIED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                        : data?.kyc_status === "REJECTED" || data?.kyc_status === "FAILED" ? "bg-red-50 text-red-600 border border-red-100"
                                        : "bg-amber-50 text-amber-600 border border-amber-100"
                                    }`}>{data?.kyc_status ?? "PENDING"}</span>
                                )
                            },
                        ].map(row => (
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

            <div className="flex items-center gap-3 bg-white p-4 max-w-4xl rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                {data?.kyc_document_url && (
                    <a href={data.kyc_document_url} target="_blank" rel="noopener noreferrer"
                        className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 shadow-sm transition-all flex items-center gap-1.5">
                        <Eye size={15} /> View Full Document
                    </a>
                )}
                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 shadow-sm transition-all flex items-center gap-1.5">
                    <Download size={15} /> Download
                </button>
                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 shadow-sm transition-all flex items-center gap-1.5">
                    <FileText size={15} /> Request Re-Verification
                </button>
            </div>
        </div>
    );
}
