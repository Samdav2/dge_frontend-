"use client";

import React from "react";
import { ChevronDown, MoreHorizontal } from "lucide-react";

export default function SessionsView() {
    const activeSessionsList = [
        { device: "Chrome OS", location: "Lagos, Nigeria", ip: "192.168.1.100", activity: "09/03/2025 • 14:45", status: "CURRENT" },
        { device: "Windows 11", location: "Cape Town, South Africa", ip: "192.168.1.101", activity: "09/04/2025 • 09:30", status: "ACTIVE" },
        { device: "macOS Monterey", location: "Nairobi, Kenya", ip: "192.168.1.102", activity: "09/05/2025 • 16:15", status: "ACTIVE" },
        { device: "Ubuntu 22.04", location: "Accra, Ghana", ip: "192.168.1.103", activity: "09/06/2025 • 12:00", status: "DEACTIVATED" }
    ];

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none">
            <div className="flex items-center gap-3 select-none">
                <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[11px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                    Status <ChevronDown size={12} />
                </button>
                <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[11px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                    Date <ChevronDown size={12} />
                </button>
            </div>

            {/* Main Active Sessions Table matching screenshot */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none">
                <table className="w-full text-left border-collapse select-none">
                    <thead>
                        <tr className="border-b border-slate-50 select-none">
                            <th className="py-3 px-2 w-10 select-none">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                />
                            </th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Device
                            </th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Location
                            </th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                IP Address
                            </th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Last Activity
                            </th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Status
                            </th>
                            <th className="py-3 px-2 w-8"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 select-none">
                        {activeSessionsList.map((session, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                                <td className="py-4 px-2 select-none">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                    />
                                </td>
                                <td className="py-4 px-2 text-xs font-bold text-slate-800 leading-none select-none">
                                    {session.device}
                                </td>
                                <td className="py-4 px-2 text-xs text-blue-500 font-medium select-none leading-none">
                                    {session.location}
                                </td>
                                <td className="py-4 px-2 text-xs text-slate-500 font-medium select-none leading-none">
                                    {session.ip}
                                </td>
                                <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                    {session.activity}
                                </td>
                                <td className="py-4 px-2 select-none">
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                            session.status === "CURRENT"
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                : session.status === "ACTIVE"
                                                ? "bg-blue-50 text-blue-600 border border-blue-100"
                                                : "bg-red-50 text-red-600 border border-red-100"
                                        }`}
                                    >
                                        {session.status}
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
