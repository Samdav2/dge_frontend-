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
    MoreHorizontal,
    TrendingUp
} from "lucide-react";

import AllTicketsTab from "./components/AllTicketsTab";
import SupportChatView from "./components/SupportChatView";

export default function AdminSupportPage() {
    const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden select-none relative">
            <AdminSidebar />

            {/* Main Content Area Right Side */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#fafafa] select-none">
                {/* Navbar Header Section */}
                <header className="h-16 pl-16 pr-4 lg:px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2 max-w-[50%] xs:max-w-none">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512] shrink-0">
                            <Headset size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-none truncate select-none">
                            Support Ticket
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

                {/* Main Support Panel Content */}
                {!selectedTicket ? (
                    <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in relative">
                        {/* Search field */}
                        <div className="relative w-full max-w-sm select-none">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input
                                type="text"
                                placeholder="Search by transaction ID or user..."
                                className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                            />
                        </div>

                        {/* Top statistics exactly as Screenshot 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none leading-none">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] leading-none">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                    Total Tickets
                                </span>
                                <div className="flex flex-col select-none leading-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                        1,388
                                    </span>
                                    <span className="text-[11px] text-red-600 font-bold select-none leading-tight mt-2 flex items-center gap-1">
                                        ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] leading-none">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                    Attended
                                </span>
                                <div className="flex flex-col select-none leading-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                        1,388
                                    </span>
                                    <span className="text-[11px] text-emerald-600 font-bold select-none leading-tight mt-2 flex items-center gap-1">
                                        ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] leading-none">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                    Pending
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
                        </div>

                        {/* Title exactly like Screenshot 1 */}
                        <div className="flex items-center justify-between select-none border-b border-slate-50 pb-2.5">
                            <h2 className="text-sm font-bold tracking-tight text-slate-800 select-none">
                                All Tickets
                            </h2>
                            <button className="text-[11px] font-bold text-[#b68512] hover:text-[#a17410] transition-colors flex items-center gap-1 select-none leading-none">
                                View All →
                            </button>
                        </div>

                        {/* Direct Table Content */}
                        <AllTicketsTab onViewTicket={setSelectedTicket} />
                    </div>
                ) : (
                    /* Ticket Detail / Chat Interface exactly like Screenshot 3 */
                    <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in relative h-full">
                        <SupportChatView item={selectedTicket} onBack={() => setSelectedTicket(null)} />
                    </div>
                )}
            </main>
        </div>
    );
}
