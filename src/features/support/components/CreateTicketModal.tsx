import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { TicketPriority } from "../types";

interface CreateTicketModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { subject: string; description: string; priority: TicketPriority }) => Promise<void>;
    isLoading?: boolean;
}

export function CreateTicketModal({ isOpen, onClose, onSubmit, isLoading = false }: CreateTicketModalProps) {
    const [subject, setSubject] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<TicketPriority>("medium");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit({ subject, description, priority });
        // Reset form
        setSubject("");
        setDescription("");
        setPriority("medium");
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] bg-white p-6 rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-gray-900">Create Ticket</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                    <div className="space-y-2">
                        <Label htmlFor="subject" className="text-gray-700 font-medium">Subject</Label>
                        <Input
                            id="subject"
                            placeholder="Enter subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="w-full border-gray-200 rounded-xl focus:ring-[#C69C2E] focus:border-[#C69C2E]"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full min-h-[100px] border-gray-200 rounded-xl focus:ring-[#C69C2E] focus:border-[#C69C2E]"
                            required
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="priority" className="text-gray-700 font-medium">Priority</Label>
                        <Select
                            value={priority}
                            onValueChange={(value) => setPriority(value as TicketPriority)}
                            disabled={isLoading}
                        >
                            <SelectTrigger className="w-full border-gray-200 rounded-xl focus:ring-[#C69C2E] focus:border-[#C69C2E]">
                                <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low</SelectItem>
                                <SelectItem value="medium">Medium</SelectItem>
                                <SelectItem value="high">High</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#C69C2E] hover:bg-[#B58B25] text-white font-medium py-6 rounded-xl text-lg"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Creating...
                            </>
                        ) : (
                            "Create Ticket"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
