"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Monitor, Smartphone, Globe, RefreshCw, Loader2, ChevronDown, AlertCircle } from "lucide-react";

type Session = {
    id: string;
    device: string;
    location: string;
    ip_address: string;
    last_activity: string;
    status: "CURRENT" | "ACTIVE" | "EXPIRED" | "REVOKED";
};

function DeviceIcon({ device }: { device: string }) {
    const d = device.toLowerCase();
    if (d.includes("android") || d.includes("ios") || d.includes("iphone") || d.includes("ipad")) {
        return <Smartphone size={14} className="text-slate-400 shrink-0" />;
    }
    if (d.includes("windows") || d.includes("macos") || d.includes("linux") || d.includes("chrome os")) {
        return <Monitor size={14} className="text-slate-400 shrink-0" />;
    }
    return <Globe size={14} className="text-slate-400 shrink-0" />;
}

function formatDateTime(isoStr: string): string {
    try {
        const d = new Date(isoStr);
        const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" });
        const time = d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false });
        return `${date} • ${time}`;
    } catch {
        return isoStr;
    }
}

function timeAgo(isoStr: string): string {
    try {
        const diff = Math.floor((Date.now() - new Date(isoStr).getTime()) / 1000);
        if (diff < 60) return "Just now";
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    } catch {
        return "";
    }
}

const STATUS_STYLES: Record<string, string> = {
    CURRENT: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    ACTIVE: "bg-blue-50 text-blue-600 border border-blue-100",
    EXPIRED: "bg-slate-50 text-slate-400 border border-slate-100",
    REVOKED: "bg-red-50 text-red-500 border border-red-100",
};

export default function SessionsView() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [statusFilter, setStatusFilter] = useState<string>("ALL");
    const [filterOpen, setFilterOpen] = useState(false);

    const fetchSessions = useCallback(async (isRefresh = false) => {
        if (isRefresh) setRefreshing(true);
        else setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/admin/sessions");
            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.error || `Request failed (${res.status})`);
            }
            const data: Session[] = await res.json();
            setSessions(data);
        } catch (err: any) {
            console.error("Failed to load sessions:", err);
            setError(err.message || "Could not load sessions");
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }, []);

    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    const filtered = statusFilter === "ALL"
        ? sessions
        : sessions.filter((s) => s.status === statusFilter);

    const statusOptions = ["ALL", "CURRENT", "ACTIVE", "EXPIRED", "REVOKED"];

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none">
            {/* Header */}
            <div className="flex flex-col select-none leading-none">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">Active Sessions</h1>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-none">
                    All login sessions associated with your admin account
                </p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 select-none">
                {/* Status filter */}
                <div className="relative">
                    <button
                        onClick={() => setFilterOpen(!filterOpen)}
                        className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[11px] text-slate-500 flex items-center gap-1 select-none shadow-sm hover:border-slate-200 transition-all"
                    >
                        {statusFilter === "ALL" ? "All Statuses" : statusFilter}
                        <ChevronDown size={12} className={`transition-transform ${filterOpen ? "rotate-180" : ""}`} />
                    </button>
                    {filterOpen && (
                        <div className="absolute top-full left-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-lg z-10 py-1 min-w-[130px]">
                            {statusOptions.map((opt) => (
                                <button
                                    key={opt}
                                    onClick={() => { setStatusFilter(opt); setFilterOpen(false); }}
                                    className={`w-full text-left px-4 py-2 text-[11px] font-semibold transition-colors hover:bg-slate-50 ${
                                        statusFilter === opt ? "text-amber-600" : "text-slate-500"
                                    }`}
                                >
                                    {opt === "ALL" ? "All Statuses" : opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Refresh */}
                <button
                    onClick={() => fetchSessions(true)}
                    disabled={refreshing}
                    className="px-3.5 py-1.5 bg-white border border-slate-100 rounded-xl font-bold text-[11px] text-slate-500 flex items-center gap-1.5 select-none shadow-sm hover:border-slate-200 transition-all disabled:opacity-50"
                >
                    <RefreshCw size={11} className={refreshing ? "animate-spin" : ""} />
                    Refresh
                </button>

                {/* Count badge */}
                {!loading && !error && (
                    <span className="text-[10px] text-slate-400 font-medium ml-auto">
                        {filtered.length} session{filtered.length !== 1 ? "s" : ""}
                    </span>
                )}
            </div>

            {/* Table */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] overflow-x-auto select-none">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-300 gap-3">
                        <Loader2 size={28} className="animate-spin" />
                        <span className="text-xs text-slate-400 font-medium">Loading sessions…</span>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3">
                        <AlertCircle size={28} className="text-red-300" />
                        <p className="text-xs text-slate-400 font-medium text-center max-w-xs">{error}</p>
                        <button
                            onClick={() => fetchSessions()}
                            className="mt-1 px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-xs font-bold text-slate-500 hover:bg-slate-100 transition-all"
                        >
                            Try again
                        </button>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-2">
                        <Monitor size={28} className="text-slate-200" />
                        <p className="text-xs text-slate-400 font-medium">
                            {statusFilter === "ALL" ? "No sessions found" : `No ${statusFilter.toLowerCase()} sessions`}
                        </p>
                    </div>
                ) : (
                    <table className="w-full text-left border-collapse select-none">
                        <thead>
                            <tr className="border-b border-slate-50 select-none">
                                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Device
                                </th>
                                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Location
                                </th>
                                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    IP Address
                                </th>
                                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Last Activity
                                </th>
                                <th className="py-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 select-none">
                            {filtered.map((session, idx) => (
                                <tr
                                    key={session.id ?? idx}
                                    className="hover:bg-slate-50/50 transition-colors select-none"
                                >
                                    {/* Device */}
                                    <td className="py-4 px-3 select-none">
                                        <div className="flex items-center gap-2">
                                            <DeviceIcon device={session.device} />
                                            <span className="text-xs font-bold text-slate-800 leading-none">
                                                {session.device || "Unknown Device"}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Location */}
                                    <td className="py-4 px-3 text-xs text-blue-500 font-medium select-none leading-none">
                                        {session.location || "Unknown Location"}
                                    </td>

                                    {/* IP */}
                                    <td className="py-4 px-3 text-xs text-slate-500 font-mono font-medium select-none leading-none">
                                        {session.ip_address || "—"}
                                    </td>

                                    {/* Last Activity */}
                                    <td className="py-4 px-3 select-none">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-xs text-slate-500 font-medium leading-none">
                                                {formatDateTime(session.last_activity)}
                                            </span>
                                            <span className="text-[10px] text-slate-300 font-medium">
                                                {timeAgo(session.last_activity)}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="py-4 px-3 select-none">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold text-[9px] select-none ${
                                                STATUS_STYLES[session.status] ?? STATUS_STYLES.EXPIRED
                                            }`}
                                        >
                                            {session.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
