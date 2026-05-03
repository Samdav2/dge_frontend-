"use client";

import { useState } from "react";
import { User, ShieldCheck, DollarSign, ExternalLink, XCircle, MapPin, CheckCircle, Unlock, ArrowRight } from "lucide-react";

interface EscrowDetailViewProps {
    item: any;
    onBack: () => void;
}

export default function EscrowDetailView({ item, onBack }: EscrowDetailViewProps) {
    const [selectedTab, setSelectedTab] = useState<"Overview" | "Timeline">("Overview");

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            {/* Back button */}
            <button
                onClick={onBack}
                className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 select-none shadow-sm transition-all flex items-center gap-1 leading-none mb-2 w-fit"
            >
                ← Back to Escrow List
            </button>

            {/* Top header strip exactly like Screenshot 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6 select-none relative overflow-hidden">
                <div className="flex flex-col select-none">
                    <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold tracking-tight text-slate-800 leading-none">
                            {item.service || "Fix Kitchen Sink Leakage"}
                        </h2>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] bg-blue-50 text-blue-600 border border-blue-100 select-none">
                            Active
                        </span>
                    </div>
                    <span className="text-xs text-slate-400 font-semibold select-none leading-none">
                        Job ID: JB-00456789 . Posted on {item.date || "09/03/2025"}
                    </span>
                </div>

                <button className="px-4 py-2 bg-[#ef4444] hover:bg-red-600 rounded-xl font-bold text-[11px] text-white flex items-center gap-1.5 select-none hover:scale-[1.01] shadow-sm transition-all">
                    <XCircle size={15} /> <span>Cancel Job</span>
                </button>
            </div>

            {/* Negotiation price card blocks exactly as Screenshot 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 select-none">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between h-[115px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] relative">
                    <div className="flex flex-col select-none leading-none">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none leading-tight mb-2">
                            Negotiation price
                        </span>
                        <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                            ₦25,000
                        </span>
                    </div>
                    <div className="text-slate-100 font-extrabold text-4xl select-none absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none">
                        $
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 flex items-center justify-between h-[115px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] relative">
                    <div className="flex flex-col select-none leading-none">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider select-none leading-tight mb-2">
                            Released
                        </span>
                        <span className="text-2xl font-bold tracking-tight text-emerald-500 select-none">
                            ₦0.00
                        </span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 font-extrabold text-2xl select-none absolute right-6 top-1/2 -translate-y-1/2 select-none pointer-events-none animate-pulse">
                        ✓
                    </div>
                </div>
            </div>

            {/* Inner sub tabs exactly like Screenshot 4 */}
            <div className="flex items-center gap-2 border-b border-slate-100 select-none w-full bg-white px-4 pt-1 rounded-t-xl border-t border-x border-slate-100">
                {(["Overview", "Timeline"] as const).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setSelectedTab(tab)}
                        className={`px-6 py-2.5 text-xs font-bold transition-all relative select-none leading-none border-b-2 w-1/2 md:w-fit text-center ${
                            selectedTab === tab
                                ? "border-[#b68512] text-slate-800"
                                : "border-transparent text-slate-400 hover:text-slate-600"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Specific tabs rendering exactly as in Screenshot 4 */}
            {selectedTab === "Overview" ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 select-none animate-fade-in">
                    {/* Left Column for Job Description & Location */}
                    <div className="space-y-6 select-none">
                        {/* Job Description card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-3 select-none flex-1 min-h-[225px]">
                            <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">
                                Job Description
                            </h4>
                            <p className="text-xs text-slate-500 font-medium select-none leading-relaxed leading-6 flex-1 pt-1">
                                Kitchen sink has been leaking under the cabinet for the past week. Water is pooling and causing damage to the cabinet floor. Need urgent repair of the pipe connection and replacement of any damaged seals. The leak appears to be coming from the main drain pipe connection.
                            </p>
                        </div>

                        {/* Location card */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-3 select-none">
                            <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">
                                Location
                            </h4>
                            <div className="flex items-center gap-2 pt-1 select-none">
                                <div className="p-1 bg-slate-50 border border-slate-100 rounded-lg text-slate-400">
                                    <MapPin size={16} />
                                </div>
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="font-bold text-xs text-slate-800 select-none">
                                        15 Ademola Street, Lekki Phase 1
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mt-0.5">
                                        Lagos, Lagos State
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column for Seller, Buyer, and Escrow info */}
                    <div className="space-y-6 select-none">
                        {/* Seller & Buyer card exactly matching right panel of Screenshot 4 */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between select-none min-h-[350px]">
                            <div className="space-y-6">
                                {/* Seller block */}
                                <div className="space-y-3">
                                    <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5 leading-none">
                                        Seller
                                    </h4>
                                    <div className="flex items-center gap-3 pt-1 select-none">
                                        <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-400 font-bold text-sm">
                                            SJ
                                        </div>
                                        <div className="flex flex-col select-none leading-tight">
                                            <span className="font-bold text-xs text-slate-800">
                                                Sarah Johnson
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-semibold select-none mt-0.5">
                                                sarah.j@email.com
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-semibold select-none mt-0.5">
                                                +234 801 234 5678
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Buyer block */}
                                <div className="space-y-3 pt-2">
                                    <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5 leading-none">
                                        Buyer
                                    </h4>
                                    <div className="flex items-center gap-3 pt-1 select-none">
                                        <div className="w-10 h-10 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center text-emerald-400 font-bold text-sm">
                                            MD
                                        </div>
                                        <div className="flex flex-col select-none leading-tight">
                                            <span className="font-bold text-xs text-slate-800">
                                                Martha Dokubo
                                            </span>
                                            <span className="text-[10px] text-slate-400 font-semibold select-none mt-0.5">
                                                Professional Plumber
                                            </span>
                                            <span className="text-[10px] text-amber-500 font-semibold select-none mt-0.5 flex items-center gap-0.5">
                                                ★ 4.9 <span className="text-slate-400 font-medium">(127 reviews)</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Payment & Escrow details exactly like Screenshot 4 */}
                    <div className="col-span-1 xl:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-6 select-none animate-fade-in relative mt-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none border-b border-slate-50 pb-4">
                            <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-none">
                                Payment & Escrow
                            </h4>

                            <div className="flex items-center gap-3 select-none">
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-[10px] flex items-center gap-1.5 select-none hover:scale-[1.01] shadow-sm transition-all leading-none h-9">
                                    <Unlock size={14} /> <span>Authorize Release</span>
                                </button>
                                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[10px] text-slate-600 flex items-center gap-1.5 select-none hover:text-slate-800 transition-all shadow-sm leading-none h-9">
                                    <CheckCircle size={14} /> <span>Transactions (1)</span>
                                </button>
                            </div>
                        </div>

                        {/* Balance Breakdown card boxes exactly like Screenshot 4 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none pt-1">
                            <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100 select-none flex flex-col justify-between h-[90px]">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider select-none leading-none">
                                    Total Budget
                                </span>
                                <span className="font-bold text-base text-slate-800 select-none leading-none">
                                    ₦25,000
                                </span>
                            </div>
                            <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/60 select-none flex flex-col justify-between h-[90px]">
                                <span className="text-[10px] text-emerald-600/70 font-bold uppercase tracking-wider select-none leading-none">
                                    Released
                                </span>
                                <span className="font-bold text-base text-emerald-600 select-none leading-none">
                                    ₦0.00
                                </span>
                            </div>
                            <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100/60 select-none flex flex-col justify-between h-[90px]">
                                <span className="text-[10px] text-amber-600/70 font-bold uppercase tracking-wider select-none leading-none">
                                    Pending
                                </span>
                                <span className="font-bold text-base text-amber-600 select-none leading-none">
                                    ₦12,000
                                </span>
                            </div>
                        </div>

                        {/* Direct sub-card: Pending Release Requests exactly as Screenshot 4 */}
                        <div className="bg-orange-50/20 p-5 rounded-2xl border border-orange-100/50 space-y-3.5 select-none relative mt-2 animate-fade-in flex flex-col">
                            <div className="flex items-center gap-1.5 select-none leading-none">
                                <div className="w-5 h-5 bg-orange-50/50 border border-orange-200 flex items-center justify-center rounded-lg text-orange-500 font-bold text-xs select-none">
                                    !
                                </div>
                                <h5 className="font-bold text-xs text-slate-800 select-none">
                                    Pending Release Requests
                                </h5>
                            </div>

                            <div className="bg-white p-4 rounded-xl border border-slate-100 select-none flex items-center justify-between gap-4">
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="font-bold text-xs text-slate-800">Work Completion</span>
                                    <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mt-1">
                                        Requested on 2025-11-07
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mt-1">
                                        Awaiting admin approval for final payment
                                    </span>
                                </div>
                                <span className="px-2 py-1 bg-amber-50/70 border border-amber-100 text-amber-600 font-bold text-[10px] rounded-lg select-none">
                                    ₦6,000
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* Timeline view */
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none animate-fade-in">
                    <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">Timeline</h4>
                    <p className="text-xs text-slate-500 font-medium select-none">
                        No Timeline recorded yet.
                    </p>
                </div>
            )}
        </div>
    );
}
