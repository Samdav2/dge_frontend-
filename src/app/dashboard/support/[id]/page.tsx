"use client";

import { useState, useRef, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Send, ArrowLeft, Loader2 } from "lucide-react";
import { SupportTicket, SupportTicketReply, statusToUI, priorityToUI } from "@/features/support/types";
import { getTicket, getTicketReplies, createReply } from "@/features/support/actions";
import { toast } from "sonner";
import Link from "next/link";

export default function TicketDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const ticketId = params.id as string;

    const [ticket, setTicket] = useState<SupportTicket | null>(null);
    const [replies, setReplies] = useState<SupportTicketReply[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSending, setIsSending] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Load ticket and replies
    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            try {
                const [ticketResult, repliesResult] = await Promise.all([
                    getTicket(ticketId),
                    getTicketReplies(ticketId)
                ]);

                if (ticketResult.success && ticketResult.data) {
                    setTicket(ticketResult.data);
                } else {
                    toast.error(ticketResult.error || "Failed to load ticket");
                    router.push("/dashboard/support");
                    return;
                }

                if (repliesResult.success && repliesResult.data) {
                    setReplies(repliesResult.data);
                }
            } catch (error) {
                console.error("Failed to load ticket:", error);
                toast.error("Failed to load ticket");
            } finally {
                setIsLoading(false);
            }
        }

        loadData();
    }, [ticketId, router]);

    useEffect(() => {
        scrollToBottom();
    }, [replies]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;

        setIsSending(true);
        try {
            const result = await createReply(ticketId, newMessage.trim());
            if (result.success && result.data) {
                setReplies([...replies, result.data]);
                setNewMessage("");
                toast.success("Reply sent");
            } else {
                toast.error(result.error || "Failed to send reply");
            }
        } catch (error) {
            console.error("Failed to send reply:", error);
            toast.error("Failed to send reply");
        } finally {
            setIsSending(false);
        }
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    if (isLoading) {
        return (
            <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl border border-gray-100 items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#C69C2E] animate-spin" />
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl border border-gray-100 items-center justify-center">
                <p className="text-gray-500">Ticket not found</p>
                <Link href="/dashboard/support">
                    <Button className="mt-4">Back to Support</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)] bg-white rounded-xl border border-gray-100 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                    <Link href="/dashboard/support">
                        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700">
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                    </Link>
                    <div className="w-10 h-10 rounded-full bg-[#C69C2E] flex items-center justify-center">
                        <span className="text-white font-bold text-lg">S</span>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">Support Team</h3>
                        <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span className="text-xs text-green-500 font-medium">Online</span>
                        </div>
                    </div>
                </div>

                {/* Ticket Info */}
                <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{ticket.subject}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${ticket.status === 'open' ? 'bg-orange-50 text-orange-500' :
                                ticket.status === 'in_progress' ? 'bg-blue-50 text-blue-500' :
                                    ticket.status === 'resolved' ? 'bg-green-50 text-green-500' :
                                        'bg-gray-100 text-gray-500'
                            }`}>
                            {statusToUI(ticket.status)}
                        </span>
                    </div>
                    <p className="text-xs text-gray-500">
                        Created: {formatDate(ticket.created_at)} • Priority: {priorityToUI(ticket.priority)}
                    </p>
                </div>
            </div>

            {/* Initial Ticket Description */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-white">
                {/* Original Ticket Message */}
                <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                        <span className="text-gray-500 text-xs font-bold">U</span>
                    </div>
                    <div className="flex flex-col max-w-[70%] items-start">
                        <div className="p-4 rounded-2xl text-sm bg-gray-100 text-gray-900 rounded-tl-none">
                            <p className="font-medium mb-1">Original Ticket:</p>
                            <p>{ticket.description}</p>
                        </div>
                        <span className="text-xs text-gray-400 mt-1">{formatTime(ticket.created_at)}</span>
                    </div>
                </div>

                {/* Replies */}
                {replies.map((reply) => {
                    const isAdmin = !!reply.author_team_user_id;
                    return (
                        <div
                            key={reply.id}
                            className={`flex gap-3 ${isAdmin ? '' : 'flex-row-reverse'}`}
                        >
                            <div className="flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                                    <span className="text-gray-500 text-xs font-bold">
                                        {isAdmin ? 'A' : 'U'}
                                    </span>
                                </div>
                            </div>

                            <div className={`flex flex-col max-w-[70%] ${isAdmin ? 'items-start' : 'items-end'}`}>
                                <div className={`p-4 rounded-2xl text-sm ${isAdmin
                                    ? 'bg-gray-100 text-gray-900 rounded-tl-none'
                                    : 'bg-gray-50 text-gray-900 rounded-tr-none'
                                    }`}>
                                    <p>{reply.message}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                    {!isAdmin && <span className="text-green-500 text-xs">✓✓</span>}
                                    <span className="text-xs text-gray-400">{formatTime(reply.created_at)}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {replies.length === 0 && (
                    <div className="text-center text-gray-400 text-sm py-8">
                        No replies yet. Send a message to start the conversation.
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 bg-white">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <Button type="button" variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
                        <Paperclip className="w-5 h-5" />
                    </Button>
                    <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message here.."
                        className="flex-1 border-none bg-gray-50 focus-visible:ring-0 focus-visible:ring-offset-0"
                        disabled={isSending}
                    />
                    <Button
                        type="submit"
                        className="bg-[#C69C2E] hover:bg-[#B58B25] text-white"
                        disabled={!newMessage.trim() || isSending}
                    >
                        {isSending ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <>
                                <Send className="w-4 h-4 mr-2" />
                                Send
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}
