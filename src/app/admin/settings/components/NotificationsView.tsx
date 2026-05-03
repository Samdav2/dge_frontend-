"use client";

import React, { useState } from "react";

export default function NotificationsView() {
    const [emailNotifs, setEmailNotifs] = useState(true);
    const [pushNotifs, setPushNotifs] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(false);

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none">
            <div className="flex flex-col select-none leading-none">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">Notifications</h1>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-none select-none">
                    Manage your notification preferences and alert settings
                </p>
            </div>

            {/* White card box */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-6 select-none max-w-4xl">
                {/* Email Notifications */}
                <div className="flex items-center justify-between py-4 select-none border-b border-slate-50">
                    <div className="flex flex-col select-none leading-tight">
                        <h3 className="text-sm font-bold text-slate-800 select-none">Email Notifications</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                            Receive notifications via email
                        </p>
                    </div>
                    <button
                        onClick={() => setEmailNotifs(!emailNotifs)}
                        className={`w-11 h-6 rounded-full flex items-center transition-all p-0.5 select-none ${
                            emailNotifs ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                    >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all select-none ${
                            emailNotifs ? "translate-x-5" : "translate-x-0"
                        }`}></div>
                    </button>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between py-4 select-none border-b border-slate-50">
                    <div className="flex flex-col select-none leading-tight">
                        <h3 className="text-sm font-bold text-slate-800 select-none">Push Notifications</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                            Receive browser push notifications
                        </p>
                    </div>
                    <button
                        onClick={() => setPushNotifs(!pushNotifs)}
                        className={`w-11 h-6 rounded-full flex items-center transition-all p-0.5 select-none ${
                            pushNotifs ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                    >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all select-none ${
                            pushNotifs ? "translate-x-5" : "translate-x-0"
                        }`}></div>
                    </button>
                </div>

                {/* Security alerts in notifications view */}
                <div className="flex items-center justify-between py-4 select-none">
                    <div className="flex flex-col select-none leading-tight">
                        <h3 className="text-sm font-bold text-slate-800 select-none">Security Alerts</h3>
                        <p className="text-xs text-slate-400 mt-1 font-medium select-none leading-tight">
                            Critical security events
                        </p>
                    </div>
                    <button
                        onClick={() => setSecurityAlerts(!securityAlerts)}
                        className={`w-11 h-6 rounded-full flex items-center transition-all p-0.5 select-none ${
                            securityAlerts ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                    >
                        <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-all select-none ${
                            securityAlerts ? "translate-x-5" : "translate-x-0"
                        }`}></div>
                    </button>
                </div>
            </div>
        </div>
    );
}
