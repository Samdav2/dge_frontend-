"use client";

import React, { useState, useEffect } from "react";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { Conversation } from "../types";
import { getUserConversations, getParticipants } from "../actions";
import { useChatContext } from "@/providers/ChatProvider";
import { useSearchParams } from "next/navigation";

export function InboxLayout() {
    const [mobileView, setMobileView] = useState<"list" | "chat">("list");
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const conversationIdParam = searchParams.get("conversationId");

    const { isConnected, newMessage, sendMessage, startOutboundCall, userId } = useChatContext();

    // Fetch participants for a conversation
    const fetchParticipants = async (conversationId: string) => {
        try {
            const result = await getParticipants(conversationId);
            if (result.success && result.data) {
                setConversations(prev => prev.map(c =>
                    c.id === conversationId
                        ? { ...c, participants: result.data }
                        : c
                ));
                if (selectedConversation?.id === conversationId) {
                    setSelectedConversation(prev => prev ? { ...prev, participants: result.data } : null);
                }
            }
        } catch (error) {
            console.error("Failed to fetch participants:", error);
        }
    };

    // Load conversations and handle initial selection from URL
    useEffect(() => {
        async function loadConversations() {
            setIsLoading(true);
            try {
                const result = await getUserConversations();
                if (result.success && result.data) {
                    const uniqueConversations = Array.from(
                        new Map((result.data as Conversation[]).map(c => [c.id, c])).values()
                    );
                    setConversations(uniqueConversations);

                    if (conversationIdParam) {
                        const targetConversation = (result.data as Conversation[]).find(c => c.id === conversationIdParam);
                        if (targetConversation) {
                            setSelectedConversation(targetConversation);
                            setMobileView("chat");
                            fetchParticipants(targetConversation.id);
                        }
                    }
                }
            } catch (error) {
                console.error("Failed to load conversations:", error);
                setError("Failed to load conversations. Please try again.");
            } finally {
                setIsLoading(false);
            }
        }
        loadConversations();
    }, [conversationIdParam]);

    // Update conversation lastMessage whenever newMessage updates
    useEffect(() => {
        if (newMessage) {
            setConversations((prev) =>
                prev.map((conv) =>
                    conv.id === newMessage.conversation_id
                        ? { ...conv, lastMessage: newMessage }
                        : conv
                )
            );
        }
    }, [newMessage]);


    const handleChatSelect = (conversation: Conversation) => {
        setSelectedConversation(conversation);
        setMobileView("chat");
        fetchParticipants(conversation.id);
    };

    const handleSendMessage = (conversationId: string, content: string) => {
        sendMessage(conversationId, content);
    };

    const handleStartCall = (targetUserId: string, targetUserName?: string, targetUserAvatar?: string) => {
        startOutboundCall(targetUserId, targetUserName, targetUserAvatar, selectedConversation?.id);
    };

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto h-screen flex flex-col">
            <div className="flex flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Inbox</h1>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-[#C69C2E]">Messages</span>
                    {isConnected && (
                        <span className="ml-2 w-2 h-2 bg-green-500 rounded-full" title="Chat Connected" />
                    )}
                </div>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-0">
                {error && (
                    <div className="lg:col-span-3 bg-red-50 text-red-600 p-4 rounded-lg mb-4">
                        {error}
                    </div>
                )}
                <div className={`lg:col-span-1 h-full min-h-0 ${mobileView === "chat" ? "hidden lg:block" : "block"}`}>
                    <ConversationList
                        conversations={conversations}
                        isLoading={isLoading}
                        selectedId={selectedConversation?.id}
                        currentUserId={userId ?? undefined}
                        onChatSelect={handleChatSelect}
                    />
                </div>
                <div className={`lg:col-span-2 h-full min-h-0 ${mobileView === "chat" ? "block" : "hidden lg:block"}`}>
                    <ChatWindow
                        conversation={selectedConversation}
                        currentUserId={userId ?? null}
                        isConnected={isConnected}
                        onBack={() => setMobileView("list")}
                        onSendMessage={handleSendMessage}
                        onStartCall={handleStartCall}
                        newMessage={newMessage}
                    />
                </div>
            </div>
        </div>
    );
}
