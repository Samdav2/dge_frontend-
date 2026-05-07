"use client";

import { useEffect, useState } from "react";
import { Search, Loader2, AlertCircle, MoreHorizontal } from "lucide-react";

interface Negotiation {
    id: string; title: string; negotiator: string;
    servicePrice: string; negotiationPrice: string; date: string; status: string;
}

const STATUS_STYLES: Record<string, string> = {
    APPROVED: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    ACCEPTED: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    PENDING: "bg-amber-50 text-amber-600 border border-amber-100",
    REJECTED: "bg-red-50 text-red-600 border border-red-100",
};

export default function NegotiationsTab({ userId }: { userId: string }) {
    const [items, setItems] = useState<Negotiation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        fetch(`/api/admin/platform-users/${userId}?tab=negotiations`)
            .then(r => r.json()).then(d => setItems(Array.isArray(d) ? d : []))
            .catch(e => setError(e.message)).finally(() => setLoading(false));
    }, [userId]);

    const filtered = items.filter(n =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.negotiator.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">Negotiations</h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-50 text-[#b68512] border border-amber-100">{items.length}</span>
            </div>
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…"
                    className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none" />
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] overflow-x-auto">
                {loading ? <div className="flex items-center justify-center py-12"><Loader2 size={22} className="animate-spin text-slate-300" /></div>
                : error ? <div className="flex flex-col items-center py-12 gap-2"><AlertCircle size={20} className="text-red-300" /><p className="text-xs text-slate-400">{error}</p></div>
                : filtered.length === 0 ? <p className="text-xs text-slate-400 text-center py-12">No negotiations found</p>
                : (
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-50">
                                {["Title","Negotiator","Service Price","Negotiation Price","Date","Status",""].map(h => (
                                    <th key={h} className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filtered.map(n => (
                                <tr key={n.id} className="hover:bg-slate-50/50 cursor-pointer transition-colors">
                                    <td className="py-4 px-2 text-xs font-bold text-slate-800 max-w-[200px] truncate">{n.title}</td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium">{n.negotiator}</td>
                                    <td className="py-4 px-2 text-xs text-slate-500 font-semibold">{n.servicePrice}</td>
                                    <td className="py-4 px-2 text-xs text-slate-500 font-semibold">{n.negotiationPrice}</td>
                                    <td className="py-4 px-2 text-xs text-slate-400 font-medium">{n.date}</td>
                                    <td className="py-4 px-2">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] ${STATUS_STYLES[n.status] ?? "bg-slate-50 text-slate-400 border border-slate-100"}`}>{n.status}</span>
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
