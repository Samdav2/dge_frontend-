"use client";

export default function PastRidesTab() {
    const ridesList = [
        { passenger: "Nnaji Christian", pickup: "Ifite-Awka, Awka Anambra", destination: "Igbarim, Anambra State", sPrice: "₦9,900", nPrice: "₦8,900", time: "09/03/2025 - 10:20 PM", status: "ACTIVE" },
        { passenger: "Eze Chinedu", pickup: "Obosi, Idemili North Anambra", destination: "Ogbunike, Anambra State", sPrice: "₦10,200", nPrice: "₦9,200", time: "09/04/2025 - 11:00 AM", status: "COMPLETED" },
        { passenger: "Okoro Ifeoma", pickup: "Onitsha, Onitsha South Ana...", destination: "Awka, Anambra State", sPrice: "₦10,500", nPrice: "₦7,500", time: "09/05/2025 - 12:45 PM", status: "CANCELED" },
        { passenger: "Uchechukwu Nneka", pickup: "Nnewi, Nnewi North Anambra", destination: "Nnewi, Anambra State", sPrice: "₦10,800", nPrice: "₦10,000", time: "09/06/2025 - 02:30 PM", status: "COMPLETED" },
        { passenger: "Okwuosa Chika", pickup: "Ekwulobia, Aguata Anambra", destination: "Onitsha, Anambra State", sPrice: "₦11,000", nPrice: "₦6,750", time: "09/07/2025 - 03:15 PM", status: "CANCELED" },
        { passenger: "Nneoma Amara", pickup: "Akwaeze, Anaocha Anambra", destination: "Umuahia, Abia State", sPrice: "₦11,300", nPrice: "₦8,300", time: "09/08/2025 - 09:00 AM", status: "COMPLETED" },
        { passenger: "Chisom Nwachukwu", pickup: "Umuahia, Abia", destination: "Enugu, Enugu State", sPrice: "₦11,600", nPrice: "₦9,800", time: "09/09/2025 - 01:00 PM", status: "COMPLETED" },
        { passenger: "Ifeanyi Emeka", pickup: "Enugu-Ezike, Enugu", destination: "Abakaliki, Ebonyi State", sPrice: "₦11,900", nPrice: "₦7,900", time: "09/10/2025 - 04:00 PM", status: "CANCELED" },
        { passenger: "Adaobi Ugochukwu", pickup: "Nsukka, Nsukka Enugu", destination: "Owerri, Imo State", sPrice: "₦12,200", nPrice: "₦10,500", time: "09/11/2025 - 05:30 PM", status: "COMPLETED" }
    ];

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
                    {ridesList.map((ride, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                            <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight">{ride.passenger}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{ride.pickup}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{ride.destination}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">{ride.sPrice}</td>
                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">{ride.nPrice}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{ride.time}</td>
                            <td className="py-4 px-2 select-none">
                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                    ride.status === "ACTIVE"
                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                        : ride.status === "COMPLETED"
                                        ? "bg-blue-50 text-blue-600 border border-blue-100"
                                        : "bg-red-50 text-red-600 border border-red-100"
                                }`}>
                                    {ride.status}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
