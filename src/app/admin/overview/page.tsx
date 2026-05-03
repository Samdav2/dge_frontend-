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
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    ChevronDown,
    Plus,
    TrendingUp
} from "lucide-react";

export default function AdminOverviewPage() {
    const [selectedTab, setSelectedTab] = useState<"new-users" | "listed-jobs">("new-users");
    const [selectedTimeframe, setSelectedTimeframe] = useState<"Daily" | "Weekly" | "Monthly" | "Yearly">("Daily");
    const [selectedGraphRange, setSelectedGraphRange] = useState<string>("1M");

    const usersList = [
        {
            name: "Nnaji Christian",
            email: "chrisnnaji443@gmail.com",
            id: "UD-00123456789",
            joined: "09/03/2025",
            status: "VERIFIED"
        },
        {
            name: "Martha Dokubo",
            email: "martha@mail.com",
            id: "UD-00123456790",
            joined: "09/03/2025",
            status: "PENDING"
        },
        {
            name: "Elizabeth Bashir",
            email: "james@mail.com",
            id: "UD-00123456791",
            joined: "09/03/2025",
            status: "VERIFIED"
        },
        {
            name: "John Bazimo",
            email: "sophia@mail.com",
            id: "UD-00123456792",
            joined: "09/03/2025",
            status: "VERIFIED"
        },
        {
            name: "Daniel Ibe",
            email: "liam@mail.com",
            id: "UD-00123456793",
            joined: "09/03/2025",
            status: "FAILED"
        }
    ];

    const jobsList = [
        {
            user: "Nnaji Christian",
            title: "Content Creation",
            type: "Remote",
            listed: "09/03/2025",
            status: "COMPLETED"
        },
        {
            user: "Martha Dokubo",
            title: "UI/UX Design",
            type: "Physical",
            listed: "09/03/2025",
            status: "IN PROGRESS"
        },
        {
            user: "Elizabeth Bashir",
            title: "SEO Integration",
            type: "Remote",
            listed: "09/03/2025",
            status: "COMPLETED"
        },
        {
            user: "John Bazimo",
            title: "Web Development",
            type: "Physical",
            listed: "09/03/2025",
            status: "COMPLETED"
        },
        {
            user: "Daniel Ibe",
            title: "Backend Development",
            type: "Remote",
            listed: "09/03/2025",
            status: "CANCELLED"
        },
        {
            user: "John Okafor",
            title: "Dev Ops",
            type: "Physical",
            listed: "09/03/2025",
            status: "CANCELLED"
        },
        {
            user: "Esther Okafor",
            title: "Looking for a passionate fl...",
            type: "Remote",
            listed: "09/03/2025",
            status: "IN PROGRESS"
        },
        {
            user: "Joseph Werinipre",
            title: "Hiring a skilled photograph...",
            type: "Physical",
            listed: "09/03/2025",
            status: "COMPLETED"
        },
        {
            user: "Samuel Nasiru",
            title: "Seeking an experienced ev...",
            type: "Remote",
            listed: "09/03/2025",
            status: "IN PROGRESS"
        },
        {
            user: "Hannah Musa",
            title: "Searching for a dedicated t...",
            type: "Physical",
            listed: "09/03/2025",
            status: "COMPLETED"
        }
    ];

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden select-none">
            <AdminSidebar />

            {/* Main Content Area Right Side */}
            <main className="flex-1 flex flex-col h-full overflow-y-auto select-none bg-[#fafafa]">
                <header className="h-16 pl-16 pr-4 lg:px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2 max-w-[50%] xs:max-w-none">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512] shrink-0">
                            <LayoutDashboard size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight truncate select-none">Overview</h1>
                    </div>

                    {/* Admin profile / Search actions */}
                    <div className="flex items-center gap-6">
                        {/* Avatar Details */}
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
                <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full">
                    {/* Search Input Bar */}
                    <div className="relative w-full max-w-sm">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                        <input
                            type="text"
                            placeholder="Search Anything"
                            className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                        />
                    </div>

                    {/* Stat Cards - Grid of 4 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 select-none">
                        {/* Stat Card 1: Revenue (Dark) */}
                        <div className="bg-[#111111] p-6 rounded-2xl flex flex-col justify-between h-[128px] border border-black/10 text-white shadow-sm hover:scale-[1.01] transition-all cursor-pointer">
                            <span className="text-[11px] font-medium text-slate-400">Total Revenue</span>
                            <div className="flex flex-col mt-auto">
                                <span className="text-2xl font-bold text-white tracking-tight leading-none mb-1 select-none">
                                    ₦84,343,000.00
                                </span>
                                <div className="flex items-center gap-1.5 mt-1 select-none">
                                    <span className="flex items-center text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded-full select-none leading-none">
                                        <ArrowUpRight size={10} className="mr-0.5" /> 24.3%
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium leading-none">
                                        July 2025
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stat Card 2: Jobs Services (White) */}
                        <div className="bg-white p-6 rounded-2xl flex flex-col justify-between h-[128px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-all cursor-pointer">
                            <span className="text-[11px] font-medium text-slate-400">Total Jobs Services</span>
                            <div className="flex flex-col mt-auto select-none">
                                <span className="text-2xl font-bold text-slate-800 tracking-tight leading-none mb-1 select-none">
                                    14,388
                                </span>
                                <div className="flex items-center gap-1.5 mt-1 select-none">
                                    <span className="flex items-center text-[10px] font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-1.5 py-0.5 rounded-full select-none leading-none">
                                        <ArrowDownRight size={10} className="mr-0.5" /> 22.1%
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium leading-none">
                                        July 2025
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stat Card 3: Active Drivers (White) */}
                        <div className="bg-white p-6 rounded-2xl flex flex-col justify-between h-[128px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-all cursor-pointer">
                            <span className="text-[11px] font-medium text-slate-400">Active Drivers</span>
                            <div className="flex flex-col mt-auto select-none">
                                <span className="text-2xl font-bold text-slate-800 tracking-tight leading-none mb-1 select-none">
                                    8,235
                                </span>
                                <div className="flex items-center gap-1.5 mt-1 select-none">
                                    <span className="flex items-center text-[10px] font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-1.5 py-0.5 rounded-full select-none leading-none">
                                        <ArrowDownRight size={10} className="mr-0.5" /> 22.1%
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium leading-none">
                                        July 2025
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Stat Card 4: Total Users (White) */}
                        <div className="bg-white p-6 rounded-2xl flex flex-col justify-between h-[128px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-all cursor-pointer">
                            <span className="text-[11px] font-medium text-slate-400">Total Number of Users</span>
                            <div className="flex flex-col mt-auto select-none">
                                <span className="text-2xl font-bold text-slate-800 tracking-tight leading-none mb-1 select-none">
                                    8,235
                                </span>
                                <div className="flex items-center gap-1.5 mt-1 select-none">
                                    <span className="flex items-center text-[10px] font-semibold bg-amber-500/10 text-amber-600 border border-amber-500/20 px-1.5 py-0.5 rounded-full select-none leading-none">
                                        <ArrowDownRight size={10} className="mr-0.5" /> 22.1%
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium leading-none">
                                        July 2025
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Area Graph Visual Panel */}
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-6">
                        {/* Filters and Timeframe Header (Corrected: Center positioned timeframe pills) */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 select-none w-full">
                            {/* Left Side: title */}
                            <div className="flex-1 text-left">
                                <h2 className="text-base font-bold text-slate-800 tracking-tight">Listed Jobs</h2>
                            </div>

                            {/* Center Section: Timeframe selection pills */}
                            <div className="flex bg-slate-50 border border-slate-100 p-1 rounded-xl gap-0.5 justify-center">
                                {(["Daily", "Weekly", "Monthly", "Yearly"] as const).map((pill) => (
                                    <button
                                        key={pill}
                                        onClick={() => setSelectedTimeframe(pill)}
                                        className={`px-4 py-1.5 rounded-lg text-xs font-semibold select-none transition-all ${
                                            selectedTimeframe === pill
                                                ? "bg-amber-50 border border-amber-100/50 text-[#b68512] shadow-sm"
                                                : "text-slate-400 hover:text-slate-600 hover:bg-slate-100/50"
                                        }`}
                                    >
                                        {pill}
                                    </button>
                                ))}
                            </div>

                            {/* Right Side: date range inputs */}
                            <div className="flex-1 flex justify-end">
                                <div className="flex items-center bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl gap-2 select-none text-slate-500 text-xs">
                                    <span className="text-slate-300 font-medium">From</span>
                                    <input type="text" defaultValue="mm/dd/yyyy" className="bg-transparent outline-none w-20 text-slate-400 font-medium text-center" />
                                    <span className="text-slate-300 font-medium">To</span>
                                    <input type="text" defaultValue="mm/dd/yyyy" className="bg-transparent outline-none w-20 text-slate-400 font-medium text-center" />
                                </div>
                            </div>
                        </div>

                        {/* Interactive Vector Curve Area Graphic SVG */}
                        <div className="w-full h-[240px] md:h-[280px] bg-slate-50/20 rounded-2xl border border-slate-100/50 flex flex-col justify-between p-4 relative overflow-hidden select-none">
                            <svg className="w-full h-full absolute inset-0 select-none pointer-events-none" viewBox="0 0 1000 240" preserveAspectRatio="none">
                                <defs>
                                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#dca51a" stopOpacity="0.18" />
                                        <stop offset="100%" stopColor="#fafafa" stopOpacity="0" />
                                    </linearGradient>
                                </defs>
                                {/* Background shading under path line curve */}
                                <path
                                    d="M 0,240 L 0,160 Q 150,150 250,170 T 500,100 T 630,70 T 800,170 T 1000,160 L 1000,240 Z"
                                    fill="url(#chartGradient)"
                                />
                                {/* Main line path styling exactly like design image */}
                                <path
                                    d="M 0,160 Q 150,150 250,170 T 500,100 T 630,70 T 800,170 T 1000,160"
                                    fill="none"
                                    stroke="#dca51a"
                                    strokeWidth="3.5"
                                    strokeLinecap="round"
                                />
                                {/* Drop shadow for dot marker exactly like in graph */}
                                <circle cx="630" cy="70" r="10" fill="white" stroke="#22c55e" strokeWidth="3" />
                                <circle cx="630" cy="70" r="4" fill="#22c55e" />
                            </svg>

                            {/* Dynamic filters time range pills bottom */}
                            <div className="flex flex-wrap items-center justify-between mt-auto select-none pt-4 bg-white/70 backdrop-blur-sm z-10 border-t border-slate-50 rounded-b-2xl">
                                <div className="flex gap-2">
                                    {(["1D", "1W", "2W", "3W", "1M", "2M", "3M", "6M", "1Y", "All"] as const).map((range) => (
                                        <button
                                            key={range}
                                            onClick={() => setSelectedGraphRange(range)}
                                            className={`px-3 py-1 text-[10px] md:text-xs font-semibold rounded-lg select-none transition-all ${
                                                selectedGraphRange === range
                                                    ? "bg-[#fafafa] border border-slate-200 text-slate-800 shadow-sm"
                                                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                                            }`}
                                        >
                                            {range}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Table Data Panel Card with tabs */}
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col justify-between">
                        {/* Tab header buttons */}
                        <div className="flex items-center justify-between border-b border-slate-100 mb-5 select-none">
                            <div className="flex gap-6">
                                <button
                                    onClick={() => setSelectedTab("new-users")}
                                    className={`pb-3 text-xs font-bold transition-all relative select-none leading-none border-b-2 ${
                                        selectedTab === "new-users"
                                            ? "border-[#b68512] text-slate-800"
                                            : "border-transparent text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    New Users
                                </button>
                                <button
                                    onClick={() => setSelectedTab("listed-jobs")}
                                    className={`pb-3 text-xs font-bold transition-all relative select-none leading-none border-b-2 ${
                                        selectedTab === "listed-jobs"
                                            ? "border-[#b68512] text-slate-800"
                                            : "border-transparent text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    Listed Jobs
                                </button>
                            </div>

                            {/* View all text link */}
                            <Link href="#" className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-700 select-none transition-all">
                                <span>View All</span>
                                <ArrowUpRight size={13} />
                            </Link>
                        </div>

                        {/* List display */}
                        {selectedTab === "new-users" ? (
                            <div className="overflow-x-auto select-none">
                                <table className="w-full text-left border-collapse select-none">
                                    <thead>
                                        <tr className="border-b border-slate-50 select-none">
                                            <th className="py-3 px-2 w-10">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                />
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                User
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Email Address
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                User ID
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Date Joined
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                KYC Status
                                            </th>
                                            <th className="py-3 px-2 w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {usersList.map((user, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                                                <td className="py-3 px-2 select-none">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                    />
                                                </td>
                                                <td className="py-3 px-2 flex items-center gap-3 select-none">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs border border-slate-200">
                                                        {user.name.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                    <span className="font-semibold text-xs text-slate-800 leading-tight">
                                                        {user.name}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-xs text-slate-500 font-medium select-none">
                                                    {user.email}
                                                </td>
                                                <td className="py-3 px-2 text-xs text-slate-500 font-semibold select-none">
                                                    {user.id}
                                                </td>
                                                <td className="py-3 px-2 text-xs text-slate-400 font-medium select-none">
                                                    {user.joined}
                                                </td>
                                                <td className="py-3 px-2 select-none">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                            user.status === "VERIFIED"
                                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                                : user.status === "PENDING"
                                                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                                                : "bg-red-50 text-red-600 border border-red-100"
                                                        }`}
                                                    >
                                                        {user.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 select-none text-slate-400 hover:text-slate-600">
                                                    <MoreHorizontal size={16} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="overflow-x-auto select-none">
                                <table className="w-full text-left border-collapse select-none">
                                    <thead>
                                        <tr className="border-b border-slate-50 select-none">
                                            <th className="py-3 px-2 w-10">
                                                <input
                                                    type="checkbox"
                                                    className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                />
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Users
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Job Title
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Type
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Date Listed
                                            </th>
                                            <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                Job Status
                                            </th>
                                            <th className="py-3 px-2 w-8"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {jobsList.map((job, idx) => (
                                            <tr key={idx} className="hover:bg-slate-50/50 cursor-pointer transition-colors select-none">
                                                <td className="py-3 px-2 select-none">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4 rounded border-slate-200 focus:ring-amber-500 text-amber-600 bg-white"
                                                    />
                                                </td>
                                                <td className="py-3 px-2 flex items-center gap-3 select-none">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 text-xs border border-slate-200">
                                                        {job.user.split(" ").map(n => n[0]).join("")}
                                                    </div>
                                                    <span className="font-semibold text-xs text-slate-800 leading-tight">
                                                        {job.user}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 text-xs text-slate-500 font-medium select-none max-w-[200px] truncate">
                                                    {job.title}
                                                </td>
                                                <td className="py-3 px-2 text-xs text-slate-500 font-semibold select-none">
                                                    {job.type}
                                                </td>
                                                <td className="py-3 px-2 text-xs text-slate-400 font-medium select-none">
                                                    {job.listed}
                                                </td>
                                                <td className="py-3 px-2 select-none">
                                                    <span
                                                        className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                            job.status === "COMPLETED"
                                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                                : job.status === "IN PROGRESS"
                                                                ? "bg-amber-50 text-amber-600 border border-amber-100"
                                                                : "bg-red-50 text-red-600 border border-red-100"
                                                        }`}
                                                    >
                                                        {job.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-2 select-none text-slate-400 hover:text-slate-600">
                                                    <MoreHorizontal size={16} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
