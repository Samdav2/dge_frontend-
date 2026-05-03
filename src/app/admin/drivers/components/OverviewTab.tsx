"use client";

interface OverviewTabProps {
    userName: string;
}

export default function OverviewTab({ userName }: OverviewTabProps) {
    const firstName = userName.split(" ")[0] || "Christian";
    const lastName = userName.split(" ")[1] || "Nnaji";

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 select-none animate-fade-in pt-2">
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

            {/* Driver Information */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none">
                <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5">
                    Driver Information
                </h4>
                <div className="space-y-4 pt-1 flex-1">
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Vehicle Name
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            Honda Civic
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Vehicle Number
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            2024-10-07 14:23:45
                        </span>
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold select-none leading-none mb-1 uppercase tracking-wider">
                            Successful Drivers
                        </span>
                        <span className="font-bold text-xs text-slate-800 select-none">
                            20
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
    );
}
