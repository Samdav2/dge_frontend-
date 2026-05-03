"use client";

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import {
    LayoutDashboard,
    Bell,
    Settings,
    Users,
    Car,
    FileCheck,
    MessageSquare,
    Wallet,
    Headset,
    Search,
    ChevronDown,
    MoreHorizontal,
    TrendingUp
} from "lucide-react";

import TransactionReceiptDrawer from "./components/TransactionReceiptDrawer";

export default function AdminTransactionsPage() {
    const [selectedTx, setSelectedTx] = useState<any | null>(null);

    const transactions = [
        { name: "Christian Nnaji", txId: "TXN-00123456789", type: "Deposit", amount: "₦9,900", date: "09/03/2025 . 09:34PM", status: "SUCCESSFUL" },
        { name: "Martha Dokubo", txId: "TXN-00123456790", type: "Withdrawal", amount: "₦4,000", date: "09/04/2025 . 10:00AM", status: "SUCCESSFUL" },
        { name: "Elizabeth Bashir", txId: "TXN-00123456791", type: "Deposit", amount: "₦6,500", date: "09/05/2025 . 11:15PM", status: "PENDING" },
        { name: "John Bozimo", txId: "TXN-00123456792", type: "Withdrawal", amount: "₦3,250", date: "09/06/2025 . 12:45PM", status: "SUCCESSFUL" },
        { name: "Daniel Ibe", txId: "TXN-00123456793", type: "Job Payment", amount: "₦12,750", date: "09/07/2025 . 01:30AM", status: "PENDING" },
        { name: "John Okafor", txId: "TXN-00123456794", type: "Withdrawal", amount: "₦8,999", date: "09/08/2025 . 09:00PM", status: "PENDING" },
        { name: "Esther Okafor", txId: "TXN-00123456795", type: "Deposit", amount: "₦15,600", date: "09/09/2025 . 02:20PM", status: "SUCCESSFUL" },
        { name: "Joseph Werinipre", txId: "TXN-00123456796", type: "Job Payment", amount: "₦2,300", date: "09/10/2025 . 03:10AM", status: "PENDING" },
        { name: "Samuel Nasiru", txId: "TXN-00123456797", type: "Withdrawal", amount: "₦7,800", date: "09/11/2025 . 04:50PM", status: "SUCCESSFUL" },
        { name: "Hannah Musa", txId: "TXN-00123456798", type: "Job Payment", amount: "₦5,400", date: "09/12/2025 . 05:55AM", status: "FAILED" }
    ];

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden select-none relative">
            <AdminSidebar />

            {/* Main Content Area Right Side */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#fafafa] select-none">
                {/* Navbar Header Section */}
                <header className="h-16 pl-16 pr-4 lg:px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2 max-w-[50%] xs:max-w-none">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512] shrink-0">
                            <TrendingUp size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-none truncate select-none">
                            Transaction
                        </h1>
                    </div>

                    {/* Admin profile */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 hover:bg-slate-50 cursor-pointer rounded-xl px-2 py-1.5 transition-colors select-none">
                            <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center font-semibold text-slate-700 text-sm border border-slate-200 shrink-0">
                                NC
                            </div>
                            <div className="flex flex-col select-none hidden sm:flex">
                                <span className="font-semibold text-xs text-slate-800 leading-tight">Nnaji Christian</span>
                                <span className="text-[10px] text-slate-400 font-medium">admin</span>
                            </div>
                            <ChevronDown size={14} className="text-slate-400 ml-1 hidden sm:block" />
                        </div>
                    </div>
                </header>

                {/* Main Transaction List Content */}
                <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in relative">
                    {/* Search field */}
                    <div className="relative w-full max-w-sm select-none">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Search by transaction ID or user..."
                            className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                        />
                    </div>

                    {/* Statistics boxes exactly like Screenshot 1 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] leading-none">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                Total Transactions
                            </span>
                            <div className="flex flex-col select-none mt-1">
                                <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                    1,388
                                </span>
                                <span className="text-[11px] text-red-600 font-bold select-none mt-2 flex items-center gap-1">
                                    ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] leading-none">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                Completed
                            </span>
                            <div className="flex flex-col select-none mt-1">
                                <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                    1,388
                                </span>
                                <span className="text-[11px] text-emerald-600 font-bold select-none mt-2 flex items-center gap-1">
                                    ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] leading-none">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                Pending
                            </span>
                            <div className="flex flex-col select-none mt-1">
                                <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                    1,388
                                </span>
                                <span className="text-[11px] text-amber-600 font-bold select-none mt-2 flex items-center gap-1">
                                    ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                </span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)] leading-none">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none">
                                Failed
                            </span>
                            <div className="flex flex-col select-none mt-1">
                                <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                    8,235
                                </span>
                                <span className="text-[11px] text-red-600 font-bold select-none mt-2 flex items-center gap-1">
                                    ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Mini dropdown filter section */}
                    <div className="flex items-center gap-3 pt-2 select-none">
                        <div className="flex items-center gap-1 border border-slate-100 bg-white rounded-xl px-3 py-2 text-[11px] font-bold text-slate-600 select-none">
                            <span>All Type</span>
                            <ChevronDown size={14} className="text-slate-400 ml-1" />
                        </div>
                        <div className="flex items-center gap-1 border border-slate-100 bg-white rounded-xl px-3 py-2 text-[11px] font-bold text-slate-600 select-none">
                            <span>All Status</span>
                            <ChevronDown size={14} className="text-slate-400 ml-1" />
                        </div>
                    </div>

                    {/* Table Title exactly like Screenshot 1 */}
                    <div className="flex items-center justify-between select-none leading-none border-b border-slate-50 pb-2.5">
                        <h2 className="text-sm font-bold tracking-tight text-slate-800 select-none">
                            Recent Transactions
                        </h2>
                        <button className="text-[11px] font-bold text-[#b68512] hover:text-[#a17410] transition-colors flex items-center gap-1 select-none leading-none">
                            View All →
                        </button>
                    </div>

                    {/* Transactions list exactly like Screenshot 1 */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] overflow-x-auto select-none relative animate-fade-in mt-1">
                        <table className="w-full text-left border-collapse select-none">
                            <thead>
                                <tr className="border-b border-slate-50 select-none">
                                    <th className="py-3 px-2 w-10 select-none">
                                        <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                                    </th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">User</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Transaction ID</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Type</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Amount</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date & Time</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                                    <th className="py-3 px-2 w-8"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {transactions.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() => setSelectedTx(item)}
                                        className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none"
                                    >
                                        <td className="py-4 px-2 select-none">
                                            <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                                        </td>
                                        <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight select-none">{item.name}</td>
                                        <td className="py-4 px-2 text-xs text-slate-400 font-semibold select-none leading-tight">{item.txId}</td>
                                        <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.type}</td>
                                        <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none">{item.amount}</td>
                                        <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none">{item.date}</td>
                                        <td className="py-4 px-2 select-none">
                                            <span
                                                className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] border leading-none ${
                                                    item.status === "SUCCESSFUL"
                                                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                        : item.status === "PENDING"
                                                        ? "bg-amber-50 text-amber-600 border-amber-100"
                                                        : "bg-red-50 text-red-600 border-red-100"
                                                }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 select-none text-slate-400 hover:text-slate-600">
                                            <MoreHorizontal size={16} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Receipt detail view panel drawer */}
            <TransactionReceiptDrawer
                item={selectedTx}
                onClose={() => setSelectedTx(null)}
            />
        </div>
    );
}
