"use client";

import { Eye, Download, FileText, Mail, Edit } from "lucide-react";

interface ReviewDetailViewProps {
    item: any;
    onBack: () => void;
}

export default function ReviewDetailView({ item, onBack }: ReviewDetailViewProps) {
    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            {/* Back button */}
            <button
                onClick={onBack}
                className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 select-none shadow-sm transition-all flex items-center gap-1 leading-none mb-2 w-fit"
            >
                ← Back to KYC List
            </button>

            {/* Header card matching image 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6 select-none relative overflow-hidden">
                <div className="flex items-center gap-5 select-none">
                    <div className="w-20 h-20 bg-slate-50 border-4 border-amber-100 rounded-full flex items-center justify-center font-bold text-slate-700 text-xl overflow-hidden shadow-md">
                        {item.name ? item.name.split(" ").map((n: string) => n[0]).join("") : "NP"}
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-xs font-semibold text-blue-500 tracking-tight leading-none mb-1.5">
                            User Profile
                        </span>
                        <span className="text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5">
                            {item.name || "Nnaji Christian Chinemerem"}
                        </span>
                        <span className="text-[11px] text-slate-400 font-semibold select-none leading-none">
                            Team Member Since 14 04 2025 . 12:16AM
                        </span>
                    </div>
                </div>

                {/* Direct Action Buttons exactly as Screenshot 4 */}
                <div className="flex items-center gap-3 select-none">
                    <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                        <Mail size={15} /> <span>Send Email</span>
                    </button>
                    <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                        <Edit size={15} /> <span>Edit User</span>
                    </button>
                    <button className="px-4 py-2 bg-[#ef4444] hover:bg-red-600 active:bg-red-700 rounded-xl font-bold text-[11px] text-white select-none hover:scale-[1.01] shadow-sm transition-all">
                        Suspend User
                    </button>
                </div>
            </div>

            {/* Stat information cards */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 select-none animate-fade-in">
                {/* Personal Information */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none">
                    <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">
                        Personal Information
                    </h4>
                    <div className="space-y-4 pt-1 flex-1">
                        <div className="flex flex-col select-none leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                                First Name
                            </span>
                            <span className="font-bold text-xs text-slate-800 select-none">
                                Christian
                            </span>
                        </div>
                        <div className="flex flex-col select-none leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                                Last Name
                            </span>
                            <span className="font-bold text-xs text-slate-800 select-none">
                                Nnaji
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

                {/* Account Information */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none">
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
                                Kyc Status
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

            {/* Bottom Card exactly like Screenshot 4: Full document card preview and metadata */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-6 select-none animate-fade-in">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 select-none animate-fade-in">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-64 h-36 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-3 select-none relative shadow-inner">
                            <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200/50 rounded-lg flex items-center justify-center text-slate-300 font-bold tracking-widest text-xs select-none">
                                PASSPORT DOCUMENT
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                            <div className="flex flex-col select-none leading-tight">
                                <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                                    Document ID
                                </span>
                                <span className="font-bold text-xs text-slate-800">
                                    DOC001
                                </span>
                                <span className="text-[10px] text-slate-400 font-medium select-none mt-0.5">
                                    Travel Passport
                                </span>
                            </div>
                            <div className="flex flex-col select-none leading-tight">
                                <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                                    Expiry Date
                                </span>
                                <span className="font-bold text-xs text-slate-800 select-none">
                                    2028-05-15
                                </span>
                            </div>
                            <div className="flex flex-col select-none leading-tight">
                                <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                                    Document Number
                                </span>
                                <span className="font-bold text-xs text-slate-800 select-none">
                                    P1234567
                                </span>
                            </div>
                            <div className="flex flex-col select-none leading-tight">
                                <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                                    Verified Date
                                </span>
                                <span className="font-bold text-xs text-slate-800 select-none">
                                    2024-01-16
                                </span>
                            </div>
                            <div className="flex flex-col select-none leading-tight">
                                <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                                    Uploaded Date
                                </span>
                                <span className="font-bold text-xs text-slate-800 select-none">
                                    2024-01-15
                                </span>
                            </div>
                            <div className="flex flex-col select-none leading-tight">
                                <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                                    Verified By
                                </span>
                                <span className="font-bold text-xs text-slate-800 select-none">
                                    admin@fintech.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions exactly as Screenshot 4 */}
                <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100 select-none">
                    <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                        <Eye size={15} /> <span>View Full Document</span>
                    </button>
                    <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                        <Download size={15} /> <span>Download</span>
                    </button>
                    <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                        <FileText size={15} /> <span>Request Re-Verification</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
