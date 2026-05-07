"use client";

import { useState, useEffect } from "react";
import { MoreHorizontal, Eye, Trash2 } from "lucide-react";
import NegotiationDetailModal from "./NegotiationDetailModal";
import { useStatusModal } from "../../components/StatusModalProvider";

interface NegotiationItem {
    id: string;
    service_name: string;
    initiator_name: string;
    receiver_name: string;
    proposed_price: string;
    original_price: string;
    created_at: string;
    status: string;
}

export default function RejectedNegotiationsTab() {
    const [items, setItems] = useState<NegotiationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [selectedNegotiationId, setSelectedNegotiationId] = useState<string | null>(null);
    const { showModal, hideModal } = useStatusModal();

    const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

    const toggleMenu = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (activeMenu === id) {
            setActiveMenu(null);
        } else {
            const rect = event.currentTarget.getBoundingClientRect();
            setMenuPos({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX - 140
            });
            setActiveMenu(id);
        }
    };

    const fetchNegotiations = async () => {
        try {
            const res = await fetch("/api/admin/negotiations?status=rejected");
            const data = await res.json();
            if (data.items) setItems(data.items);
        } catch (err) {
            console.error("Failed to fetch rejected negotiations:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNegotiations();
    }, []);

    const handleDelete = async (id: string) => {
        showModal({
            type: "warning",
            title: "Delete Negotiation",
            message: "Are you sure you want to delete this negotiation? This action cannot be undone.",
            onConfirm: async () => {
                hideModal();
                try {
                    const res = await fetch(`/api/admin/negotiations/${id}`, {
                        method: "DELETE"
                    });
                    if (res.ok) {
                        setItems(items.filter(it => it.id !== id));
                        showModal({
                            type: "success",
                            title: "Deleted",
                            message: "Negotiation deleted successfully."
                        });
                    } else {
                        const err = await res.json();
                        showModal({
                            type: "error",
                            title: "Delete Failed",
                            message: err.error || "Failed to delete"
                        });
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        });
        setActiveMenu(null);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative animate-fade-in mt-4 min-h-[400px]">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
            <table className="w-full text-left border-collapse select-none">
                <thead>
                    <tr className="border-b border-slate-50 select-none">
                        <th className="py-3 px-2 w-10">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                        </th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Service Title</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Initiator</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Receiver</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Orig. Price</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Proposed Price</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                        <th className="py-3 px-2 w-8"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {items.length > 0 ? items.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none group">
                            <td className="py-4 px-2">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                            </td>
                            <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight max-w-[180px] truncate">{item.service_name}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium">{item.initiator_name}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium">{item.receiver_name}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold">{item.original_price}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold">{item.proposed_price}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium">{item.created_at}</td>
                            <td className="py-4 px-2">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] bg-red-50 text-red-600 border border-red-100 uppercase">
                                    {item.status}
                                </span>
                            </td>
                            <td className="py-4 px-2 text-slate-400 relative">
                                <button 
                                    onClick={(e) => toggleMenu(item.id, e)}
                                    className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
                                >
                                    <MoreHorizontal size={16} />
                                </button>
                            </td>
                        </tr>
                    )) : !loading && (
                        <tr><td colSpan={9} className="py-12 text-center text-slate-400 text-xs italic font-medium">No rejected negotiations found.</td></tr>
                    )}
                </tbody>
            </table>

            {/* Fixed Positioned Popups to avoid clipping */}
            {activeMenu !== null && (
                <div 
                    className="fixed bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-[100] flex flex-col select-none animate-in fade-in zoom-in-95 duration-100 w-40"
                    style={{ 
                        top: `${menuPos.top - window.scrollY}px`, 
                        left: `${menuPos.left - window.scrollX}px` 
                    }}
                >
                    <button 
                        onClick={() => {
                            setSelectedNegotiationId(activeMenu);
                            setActiveMenu(null);
                        }}
                        className="w-full px-3 py-2 text-left text-[10px] font-bold text-slate-600 hover:bg-slate-50 rounded-lg flex items-center gap-2"
                    >
                        <Eye size={14} className="text-blue-500" /> View Info
                    </button>
                    <button 
                        onClick={() => {
                            handleDelete(activeMenu);
                            setActiveMenu(null);
                        }}
                        className="w-full px-3 py-2 text-left text-[10px] font-bold text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 border-t border-slate-50 mt-1 pt-2"
                    >
                        <Trash2 size={14} className="text-red-500" /> Delete Negotiation
                    </button>
                </div>
            )}
            {/* Negotiation Detail Modal */}
            {selectedNegotiationId && (
                <NegotiationDetailModal 
                    negotiationId={selectedNegotiationId} 
                    onClose={() => setSelectedNegotiationId(null)} 
                />
            )}
        </div>
    );
}
