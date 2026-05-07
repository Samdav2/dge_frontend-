"use client";

import React, { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

type ToastState = { type: "success" | "error"; message: string } | null;

export default function NotificationsView() {
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(false);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<ToastState>(null);

    // Auto-dismiss toast after 3 seconds
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(t);
    }, [toast]);

    // Load preferences on mount
    useEffect(() => {
        const loadPrefs = async () => {
            try {
                const res = await fetch("/api/admin/notifications/preferences");
                if (res.ok) {
                    const data = await res.json();
                    setEmailNotifs(data.emailNotifs ?? true);
                    setPushNotifs(data.pushNotifs ?? true);
                    setSecurityAlerts(data.securityAlerts ?? false);
                }
            } catch (error) {
                console.error("Failed to load preferences:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPrefs();
    }, []);

    const savePrefs = async (e: boolean, p: boolean, s: boolean) => {
        setSaving(true);
        try {
            const res = await fetch("/api/admin/notifications/preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ emailNotifs: e, pushNotifs: p, securityAlerts: s })
            });
            if (res.ok) {
                setToast({ type: "success", message: "Preferences saved successfully" });
            } else {
                const err = await res.json().catch(() => ({}));
                setToast({ type: "error", message: err.error || "Failed to save preferences" });
            }
        } catch (error) {
            console.error("Failed to save preferences:", error);
            setToast({ type: "error", message: "Network error – could not save preferences" });
        } finally {
            setSaving(false);
        }
    };

    const Toggle = ({
        value,
        onToggle,
        disabled,
    }: {
        value: boolean;
        onToggle: () => void;
        disabled?: boolean;
    }) => (
        <button
            onClick={onToggle}
            disabled={disabled}
            aria-pressed={value}
            className={`relative w-11 h-6 rounded-full flex items-center transition-all p-0.5 select-none ${
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            } ${value ? "bg-emerald-500" : "bg-slate-200"}`}
        >
            <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all select-none ${
                    value ? "translate-x-5" : "translate-x-0"
                }`}
            />
        </button>
    );

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none">
            {/* Toast */}
            {toast && (
                <div
                    className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg text-sm font-semibold transition-all animate-fade-in ${
                        toast.type === "success"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                >
                    {toast.type === "success" ? (
                        <CheckCircle2 size={16} className="shrink-0" />
                    ) : (
                        <XCircle size={16} className="shrink-0" />
                    )}
                    {toast.message}
                </div>
            )}

            <div className="flex flex-col select-none leading-none">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">
                        Notifications
                    </h1>
                    {saving && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <Loader2 size={13} className="animate-spin" />
                            Saving…
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-none select-none">
                    Manage your notification preferences and alert settings
                </p>
            </div>

            {/* White card box */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-6 select-none max-w-4xl">
                {loading ? (
                    <div className="flex items-center justify-center py-10 text-slate-300">
                        <Loader2 size={24} className="animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Email Notifications */}
                        <div className="flex items-center justify-between py-4 select-none border-b border-slate-50">
                            <div className="flex flex-col select-none leading-tight">
                                <h3 className="text-sm font-bold text-slate-800 select-none">
                                    Email Notifications
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                                    Receive notifications via email
                                </p>
                            </div>
                            <Toggle
                                value={emailNotifs}
                                disabled={saving}
                                onToggle={() => {
                                    const next = !emailNotifs;
                                    setEmailNotifs(next);
                                    savePrefs(next, pushNotifs, securityAlerts);
                                }}
                            />
                        </div>

                        {/* Push Notifications */}
                        <div className="flex items-center justify-between py-4 select-none border-b border-slate-50">
                            <div className="flex flex-col select-none leading-tight">
                                <h3 className="text-sm font-bold text-slate-800 select-none">
                                    Push Notifications
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                                    Receive browser push notifications
                                </p>
                            </div>
                            <Toggle
                                value={pushNotifs}
                                disabled={saving}
                                onToggle={() => {
                                    const next = !pushNotifs;
                                    setPushNotifs(next);
                                    savePrefs(emailNotifs, next, securityAlerts);
                                }}
                            />
                        </div>

                        {/* Security Alerts */}
                        <div className="flex items-center justify-between py-4 select-none">
                            <div className="flex flex-col select-none leading-tight">
                                <h3 className="text-sm font-bold text-slate-800 select-none">
                                    Security Alerts
                                </h3>
                                <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                                    Critical security events
                                </p>
                            </div>
                            <Toggle
                                value={securityAlerts}
                                disabled={saving}
                                onToggle={() => {
                                    const next = !securityAlerts;
                                    setSecurityAlerts(next);
                                    savePrefs(emailNotifs, pushNotifs, next);
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
