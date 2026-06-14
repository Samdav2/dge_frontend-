"use client";

import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";
import { getUserTransactions } from "../actions";
import { Loader2 } from "lucide-react";

export function TransactionList() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTransactions() {
            setLoading(true);
            try {
                const res = await getUserTransactions();
                if (res.success && res.data) {
                    setTransactions(res.data);
                }
            } catch (err) {
                console.error("Failed to fetch transactions", err);
            } finally {
                setLoading(false);
            }
        }
        fetchTransactions();
    }, []);

    const formatDate = (isoStr: string | null | undefined) => {
        if (!isoStr) return "—";
        return new Date(isoStr).toLocaleString("en-GB", {
            day: "2-digit", month: "short", year: "numeric",
            hour: "2-digit", minute: "2-digit"
        });
    };

    const formatCurrency = (cents: number | null | undefined) => {
        if (cents == null) return "—";
        return `₦${(cents / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl border border-gray-100 p-8 flex justify-center items-center h-48">
                <Loader2 className="h-8 w-8 animate-spin text-[#C69C2E]" />
            </div>
        );
    }
    return (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900">All Transactions</h3>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50/50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Transaction ID</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Amount</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Type</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {transactions.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                                    No transactions found.
                                </td>
                            </tr>
                        ) : (
                            transactions.map((tx) => (
                                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-500">{tx.id.substring(0, 8).toUpperCase()}</td>
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{formatCurrency(tx.amount_cents)}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500 capitalize">{tx.type.replace('_', ' ')}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(tx.created_at)}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${tx.status === "completed"
                                                    ? "bg-green-100 text-green-800"
                                                    : tx.status === "failed" || tx.status === "reversed"
                                                        ? "bg-red-100 text-red-800"
                                                        : "bg-orange-100 text-orange-800"
                                                }`}
                                        >
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-[#C69C2E]">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
