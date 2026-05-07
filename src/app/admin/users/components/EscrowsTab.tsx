"use client";

import { useEffect, useState } from "react";
import { Loader2, AlertCircle, MoreHorizontal } from "lucide-react";

interface Escrow {
    id: string; title: string; counterparty: string; amount: string; date: string; status: string;
}

const STATUS_STYLES: Record<string, string> = {
    FUNDED: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    RELEASED: "bg-blue-50 text-blue-600 border border-blue-100",
    REFUNDED: "bg-amber-50 text-amber-600 border border-amber-100",
    DISPUTED: "bg-red-50 text-red-600 border border-red-100",
    PENDING: "bg-amber-50 text-amber-600 border border-amber-100",
};

export default function EscrowsTab({ userId }: { userId: string }) {
    const [items, setItems] = useState<Escrow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/admin/platform-users/${userId}?tab=escrows`)
            .then(r => r.json()).then(d => setItems(Array.isArray(d) ? d : []))
            .catch(e => setError(e.message)).finally(() => setLoading(false));
    }, [userId]);

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">Escrows</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-50 text-[#b68512] border border-amber-100">{items.length}</span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] overflow-x-auto">
                {loading ? <div className="flex items-center justify-center py-12"><Loader2 size={22} className="animate-spin text-slate-300" /></div>
                : error ? <div className="flex flex-col items-center py-12 gap-2"><AlertCircle size={20} className="text-red-300" /><p className="text-xs text-slate-400">{error}</p></div>
                : items.length === 0 ? <p className="text-xs text-slate-400 text-center py-12">No escrows found</p>
                : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                {["Title","Counterparty","Amount","Date","Status",""].map(h => (
                                    <th key={h} className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {items.map(e => (
                                <tr key={e.id} className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                                    <td className="py-4 px-2 text-xs font-bold text-slate-800 max-w-[200px] truncate">{e.title}</td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium">{e.counterparty}</td>
                                    <td className="py-4 px-2 text-xs text-slate-500 font-semibold">{e.amount}</td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium">{e.date}</td>
                                    <td className="py-4 px-2">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] ${STATUS_STYLES[e.status] ?? "bg-slate-50 text-slate-400 border border-slate-100"}`}>{e.status}</span>
                                    </td>
                                    <td className="py-4 px-2 text-slate-400"><MoreHorizontal size={16} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
