"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, X } from "lucide-react";

export default function SecurityView() {
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);
    const [emailAlerts, setEmailAlerts] = useState(false);
    const [loginNotifs, setLoginNotifs] = useState(true);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showOldPass, setShowOldPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none">
            <div className="flex flex-col select-none leading-none">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">Sign In & Security</h1>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-none select-none">
                    These details are used to sign-in and access your account
                </p>
            </div>

            {/* White card info box */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-6 select-none max-w-4xl">
                {/* Option 1: Update existing Password */}
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

                {/* Option 2: Email Security Alerts */}
                <div className="flex items-center justify-between py-4 select-none border-b border-slate-50">
                    <div className="flex flex-col select-none leading-tight">
                        <h3 className="text-sm font-bold text-slate-800 select-none">Email Security Alerts</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                            Get notified of security events
                        </p>
                    </div>
                    <button
                        onClick={() => setEmailAlerts(!emailAlerts)}
                        className={`w-11 h-6 rounded-full flex items-center transition-all p-0.5 select-none ${
                            emailAlerts ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                    >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all select-none ${
                            emailAlerts ? "translate-x-5" : "translate-x-0"
                        }`}></div>
                    </button>
                </div>

                {/* Option 3: Login notifications */}
                <div className="flex items-center justify-between py-4 select-none">
                    <div className="flex flex-col select-none leading-tight">
                        <h3 className="text-sm font-bold text-slate-800 select-none">Login Notifications</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                            Get notified of new logins
                        </p>
                    </div>
                    <button
                        onClick={() => setLoginNotifs(!loginNotifs)}
                        className={`w-11 h-6 rounded-full flex items-center transition-all p-0.5 select-none ${
                            loginNotifs ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                    >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all select-none ${
                            loginNotifs ? "translate-x-5" : "translate-x-0"
                        }`}></div>
                    </button>
                </div>
            </div>

            {/* Update Password Drawer Modal */}
            {passwordModalOpen && (
                <div className="fixed inset-0 z-50 flex justify-end select-none">
                    <div
                        onClick={() => setPasswordModalOpen(false)}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-all"
                    ></div>

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

                            <div className="pt-2 select-none">
                                <div className="h-1 bg-amber-500 rounded-full w-2/3 mb-1"></div>
                                <span className="text-[10px] text-amber-500 font-medium select-none">
                                    Password Strength: Good (Include A Special Character)
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-6 select-none">
                            <button
                                onClick={() => setPasswordModalOpen(false)}
                                className="flex-1 border border-slate-200 hover:bg-slate-50 px-4 py-2.5 rounded-full text-slate-600 font-bold text-xs select-none transition-all"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert("Password successfully updated!");
                                    setPasswordModalOpen(false);
                                    setOldPassword("");
                                    setNewPassword("");
                                    setConfirmPassword("");
                                }}
                                className="flex-1 bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-4 py-2.5 rounded-full text-white font-bold text-xs select-none hover:scale-[1.01] transition-all shadow-sm leading-none"
                            >
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
