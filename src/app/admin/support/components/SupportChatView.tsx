"use client";
import { useState, useEffect, useRef } from "react";
import { Paperclip, Check, Loader2, Send } from "lucide-react";
import { getTicketReplies, createReply } from "@/features/support/actions";
import { SupportTicketReply } from "@/features/support/types";
import { toast } from "sonner";

interface SupportChatViewProps {
    item: any; // This is the TicketItem from AllTicketsTab
    onBack: () => void;
}

export default function SupportChatView({ item, onBack }: SupportChatViewProps) {
    const [msg, setMsg] = useState<string>("");
    const [replies, setReplies] = useState<SupportTicketReply[]>([]);
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [ticketStatus, setTicketStatus] = useState<string>(item.rawTicket.status);
    const scrollRef = useRef<HTMLDivElement>(null);

    const ticketId = item.rawTicket.id;

    useEffect(() => {
        fetchReplies();
    }, [ticketId]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [replies]);

    const fetchReplies = async () => {
        setLoading(true);
        const result = await getTicketReplies(ticketId);
        if (result.success && result.data) {
            setReplies(result.data);
        } else {
            toast.error(result.error || "Failed to load replies");
        }
        setLoading(false);
    };

    const handleSend = async () => {
        if (!msg.trim() || sending) return;

        setSending(true);
        const result = await createReply(ticketId, msg);
        if (result.success && result.data) {
            setReplies([...replies, result.data]);
            setMsg("");
        } else {
            toast.error(result.error || "Failed to send message");
        }
        setSending(false);
    };

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            {/* Back button */}
            <button
                onClick={onBack}
                className="px-3 py-1 bg-white border border-slate-100 rounded-xl font-bold text-xs text-slate-400 hover:text-slate-600 select-none shadow-sm transition-all flex items-center gap-1 leading-none mb-2 w-fit"
            >
                ← Back to Tickets
            </button>

            {/* Chat Area Card */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex flex-col h-[640px] select-none">
                {/* Chat Top Header strip */}
                <div className="flex items-center justify-between border-b border-slate-50 pb-4 shrink-0 select-none leading-none">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-50 border border-amber-100 rounded-xl flex items-center justify-center text-amber-500 font-bold text-base select-none uppercase">
                            {item.user.slice(0, 2)}
                        </div>
                        <div className="flex flex-col select-none leading-tight">
                            <span className="font-bold text-xs text-slate-800 select-none">
                                {item.user}
                            </span>
                            <span className="text-[10px] text-slate-400 font-bold select-none leading-none mt-1">
                                {item.id}
                            </span>
                        </div>
                    </div>

                    {/* Status Update Dropdown */}
                    <div className="flex items-center gap-2">
                        <select 
                            value={ticketStatus}
                            onChange={async (e) => {
                                const newStatus = e.target.value;
                                setTicketStatus(newStatus);
                                const { updateTicket } = await import("@/features/support/actions");
                                const res = await updateTicket(ticketId, { status: newStatus as any });
                                if (res.success) {
                                    toast.success(`Status updated to ${newStatus}`);
                                } else {
                                    setTicketStatus(item.rawTicket.status); // Rollback
                                    toast.error(res.error || "Failed to update status");
                                }
                            }}
                            className="bg-slate-50 border border-slate-100 rounded-lg px-2 py-1.5 text-[10px] font-bold text-slate-600 outline-none focus:border-amber-500/50 transition-all cursor-pointer"
                        >
                            <option value="open">Pending (Open)</option>
                            <option value="in_progress">In Progress</option>
                            <option value="resolved">Resolved</option>
                            <option value="closed">Closed</option>
                        </select>
                        <div className={`w-2 h-2 rounded-full ${
                            ticketStatus === 'open' ? 'bg-amber-400' :
                            ticketStatus === 'in_progress' ? 'bg-blue-400' :
                            ticketStatus === 'resolved' ? 'bg-emerald-400' : 'bg-slate-400'
                        }`} />
                    </div>
                </div>

                {/* Messages pane with scrolling */}
                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto py-5 space-y-6 px-1 select-none flex flex-col"
                >
                    {/* Ticket Description as the first message */}
                    <div className="flex flex-col max-w-[70%] select-none gap-2 self-start">
                        <div className="p-3 bg-amber-50 border border-amber-100/50 rounded-2xl font-medium text-xs text-slate-700 leading-relaxed shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
                            <p className="font-bold mb-1 text-amber-800 underline uppercase text-[10px] tracking-wider">Description</p>
                            {item.rawTicket.description}
                        </div>
                        <span className="text-[9px] text-slate-300 font-semibold self-start leading-none px-1">
                            {new Date(item.rawTicket.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>

                    {loading ? (
                        <div className="flex-1 flex items-center justify-center">
                            <Loader2 className="w-6 h-6 text-slate-200 animate-spin" />
                        </div>
                    ) : replies.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center flex-col gap-2">
                            <p className="text-slate-300 text-xs font-medium italic">No replies yet</p>
                        </div>
                    ) : (
                        replies.map((reply) => {
                            // In the admin view, any reply with author_admin_id is from the support team/admin
                            const isMe = !!reply.author_admin_id;
                            
                            return (
                                <div 
                                    key={reply.id}
                                    className={`flex flex-col max-w-[70%] select-none gap-2 ${isMe ? 'self-end items-end' : 'self-start'}`}
                                >
                                    <span className={`p-3 rounded-2xl font-medium text-xs text-slate-700 leading-relaxed shadow-[0_2px_12px_rgba(0,0,0,0.01)] border ${
                                        isMe ? 'bg-[#b68512]/5 border-[#b68512]/10 text-slate-800' : 'bg-slate-50 border-slate-100/50'
                                    }`}>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`text-[9px] font-bold uppercase tracking-wider ${isMe ? 'text-amber-700' : 'text-slate-400'}`}>
                                                {reply.author_name || (isMe ? "Support Team" : "User")}
                                            </span>
                                        </div>
                                        {reply.message}
                                    </span>
                                    <div className="flex items-center gap-1 select-none leading-none px-1">
                                        <span className="text-[9px] text-slate-300 font-semibold select-none leading-none">
                                            {new Date(reply.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                        {isMe && (
                                            <span className="text-emerald-500 flex leading-none">
                                                <Check size={11} className="-mr-1" />
                                                <Check size={11} />
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Bottom Input Area */}
                <div className="border-t border-slate-100 pt-4 flex items-center gap-3 shrink-0 select-none">
                    <button className="p-2 bg-slate-50 hover:bg-slate-100 border border-slate-100/50 rounded-xl text-slate-400 hover:text-slate-600 transition-colors select-none">
                        <Paperclip size={18} />
                    </button>
                    <input
                        type="text"
                        value={msg}
                        onChange={(e) => setMsg(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message here..."
                        disabled={sending}
                        className="flex-1 h-11 bg-white border border-slate-100 rounded-xl px-4 text-xs font-semibold text-slate-700 placeholder:text-slate-300 focus:border-amber-500/50 focus:ring-4 focus:ring-amber-50 transition-all outline-none disabled:opacity-50"
                    />
                    <button 
                        onClick={handleSend}
                        disabled={sending || !msg.trim()}
                        className="px-5 h-11 bg-[#b68512] hover:bg-[#a17410] text-white rounded-xl font-bold text-[11px] select-none hover:scale-[1.01] transition-all leading-none shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
                    >
                        {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send size={14} />}
                        <span>Send message</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
