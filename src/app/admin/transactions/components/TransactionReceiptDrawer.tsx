"use client";

import { useState } from "react";
import { X, CheckCircle, Download, RefreshCw, Undo2 } from "lucide-react";

interface TransactionReceiptDrawerProps {
    item: any | null;
    onClose: () => void;
}

export default function TransactionReceiptDrawer({ item, onClose }: TransactionReceiptDrawerProps) {
    const [status, setStatus] = useState<string>("Completed");

    if (!item) return null;

    return (
        <div className="fixed inset-y-0 right-0 w-[420px] bg-white border-l border-slate-100 shadow-2xl flex flex-col justify-between z-50 animate-slide-in select-none p-6">
            <div className="space-y-6 flex-1 overflow-y-auto pr-1">
                {/* Header Close button exactly matching Screenshot 3 */}
                <div className="flex items-center justify-between select-none leading-none border-b border-slate-50 pb-4">
                    <span className="text-sm font-bold text-slate-800 select-none">
                        Transaction Receipt
                    </span>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 select-none transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Status indicator badge and Amount */}
                <div className="flex flex-col items-center justify-center gap-3 pt-2 pb-1 select-none">
                    <div className="w-12 h-12 bg-emerald-100/50 border border-emerald-100 flex items-center justify-center rounded-full text-emerald-600 animate-pulse">
                        <CheckCircle size={26} />
                    </div>
                    <span className="text-3xl font-bold tracking-tight text-slate-800 leading-none">
                        {item.amount || "₦6,500"}
                    </span>
                    <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 rounded-full px-2.5 py-1 select-none leading-none">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none">
                            Sent To
                        </span>
                        <span className="w-2.5 h-2.5 bg-amber-400 rounded-full"></span>
                        <span className="text-[10px] font-bold text-slate-700 select-none leading-none">
                            8012345678 - Opay
                        </span>
                    </div>
                </div>

                {/* Inner Info Table exactly as Screenshot 3 */}
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80 space-y-3.5 select-none text-xs">
                    <div className="flex items-center justify-between select-none">
                        <span className="text-slate-400 font-semibold select-none">Reference Number</span>
                        <span className="text-slate-800 font-bold select-none leading-none">
                            {item.txId || "TXN20241007001"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between select-none">
                        <span className="text-slate-400 font-semibold select-none">Status</span>
                        <span className="px-2 py-0.5 rounded-md font-bold text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 select-none leading-none">
                            {item.status || "SUCCESSFUL"}
                        </span>
                    </div>
                    <div className="flex items-center justify-between select-none">
                        <span className="text-slate-400 font-semibold select-none">Date & Time</span>
                        <span className="text-slate-800 font-bold select-none leading-none">
                            Feb 20, 2025 . 7:10PM
                        </span>
                    </div>
                </div>

                {/* Main Download Button matching Screenshot 3 */}
                <button className="w-full h-11 bg-[#b68512] hover:bg-[#a17410] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 select-none hover:scale-[1.01] shadow-sm transition-all leading-none">
                    <Download size={16} /> <span>Download PDF</span>
                </button>

                {/* Action card: Change Transaction Status */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-3.5 select-none flex flex-col">
                    <div className="flex flex-col select-none leading-tight">
                        <span className="font-bold text-xs text-slate-800 select-none">
                            Change Transaction Status
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold select-none mt-1">
                            Update the current status of this transaction
                        </span>
                    </div>

                    <div className="flex items-center gap-2 select-none w-full">
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="flex-1 h-10 border border-slate-100 bg-white rounded-xl font-semibold text-xs text-slate-700 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 outline-none px-3 transition-all cursor-pointer leading-none"
                        >
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Failed">Failed</option>
                        </select>
                        <button className="h-10 px-3 bg-[#b68512] hover:bg-[#a17410] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1 select-none hover:scale-[1.01] shadow-sm transition-all leading-none">
                            <RefreshCw size={14} className="shrink-0" /> <span className="text-[10px]">Save Status</span>
                        </button>
                    </div>
                </div>

                {/* Action card: Reverse Transaction */}
                <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-3.5 select-none flex flex-col">
                    <div className="flex flex-col select-none leading-tight">
                        <span className="font-bold text-xs text-slate-800 select-none">
                            Reverse Transaction
                        </span>
                        <span className="text-[10px] text-slate-400 font-semibold select-none mt-1">
                            Reverse this transaction and refund the amount to the user
                        </span>
                    </div>

                    <button className="w-full h-10 bg-[#ef4444] hover:bg-red-600 text-white rounded-xl font-bold text-[10px] flex items-center justify-center gap-2 select-none hover:scale-[1.01] shadow-sm transition-all leading-none mt-1">
                        <Undo2 size={14} /> <span>Reverse Transaction</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
