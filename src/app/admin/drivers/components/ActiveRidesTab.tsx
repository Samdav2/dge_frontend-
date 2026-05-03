"use client";

export default function ActiveRidesTab() {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative animate-fade-in mt-4">
            <table className="w-full text-left border-collapse select-none">
                <thead>
                    <tr className="border-b border-slate-50 select-none">
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Passenger</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Pickup</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Destination</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Service Price</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Negotiation Price</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Time</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    <tr className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                        <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight">Nnaji Christian</td>
                        <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">Ifite-Awka, Awka Anambra</td>
                        <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">Igbarim, Anambra State</td>
                        <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">₦9,900</td>
                        <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">₦8,900</td>
                        <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">09/03/2025</td>
                        <td className="py-4 px-2 select-none">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 select-none">
                                ACTIVE
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
