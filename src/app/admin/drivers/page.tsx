"use client";

import { useState, useEffect } from "react";
import AdminSidebar from "../components/AdminSidebar";
import {
    Car,
    ChevronDown,
    MoreHorizontal,
    Mail,
    Edit,
    Search,
    ArrowUpRight,
    Download,
    Eye
} from "lucide-react";

import OverviewTab from "./components/OverviewTab";
import ActiveRidesTab from "./components/ActiveRidesTab";
import PastRidesTab from "./components/PastRidesTab";

type DetailTabType = "Overview" | "Active Rides" | "Past Rides";

interface DriverRideItem {
    id: string;
    driver_id: string;
    name: string;
    passenger: string;
    destination: string;
    servicePrice: string;
    negotiationPrice: string;
    time: string;
    status: string;
}

export default function AdminDriversPage() {
    const [selectedRide, setSelectedRide] = useState<DriverRideItem | null>(null);
    const [detailTab, setDetailTab] = useState<DetailTabType>("Overview");
    const [rides, setRides] = useState<DriverRideItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState<string | null>("started");
    const [summary, setSummary] = useState({ active: 0, completed: 0, cancelled: 0 });
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(50);

    const [activeRowPopup, setActiveRowPopup] = useState<string | null>(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

    const fetchRides = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append("search", search);
            if (statusFilter) params.append("status", statusFilter);
            params.append("page", page.toString());
            params.append("limit", limit.toString());

            const res = await fetch(`/api/admin/drivers?${params.toString()}`);
            const data = await res.json();
            if (data.rides) {
                setRides(data.rides);
                setTotal(data.total);
                setSummary(data.summary || { active: 0, completed: 0, cancelled: 0 });
            }
        } catch (error) {
            console.error("Failed to fetch rides:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRides();
    }, [search, statusFilter, page, limit]);

    const toggleRowPopup = (id: string, event: React.MouseEvent) => {
        event.stopPropagation();
        if (activeRowPopup === id) {
            setActiveRowPopup(null);
        } else {
            const rect = event.currentTarget.getBoundingClientRect();
            setPopupPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX - 140
            });
            setActiveRowPopup(id);
        }
    };

    const handleExportCSV = () => {
        if (rides.length === 0) return;
        
        const headers = ["Driver", "Passenger", "Destination", "Price", "Time", "Status"];
        const rows = rides.map(r => [
            r.name, r.passenger, r.destination, r.servicePrice, r.time, r.status
        ]);
        
        const csvContent = [
            headers.join(","),
            ...rows.map(r => r.map(cell => `"${cell}"`).join(","))
        ].join("\n");
        
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `rides_export_${new Date().toISOString().split("T")[0]}.csv`);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    return (
        <div className="flex h-screen bg-[#fafafa] overflow-hidden select-none">
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full overflow-y-auto bg-[#fafafa] select-none">
                <header className="h-16 pl-16 pr-4 lg:px-8 border-b border-slate-100 bg-white flex items-center justify-between shrink-0 select-none">
                    <div className="flex items-center gap-2 max-w-[50%] xs:max-w-none">
                        <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center text-[#b68512] shrink-0">
                            <Car size={18} />
                        </div>
                        <h1 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight leading-none truncate select-none">
                            Drivers {selectedRide ? `/ ${selectedRide.name}` : ""}
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

                {!selectedRide ? (
                    <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in">
                        <div className="relative w-full max-w-sm select-none">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                            <input
                                type="text"
                                placeholder="Search Drivers, Locations..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full h-10 pl-10 pr-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-3">
                            <button 
                                onClick={handleExportCSV}
                                className="px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-[11px] text-slate-600 hover:bg-slate-50 select-none shadow-sm transition-all flex items-center gap-1"
                            >
                                <Download size={13} className="text-slate-400" /> Export CSV
                            </button>
                        </div>
                    

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 select-none">
                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]" onClick={() => setStatusFilter("started")}>
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">Active Rides</span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800">{summary.active.toLocaleString()}</span>
                                    <span className="text-[11px] text-emerald-600 font-bold leading-tight mt-2 flex items-center gap-1">↑ Live <span className="text-slate-400 font-medium tracking-normal capitalize">Current</span></span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]" onClick={() => setStatusFilter("completed")}>
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">Completed Rides</span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800">{summary.completed.toLocaleString()}</span>
                                    <span className="text-[11px] text-blue-600 font-bold leading-tight mt-2 flex items-center gap-1">Check History</span>
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-[135px] hover:scale-[1.01] transition-all cursor-pointer shadow-[0_4px_24px_rgba(0,0,0,0.01)]" onClick={() => setStatusFilter("cancelled")}>
                                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider leading-tight">Cancelled Rides</span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-2xl font-bold tracking-tight text-slate-800">{summary.cancelled.toLocaleString()}</span>
                                    <span className="text-[11px] text-red-600 font-bold leading-tight mt-2 flex items-center gap-1">Review Issues</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 border-b border-slate-100 select-none w-full">
                            {[
                                { id: "started", label: "Active Rides", count: summary.active },
                                { id: "completed", label: "Completed Rides", count: summary.completed },
                                { id: "cancelled", label: "Cancelled Rides", count: summary.cancelled }
                            ].map(tab => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setStatusFilter(tab.id)}
                                    className={`px-3.5 pb-2 text-xs font-bold transition-all relative leading-none border-b-2 ${statusFilter === tab.id ? "border-[#b68512] text-slate-800" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                                >
                                    {tab.label} ({tab.count})
                                </button>
                            ))}
                            <button 
                                onClick={() => setStatusFilter(null)}
                                className={`px-3.5 pb-2 text-xs font-bold transition-all relative leading-none border-b-2 ${statusFilter === null ? "border-[#b68512] text-slate-800" : "border-transparent text-slate-400 hover:text-slate-600"}`}
                            >
                                All Rides
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] overflow-x-auto relative min-h-[400px]">
                            {loading ? (
                                <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                                    <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : null}

                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-50">
                                        <th className="py-3 px-2 w-10">
                                            <input
                                                type="checkbox"
                                                checked={selectedRows.length === rides.length && rides.length > 0}
                                                onChange={() => {
                                                    if (selectedRows.length === rides.length) setSelectedRows([]);
                                                    else setSelectedRows(rides.map(r => r.id));
                                                }}
                                                className="w-4 h-4 rounded border-slate-200 text-amber-600 focus:ring-amber-500"
                                            />
                                        </th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">DRIVER</th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">PASSENGER</th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">DESTINATION</th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">PRICE</th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">TIME</th>
                                        <th className="py-3 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">STATUS</th>
                                        <th className="py-3 px-2 w-8"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {rides.length > 0 ? rides.map((item) => (
                                        <tr
                                            key={item.id}
                                            onClick={() => setSelectedRide(item)}
                                            className="hover:bg-slate-50/50 cursor-pointer transition-colors"
                                        >
                                            <td className="py-4 px-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedRows.includes(item.id)}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        if (selectedRows.includes(item.id)) {
                                                            setSelectedRows(selectedRows.filter(id => id !== item.id));
                                                        } else {
                                                            setSelectedRows([...selectedRows, item.id]);
                                                        }
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="w-4 h-4 rounded border-slate-200 text-amber-600 focus:ring-amber-500"
                                                />
                                            </td>
                                            <td className="py-4 px-2 text-xs font-semibold text-slate-800">{item.name}</td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium">{item.passenger}</td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium max-w-[180px] truncate">{item.destination}</td>
                                            <td className="py-4 px-2 text-xs text-slate-500 font-semibold">{item.servicePrice}</td>
                                            <td className="py-4 px-2 text-xs text-slate-400 font-medium">{item.time}</td>
                                            <td className="py-4 px-2">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] ${
                                                    item.status === "STARTED" ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                    : item.status === "COMPLETED" ? "bg-blue-50 text-blue-600 border border-blue-100"
                                                    : "bg-red-50 text-red-600 border border-red-100"
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-2 text-slate-400 hover:text-slate-600 relative">
                                                <button
                                                    onClick={(e) => toggleRowPopup(item.id, e)}
                                                    className="focus:outline-none p-1 rounded-md hover:bg-slate-100"
                                                >
                                                    <MoreHorizontal size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={8} className="py-12 text-center text-slate-400 text-xs font-medium italic">No rides found matching filters.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                            {/* Fixed Positioned Popups to avoid clipping */}
                            {activeRowPopup !== null && (
                                <div 
                                    className="fixed bg-white border border-slate-100 shadow-xl rounded-xl p-1 z-[100] flex flex-col select-none animate-fade-in w-36"
                                    style={{ 
                                        top: `${popupPosition.top - window.scrollY}px`, 
                                        left: `${popupPosition.left - window.scrollX}px` 
                                    }}
                                >
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const ride = rides.find(r => r.id === activeRowPopup);
                                            if (ride) setSelectedRide(ride);
                                            setActiveRowPopup(null);
                                        }}
                                        className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left"
                                    >
                                        <Eye size={13} className="text-slate-400" />
                                        <span>View Details</span>
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveRowPopup(null);
                                        }}
                                        className="flex items-center gap-2.5 px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-lg text-xs font-semibold select-none transition-all text-left border-t border-slate-50 mt-1 pt-2"
                                    >
                                        <Edit size={13} className="text-slate-400" />
                                        <span>Edit Driver</span>
                                    </button>
                                </div>
                            )}

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-2">
                                    <select 
                                        className="px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl font-bold text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-50"
                                        value={limit}
                                        onChange={(e) => setLimit(parseInt(e.target.value))}
                                    >
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                    <span className="text-xs font-semibold text-slate-400">Rows Per Page</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    <span className="text-xs font-semibold text-slate-400">Page {page} of {Math.ceil(total / limit) || 1}</span>
                                    <div className="flex items-center gap-2">
                                        <button 
                                            disabled={page === 1}
                                            onClick={() => setPage(prev => Math.max(1, prev - 1))}
                                            className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <ChevronDown size={14} className="rotate-90" />
                                        </button>
                                        <button 
                                            disabled={page >= Math.ceil(total / limit)}
                                            onClick={() => setPage(prev => prev + 1)}
                                            className="p-1 rounded-full border border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <ChevronDown size={14} className="-rotate-90" />
                                        </button>
                                    </div>
                                    <span className="text-xs font-bold text-slate-600">Showing {rides.length} of {total}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="p-8 space-y-6 flex-1 overflow-y-auto select-none max-w-[1400px] mx-auto w-full animate-fade-in relative">
                        <button
                            onClick={() => setSelectedRide(null)}
                            className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 shadow-sm transition-all flex items-center gap-1 leading-none mb-2"
                        >
                            ← Back to List
                        </button>

                        <DriverDetailHeader driverId={selectedRide.driver_id} initialName={selectedRide.name} />

                        <div className="flex items-center gap-2 border-b border-slate-100 select-none w-full overflow-x-auto whitespace-nowrap flex-nowrap pb-0.5">
                            {(["Overview", "Active Rides", "Past Rides"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setDetailTab(tab)}
                                    className={`px-4 pb-3.5 text-xs font-bold transition-all relative leading-none border-b-2 shrink-0 ${
                                        detailTab === tab ? "border-[#b68512] text-slate-800" : "border-transparent text-slate-400 hover:text-slate-600"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        {detailTab === "Overview" && <OverviewTab driverId={selectedRide.driver_id} />}
                        {detailTab === "Active Rides" && <ActiveRidesTab driverId={selectedRide.driver_id} />}
                        {detailTab === "Past Rides" && <PastRidesTab driverId={selectedRide.driver_id} />}
                    </div>
                )}
            </main>
        </div>
    );
}

function DriverDetailHeader({ driverId, initialName }: { driverId: string; initialName: string }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await fetch(`/api/admin/drivers/${driverId}`);
                const d = await res.json();
                setData(d);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [driverId]);

    const handleStatusUpdate = async (status: string) => {
        if (!confirm(`Are you sure you want to ${status} this driver?`)) return;
        try {
            const res = await fetch(`/api/admin/drivers/${driverId}`, {
                method: "POST",
                body: JSON.stringify({ status }),
            });
            if (res.ok) {
                const updated = await res.json();
                setData((prev: any) => ({ ...prev, status: updated.status.toUpperCase() }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div className="h-28 bg-white rounded-2xl animate-pulse"></div>;

    const name = data?.name || initialName;

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
            <div className="flex items-center gap-5">
                <div className="w-20 h-20 bg-slate-50 border-4 border-amber-100 rounded-full flex items-center justify-center font-bold text-slate-700 text-xl overflow-hidden shadow-md">
                    {name.split(" ").map((n: string) => n[0]).join("")}
                </div>
                <div className="flex flex-col leading-tight">
                    <span className="text-xs font-semibold text-blue-500 tracking-tight leading-none mb-1.5 uppercase">Driver Profile</span>
                    <span className="text-lg font-bold text-slate-800 tracking-tight leading-none mb-1.5">{name}</span>
                    <div className="flex items-center gap-2">
                        <span className="text-[11px] text-slate-400 font-semibold leading-none">
                            {data?.rank || "STARTER"} Rank
                        </span>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] ${
                            data?.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                            : "bg-red-50 text-red-600 border border-red-100"
                        }`}>
                            {data?.status}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-100 rounded-xl font-bold text-[11px] text-slate-600 hover:text-slate-800 shadow-sm transition-all flex items-center gap-1.5">
                    <Mail size={15} /> <span>Send Email</span>
                </button>
                {data?.status === "ACTIVE" ? (
                    <button 
                        onClick={() => handleStatusUpdate("suspended")}
                        className="px-4 py-2 bg-[#ef4444] hover:bg-red-600 active:bg-red-700 rounded-xl font-bold text-[11px] text-white hover:scale-[1.01] shadow-sm transition-all"
                    >
                        Suspend Driver
                    </button>
                ) : (
                    <button 
                        onClick={() => handleStatusUpdate("active")}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 rounded-xl font-bold text-[11px] text-white hover:scale-[1.01] shadow-sm transition-all"
                    >
                        Activate Driver
                    </button>
                )}
            </div>
        </div>
    );
}
