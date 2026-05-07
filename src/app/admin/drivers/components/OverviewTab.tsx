"use client";

import { useState, useEffect } from "react";

interface OverviewTabProps {
    driverId: string;
}

export default function OverviewTab({ driverId }: OverviewTabProps) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`/api/admin/drivers/${driverId}`);
                const d = await res.json();
                setData(d);
            } catch (err) {
                console.error("Failed to fetch driver overview:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [driverId]);

    const fmtDate = (iso: string | null) => {
        if (!iso) return "—";
        return new Date(iso).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-pulse pt-2">
                <div className="bg-white h-64 rounded-2xl border border-slate-100 shadow-sm"></div>
                <div className="bg-white h-64 rounded-2xl border border-slate-100 shadow-sm"></div>
            </div>
        );
    }

    const name = data?.name || "Driver";
    const firstName = name.split(" ")[0];
    const lastName = name.split(" ").slice(1).join(" ");

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 select-none animate-fade-in pt-2">
            {/* Personal Information */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none">
                <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5 uppercase">
                    Personal Information
                </h4>
                <div className="space-y-4 pt-1 flex-1">
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">First Name</span>
                        <span className="font-bold text-xs text-slate-800">{firstName}</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Last Name</span>
                        <span className="font-bold text-xs text-slate-800">{lastName || "—"}</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Phone Number</span>
                        <span className="font-bold text-xs text-slate-800">{data?.phone || "—"}</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Email Address</span>
                        <span className="font-bold text-xs text-slate-800">{data?.email || "—"}</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Account Status</span>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] ${
                                data?.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                : "bg-red-50 text-red-600 border border-red-100"
                            }`}>
                                {data?.status}
                            </span>
                            {data?.email_verified && (
                                <span className="flex items-center gap-1 font-bold text-[10px] text-emerald-600">
                                    Email Verified <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-pulse"></span>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Driver Information */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col gap-4 select-none">
                <h4 className="text-xs font-bold text-slate-800 tracking-tight border-b border-slate-50 pb-2.5 uppercase">
                    Vehicle & Driving Info
                </h4>
                <div className="space-y-4 pt-1 flex-1">
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Vehicle Name</span>
                        <span className="font-bold text-xs text-slate-800">{data?.car_name} {data?.car_model}</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Plate Number</span>
                        <span className="font-bold text-xs text-slate-800">{data?.plate_number || "—"}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Total Rides</span>
                            <span className="font-bold text-xs text-slate-800">{data?.total_rides || 0}</span>
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Successful</span>
                            <span className="font-bold text-xs text-emerald-600">{data?.successful_rides || 0}</span>
                        </div>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">Driver Rank</span>
                        <span className="font-bold text-xs text-[#b68512]">{data?.rank || "STARTER"}</span>
                    </div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">KYC Status</span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] w-fit mt-1 ${
                            data?.kyc_status === "VERIFIED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-amber-50 text-amber-600 border border-amber-100"
                        }`}>
                            {data?.kyc_status}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
