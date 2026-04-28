"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Loader2 } from "lucide-react";
import { TicketEmptyState } from "@/features/support/components/TicketEmptyState";
import { TicketList } from "@/features/support/components/TicketList";
import { CreateTicketModal } from "@/features/support/components/CreateTicketModal";
import { SupportTicket, TicketPriority } from "@/features/support/types";
import { getTickets, createTicket, deleteTicket } from "@/features/support/actions";
import { toast } from "sonner";

export default function SupportPage() {
    const [tickets, setTickets] = useState<SupportTicket[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load tickets on mount
    useEffect(() => {
        loadTickets();
    }, []);

    const loadTickets = async () => {
        setIsLoading(true);
        try {
            const result = await getTickets();
            if (result.success && result.data) {
                setTickets(result.data);
            } else {
                toast.error(result.error || "Failed to load tickets");
            }
        } catch (error) {
            console.error("Failed to load tickets:", error);
            toast.error("Failed to load tickets");
        } finally {
            setIsLoading(false);
        }
    };

    const handleCreateTicket = async (data: { subject: string; description: string; priority: TicketPriority }) => {
        setIsCreating(true);
        try {
            const result = await createTicket(data);
            if (result.success && result.data) {
                setTickets([result.data, ...tickets]);
                setIsModalOpen(false);
                toast.success("Ticket created successfully");
            } else {
                toast.error(result.error || "Failed to create ticket");
            }
        } catch (error) {
            console.error("Failed to create ticket:", error);
            toast.error("Failed to create ticket");
        } finally {
            setIsCreating(false);
        }
    };

    const handleDeleteTicket = async (ticketId: string) => {
        setIsDeleting(ticketId);
        try {
            const result = await deleteTicket(ticketId);
            if (result.success) {
                setTickets(tickets.filter(t => t.id !== ticketId));
                toast.success("Ticket deleted successfully");
            } else {
                toast.error(result.error || "Failed to delete ticket");
            }
        } catch (error) {
            console.error("Failed to delete ticket:", error);
            toast.error("Failed to delete ticket");
        } finally {
            setIsDeleting(null);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Support</h1>
                {!isLoading && tickets.length > 0 && (
                    <Button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#C69C2E] hover:bg-[#B58B25] text-white"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        New Ticket
                    </Button>
                )}
            </div>

            {isLoading ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-[#C69C2E] animate-spin" />
                </div>
            ) : tickets.length === 0 ? (
                <TicketEmptyState onCreateTicket={() => setIsModalOpen(true)} />
            ) : (
                <TicketList
                    tickets={tickets}
                    onDelete={handleDeleteTicket}
                    isDeleting={isDeleting}
                />
            )}

            <CreateTicketModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateTicket}
                isLoading={isCreating}
            />
        </div>
    );
}
