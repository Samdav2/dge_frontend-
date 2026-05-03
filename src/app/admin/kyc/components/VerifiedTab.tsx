"use client";

interface RequestItem {
    name: string;
    email: string;
    date: string;
    status: "VERIFIED" | "PENDING" | "UNDER REVIEW";
}

interface VerifiedTabProps {
    onReviewClick: (item: RequestItem) => void;
}

export default function VerifiedTab({ onReviewClick }: VerifiedTabProps) {
    const kycVerifiedList: RequestItem[] = [
        { name: "Dominic Praise", email: "dominic@gmail.com", date: "09/03/2025", status: "VERIFIED" },
        { name: "Martha Dokubo", email: "martha@gmail.com", date: "09/04/2025", status: "VERIFIED" },
        { name: "Elizabeth Bashir", email: "alexander@gmail.com", date: "09/05/2025", status: "VERIFIED" },
        { name: "John Bazimo", email: "sophia@gmail.com", date: "09/06/2025", status: "VERIFIED" },
        { name: "Daniel Ibe", email: "benjamin@gmail.com", date: "09/07/2025", status: "VERIFIED" },
        { name: "John Okafor", email: "isabella@gmail.com", date: "09/08/2025", status: "VERIFIED" },
        { name: "Esther Okafor", email: "noah@gmail.com", date: "09/09/2025", status: "VERIFIED" },
        { name: "Joseph Werinipre", email: "olivia@gmail.com", date: "09/10/2025", status: "VERIFIED" }
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative animate-fade-in mt-4">
            <table className="w-full text-left border-collapse select-none">
                <thead>
                    <tr className="border-b border-slate-50 select-none">
                        <th className="py-3 px-2 w-10 select-none">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                        </th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Name</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Email Address</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Verified Date</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">KYC Status</th>
                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {kycVerifiedList.map((item, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                            <td className="py-4 px-2 select-none">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                            </td>
                            <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight">{item.name}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.email}</td>
                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.date}</td>
                            <td className="py-4 px-2 select-none">
                                <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 select-none">
                                    {item.status}
                                </span>
                            </td>
                            <td className="py-4 px-2 select-none">
                                <button
                                    onClick={() => onReviewClick(item)}
                                    className="px-3.5 py-1 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[10px] text-slate-600 select-none hover:text-slate-800 transition-all shadow-sm"
                                >
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
