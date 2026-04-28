"use client";

import { SupportTicket, TicketPriority, TicketStatus, priorityToUI, statusToUI } from "../types";
import { Eye, Trash2, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TicketListProps {
    tickets: SupportTicket[];
    isLoading?: boolean;
    onDelete?: (ticketId: string) => void;
    isDeleting?: string | null;
}

export function TicketList({ tickets, isLoading = false, onDelete, isDeleting }: TicketListProps) {
    const getPriorityColor = (priority: TicketPriority) => {
        switch (priority) {
            case 'urgent': return 'text-red-600';
            case 'high': return 'text-red-500';
            case 'medium': return 'text-yellow-500';
            case 'low': return 'text-green-500';
            default: return 'text-gray-500';
        }
    };

    const getStatusStyle = (status: TicketStatus) => {
        switch (status) {
            case 'open': return 'bg-orange-50 text-orange-500';
            case 'in_progress': return 'bg-blue-50 text-blue-500';
            case 'resolved': return 'bg-green-50 text-green-500';
            case 'closed': return 'bg-gray-100 text-gray-500';
            default: return 'bg-gray-50 text-gray-500';
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const formatTicketId = (id: string) => {
        // Show first 8 characters of UUID
        return id.substring(0, 8).toUpperCase();
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 p-12 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#C69C2E] animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">All Support Tickets</h3>
                <Button variant="outline" className="flex items-center gap-2 text-gray-500 border-gray-200">
                    <Filter className="w-4 h-4" />
                    Filter by
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Ticket ID</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tickets.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm text-gray-500">#{formatTicketId(ticket.id)}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">{ticket.subject}</td>
                                <td className="px-6 py-4 text-sm text-gray-500">{formatDate(ticket.created_at)}</td>
                                <td className={`px-6 py-4 text-sm font-medium ${getPriorityColor(ticket.priority)}`}>
                                    {priorityToUI(ticket.priority)}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(ticket.status)}`}>
                                        {statusToUI(ticket.status)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Link href={`/dashboard/support/${ticket.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-full">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 bg-gray-100 hover:bg-red-100 text-gray-500 hover:text-red-500 rounded-full"
                                            onClick={() => onDelete?.(ticket.id)}
                                            disabled={isDeleting === ticket.id}
                                        >
                                            {isDeleting === ticket.id ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
