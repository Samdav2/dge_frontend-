"use client";

import { ArrowUpRight } from "lucide-react";

interface OverviewTabProps {
    userName: string;
}

export default function OverviewTab({ userName }: OverviewTabProps) {
    const firstName = userName.split(" ")[0] || "Christian";
    const lastName = userName.split(" ")[1] || "Nnaji";

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 select-none animate-fade-in">
            {/* Left cards */}
            <div className="flex flex-col gap-5 select-none xl:col-span-1">
                <div className="bg-amber-50/50 p-6 rounded-2xl flex flex-col justify-between h-[155px] border border-amber-100/50 select-none hover:scale-[1.01] transition-all cursor-pointer">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                        Total Wallet Balance
                    </span>
                    <div className="flex flex-col select-none leading-none">
                        <span className="text-3xl font-bold tracking-tight leading-none mb-1 flex items-baseline text-slate-800 select-none">
                            ₦200,000<span className="text-lg font-medium text-slate-400">.00</span>
                        </span>
                        <div className="flex items-center justify-between mt-4 bg-amber-500/10 border border-amber-500/10 px-3 py-1.5 rounded-xl hover:bg-amber-500/20 transition-all select-none">
                            <span className="text-[11px] text-amber-700 font-bold select-none leading-tight">
                                View History
                            </span>
                            <ArrowUpRight size={13} className="text-amber-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-[#b68512] text-white p-6 rounded-2xl flex flex-col justify-between h-[155px] border border-transparent select-none hover:scale-[1.01] transition-all cursor-pointer">
                    <span className="text-[11px] font-bold text-slate-100 uppercase tracking-wider select-none leading-tight">
                        Earning Wallet Balance
                    </span>
                    <div className="flex flex-col select-none leading-none">
                        <span className="text-3xl font-bold tracking-tight leading-none mb-1 flex items-baseline select-none">
                            ₦150,000<span className="text-lg font-medium text-amber-200">.00</span>
                        </span>
                        <div className="flex items-center justify-between mt-4 bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-white/20 transition-all select-none">
                            <span className="text-[11px] font-bold select-none leading-tight">
                                View History
                            </span>
                            <ArrowUpRight size={13} />
                        </div>
                    </div>
                </div>

                <div className="bg-orange-500 text-white p-6 rounded-2xl flex flex-col justify-between h-[155px] border border-transparent select-none hover:scale-[1.01] transition-all cursor-pointer">
                    <span className="text-[11px] font-bold text-slate-100 uppercase tracking-wider select-none leading-tight">
                        Funding Wallet
                    </span>
                    <div className="flex flex-col select-none leading-none">
                        <span className="text-3xl font-bold tracking-tight leading-none mb-1 flex items-baseline select-none">
                            50,000<span className="text-lg font-medium text-orange-200">.00</span>
                        </span>
                        <div className="flex items-center justify-between mt-4 bg-white/10 border border-white/10 px-3 py-1.5 rounded-xl hover:bg-white/20 transition-all select-none">
                            <span className="text-[11px] font-bold select-none leading-tight">
                                View History
                            </span>
                            <ArrowUpRight size={13} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Personal info box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none xl:col-span-1">
                <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">
                    Personal Information
                </h4>
                <div className="space-y-4 pt-1 flex-1">
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            First Name
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            {firstName}
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Last Name
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            {lastName}
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Phone Number
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            +2349021233422
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Email Address
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            chrisnnaji443@gmail.com
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Address
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            123 Main Street, San Francisco, CA 94102
                        </span>
                    </div>
                </div>
            </div>

            {/* Account info box */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none xl:col-span-1">
                <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">
                    Account Information
                </h4>
                <div className="space-y-4 pt-1 flex-1">
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Joined Date
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            2024-01-15
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Last Login
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            2024-10-07 14:23:45
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Last IP Address
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            192.168.1.1
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            KYC Status
                        </span>
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 w-fit select-none">
                            VERIFIED
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Email Verification
                        </span>
                        <span className="flex items-center gap-1 font-bold text-xs text-slate-800 select-none">
                            Verified <span className="w-2 h-2 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
