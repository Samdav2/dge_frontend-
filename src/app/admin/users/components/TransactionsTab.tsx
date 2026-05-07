"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, MoreHorizontal, X, CheckCircle2, Download, FileText } from "lucide-react";

interface Txn {
    id: string; reference: string; type: string; amount: string; dateTime: string; status: string;
}

const STATUS_STYLES: Record<string, string> = {
    SUCCESSFUL: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    SUCCESS: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    COMPLETED: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    PENDING: "bg-amber-50 text-amber-600 border border-amber-100",
    FAILED: "bg-red-50 text-red-600 border border-red-100",
};

export default function TransactionsTab({ userId }: { userId: string }) {
    const [items, setItems] = useState<Txn[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedTxn, setSelectedTxn] = useState<Txn | null>(null);

    useEffect(() => {
        fetch(`/api/admin/platform-users/${userId}?tab=transactions`)
            .then(r => r.json()).then(d => setItems(Array.isArray(d) ? d : []))
            .catch(e => setError(e.message)).finally(() => setLoading(false));
    }, [userId]);

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">Transactions</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-50 text-[#b68512] border border-amber-100">{items.length}</span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] overflow-x-auto">
                {loading ? <div className="flex items-center justify-center py-12"><Loader2 size={22} className="animate-spin text-slate-300" /></div>
                : error ? <div className="flex flex-col items-center py-12 gap-2"><AlertCircle size={20} className="text-red-300" /><p className="text-xs text-slate-400">{error}</p></div>
                : items.length === 0 ? <p className="text-xs text-slate-400 text-center py-12">No transactions found</p>
                : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                {["Transaction ID","Type","Amount","Date & Time","Status",""].map(h => (
                                    <th key={h} className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {items.map(txn => (
                                <tr key={txn.id} onClick={() => setSelectedTxn(txn)} className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                                    <td className="py-4 px-2 text-xs font-bold text-slate-800">{txn.reference}</td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium">{txn.type}</td>
                                    <td className="py-4 px-2 text-xs text-slate-500 font-semibold">{txn.amount}</td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium">{txn.dateTime}</td>
                                    <td className="py-4 px-2">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] ${STATUS_STYLES[txn.status] ?? "bg-slate-50 text-slate-400 border border-slate-100"}`}>{txn.status}</span>
                                    </td>
                                    <td className="py-4 px-2 text-slate-400"><MoreHorizontal size={16} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Transaction detail drawer */}
            {selectedTxn && (
                <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex justify-end animate-fade-in">
                    <div className="w-full max-w-md bg-white h-full border-l border-slate-100 p-6 flex flex-col gap-6 overflow-y-auto shadow-2xl">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 text-sm">Transaction Receipt</h3>
                            <button onClick={() => setSelectedTxn(null)} className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={15} />
                            </button>
                        </div>
                        <div className="flex flex-col items-center py-4">
                            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 mb-3.5 shadow-sm">
                                <CheckCircle2 size={28} />
                            </div>
                            <span className="text-2xl font-bold tracking-tight text-slate-800 leading-none mb-1">{selectedTxn.amount}</span>
                            <span className="text-xs text-slate-400 font-medium mt-1">{selectedTxn.type}</span>
                        </div>
                        <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100 space-y-3">
                            {[
                                { label: "Reference", value: selectedTxn.reference },
                                { label: "Status", value: selectedTxn.status },
                                { label: "Date & Time", value: selectedTxn.dateTime },
                            ].map(row => (
                                <div key={row.label} className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">{row.label}</span>
                                    <span className="text-xs font-bold text-slate-800">{row.value}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-2.5 bg-[#b68512] hover:bg-amber-600 text-white rounded-xl font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5">
                            <Download size={14} /> Download PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
