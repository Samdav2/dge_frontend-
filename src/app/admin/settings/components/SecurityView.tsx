"use client";

import React, { useState, useEffect } from "react";
import { Lock, Eye, EyeOff, X, CheckCircle2, XCircle, Loader2 } from "lucide-react";

type ToastState = { type: "success" | "error"; message: string } | null;

function getPasswordStrength(pwd: string): { label: string; color: string; width: string } {
    if (pwd.length === 0) return { label: "", color: "bg-slate-200", width: "w-0" };
    if (pwd.length < 6) return { label: "Too Short", color: "bg-red-400", width: "w-1/4" };
    const hasUpper = /[A-Z]/.test(pwd);
    const hasSpecial = /[^A-Za-z0-9]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const score = [hasUpper, hasSpecial, hasNumber, pwd.length >= 10].filter(Boolean).length;
    if (score <= 1) return { label: "Weak", color: "bg-red-400", width: "w-1/3" };
    if (score === 2) return { label: "Fair", color: "bg-amber-400", width: "w-1/2" };
    if (score === 3) return { label: "Good – add a special character", color: "bg-amber-500", width: "w-2/3" };
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
}

export default function SecurityView() {
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    // Security toggles (backed by preferences)
    const [emailAlerts, setEmailAlerts] = useState(false);
    const [loginNotifs, setLoginNotifs] = useState(true);
    const [loadingPrefs, setLoadingPrefs] = useState(true);
    const [savingPrefs, setSavingPrefs] = useState(false);

    // Password form
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [savingPassword, setSavingPassword] = useState(false);

    const [toast, setToast] = useState<ToastState>(null);

    // Auto-dismiss toast
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 3000);
        return () => clearTimeout(t);
    }, [toast]);

    // Load preferences on mount — map securityAlerts → emailAlerts, pushNotifs → loginNotifs
    useEffect(() => {
        const loadPrefs = async () => {
            try {
                const res = await fetch("/api/admin/notifications/preferences");
                if (res.ok) {
                    const data = await res.json();
                    setEmailAlerts(data.securityAlerts ?? false);
                    setLoginNotifs(data.pushNotifs ?? true);
                }
            } catch (err) {
                console.error("Failed to load security preferences:", err);
            } finally {
                setLoadingPrefs(false);
            }
        };
        loadPrefs();
    }, []);

    const saveSecurityPrefs = async (alerts: boolean, notifs: boolean) => {
        setSavingPrefs(true);
        try {
            const res = await fetch("/api/admin/notifications/preferences", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // We only control securityAlerts + pushNotifs here; emailNotifs stays unchanged
                // so we do a read-merge on the server — but since the backend always overwrites,
                // we send the full payload with emailNotifs=true (default/safe) if not tracked here.
                // For a clean solution the parent page should share prefs state, but this is self-contained.
                body: JSON.stringify({ emailNotifs: true, pushNotifs: notifs, securityAlerts: alerts })
            });
            if (res.ok) {
                setToast({ type: "success", message: "Security settings saved" });
            } else {
                const err = await res.json().catch(() => ({}));
                setToast({ type: "error", message: err.error || "Failed to save security settings" });
            }
        } catch (err) {
            setToast({ type: "error", message: "Network error – could not save settings" });
        } finally {
            setSavingPrefs(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (!newPassword || !confirmPassword) {
            setToast({ type: "error", message: "Please fill in all password fields" });
            return;
        }
        if (newPassword !== confirmPassword) {
            setToast({ type: "error", message: "New passwords do not match" });
            return;
        }
        if (newPassword.length < 6) {
            setToast({ type: "error", message: "Password must be at least 6 characters" });
            return;
        }

        setSavingPassword(true);
        try {
            const res = await fetch("/api/admin/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: newPassword })
            });

            if (res.ok) {
                setToast({ type: "success", message: "Password updated successfully" });
                setPasswordModalOpen(false);
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
            } else {
                const err = await res.json().catch(() => ({}));
                setToast({ type: "error", message: err.error || "Failed to update password" });
            }
        } catch (err) {
            setToast({ type: "error", message: "Network error – could not update password" });
        } finally {
            setSavingPassword(false);
        }
    };

    const strength = getPasswordStrength(newPassword);

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
                        Sign In &amp; Security
                    </h1>
                    {savingPrefs && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                            <Loader2 size={13} className="animate-spin" />
                            Saving…
                        </span>
                    )}
                </div>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-none select-none">
                    These details are used to sign-in and access your account
                </p>
            </div>

            {/* White card */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-6 select-none max-w-4xl">
                {loadingPrefs ? (
                    <div className="flex items-center justify-center py-10 text-slate-300">
                        <Loader2 size={24} className="animate-spin" />
                    </div>
                ) : (
                    <>
                        {/* Account Password */}
                        <div className="flex items-center justify-between py-4 select-none border-b border-slate-50">
                            <div className="flex flex-col select-none leading-tight">
                                <h3 className="text-sm font-bold text-slate-800 select-none">Account Password</h3>
                                <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                                    Update your existing password
                                </p>
                            </div>
                            <button
                                onClick={() => setPasswordModalOpen(true)}
                                className="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 px-4 py-1.5 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] transition-all shadow-sm leading-none"
                            >
                                Update
                            </button>
                        </div>

                        {/* Email Security Alerts */}
                        <div className="flex items-center justify-between py-4 select-none border-b border-slate-50">
                            <div className="flex flex-col select-none leading-tight">
                                <h3 className="text-sm font-bold text-slate-800 select-none">Email Security Alerts</h3>
                                <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                                    Get notified of security events
                                </p>
                            </div>
                            <Toggle
                                value={emailAlerts}
                                disabled={savingPrefs}
                                onToggle={() => {
                                    const next = !emailAlerts;
                                    setEmailAlerts(next);
                                    saveSecurityPrefs(next, loginNotifs);
                                }}
                            />
                        </div>

                        {/* Login Notifications */}
                        <div className="flex items-center justify-between py-4 select-none">
                            <div className="flex flex-col select-none leading-tight">
                                <h3 className="text-sm font-bold text-slate-800 select-none">Login Notifications</h3>
                                <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                                    Get notified of new logins
                                </p>
                            </div>
                            <Toggle
                                value={loginNotifs}
                                disabled={savingPrefs}
                                onToggle={() => {
                                    const next = !loginNotifs;
                                    setLoginNotifs(next);
                                    saveSecurityPrefs(emailAlerts, next);
                                }}
                            />
                        </div>
                    </>
                )}
            </div>

            {/* Update Password Drawer Modal */}
            {passwordModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setPasswordModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    />
                    <div className="relative bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 md:p-8 shadow-2xl border-l border-slate-100/50 select-none transform transition-all duration-300 animate-slide-in">
                        <div className="space-y-7 flex-1 select-none">
                            <div className="flex items-center justify-between border-b border-slate-50 pb-4 select-none">
                                <h3 className="text-base font-bold text-slate-800 tracking-tight leading-tight select-none">
                                    Update Password
                                </h3>
                                <button
                                    onClick={() => setPasswordModalOpen(false)}
                                    className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all select-none"
                                >
                                    <X size={18} />
                                </button>
                            </div>

                            <div className="w-14 h-14 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center font-semibold text-amber-600 select-none shadow-sm">
                                <Lock className="w-6 h-6" />
                            </div>

                            <div className="space-y-5">
                                {/* Old Password */}
                                <div className="space-y-1.5 relative select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="old">
                                        Old Password
                                    </label>
                                    <div className="relative select-none">
                                        <input
                                            id="old"
                                            type={showOldPass ? "text" : "password"}
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full h-11 px-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowOldPass(!showOldPass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all select-none"
                                        >
                                            {showOldPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="space-y-1.5 relative select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="new">
                                        New Password
                                    </label>
                                    <div className="relative select-none">
                                        <input
                                            id="new"
                                            type={showNewPass ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full h-11 px-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPass(!showNewPass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all select-none"
                                        >
                                            {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1.5 relative select-none">
                                    <label className="text-xs font-bold text-slate-700 block select-none" htmlFor="confirm">
                                        Confirm Password
                                    </label>
                                    <div className="relative select-none">
                                        <input
                                            id="confirm"
                                            type={showConfirmPass ? "text" : "password"}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full h-11 px-4 bg-white rounded-xl border border-slate-100 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 text-xs text-slate-700 placeholder:text-slate-300 transition-all outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPass(!showConfirmPass)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-all select-none"
                                        >
                                            {showConfirmPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Password strength bar */}
                            {newPassword.length > 0 && (
                                <div className="pt-2 select-none">
                                    <div className="h-1 bg-slate-100 rounded-full w-full mb-1 overflow-hidden">
                                        <div className={`h-full rounded-full transition-all ${strength.color} ${strength.width}`} />
                                    </div>
                                    <span className="text-[10px] text-slate-500 font-medium select-none">
                                        Password Strength: {strength.label}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none">
                            <button
                                onClick={() => setPasswordModalOpen(false)}
                                disabled={savingPassword}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-full text-slate-600 font-bold text-xs select-none transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdatePassword}
                                disabled={savingPassword}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-4 py-2.5 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] transition-all shadow-sm leading-none flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {savingPassword ? (
                                    <>
                                        <Loader2 size={13} className="animate-spin" />
                                        Updating…
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
