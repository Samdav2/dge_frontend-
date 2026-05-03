"use client";

import { useState } from "react";
import Link from "next/link";
import AdminSidebar from "../components/AdminSidebar";
import {
    LayoutDashboard,
    Bell,
    Settings,
    Users as UsersIcon,
    Car,
    FileCheck,
    MessageSquare,
    Wallet,
    Headset,
    Search,
    ChevronDown,
    MoreHorizontal,
    Mail,
    Edit,
    TrendingUp
} from "lucide-react";

import OverviewTab from "./components/OverviewTab";
import ServicesTab from "./components/ServicesTab";
import NegotiationsTab from "./components/NegotiationsTab";
import EscrowsTab from "./components/EscrowsTab";
import TransactionsTab from "./components/TransactionsTab";
import KYCDocumentsTab from "./components/KYCDocumentsTab";
import ReviewsTab from "./components/ReviewsTab";

type DetailTabType = "Overview" | "Services Listed" | "Negotiations" | "Escrows" | "Transactions" | "KYC Documents" | "Reviews";

interface UserItem {
    name: string;
    email: string;
    services: number;
    joined: string;
    status: "ACTIVE" | "SUSPENDED";
    kycStatus: "VERIFIED" | "PENDING" | "FAILED";
}

export default function AdminUsersPage() {
    const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);
    const [detailTab, setDetailTab] = useState<DetailTabType>("Overview");

    const usersList: UserItem[] = [
        { name: "Nnaji Christian", email: "dominic@mail.com", services: 30, joined: "09/03/2025", status: "ACTIVE", kycStatus: "VERIFIED" },
        { name: "Martha Dokubo", email: "martha@mail.com", services: 31, joined: "09/04/2025", status: "ACTIVE", kycStatus: "PENDING" },
        { name: "Elizabeth Bashir", email: "james@mail.com", services: 32, joined: "09/05/2025", status: "SUSPENDED", kycStatus: "PENDING" },
        { name: "John Bazimo", email: "sophia@mail.com", services: 33, joined: "09/06/2025", status: "ACTIVE", kycStatus: "VERIFIED" },
        { name: "Daniel Ibe", email: "liam@mail.com", services: 34, joined: "09/07/2025", status: "ACTIVE", kycStatus: "VERIFIED" },
        { name: "John Okafor", email: "olivia@mail.com", services: 35, joined: "09/08/2025", status: "ACTIVE", kycStatus: "FAILED" },
        { name: "Esther Okafor", email: "noah@mail.com", services: 36, joined: "09/09/2025", status: "SUSPENDED", kycStatus: "FAILED" },
        { name: "Joseph Werinipre", email: "ava@mail.com", services: 37, joined: "09/10/2025", status: "SUSPENDED", kycStatus: "FAILED" },
        { name: "Samuel Nasiru", email: "isabella@mail.com", services: 38, joined: "09/11/2025", status: "ACTIVE", kycStatus: "PENDING" },
        { name: "Hannah Musa", email: "elijah@mail.com", services: 39, joined: "09/12/2025", status: "SUSPENDED", kycStatus: "VERIFIED" },
        { name: "Chike Okwuosa", email: "charlotte@mail.com", services: 40, joined: "09/13/2025", status: "ACTIVE", kycStatus: "PENDING" },
        { name: "Adaobi Eze", email: "gabriel@mail.com", services: 41, joined: "09/14/2025", status: "ACTIVE", kycStatus: "VERIFIED" },
        { name: "Victor Nwankwo", email: "mason@mail.com", services: 42, joined: "09/15/2025", status: "SUSPENDED", kycStatus: "VERIFIED" }
    ];

    const [selectedRows, setSelectedRows] = useState<number[]>([]);

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden select-none">
            <AdminSidebar />

            {/* Main Content Area Right Side */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#fafafa] select-none">
                {/* Navbar Header Section */}
                <header className="h-16 pl-16 pr-4 lg:px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2 max-w-[50%] xs:max-w-none">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512] shrink-0">
                            <UsersIcon size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-none truncate select-none">
                            Users {selectedUser ? `/ ${selectedUser.name}` : ""}
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

                {/* Main Content Pane */}
                {!selectedUser ? (
                    /* Initial User List View matching Screenshot 1 */
                    <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in">
                        {/* Search field */}
                        <div className="relative w-full max-w-sm select-none">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input
                                type="text"
                                placeholder="Search Anything"
                                className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                            />
                        </div>

                        {/* Top Toolbar */}
                        <div className="flex items-center gap-2 select-none">
                            <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                                Status <ChevronDown size={12} />
                            </button>
                            <button className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[10px] text-slate-500 flex items-center gap-1 select-none shadow-sm">
                                KYC Status <ChevronDown size={12} />
                            </button>
                        </div>

                        {/* User List Table */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative">
                            <table className="w-full text-left border-collapse select-none">
                                <thead>
                                    <tr className="border-b border-slate-50 select-none">
                                        <th className="py-3 px-2 w-10 select-none">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.length === usersList.length}
                                                onChange={() => {
                                                    if (selectedRows.length === usersList.length) setSelectedRows([]);
                                                    else setSelectedRows(usersList.map((_, i) => i));
                                                }}
                                                className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                            />
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            USER
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            EMAIL ADDRESS
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            SERVICES LISTED
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            DATE JOINED
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            ACTIVE STATUS
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            KYC STATUS
                                        </th>
                                        <th className="py-3 px-2 w-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {usersList.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            onClick={() => setSelectedUser(item)}
                                            className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none"
                                        >
                                            <td className="py-4 px-2 select-none">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(idx)}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        if (selectedRows.includes(idx)) {
                                                            setSelectedRows(selectedRows.filter(i => i !== idx));
                                                        } else {
                                                            setSelectedRows([...selectedRows, idx]);
                                                        }
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                />
                                            </td>
                                            <td className="py-4 px-2 flex items-center gap-3 select-none">
                                                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs border border-slate-200">
                                                    {item.name.split(" ").map(n => n[0]).join("")}
                                                </div>
                                                <span className="font-semibold text-xs text-slate-800 leading-tight">
                                                    {item.name}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                                {item.email}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                                {item.services}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                                {item.joined}
                                            </td>
                                            <td className="py-4 px-2 select-none">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                        item.status === "ACTIVE"
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                            : "bg-amber-50 text-amber-600 border border-amber-100"
                                                    }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 select-none">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                        item.kycStatus === "VERIFIED"
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                            : item.kycStatus === "PENDING"
                                                            ? "bg-amber-50 text-amber-600 border border-amber-100"
                                                            : "bg-red-50 text-red-600 border border-red-100"
                                                    }`}
                                                >
                                                    {item.kycStatus}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 select-none text-slate-400 hover:text-slate-600">
                                                <MoreHorizontal size={16} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 select-none pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-2 select-none">
                                    <select className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-50">
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <span className="text-xs font-semibold text-slate-400 select-none">
                                        Rows Per Page
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 select-none">
                                    <span className="text-xs font-semibold text-slate-400 select-none">
                                        Page 1 of 7
                                    </span>
                                    <div className="flex items-center gap-2 select-none">
                                        <button className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 select-none transition-colors">
                                            <ChevronDown size={14} className="rotate-90" />
                                        </button>
                                        <button className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 select-none transition-colors">
                                            <ChevronDown size={14} className="-rotate-90" />
                                        </button>
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 select-none">
                                        Showing 10 of 70
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Detailed User Profile View */
                    <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in relative">
                        {/* Detail Back navigation link */}
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 select-none shadow-sm transition-all flex items-center gap-1 leading-none mb-2"
                        >
                            ← Back to User List
                        </button>

                        {/* Upper profile header */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6 select-none relative overflow-hidden">
                            <div className="flex items-center gap-5 select-none">
                                <div className="w-20 h-20 bg-slate-50 border-4 border-amber-100 rounded-full flex items-center justify-center font-bold text-slate-700 text-xl overflow-hidden shadow-md">
                                    {selectedUser.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-xs font-semibold text-blue-500 tracking-tight leading-none mb-1.5">
                                        User Profile
                                    </span>
                                    <span className="text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5">
                                        {selectedUser.name}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-semibold select-none leading-none">
                                        Team Member Since 14 04 2025 , 12:16AM
                                    </span>
                                </div>
                            </div>

                            {/* Top right actions */}
                            <div className="flex items-center gap-3 select-none">
                                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                                    <Mail size={15} /> <span>Send Email</span>
                                </button>
                                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                                    <Edit size={15} /> <span>Edit User</span>
                                </button>
                                <button className="px-4 py-2 bg-[#ef4444] hover:bg-red-600 active:bg-red-700 rounded-xl font-bold text-[11px] text-white select-none hover:scale-[1.01] shadow-sm transition-all">
                                    Suspend User
                                </button>
                            </div>
                        </div>

                        {/* Detailed Tabs Header Strip */}
                        <div className="flex items-center gap-2 border-b border-slate-100 select-none w-full overflow-x-auto whitespace-nowrap flex-nowrap pb-0.5">
                            {(["Overview", "Services Listed", "Negotiations", "Escrows", "Transactions", "KYC Documents", "Reviews"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setDetailTab(tab)}
                                    className={`px-4 pb-3.5 text-xs font-bold transition-all relative select-none leading-none border-b-2 shrink-0 ${
                                        detailTab === tab
                                            ? "border-[#b68512] text-slate-800"
                                            : "border-transparent text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {/* Tab Content rendered cleanly */}
                        {detailTab === "Overview" && <OverviewTab userName={selectedUser.name} />}
                        {detailTab === "Services Listed" && <ServicesTab />}
                        {detailTab === "Negotiations" && <NegotiationsTab />}
                        {detailTab === "Escrows" && <EscrowsTab />}
                        {detailTab === "Transactions" && <TransactionsTab />}
                        {detailTab === "KYC Documents" && <KYCDocumentsTab />}
                        {detailTab === "Reviews" && <ReviewsTab />}
                    </div>
                )}
            </main>
        </div>
    );
}
