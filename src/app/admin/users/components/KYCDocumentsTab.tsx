"use client";

import { Eye, Download, FileText } from "lucide-react";

export default function KYCDocumentsTab() {
    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex flex-col select-none">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                    KYC Documents
                </h3>
                <p className="text-xs text-slate-400 select-none font-medium mt-1">
                    Verification documents submitted by the user
                </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6 max-w-4xl select-none animate-fade-in">
                {/* Left side file dummy placeholder design */}
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

            {/* Download / Re-verification actions footer under document card exactly like in Screenshot 4 */}
            <div className="flex items-center gap-3 bg-white p-4 max-w-4xl rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] select-none">
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
    );
}
