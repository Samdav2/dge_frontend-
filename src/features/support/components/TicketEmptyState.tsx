import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

interface TicketEmptyStateProps {
    onCreateTicket: () => void;
}

export function TicketEmptyState({ onCreateTicket }: TicketEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100 min-h-[500px]">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Ticket className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No Ticket yet</h3>
            <p className="text-gray-500 text-sm mb-6">You have not created any ticket yet</p>
            <Button
                onClick={onCreateTicket}
                variant="outline"
                className="border-[#C69C2E] text-[#C69C2E] hover:bg-[#C69C2E] hover:text-white px-8"
            >
                + create ticket
            </Button>
        </div>
    );
}
