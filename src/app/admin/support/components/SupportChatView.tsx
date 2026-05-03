"use client";

import { useState } from "react";
import { Paperclip, Check } from "lucide-react";

interface SupportChatViewProps {
    item: any;
    onBack: () => void;
}

export default function SupportChatView({ item, onBack }: SupportChatViewProps) {
    const [msg, setMsg] = useState<string>("");

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            {/* Back button */}
            <button
                onClick={onBack}
                className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 select-none shadow-sm transition-all flex items-center gap-1 leading-none mb-2 w-fit"
            >
                ← Back to Tickets
            </button>

            {/* Chat Area Card exactly matching Screenshot 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col h-[640px] select-none">
                {/* Chat Top Header strip exactly as Screenshot 3 */}
                <div className="flex items-center gap-3 select-none leading-none border-b border-slate-50 pb-4 shrink-0">
                    <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-500 font-bold text-base select-none">
                        NC
                    </div>
                    <div className="flex flex-col select-none leading-tight">
                        <span className="font-bold text-xs text-slate-800 select-none">
                            Admin
                        </span>
                        <span className="text-[10px] text-emerald-500 font-bold select-none leading-none mt-1">
                            Online
                        </span>
                    </div>
                </div>

                {/* Messages pane with scrolling */}
                <div className="flex-1 overflow-y-auto py-5 space-y-6 px-1 select-none flex flex-col justify-end">
                    {/* Message 1: Left */}
                    <div className="flex flex-col max-w-[70%] select-none gap-2 self-start">
                        <span className="p-3 bg-slate-50 border border-slate-100/50 rounded-2xl font-medium text-xs text-slate-700 leading-relaxed shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                            Hi! I made new UI-Kit for project, check it late
                        </span>
                        {/* UI Kit Image and Link Exactly like Screenshot 3 */}
                        <div className="bg-slate-50/50 border border-slate-100/50 p-3 rounded-2xl space-y-3.5 select-none w-[280px]">
                            <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-tr from-cyan-400 via-sky-500 to-blue-600 p-4 flex flex-col justify-between text-white font-bold text-sm relative overflow-hidden shadow-md">
                                <div className="absolute right-[-20px] top-[-20px] w-28 h-28 bg-white/10 rounded-full select-none"></div>
                                <span className="text-[10px] bg-white/20 backdrop-blur-md px-2 py-1 rounded w-fit select-none leading-none">
                                    Page 1 of 7
                                </span>
                                <div className="flex flex-col select-none leading-tight">
                                    <span className="text-[11px] opacity-80 leading-none">GaeinCha</span>
                                    <span className="text-sm font-extrabold mt-0.5 leading-tight">
                                        Car sharing service Mobile App
                                    </span>
                                </div>
                            </div>
                            <span className="text-[11px] font-medium text-sky-600 hover:underline select-none break-all cursor-pointer leading-tight">
                                https://dribbble.com/shots/17742253-ui-kit-designjam
                            </span>
                        </div>
                        <span className="text-[9px] text-slate-300 font-semibold self-start leading-none px-1">15:42</span>
                    </div>

                    {/* Message 2: Left */}
                    <div className="flex flex-col max-w-[70%] select-none gap-2 self-start">
                        <span className="p-3 bg-slate-50 border border-slate-100/50 rounded-2xl font-medium text-xs text-slate-700 leading-relaxed shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                            See you at office tomorrow!
                        </span>
                        <span className="text-[9px] text-slate-300 font-semibold self-start leading-none px-1">15:42</span>
                    </div>

                    {/* Message 3: Right (Admin Outgoing) */}
                    <div className="flex flex-col max-w-[70%] select-none gap-2 self-end items-end">
                        <span className="p-3 bg-slate-100/50 border border-slate-200/40 rounded-2xl font-medium text-xs text-slate-700 leading-relaxed shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                            Thank you for work, see you!
                        </span>
                        <div className="flex items-center gap-1 select-none leading-none px-1">
                            <span className="text-[9px] text-slate-300 font-semibold select-none leading-none">15:42</span>
                            <span className="text-emerald-500 flex leading-none">
                                <Check size={11} className="-mr-1" />
                                <Check size={11} />
                            </span>
                        </div>
                    </div>

                    {/* Message 4: Left */}
                    <div className="flex flex-col max-w-[70%] select-none gap-2 self-start">
                        <span className="p-3 bg-slate-50 border border-slate-100/50 rounded-2xl font-medium text-xs text-slate-700 leading-relaxed shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                            Hello! Have you seen my backpack anywhere in office?
                        </span>
                        <span className="text-[9px] text-slate-300 font-semibold self-start leading-none px-1">15:42</span>
                    </div>

                    {/* Message 5: Right (Admin Outgoing) */}
                    <div className="flex flex-col max-w-[70%] select-none gap-2 self-end items-end">
                        <span className="p-3 bg-slate-100/50 border border-slate-200/40 rounded-2xl font-medium text-xs text-slate-700 leading-relaxed shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                            Hi, yes, David have found it, ask our concierge 👀
                        </span>
                        <div className="flex items-center gap-1 select-none leading-none px-1">
                            <span className="text-[9px] text-slate-300 font-semibold select-none leading-none">15:42</span>
                            <span className="text-emerald-500 flex leading-none">
                                <Check size={11} className="-mr-1" />
                                <Check size={11} />
                            </span>
                        </div>
                    </div>
                </div>

                {/* Bottom Input Area exactly like Screenshot 3 */}
                <div className="border-t border-slate-100 pt-4 flex items-center gap-3 shrink-0 select-none">
                    <button className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100/50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors select-none">
                        <Paperclip size={18} />
                    </button>
                    <input
                        type="text"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        placeholder="Type your message here..."
                        className="flex-1 h-11 bg-white border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-700 placeholder:text-slate-300 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 transition-all outline-none"
                    />
                    <button className="px-5 h-11 bg-white border border-slate-100 hover:bg-slate-50/70 text-[#b68512] rounded-xl font-bold text-[11px] select-none hover:scale-[1.01] transition-all leading-none shadow-sm flex items-center justify-center">
                        Send message
                    </button>
                </div>
            </div>
        </div>
    );
}
