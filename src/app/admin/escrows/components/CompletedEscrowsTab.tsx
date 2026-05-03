"use client";

import { MoreHorizontal } from "lucide-react";

interface EscrowItem {
    id: string;
    seller: string;
    buyer: string;
    service: string;
    price: string;
    date: string;
    status: "ACTIVE" | "COMPLETED" | "REFUNDED";
}

interface CompletedEscrowsTabProps {
    onRowClick: (item: EscrowItem) => void;
}

export default function CompletedEscrowsTab({ onRowClick }: CompletedEscrowsTabProps) {
    const escrows: EscrowItem[] = [
        { id: "Ngo-0001", seller: "Ikoro Jessica", buyer: "Nnaji Christian", service: "Urgently seeking skilled car...", price: "₦9,900", date: "09/03/2025", status: "COMPLETED" },
        { id: "Ngo-0002", seller: "Mabel Nzekew", buyer: "Ikoro Jessica", service: "Looking for an experienced...", price: "₦4,000", date: "09/03/2025", status: "COMPLETED" },
        { id: "Ngo-0003", seller: "Nnaji Christian", buyer: "Mabel Nzekew", service: "Looking for an experienced...", price: "₦4,000", date: "09/03/2025", status: "COMPLETED" },
        { id: "Ngo-0004", seller: "Ibrahim Fatima", buyer: "Jaxon Lee", service: "Seeking a skilled UI/UX desi...", price: "₦4,500", date: "09/03/2025", status: "COMPLETED" },
        { id: "Ngo-0005", seller: "Nguyen Minh", buyer: "Sophia Kim", service: "Hiring a talented motion gr...", price: "₦5,000", date: "09/03/2025", status: "COMPLETED" },
        { id: "Ngo-0006", seller: "Patel Priya", buyer: "Chase Thompson", service: "In need of a creative web d...", price: "₦5,500", date: "09/03/2025", status: "COMPLETED" },
        { id: "Ngo-0007", seller: "Johnson Michael", buyer: "Isabella Garcia", service: "Looking for an innovative ill...", price: "₦6,000", date: "09/03/2025", status: "COMPLETED" },
        { id: "Ngo-0008", seller: "Smith Sarah", buyer: "Liam Patel", service: "Searching for a proficient s...", price: "₦6,500", date: "09/03/2025", status: "COMPLETED" },
        { id: "Ngo-0009", seller: "Garcia Luis", buyer: "Zara Ahmed", service: "Requesting an adept photo...", price: "₦7,000", date: "09/03/2025", status: "COMPLETED" }
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative animate-fade-in mt-4">
            <table className="w-full text-left border-collapse select-none">
                <thead>
                    <tr className="border-b border-slate-50 select-none">
                        <th className="py-3 px-2 w-10 select-none">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                        </th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Negotiation ID</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Seller Name</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Buyer Name</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Service</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Negotiation Price</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date Created</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                        <th className="py-3 px-2 w-8"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {escrows.map((item, idx) => (
                        <tr
                            key={idx}
                            onClick={() => onRowClick(item)}
                            className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none"
                        >
                            <td className="py-4 px-2 select-none">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                            </td>
                            <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight">{item.id}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.seller}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.buyer}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none max-w-[180px] truncate">{item.service}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">{item.price}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.date}</td>
                            <td className="py-4 px-2 select-none">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 select-none">
                                    COMPLETED
                                </span>
                            </td>
                            <td className="py-4 px-2 select-none text-slate-400 hover:text-slate-600">
                                <MoreHorizontal size={16} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
