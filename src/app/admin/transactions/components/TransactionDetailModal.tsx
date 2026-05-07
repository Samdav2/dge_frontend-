"use client";

import { useState, useEffect } from "react";
import { X, CheckCircle, Clock, AlertCircle, User, Wallet, Hash, Calendar, ArrowRightLeft } from "lucide-react";

interface TransactionDetail {
    id: string;
    amount: string;
    status: string;
    type: string;
    reference: string;
    created_at: string;
    updated_at: string;
    user: {
        username: string;
        email: string;
    };
    wallet: {
        id: string;
        balance: string;
    };
}

interface TransactionDetailModalProps {
    transactionId: string;
    onClose: () => void;
}

export default function TransactionDetailModal({ transactionId, onClose }: TransactionDetailModalProps) {
    const [data, setData] = useState<TransactionDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            if (!transactionId || transactionId === "undefined" || transactionId === "null") {
                setError("Invalid Transaction ID.");
                setLoading(false);
                return;
            }

            setLoading(true);
            try {
                const res = await fetch(`/api/admin/transactions/${transactionId}`);
                if (!res.ok) {
                    const err = await res.json();
                    throw new Error(err.error || "Failed to fetch details");
                }
                const detail = await res.json();
                setData(detail);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetail();
    }, [transactionId]);

    const getStatusStyles = (status: string) => {
        switch (status.toUpperCase()) {
            case "COMPLETED": return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "FAILED": return "bg-red-50 text-red-600 border-red-100";
            case "PENDING": return "bg-amber-50 text-amber-600 border-amber-100";
            case "REVERSED": return "bg-blue-50 text-blue-600 border-blue-100";
            default: return "bg-slate-50 text-slate-600 border-slate-100";
        }
    };

    const handleGenerateReceipt = () => {
        if (!data) return;

        const printWindow = window.open("", "_blank");
        if (!printWindow) return;

        const receiptHtml = `
            <html>
                <head>
                    <title>Transaction Receipt - ${data.reference || data.id}</title>
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
                        body { font-family: 'Inter', sans-serif; padding: 40px; color: #1e293b; background: white; }
                        .receipt-card { max-width: 500px; margin: 0 auto; border: 1px solid #f1f5f9; padding: 40px; border-radius: 24px; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
                        .header { text-align: center; margin-bottom: 40px; }
                        .logo { font-weight: 900; font-size: 24px; color: #b68512; margin-bottom: 8px; }
                        .title { text-transform: uppercase; letter-spacing: 2px; font-size: 10px; font-weight: 700; color: #94a3b8; }
                        .amount-block { text-align: center; margin-bottom: 40px; padding: 24px; background: #fafafa; border-radius: 16px; }
                        .amount { font-size: 42px; font-weight: 900; color: #0f172a; margin-bottom: 4px; }
                        .status { display: inline-block; padding: 4px 12px; border-radius: 99px; font-size: 10px; font-weight: 900; text-transform: uppercase; }
                        .status-completed { background: #ecfdf5; color: #059669; }
                        .status-pending { background: #fffbeb; color: #d97706; }
                        .status-failed { background: #fef2f2; color: #dc2626; }
                        .details { border-top: 1px dashed #e2e8f0; padding-top: 24px; }
                        .detail-row { display: flex; justify-content: space-between; margin-bottom: 16px; }
                        .label { color: #94a3b8; font-size: 11px; font-weight: 600; text-transform: uppercase; }
                        .value { color: #1e293b; font-size: 12px; font-weight: 700; }
                        .footer { margin-top: 40px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 24px; }
                        .footer p { font-size: 10px; color: #94a3b8; line-height: 1.5; }
                        @media print {
                            body { padding: 0; }
                            .receipt-card { box-shadow: none; border: none; }
                        }
                    </style>
                </head>
                <body>
                    <div class="receipt-card">
                        <div class="header">
                            <div class="logo">DGE PLATFORM</div>
                            <div class="title">Official Transaction Receipt</div>
                        </div>
                        <div class="amount-block">
                            <div class="amount">${data.amount}</div>
                            <div class="status status-${data.status.toLowerCase()}">${data.status}</div>
                        </div>
                        <div class="details">
                            <div class="detail-row"><span class="label">Transaction ID</span><span class="value">${data.id}</span></div>
                            <div class="detail-row"><span class="label">Reference</span><span class="value">${data.reference || "N/A"}</span></div>
                            <div class="detail-row"><span class="label">Type</span><span class="value">${data.type}</span></div>
                            <div class="detail-row"><span class="label">User</span><span class="value">${data.user.username}</span></div>
                            <div class="detail-row"><span class="label">Date & Time</span><span class="value">${data.created_at}</span></div>
                        </div>
                        <div class="footer">
                            <p>This is a computer generated receipt for your records.<br/>Thank you for using DGE Platform.</p>
                        </div>
                    </div>
                    <script>
                        window.onload = () => {
                            window.print();
                            // window.close();
                        };
                    </script>
                </body>
            </html>
        `;

        printWindow.document.write(receiptHtml);
        printWindow.document.close();
    };

    return (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-[24px] shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="px-6 py-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/30">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#b68512]/10 flex items-center justify-center text-[#b68512]">
                            <ArrowRightLeft size={18} />
                        </div>
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 leading-none">Transaction Detail</h3>
                            <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-wider">Financial Record</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-1.5 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[80vh]">
                    {loading ? (
                        <div className="py-20 flex flex-col items-center justify-center gap-4">
                            <div className="w-10 h-10 border-4 border-[#b68512] border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-xs font-bold text-slate-400 animate-pulse uppercase tracking-widest">Loading Transaction Details...</p>
                        </div>
                    ) : error ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
                                <AlertCircle size={24} />
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 mb-1">Failed to load details</h4>
                            <p className="text-xs text-slate-400 max-w-[240px] leading-relaxed">{error}</p>
                        </div>
                    ) : data && (
                        <div className="space-y-6">
                            {/* Summary Card */}
                            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
                                <div className="relative z-10">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Transaction Amount</span>
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <span className="text-3xl font-black tracking-tight leading-none">{data.amount}</span>
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider ${getStatusStyles(data.status)} border-0`}>
                                            {data.status}
                                        </span>
                                    </div>
                                    <div className="mt-4 flex items-center gap-4 pt-4 border-t border-white/10">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-500 uppercase">Type</span>
                                            <span className="text-xs font-bold text-slate-200">{data.type}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] font-bold text-slate-500 uppercase">Reference</span>
                                            <span className="text-xs font-bold text-slate-200">{data.reference || "N/A"}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#b68512]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                            </div>

                            {/* Detail Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                {/* User Block */}
                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                            <User size={14} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none pt-0.5">User Info</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Username</span>
                                            <span className="text-xs font-bold text-slate-800 leading-tight">{data.user.username}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Email</span>
                                            <span className="text-xs font-semibold text-slate-500 truncate">{data.user.email}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Wallet Block */}
                                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="p-1.5 bg-emerald-100 text-emerald-600 rounded-lg">
                                            <Wallet size={14} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none pt-0.5">Wallet Info</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Wallet ID</span>
                                            <span className="text-[10px] font-bold text-slate-800 truncate">...{data.wallet.id.slice(-8).toUpperCase()}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Current Balance</span>
                                            <span className="text-xs font-bold text-emerald-600 leading-none mt-0.5">{data.wallet.balance}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline/Meta */}
                            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-4">
                                <div className="flex items-center gap-2 border-b border-slate-200/50 pb-3">
                                    <Clock size={16} className="text-slate-400" />
                                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-widest">Transaction Timeline</span>
                                </div>
                                <div className="flex justify-between items-center px-1">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Date & Time</span>
                                        <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
                                            <Calendar size={12} className="text-[#b68512]" /> {data.created_at}
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1 items-end">
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">Last Sync</span>
                                        <span className="text-xs font-bold text-slate-500">{data.updated_at}</span>
                                    </div>
                                </div>
                            </div>

                            {/* ID Block */}
                            <div className="bg-slate-50 rounded-xl p-3 border border-dashed border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Hash size={14} className="text-slate-300" />
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Internal ID</span>
                                </div>
                                <span className="text-[9px] font-mono font-bold text-slate-400">{data.id}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                {!loading && !error && (
                    <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex gap-3">
                        <button 
                            onClick={handleGenerateReceipt}
                            className="flex-1 h-10 bg-[#b68512] text-white rounded-xl text-xs font-bold hover:bg-[#a67a10] transition-all flex items-center justify-center gap-2 shadow-sm"
                        >
                            Generate Receipt
                        </button>
                        <button 
                            onClick={onClose}
                            className="flex-1 h-10 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all flex items-center justify-center"
                        >
                            Close
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
