"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
    TrendingUp,
    Search,
    ChevronDown,
    Filter,
    Download,
    Eye
} from "lucide-react";
import TransactionDetailModal from "./components/TransactionDetailModal";

interface Transaction {
    id: string;
    user_name: string;
    type: string;
    amount: string;
    status: string;
    reference: string;
    created_at: string;
}

export default function AdminTransactionsPage() {
    const [items, setItems] = useState<Transaction[]>([]);
    const [summary, setSummary] = useState({ total_volume: "₦0.00", today_volume: "₦0.00", count: 0 });
    const [loading, setLoading] = useState(true);
    const [selectedTxnId, setSelectedTxnId] = useState<string | null>(null);

    const fetchTransactions = async () => {
        try {
            const res = await fetch("/api/admin/transactions");
            const data = await res.json();
            console.log("Transactions fetched:", data.items);
            if (data.items) setItems(data.items);
            if (data.summary) setSummary(data.summary);
        } catch (err) {
            console.error("Failed to fetch transactions:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleExportCSV = () => {
        if (items.length === 0) return;
        
        const headers = ["ID", "User", "Type", "Amount", "Status", "Reference", "Date"];
        const rows = items.map(t => [
            t.id, t.user_name, t.type, t.amount, t.status, t.reference, t.created_at
        ]);
        
        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(cell => `"${cell}"`).join(","))
        ].join("\n");
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `transactions_export_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden select-none">
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#fafafa] select-none">
                <header className="h-16 pl-16 pr-4 lg:px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2 max-w-[50%] xs:max-w-none">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512] shrink-0">
                            <TrendingUp size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-none truncate select-none">
                            Financial Transactions
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-3 hover:bg-slate-50 cursor-pointer rounded-xl px-2 py-1.5 transition-colors select-none">
                            <div className="w-9 h-9 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center font-semibold text-slate-700 text-sm border border-slate-200 shrink-0">
                                NC
                            </div>
                            <div className="flex flex-col select-none hidden sm:flex">
                                <span className="font-semibold text-xs text-slate-800 leading-tight">Admin</span>
                                <span className="text-[10px] text-slate-400 font-medium">superadmin</span>
                            </div>
                            <ChevronDown size={14} className="text-slate-400 ml-1 hidden sm:block" />
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="relative w-full max-w-sm select-none">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input
                                type="text"
                                placeholder="Search Reference, User..."
                                className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                            />
                        </div>
                        <div className="flex items-center gap-3">
                            <button className="px-4 py-2 bg-white border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 flex items-center gap-2 shadow-sm transition-all">
                                <Filter size={14} /> Filter
                            </button>
                            <button 
                                onClick={handleExportCSV}
                                className="px-4 py-2 bg-[#b68512] text-white rounded-xl text-xs font-bold hover:bg-[#a67a10] flex items-center gap-2 shadow-sm transition-all"
                            >
                                <Download size={14} /> Export CSV
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] hover:scale-[1.01] transition-all shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">Total Transaction Volume</span>
                            <div className="flex flex-col leading-none">
                                <span className="text-2xl font-bold tracking-tight text-slate-800">{summary.total_volume}</span>
                                <span className="text-[11px] text-emerald-600 font-bold leading-tight mt-2">↑ All Time</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] hover:scale-[1.01] transition-all shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">Volume Today</span>
                            <div className="flex flex-col leading-none">
                                <span className="text-2xl font-bold tracking-tight text-slate-800">{summary.today_volume}</span>
                                <span className="text-[11px] text-blue-600 font-bold leading-tight mt-2 flex items-center gap-1">Live Processing</span>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] hover:scale-[1.01] transition-all shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">Total Transactions</span>
                            <div className="flex flex-col leading-none">
                                <span className="text-2xl font-bold tracking-tight text-slate-800">{summary.count.toLocaleString()}</span>
                                <span className="text-[11px] text-slate-400 font-bold leading-tight mt-2">Processed Requests</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative animate-fade-in min-h-[500px]">
                        {loading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                                <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        )}
                        <table className="w-full text-left border-collapse select-none">
                            <thead>
                                <tr className="border-b border-slate-50 select-none">
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Transaction ID</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">User</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Type</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Amount</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Reference</th>
                                    <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Date & Time</th>
                                    <th className="py-3 px-2 w-8"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {items.length > 0 ? items.map((txn) => (
                                <tr key={txn.id} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                                        <td className="py-4 px-2 text-xs font-bold text-slate-800 leading-tight">#{txn.id.slice(0, 8).toUpperCase()}</td>
                                        <td className="py-4 px-2 text-xs text-slate-400 font-medium">{txn.user_name}</td>
                                        <td className="py-4 px-2">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] border ${
                                                txn.type === "DEPOSIT" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
                                                txn.type === "WITHDRAWAL" ? "bg-red-50 text-red-600 border-red-100" :
                                                "bg-blue-50 text-blue-600 border-blue-100"
                                            }`}>
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-xs font-bold text-slate-800">{txn.amount}</td>
                                        <td className="py-4 px-2">
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] ${
                                                txn.status === "COMPLETED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : 
                                                txn.status === "FAILED" ? "bg-red-50 text-red-600 border border-red-100" :
                                                "bg-amber-50 text-amber-600 border border-amber-100"
                                            }`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="py-4 px-2 text-xs text-slate-400 font-medium truncate max-w-[120px]">{txn.reference || "N/A"}</td>
                                        <td className="py-4 px-2 text-xs text-slate-400 font-medium">{txn.created_at}</td>
                                        <td 
                                            className="py-4 px-2 text-slate-400 hover:text-[#b68512] transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedTxnId(txn.id);
                                            }}
                                        >
                                            <Eye size={16} />
                                        </td>
                                    </tr>
                                )) : !loading && (
                                    <tr><td colSpan={8} className="py-12 text-center text-slate-400 text-xs italic font-medium">No transactions recorded yet.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {selectedTxnId && (
                <TransactionDetailModal 
                    transactionId={selectedTxnId} 
                    onClose={() => setSelectedTxnId(null)} 
                />
            )}
        </div>
    );
}
