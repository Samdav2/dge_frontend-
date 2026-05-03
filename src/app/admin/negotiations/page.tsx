"use client";

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import {
    LayoutDashboard,
    Bell,
    Settings,
    Users,
    Car,
    FileCheck,
    MessageSquare,
    Wallet,
    Headset,
    Search,
    ChevronDown,
    MoreHorizontal
} from "lucide-react";

import PendingNegotiationsTab from "./components/PendingNegotiationsTab";
import ApprovedNegotiationsTab from "./components/ApprovedNegotiationsTab";
import RejectedNegotiationsTab from "./components/RejectedNegotiationsTab";

type TabType = "Pending" | "Approved" | "Rejected";

export default function AdminNegotiationsPage() {
    const [selectedTab, setSelectedTab] = useState<TabType>("Pending");

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden select-none">
            <AdminSidebar />

            {/* Main Content Area Right Side */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#fafafa] select-none">
                {/* Navbar Header Section */}
                <header className="h-16 pl-16 pr-4 lg:px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2 max-w-[50%] xs:max-w-none">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512] shrink-0">
                            <MessageSquare size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-none truncate select-none">
                            Negotiations
                        </h1>
                    </div>

                    {/* Admin profile */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 hover:bg-slate-50 cursor-pointer rounded-xl px-2 py-1.5 transition-colors select-none">
                            <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center font-semibold text-slate-700 text-sm border border-slate-200 shrink-0">
                                NC
                            </div>
                            <div className="flex flex-col select-none hidden sm:flex">
                                <span className="font-semibold text-xs text-slate-800 leading-tight">Nnaji Christian</span>
                                <span className="text-[10px] text-slate-400 font-medium">admin</span>
                            </div>
                            <ChevronDown size={14} className="text-slate-400 ml-1 hidden sm:block" />
                        </div>
                    </div>
                </header>

                {/* Main Content Pane */}
                <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in">
                    {/* Search field */}
                    <div className="relative w-full max-w-sm select-none">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Search Anything"
                            className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                        />
                    </div>

                    {/* Top statistics cards exactly like Screenshots */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                Pending Negotiation
                            </span>
                            <div className="flex flex-col select-none leading-none">
                                <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                    1,388
                                </span>
                                <span className="text-[11px] text-emerald-600 font-bold select-none leading-tight mt-2 flex items-center gap-1">
                                    ↑ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                Approved Negotiation
                            </span>
                            <div className="flex flex-col select-none leading-none">
                                <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                    1,388
                                </span>
                                <span className="text-[11px] text-amber-600 font-bold select-none leading-tight mt-2 flex items-center gap-1">
                                    ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                Rejection Negotiation
                            </span>
                            <div className="flex flex-col select-none leading-none">
                                <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                    8,235
                                </span>
                                <span className="text-[11px] text-red-600 font-bold select-none leading-tight mt-2 flex items-center gap-1">
                                    ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tab Strip */}
                    <div className="flex items-center gap-2 border-b border-slate-100 select-none w-full overflow-x-auto whitespace-nowrap flex-nowrap pb-0.5">
                        {(["Pending", "Approved", "Rejected"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setSelectedTab(tab)}
                                className={`px-3.5 pb-2 text-xs font-bold transition-all relative select-none leading-none border-b-2 shrink-0 ${
                                    selectedTab === tab
                                        ? "border-[#b68512] text-slate-800"
                                        : "border-transparent text-slate-400 hover:text-slate-600"
                                }`}
                            >
                                {tab} Negotiation ({tab === "Rejected" ? "2" : "4"})
                            </button>
                        ))}
                    </div>

                    {/* Clean tab content display */}
                    {selectedTab === "Pending" && <PendingNegotiationsTab />}
                    {selectedTab === "Approved" && <ApprovedNegotiationsTab />}
                    {selectedTab === "Rejected" && <RejectedNegotiationsTab />}
                </div>
            </main>
        </div>
    );
}
