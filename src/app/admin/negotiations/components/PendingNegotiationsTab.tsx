"use client";

import { MoreHorizontal } from "lucide-react";

export default function PendingNegotiationsTab() {
    const negotiations = [
        { job: "Urgently seeking skilled car...", user: "Ikoro Jessica", negotiator: "Nnaji Christian", sPrice: "₦9,900", nPrice: "₦9,900", date: "09/03/2025" },
        { job: "Looking for an experienced...", user: "Mabel Nzekew", negotiator: "Ikoro Jessica", sPrice: "₦4,000", nPrice: "₦4,000", date: "09/03/2025" },
        { job: "Looking for an experienced...", user: "Nnaji Christian", negotiator: "Mabel Nzekew", sPrice: "₦4,000", nPrice: "₦4,000", date: "09/03/2025" },
        { job: "Seeking a skilled UI/UX desi...", user: "Ibrahim Fatima", negotiator: "Jaxon Lee", sPrice: "₦4,500", nPrice: "₦4,500", date: "09/03/2025" },
        { job: "Hiring a talented motion gr...", user: "Nguyen Minh", negotiator: "Sophia Kim", sPrice: "₦6,000", nPrice: "₦5,000", date: "09/03/2025" },
        { job: "In need of a creative web d...", user: "Patel Priya", negotiator: "Chase Thompson", sPrice: "₦6,500", nPrice: "₦5,500", date: "09/03/2025" },
        { job: "Looking for an innovative ill...", user: "Johnson Michael", negotiator: "Isabella Garcia", sPrice: "₦7,000", nPrice: "₦6,000", date: "09/03/2025" },
        { job: "Searching for a proficient s...", user: "Smith Sarah", negotiator: "Liam Patel", sPrice: "₦7,500", nPrice: "₦6,500", date: "09/03/2025" },
        { job: "Requesting an adept photo...", user: "Garcia Luis", negotiator: "Zara Ahmed", sPrice: "₦8,000", nPrice: "₦7,000", date: "09/03/2025" }
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative animate-fade-in mt-4">
            <table className="w-full text-left border-collapse select-none">
                <thead>
                    <tr className="border-b border-slate-50 select-none">
                        <th className="py-3 px-2 w-10 select-none">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                        </th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Job Title</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">User</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Negotiator Name</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Service Price</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Negotiation Price</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date of Negotiation</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                        <th className="py-3 px-2 w-8"></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {negotiations.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                            <td className="py-4 px-2 select-none">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                            </td>
                            <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight max-w-[180px] truncate">{item.job}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.user}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.negotiator}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">{item.sPrice}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">{item.nPrice}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.date}</td>
                            <td className="py-4 px-2 select-none">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] bg-amber-50 text-amber-600 border border-amber-100 select-none">
                                    PENDING
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
