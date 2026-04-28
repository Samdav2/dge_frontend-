"use client";

import React from "react";
import { PersonalSettings } from "./PersonalSettings";
import { PortfolioSettings } from "./PortfolioSettings";
import { ChevronRight } from "lucide-react";

export function ProfileLayout() {
    const [activeTab, setActiveTab] = React.useState<'personal' | 'portfolio'>('personal');

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)] flex flex-col relative">
            <div className="flex flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Profile & Settings</h1>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-[#C69C2E]">Profile</span>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-80 space-y-4 lg:sticky lg:top-24 self-start">
                    <button
                        onClick={() => setActiveTab('personal')}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${activeTab === 'personal'
                            ? 'bg-[#F5E6C8] border-[#C69C2E] ring-1 ring-[#C69C2E]'
                            : 'bg-white border-gray-100 hover:border-[#C69C2E]/50'
                            }`}
                    >
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">Personal</h3>
                            <p className="text-xs text-gray-500">Update your profile and contact settings.</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-colors ${activeTab === 'personal' ? 'text-[#C69C2E]' : 'text-gray-400 group-hover:text-[#C69C2E]'
                            }`} />
                    </button>

                    <button
                        onClick={() => setActiveTab('portfolio')}
                        className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${activeTab === 'portfolio'
                            ? 'bg-[#F5E6C8] border-[#C69C2E] ring-1 ring-[#C69C2E]'
                            : 'bg-white border-gray-100 hover:border-[#C69C2E]/50'
                            }`}
                    >
                        <div>
                            <h3 className="text-sm font-bold text-gray-900 mb-1">Portfolio Setup</h3>
                            <p className="text-xs text-gray-500">Update your portfolio and setup your portfolio.</p>
                        </div>
                        <ChevronRight className={`w-4 h-4 transition-colors ${activeTab === 'portfolio' ? 'text-[#C69C2E]' : 'text-gray-400 group-hover:text-[#C69C2E]'
                            }`} />
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-white rounded-2xl border border-gray-100 p-6 lg:p-8">
                    {activeTab === 'personal' ? <PersonalSettings /> : <PortfolioSettings />}
                </div>
            </div>
        </div>
    );
}
