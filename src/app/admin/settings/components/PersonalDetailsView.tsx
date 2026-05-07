"use client";

import React, { useEffect, useState } from "react";

export default function PersonalDetailsView() {
    const [profile, setProfile] = useState<any>({
        name: "Admin User",
        email: "admin@gmail.com",
        phone: "+2348000000000",
        role: "Super Admin",
        status: "ACTIVE"
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const res = await fetch("/api/admin/profile");
                if (res.ok) {
                    const data = await res.json();
                    setProfile(data);
                }
            } catch (error) {
                console.error("Failed to load profile:", error);
            }
        };
        loadProfile();
    }, []);

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none">
            <div className="flex flex-col select-none leading-none">
                <h1 className="text-xl font-bold text-slate-800 tracking-tight leading-none">Personal Details</h1>
                <p className="text-xs text-slate-400 font-medium mt-1 leading-none select-none">
                    Your name, contact details and other relevant information
                </p>
            </div>

            {/* White info container box */}
            <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-7 select-none max-w-4xl">
                {/* Profile Picture Row */}
                <div className="flex items-center gap-6 select-none border-b border-slate-50 pb-6">
                    <div className="w-20 h-20 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center font-bold text-2xl text-amber-600 select-none overflow-hidden shrink-0">
                        {profile.name?.substring(0, 2).toUpperCase() || "A"}
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <h3 className="text-sm font-bold text-slate-800 select-none">Display Picture</h3>
                        <p className="text-xs text-slate-400 mt-1 select-none font-medium leading-tight">
                            Upload a photo for your admin profile.
                        </p>
                        <p className="text-[10px] text-slate-400 font-semibold select-none leading-none">
                            Recommended: JPG, PNG or GIF. Max size 2MB
                        </p>
                    </div>
                </div>

                {/* Form Static Labels View */}
                <div className="space-y-6 select-none max-w-md">
                    <div className="flex flex-col select-none">
                        <span className="text-xs text-slate-400 font-medium select-none">Full Name</span>
                        <span className="font-bold text-sm text-slate-800 mt-1 select-none leading-tight">
                            {profile.name}
                        </span>
                    </div>

                    <div className="flex flex-col select-none">
                        <span className="text-xs text-slate-400 font-medium select-none">Email Address</span>
                        <span className="font-bold text-sm text-slate-800 mt-1 select-none leading-tight">
                            {profile.email}
                        </span>
                    </div>

                    <div className="flex items-center justify-between select-none">
                        <div className="flex flex-col select-none">
                            <span className="text-xs text-slate-400 font-medium select-none">Role Name</span>
                            <span className="font-bold text-sm text-slate-800 mt-1 select-none leading-tight">
                                {profile.role}
                            </span>
                        </div>
                        <button className="bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-4 py-1.5 rounded-full text-white font-bold text-[10px] select-none transition-all hover:scale-[1.01] shadow-sm">
                            See Permissions
                        </button>
                    </div>

                    <div className="flex items-center justify-between select-none">
                        <div className="flex flex-col select-none">
                            <span className="text-xs text-slate-400 font-medium select-none">Timezone</span>
                            <span className="font-bold text-sm text-slate-800 mt-1 select-none leading-tight">
                                West Africa Standard Time (GMT +1)
                            </span>
                        </div>
                        <button className="bg-[#b68512] hover:bg-[#9d720f] active:bg-[#85610d] px-4 py-1.5 rounded-full text-white font-bold text-[10px] select-none transition-all hover:scale-[1.01] shadow-sm">
                            Change Timezone
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
