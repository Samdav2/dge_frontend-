import React from "react";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const TRANSACTIONS = [
    {
        id: "2345678765432134",
        amount: "NGN200",
        type: "Deposit",
        date: "Dec 16, 2024",
        status: "Success",
    },
    {
        id: "7654321345645674",
        amount: "NGN5000",
        type: "Withdrawal",
        date: "Dec 16, 2024",
        status: "Pending",
    },
    {
        id: "567876543354657",
        amount: "NGN200",
        type: "Deposit",
        date: "Dec 16, 2024",
        status: "Success",
    },
];

export function TransactionList() {
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
                        {TRANSACTIONS.map((tx) => (
                            <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-500">{tx.id}</td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{tx.amount}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{tx.type}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{tx.date}</td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tx.status === "Success"
                                                ? "bg-green-100 text-green-800"
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
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
