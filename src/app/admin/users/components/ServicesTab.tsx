"use client";

import { Search, ChevronDown, MoreHorizontal } from "lucide-react";

export default function ServicesTab() {
    const servicesList = [
        { title: "Urgently seeking skilled carpenter for custom...", type: "Remote", price: "₦9,900", date: "09/03/2025", status: "COMPLETED" },
        { title: "Looking for an experienced graphic designer...", type: "Physical", price: "₦4,000", date: "09/03/2025", status: "IN PROGRESS" },
        { title: "Hiring a professional chef for a private event...", type: "Remote", price: "₦6,500", date: "09/03/2025", status: "COMPLETED" },
        { title: "Seeking a reliable housekeeper for a busy fa...", type: "Physical", price: "₦3,250", date: "09/03/2025", status: "COMPLETED" },
        { title: "Searching for a talented software developer t...", type: "Remote", price: "₦12,750", date: "09/03/2025", status: "CANCELLED" },
        { title: "In need of a qualified personal trainer for one...", type: "Physical", price: "₦8,999", date: "09/03/2025", status: "CANCELLED" },
        { title: "Looking for a passionate florist to design bou...", type: "Remote", price: "₦15,600", date: "09/03/2025", status: "IN PROGRESS" },
        { title: "Hiring a skilled photographer for a fashion sh...", type: "Physical", price: "₦10,200", date: "09/03/2025", status: "COMPLETED" },
        { title: "Seeking an experienced event planner to org...", type: "Remote", price: "₦11,500", date: "09/03/2025", status: "IN PROGRESS" },
        { title: "Searching for a dedicated tutor for after-sch...", type: "Physical", price: "₦14,400", date: "09/03/2025", status: "COMPLETED" }
    ];

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-2 select-none">
                    <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                        Services Listed
                    </h3>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[10px] bg-amber-50 text-[#b68512] border border-amber-100 select-none">
                        45 Listed
                    </span>
                </div>
                <div className="flex items-center gap-2 select-none">
                    <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                        Status <ChevronDown size={12} />
                    </button>
                    <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                        Date <ChevronDown size={12} />
                    </button>
                </div>
            </div>

            <div className="relative w-full max-w-sm select-none">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                    type="text"
                    placeholder="Search Record"
                    className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative">
                <table className="w-full text-left border-collapse select-none">
                    <thead>
                        <tr className="border-b border-slate-50 select-none">
                            <th className="py-3 px-2 w-10 select-none">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                            </th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Job Title</th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Type</th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Service Price</th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date Listed</th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Service Status</th>
                            <th className="py-3 px-2 w-8"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {servicesList.map((srv, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                                <td className="py-4 px-2 select-none">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                                </td>
                                <td className="py-4 px-2 text-xs font-bold text-slate-800 leading-none max-w-[280px] truncate select-none">
                                    {srv.title}
                                </td>
                                <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                    {srv.type}
                                </td>
                                <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                    {srv.price}
                                </td>
                                <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                    {srv.date}
                                </td>
                                <td className="py-4 px-2 select-none">
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                            srv.status === "COMPLETED"
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                : srv.status === "IN PROGRESS"
                                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                                : "bg-red-50 text-red-600 border border-red-100"
                                        }`}
                                    >
                                        {srv.status}
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
        </div>
    );
}
