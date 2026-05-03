"use client";

import { useState } from "react";
import { Search, ChevronDown, MoreHorizontal, X, CheckCircle2, Download, FileText, AlertCircle } from "lucide-react";

interface TransactionItem {
    id: string;
    type: "Withdrawal" | "Deposit";
    amount: string;
    dateTime: string;
    status: "SUCCESSFUL" | "PENDING" | "FAILED";
}

export default function TransactionsTab() {
    const [selectedTxn, setSelectedTxn] = useState<TransactionItem | null>(null);
    const [txnStatus, setTxnStatus] = useState<string>("Completed");

    const transactionsList: TransactionItem[] = [
        { id: "TXN-00123456789", type: "Withdrawal", amount: "₦9,900", dateTime: "09/03/2025 , 09:34PM", status: "SUCCESSFUL" },
        { id: "TXN-00123456790", type: "Deposit", amount: "₦4,000", dateTime: "09/04/2025 , 10:00AM", status: "SUCCESSFUL" },
        { id: "TXN-00123456791", type: "Deposit", amount: "₦6,500", dateTime: "09/05/2025 , 11:15PM", status: "PENDING" },
        { id: "TXN-00123456792", type: "Withdrawal", amount: "₦3,250", dateTime: "09/06/2025 , 12:45PM", status: "FAILED" },
        { id: "TXN-00123456793", type: "Deposit", amount: "₦12,750", dateTime: "09/07/2025 , 01:30AM", status: "SUCCESSFUL" },
        { id: "TXN-00123456794", type: "Deposit", amount: "₦8,999", dateTime: "09/08/2025 , 09:00PM", status: "SUCCESSFUL" },
        { id: "TXN-00123456795", type: "Withdrawal", amount: "₦15,600", dateTime: "09/09/2025 , 02:20PM", status: "PENDING" },
        { id: "TXN-00123456796", type: "Withdrawal", amount: "₦2,300", dateTime: "09/10/2025 , 03:10AM", status: "PENDING" },
        { id: "TXN-00123456797", type: "Deposit", amount: "₦7,800", dateTime: "09/11/2025 , 04:50PM", status: "SUCCESSFUL" }
    ];

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 select-none">
                <div className="flex items-center gap-2 select-none">
                    <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                        Transactions
                    </h3>
                </div>
                <div className="flex items-center gap-2 select-none">
                    <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                        Type <ChevronDown size={12} />
                    </button>
                    <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                        Status <ChevronDown size={12} />
                    </button>
                    <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                        Date <ChevronDown size={12} />
                    </button>
                </div>
            </div>

            <div className="relative w-full max-w-sm select-none">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                <input
                    type="text"
                    placeholder="Search Record"
                    className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                />
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative">
                <table className="w-full text-left border-collapse select-none">
                    <thead>
                        <tr className="border-b border-slate-50 select-none">
                            <th className="py-3 px-2 w-10 select-none">
                                <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                            </th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Transaction ID</th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Type</th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Amount</th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date & Time</th>
                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                            <th className="py-3 px-2 w-8"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {transactionsList.map((txn, idx) => (
                            <tr
                                key={idx}
                                onClick={() => setSelectedTxn(txn)}
                                className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none"
                            >
                                <td className="py-4 px-2 select-none">
                                    <input type="checkbox" className="w-4 h-4 rounded border-slate-200 text-amber-600 bg-white" />
                                </td>
                                <td className="py-4 px-2 text-xs font-bold text-slate-800 leading-none select-none">
                                    {txn.id}
                                </td>
                                <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                    {txn.type}
                                </td>
                                <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                    {txn.amount}
                                </td>
                                <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                    {txn.dateTime}
                                </td>
                                <td className="py-4 px-2 select-none">
                                    <span
                                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                            txn.status === "SUCCESSFUL"
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                : txn.status === "PENDING"
                                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                                : "bg-red-50 text-red-600 border border-red-100"
                                        }`}
                                    >
                                        {txn.status}
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

            {/* Slide-over Transaction Receipt Modal/Drawer matching Screenshot 3 */}
            {selectedTxn && (
                <div className="fixed inset-0 bg-black/25 backdrop-blur-sm z-50 flex justify-end select-none animate-fade-in">
                    <div className="w-full max-w-md bg-white h-full border-l border-slate-100 p-6 flex flex-col justify-between overflow-y-auto select-none relative animate-slide-in-right shadow-2xl">
                        <div className="space-y-6">
                            {/* Modal title exactly as Screenshot 3 */}
                            <div className="flex items-center justify-between select-none">
                                <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                                    Transaction Receipt
                                </h3>
                                <button
                                    onClick={() => setSelectedTxn(null)}
                                    className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors select-none"
                                >
                                    <X size={15} />
                                </button>
                            </div>

                            {/* Content details matching Screenshot 3 */}
                            <div className="flex flex-col items-center py-4 select-none">
                                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-100 mb-3.5 shadow-sm">
                                    <CheckCircle2 size={28} />
                                </div>
                                <span className="text-2xl font-bold tracking-tight text-slate-800 leading-none mb-1 flex items-baseline select-none">
                                    {selectedTxn.amount}
                                </span>
                                <div className="flex items-center gap-1.5 select-none mt-1">
                                    <span className="text-xs text-slate-400 font-medium select-none">
                                        Sent To
                                    </span>
                                    <span className="text-xs text-slate-600 font-bold select-none leading-none">
                                        💳 8012345678 - Opay
                                    </span>
                                </div>
                            </div>

                            {/* Reference summary box exactly like design in Screenshot 3 */}
                            <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100/80 space-y-3 select-none">
                                <div className="flex items-center justify-between select-none">
                                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase select-none">
                                        Reference Number
                                    </span>
                                    <span className="text-xs font-bold text-slate-800 select-none">
                                        TXN20241007001
                                    </span>
                                </div>
                                <div className="flex items-center justify-between select-none">
                                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase select-none">
                                        Status
                                    </span>
                                    <span className="inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] bg-emerald-50 text-emerald-600 border border-emerald-100 select-none">
                                        SUCCESSFUL
                                    </span>
                                </div>
                                <div className="flex items-center justify-between select-none">
                                    <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase select-none">
                                        Date & Time
                                    </span>
                                    <span className="text-xs font-bold text-slate-800 select-none">
                                        Feb 20, 2025 7:10PM
                                    </span>
                                </div>
                            </div>

                            {/* Download button exactly as Screenshot 3 */}
                            <button className="w-full py-2.5 bg-[#b68512] hover:bg-amber-600 text-white rounded-xl font-bold text-xs select-none shadow-sm transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5">
                                <Download size={14} /> <span>Download PDF</span>
                            </button>

                            {/* Change Transaction status exactly like Screenshot 3 */}
                            <div className="bg-slate-50/60 p-4 rounded-2xl border border-slate-100/80 space-y-3.5 select-none">
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="font-bold text-xs text-slate-800 select-none">
                                        Change Transaction Status
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400 select-none mt-0.5">
                                        Update the current status of this transaction
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <select
                                        value={txnStatus}
                                        onChange={(e) => setTxnStatus(e.target.value)}
                                        className="flex-1 h-9 px-3 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-50 select-none"
                                    >
                                        <option value="Completed">Completed</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Failed">Failed</option>
                                    </select>
                                    <button className="h-9 px-4 bg-[#b68512] hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-sm select-none transition-all flex items-center justify-center gap-1">
                                        <FileText size={13} /> <span>Save Status</span>
                                    </button>
                                </div>
                            </div>

                            {/* Reverse transaction precisely matching Screenshot 3 */}
                            <div className="bg-red-50/50 p-4 rounded-2xl border border-red-100/50 space-y-3.5 select-none">
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="font-bold text-xs text-slate-800 select-none">
                                        Reverse Transaction
                                    </span>
                                    <span className="text-[10px] font-medium text-slate-400 select-none mt-0.5">
                                        Reverse this transaction and refund the amount to the user
                                    </span>
                                </div>
                                <button className="w-full h-9 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-sm select-none transition-all flex items-center justify-center gap-1.5">
                                    <AlertCircle size={14} /> <span>Reverse Transaction</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
