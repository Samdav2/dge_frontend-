"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Check, X } from "lucide-react";
import { AcceptNegotiationModal } from "./AcceptNegotiationModal";
import { RejectNegotiationModal } from "./RejectNegotiationModal";
import { useRouter } from "next/navigation";
import { acceptNegotiation, rejectNegotiation } from "../actions";
import { createConversation, addParticipant, getCurrentUserId } from "../../inbox/actions";

interface NegotiationCardProps {
    id: string;
    type: "outgoing" | "incoming";
    title: string;
    description: string;
    price: string;
    status: string;
    date: string;
    owner?: string; // For incoming negotiations
    initiator_id: string;
    receiver_id: string;
}

export function NegotiationCard({
    id,
    type,
    title,
    description,
    price,
    status,
    date,
    owner,
    initiator_id,
    receiver_id,
}: NegotiationCardProps) {
    const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChat = async () => {
        setIsLoading(true);
        try {
            const currentUserId = await getCurrentUserId();
            if (!currentUserId) {
                console.error("User not logged in");
                return;
            }

            const otherUserId = type === "incoming" ? initiator_id : receiver_id;

            // Create conversation
            const conversationResult = await createConversation({
                type: "private",
                recipient_id: otherUserId,
                metadataInfo: {
                    negotiation_id: id,
                    type: "negotiation_chat"
                }
            });

            if (!conversationResult.success || !conversationResult.data) {
                console.error("Failed to create conversation:", conversationResult.error);
                return;
            }

            const conversationId = conversationResult.data.id;

            // Add other participant
            const addParticipantResult = await addParticipant({
                conversation_id: conversationId,
                user_id: otherUserId,
                role: "member"
            });

            if (!addParticipantResult.success) {
                console.error("Failed to add participant:", addParticipantResult.error);
                // Continue anyway to redirect user
            }

            // Redirect to inbox
            router.push(`/dashboard/inbox?conversationId=${conversationId}`);
        } catch (error) {
            console.error("Error starting chat:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAccept = async () => {
        setIsLoading(true);
        try {
            const result = await acceptNegotiation(id);
            if (result.success) {
                setIsAcceptModalOpen(false);
                router.refresh();
            } else {
                console.error("Failed to accept negotiation:", result.error);
                // Optionally show error toast
            }
        } catch (error) {
            console.error("Error accepting negotiation:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReject = async () => {
        setIsLoading(true);
        try {
            const result = await rejectNegotiation(id);
            if (result.success) {
                setIsRejectModalOpen(false);
                router.refresh();
            } else {
                console.error("Failed to reject negotiation:", result.error);
            }
        } catch (error) {
            console.error("Error rejecting negotiation:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const isPending = status.toLowerCase() === "pending";

    return (
        <>
            <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#C69C2E] hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-4 max-w-2xl">
                            {description}
                        </p>

                        <div className="space-y-1">
                            <p className="text-sm text-gray-500">
                                Negotiated Price: <span className="text-gray-900 font-bold">{price}</span>
                            </p>
                            {owner && (
                                <p className="text-sm text-gray-500">
                                    Owner: <span className="text-gray-900 font-medium">{owner}</span>
                                </p>
                            )}
                            <p className="text-sm text-gray-500">
                                Status: <span className={`font-medium ${status.toLowerCase() === 'accepted' ? 'text-green-500' :
                                    status.toLowerCase() === 'rejected' ? 'text-red-500' :
                                        'text-[#C69C2E]'
                                    }`}>{status}</span>
                            </p>
                            <p className="text-sm text-gray-500">
                                Date: <span className="text-gray-900 font-medium">{date}</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-between items-center w-full">
                    {type === "incoming" ? (
                        <>
                            {isPending && (
                                <div className="flex gap-4 w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsAcceptModalOpen(true)}
                                        className="flex-1 sm:flex-none border-green-500 text-green-500 hover:bg-green-50 h-10 md:h-11 rounded-xl gap-2 px-4 md:px-6 text-sm"
                                        disabled={isLoading}
                                    >
                                        <Check className="w-4 h-4" />
                                        Accept
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsRejectModalOpen(true)}
                                        className="flex-1 sm:flex-none border-red-500 text-red-500 hover:bg-red-50 h-10 md:h-11 rounded-xl gap-2 px-4 md:px-6 text-sm"
                                        disabled={isLoading}
                                    >
                                        <X className="w-4 h-4" />
                                        Reject
                                    </Button>
                                </div>
                            )}
                            <Button
                                className="w-full sm:w-auto bg-[#C69C2E] hover:bg-[#b08b29] text-white h-10 md:h-11 rounded-xl gap-2 px-4 md:px-8 text-sm ml-auto"
                                onClick={handleChat}
                                disabled={isLoading}
                            >
                                <MessageSquare className="w-4 h-4" />
                                Chat
                            </Button>
                        </>
                    ) : (
                        <div className="w-full flex justify-end">
                            <Button
                                className="w-full sm:w-auto bg-[#C69C2E] hover:bg-[#b08b29] text-white h-10 md:h-11 rounded-xl gap-2 px-4 md:px-8 text-sm"
                                onClick={handleChat}
                                disabled={isLoading}
                            >
                                <MessageSquare className="w-4 h-4" />
                                Chat
                            </Button>
                        </div>
                    )}
                </div>
            </div>

            <AcceptNegotiationModal
                open={isAcceptModalOpen}
                onOpenChange={setIsAcceptModalOpen}
                onAccept={handleAccept}
            />

            <RejectNegotiationModal
                open={isRejectModalOpen}
                onOpenChange={setIsRejectModalOpen}
                onReject={handleReject}
            />
        </>
    );
}
