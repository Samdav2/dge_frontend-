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
    Mail,
    Edit,
    ArrowUpRight
} from "lucide-react";

import OverviewTab from "./components/OverviewTab";
import ActiveRidesTab from "./components/ActiveRidesTab";
import PastRidesTab from "./components/PastRidesTab";

type DetailTabType = "Overview" | "Active Rides" | "Past Rides";

interface DriverItem {
    name: string;
    passenger: string;
    destination: string;
    servicePrice: string;
    negotiationPrice: string;
    time: string;
    status: "ACTIVE" | "COMPLETED" | "CANCELED";
}

export default function AdminDriversPage() {
    const [selectedDriver, setSelectedDriver] = useState<DriverItem | null>(null);
    const [detailTab, setDetailTab] = useState<DetailTabType>("Overview");

    const driversList: DriverItem[] = [
        { name: "Nnaji Christian", passenger: "Nnaji Christian", destination: "Igbarim, Anambra State", servicePrice: "₦9,900", negotiationPrice: "₦8,900", time: "09/03/2025 - 10:20 PM", status: "ACTIVE" },
        { name: "Martha Dokubo", passenger: "Eze Chinedu", destination: "Ogbunike, Anambra State", servicePrice: "₦10,200", negotiationPrice: "₦9,200", time: "09/04/2025 - 11:00 AM", status: "COMPLETED" },
        { name: "Elizabeth Bashir", passenger: "Okoro Ifeoma", destination: "Awka, Anambra State", servicePrice: "₦10,500", negotiationPrice: "₦7,500", time: "09/05/2025 - 12:45 PM", status: "CANCELED" },
        { name: "John Bazimo", passenger: "Uchechukwu Nneka", destination: "Nnewi, Anambra State", servicePrice: "₦10,800", negotiationPrice: "₦10,000", time: "09/06/2025 - 02:30 PM", status: "COMPLETED" },
        { name: "Daniel Ibe", passenger: "Okwuosa Chika", destination: "Onitsha, Anambra State", servicePrice: "₦11,000", negotiationPrice: "₦6,750", time: "09/07/2025 - 03:15 PM", status: "CANCELED" },
        { name: "John Okafor", passenger: "Nneoma Amara", destination: "Umuahia, Abia State", servicePrice: "₦11,300", negotiationPrice: "₦8,300", time: "09/08/2025 - 09:00 AM", status: "COMPLETED" },
        { name: "Esther Okafor", passenger: "Chisom Nwachukwu", destination: "Enugu, Enugu State", servicePrice: "₦11,600", negotiationPrice: "₦9,800", time: "09/09/2025 - 01:00 PM", status: "COMPLETED" },
        { name: "Joseph Werinipre", passenger: "Ifeanyi Emeka", destination: "Abakaliki, Ebonyi State", servicePrice: "₦11,900", negotiationPrice: "₦7,900", time: "09/10/2025 - 04:00 PM", status: "CANCELED" },
        { name: "Samuel Nasiru", passenger: "Adaobi Ugochukwu", destination: "Owerri, Imo State", servicePrice: "₦12,200", negotiationPrice: "₦10,500", time: "09/11/2025 - 05:30 PM", status: "COMPLETED" }
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
                            <Car size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-none truncate select-none">
                            Drivers {selectedDriver ? `/ ${selectedDriver.name}` : ""}
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
                {!selectedDriver ? (
                    /* Driver List View exactly matching Screenshot 1 */
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

                        {/* Top stat boxes exactly as Screenshot 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                    Active Drivers
                                </span>
                                <div className="flex flex-col select-none leading-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                        1,388
                                    </span>
                                    <span className="text-[11px] text-emerald-600 font-bold select-none leading-tight mt-2 flex items-center gap-1">
                                        ↑ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                    Completed Drivers
                                </span>
                                <div className="flex flex-col select-none leading-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                        1,388
                                    </span>
                                    <span className="text-[11px] text-amber-600 font-bold select-none leading-tight mt-2 flex items-center gap-1">
                                        ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                    </span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] select-none hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]">
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider select-none leading-tight">
                                    Cancelled Drivers
                                </span>
                                <div className="flex flex-col select-none leading-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800 select-none">
                                        8,235
                                    </span>
                                    <span className="text-[11px] text-red-600 font-bold select-none leading-tight mt-2 flex items-center gap-1">
                                        ↓ 22.1% <span className="text-slate-400 font-medium">July 2025</span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Driver List tabs */}
                        <div className="flex items-center gap-2 border-b border-slate-100 select-none w-full">
                            <button className="px-3.5 pb-2 text-xs font-bold transition-all relative select-none leading-none border-b-2 border-[#b68512] text-slate-800">
                                Active Drivers(4)
                            </button>
                            <button className="px-3.5 pb-2 text-xs font-bold transition-all relative select-none leading-none border-b-2 border-transparent text-slate-400 hover:text-slate-600">
                                Completed Riders(4)
                            </button>
                            <button className="px-3.5 pb-2 text-xs font-bold transition-all relative select-none leading-none border-b-2 border-transparent text-slate-400 hover:text-slate-600">
                                Cancelled Rides (2)
                            </button>
                        </div>

                        {/* User List Table matching Screenshot 1 */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between overflow-x-auto select-none relative">
                            <table className="w-full text-left border-collapse select-none">
                                <thead>
                                    <tr className="border-b border-slate-50 select-none">
                                        <th className="py-3 px-2 w-10 select-none">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.length === driversList.length}
                                                onChange={() => {
                                                    if (selectedRows.length === driversList.length) setSelectedRows([]);
                                                    else setSelectedRows(driversList.map((_, i) => i));
                                                }}
                                                className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                            />
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            DRIVER
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            PASSENGER
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            DESTINATION
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            SERVICE PRICE
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            NEGOTIATION PRICE
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            TIME
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                            STATUS
                                        </th>
                                        <th className="py-3 px-2 w-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {driversList.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            onClick={() => setSelectedDriver(item)}
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
                                            <td className="py-4 px-2 text-xs font-semibold text-slate-800 leading-tight select-none">
                                                {item.name}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                                {item.passenger}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none max-w-[180px] truncate">
                                                {item.destination}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                                {item.servicePrice}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold select-none leading-none">
                                                {item.negotiationPrice}
                                            </td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium select-none leading-none">
                                                {item.time}
                                            </td>
                                            <td className="py-4 px-2 select-none">
                                                <span
                                                    className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                        item.status === "ACTIVE"
                                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                            : item.status === "COMPLETED"
                                                            ? "bg-blue-50 text-blue-600 border border-blue-100"
                                                            : "bg-red-50 text-red-600 border border-red-100"
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
                    /* Driver Profile Details exactly matching Screenshot 2 */
                    <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in relative">
                        {/* Detail Back navigation link */}
                        <button
                            onClick={() => setSelectedDriver(null)}
                            className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 select-none shadow-sm transition-all flex items-center gap-1 leading-none mb-2"
                        >
                            ← Back to Driver List
                        </button>

                        {/* Upper profile header card in Screenshot 2 */}
                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6 select-none relative overflow-hidden">
                            <div className="flex items-center gap-5 select-none">
                                <div className="w-20 h-20 bg-slate-50 border-4 border-amber-100 rounded-full flex items-center justify-center font-bold text-slate-700 text-xl overflow-hidden shadow-md">
                                    {selectedDriver.name.split(" ").map(n => n[0]).join("")}
                                </div>
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-xs font-semibold text-blue-500 tracking-tight leading-none mb-1.5">
                                        User Profile
                                    </span>
                                    <span className="text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5">
                                        {selectedDriver.name}
                                    </span>
                                    <span className="text-[11px] text-slate-400 font-semibold select-none leading-none">
                                        Member Since 14 04 2025 . 12:16AM
                                    </span>
                                </div>
                            </div>

                            {/* Top right actions exactly as Screenshot 2 */}
                            <div className="flex items-center gap-3 select-none">
                                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                                    <Mail size={15} /> <span>Send Email</span>
                                </button>
                                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 select-none shadow-sm transition-all flex items-center gap-1.5">
                                    <Edit size={15} /> <span>Edit Driver details</span>
                                </button>
                                <button className="px-4 py-2 bg-[#ef4444] hover:bg-red-600 active:bg-red-700 rounded-xl font-bold text-[11px] text-white select-none hover:scale-[1.01] shadow-sm transition-all">
                                    Suspend Driver
                                </button>
                            </div>
                        </div>

                        {/* Detailed Tabs Header Strip */}
                        <div className="flex items-center gap-2 border-b border-slate-100 select-none w-full overflow-x-auto whitespace-nowrap flex-nowrap pb-0.5">
                            {(["Overview", "Active Rides", "Past Rides"] as const).map((tab) => (
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

                        {/* Tab contents rendered cleanly */}
                        {detailTab === "Overview" && <OverviewTab userName={selectedDriver.name} />}
                        {detailTab === "Active Rides" && <ActiveRidesTab />}
                        {detailTab === "Past Rides" && <PastRidesTab />}
                    </div>
                )}
            </main>
        </div>
    );
}
