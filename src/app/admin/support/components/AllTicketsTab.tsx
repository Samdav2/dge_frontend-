"use client";

import { useState } from "react";
import { MoreHorizontal, Eye, MessageSquare, Trash2 } from "lucide-react";

interface TicketItem {
    id: string;
    user: string;
    subject: string;
    priority: "High" | "Medium" | "Low";
    dateTime: string;
    status: "ATTENDED" | "PENDING";
}

interface AllTicketsTabProps {
    onViewTicket: (ticket: TicketItem) => void;
}

export default function AllTicketsTab({ onViewTicket }: AllTicketsTabProps) {
    const [selectedMenuIdx, setSelectedMenuIdx] = useState<number | null>(null);

    const tickets: TicketItem[] = [
        { id: "TXN-00123456789", user: "Christian Nnaji", subject: "Payment not reflecting Nnaji", priority: "High", dateTime: "09/03/2025 . 09:34PM", status: "ATTENDED" },
        { id: "TXN-00123456790", user: "Martha Dokubo", subject: "Payment not reflecting Nnaji", priority: "Low", dateTime: "09/04/2025 . 10:00AM", status: "ATTENDED" },
        { id: "TXN-00123456791", user: "Elizabeth Bashir", subject: "Payment not reflecting Nnaji", priority: "Medium", dateTime: "09/05/2025 . 11:15PM", status: "PENDING" },
        { id: "TXN-00123456792", user: "John Bozimo", subject: "Payment not reflecting Nnaji", priority: "Low", dateTime: "09/06/2025 . 12:45PM", status: "ATTENDED" },
        { id: "TXN-00123456793", user: "Daniel Ibe", subject: "Payment not reflecting Nnaji", priority: "Medium", dateTime: "09/07/2025 . 01:30AM", status: "PENDING" },
        { id: "TXN-00123456794", user: "John Okafor", subject: "Payment not reflecting Nnaji", priority: "Low", dateTime: "09/08/2025 . 09:00PM", status: "PENDING" },
        { id: "TXN-00123456795", user: "Esther Okafor", subject: "Payment not reflecting Nnaji", priority: "Medium", dateTime: "09/09/2025 . 02:20PM", status: "ATTENDED" },
        { id: "TXN-00123456796", user: "Joseph Werinipre", subject: "Payment not reflecting Nnaji", priority: "Low", dateTime: "09/10/2025 . 03:10AM", status: "PENDING" },
        { id: "TXN-00123456797", user: "Samuel Nasiru", subject: "Payment not reflecting Nnaji", priority: "Medium", dateTime: "09/11/2025 . 04:50PM", status: "ATTENDED" },
        { id: "TXN-00123456798", user: "Hannah Musa", subject: "Payment not reflecting Nnaji", priority: "High", dateTime: "09/12/2025 . 05:55AM", status: "ATTENDED" }
    ];

    const toggleRowMenu = (idx: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedMenuIdx(selectedMenuIdx === idx ? null : idx);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] overflow-x-auto select-none relative animate-fade-in mt-1">
            <table className="w-full text-left border-collapse select-none">
                <thead>
                    <tr className="border-b border-slate-50 select-none">
                        <th className="py-3 px-2 w-10 select-none">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                        </th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Ticket ID</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">User</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Subject</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Priority</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date & Time</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                        <th className="py-3 px-2 w-8"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {tickets.map((item, idx) => (
                        <tr
                            key={idx}
                            onClick={() => onViewTicket(item)}
                            className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none relative"
                        >
                            <td className="py-4 px-2 select-none">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                            </td>
                            <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight select-none">{item.id}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-semibold select-none leading-tight">{item.user}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.subject}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">{item.priority}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.dateTime}</td>
                            <td className="py-4 px-2 select-none">
                                <span
                                    className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] border leading-none ${
                                        item.status === "ATTENDED"
                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                            : "bg-amber-50 text-amber-600 border-amber-100"
                                    }`}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td className="py-4 px-2 select-none text-slate-400 hover:text-slate-600 relative">
                                <button
                                    onClick={(e) => toggleRowMenu(idx, e)}
                                    className="p-1 hover:bg-slate-50 rounded-lg transition-colors select-none"
                                >
                                    <MoreHorizontal size={16} />
                                </button>

                                {/* Action Dropdown exactly matching Screenshot 2 */}
                                {selectedMenuIdx === idx && (
                                    <div className="absolute right-0 top-12 bg-white border border-slate-100 rounded-xl shadow-xl w-[140px] p-1.5 z-40 animate-fade-in flex flex-col gap-0.5 select-none text-left">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onViewTicket(item); }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
                                        >
                                            <Eye size={13} className="text-slate-400" />
                                            <span>View</span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onViewTicket(item); }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-all"
                                        >
                                            <MessageSquare size={13} className="text-slate-400" />
                                            <span>Reply</span>
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setSelectedMenuIdx(null); }}
                                            className="w-full flex items-center gap-2 px-3 py-2 text-[11px] font-semibold text-red-600 hover:bg-red-50/50 rounded-lg transition-all"
                                        >
                                            <Trash2 size={13} className="text-red-400" />
                                            <span>Delete Ticket</span>
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
