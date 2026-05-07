"use client";

import { useState, useEffect } from "react";

interface Ride {
    id: string;
    start_location: string;
    destination: string;
    status: string;
    earnings: number;
    start_time: string;
}

export default function PastRidesTab({ driverId }: { driverId: string }) {
    const [rides, setRides] = useState<Ride[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRides = async () => {
            try {
                const res = await fetch(`/api/admin/drivers/${driverId}?tab=rides`);
                const data = await res.json();
                if (Array.isArray(data)) {
                    // Filter for non-active ones
                    setRides(data.filter(r => r.status !== "STARTED"));
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchRides();
    }, [driverId]);

    const fmtDate = (iso: string) => {
        if (!iso) return "—";
        return new Date(iso).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (loading) return <div className="h-48 bg-white rounded-2xl animate-pulse mt-4"></div>;

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative animate-fade-in mt-4">
            <table className="w-full text-left border-collapse select-none">
                <thead>
                    <tr className="border-b border-slate-50 select-none">
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Pickup</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Price</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Time</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {rides.length > 0 ? rides.map(ride => (
                        <tr key={ride.id} className="hover:bg-slate-50/50 transition-colors select-none">
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium">{ride.start_location}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium">{ride.destination}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold">₦{(ride.earnings || 0).toLocaleString()}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium">{fmtDate(ride.start_time)}</td>
                            <td className="py-4 px-2 select-none">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] uppercase ${
                                    ride.status === "COMPLETED" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-red-50 text-red-600 border border-red-100"
                                }`}>
                                    {ride.status}
                                </span>
                            </td>
                        </tr>
                    )) : (
                        <tr><td colSpan={5} className="py-8 text-center text-slate-400 text-xs italic">No past rides found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
