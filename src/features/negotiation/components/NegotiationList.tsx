"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, Loader2 } from "lucide-react";
import { NegotiationCard } from "./NegotiationCard";
import { getMyNegotiations } from "../actions";

interface Negotiation {
    id: string;
    service_id: string;
    initiator_id: string;
    receiver_id: string;
    negotiation_type: "incoming" | "outgoing";
    proposed_price_cents: number;
    message?: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export function NegotiationList() {
    const [activeTab, setActiveTab] = useState<"outgoing" | "incoming">("outgoing");
    const [negotiations, setNegotiations] = useState<Negotiation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNegotiations = async () => {
        setLoading(true);
        const result = await getMyNegotiations();
        if (result.success) {
            // Deduplicate negotiations by ID
            const uniqueNegotiations = Array.from(
                new Map((result.data || []).map((item: Negotiation) => [item.id, item])).values()
            ) as Negotiation[];
            setNegotiations(uniqueNegotiations);
        } else {
            setError(result.error || "Failed to fetch negotiations");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchNegotiations();
    }, []);

    const currentData = negotiations.filter(n => n.negotiation_type === activeTab);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20 bg-white rounded-2xl">
                <Loader2 className="w-8 h-8 animate-spin text-[#C69C2E]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-8 md:py-20 bg-white rounded-2xl">
                <p className="text-red-500 text-center mb-4">{error}</p>
                <Button onClick={fetchNegotiations} variant="outline">
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div>
            {/* Controls Row */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                {/* Tabs */}
                <div className="flex gap-2 w-full md:w-auto inline-flex bg-white p-1 rounded-xl border border-gray-100">
                    <button
                        onClick={() => setActiveTab("outgoing")}
                        className={`flex-1 md:flex-none md:min-w-[160px] px-2 md:px-6 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${activeTab === "outgoing"
                            ? "bg-[#C69C2E] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                    >
                        Outgoing Negotiation
                    </button>
                    <button
                        onClick={() => setActiveTab("incoming")}
                        className={`flex-1 md:flex-none md:min-w-[160px] px-2 md:px-6 py-2.5 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${activeTab === "incoming"
                            ? "bg-[#C69C2E] text-white shadow-sm"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                    >
                        Incoming Negotiation
                    </button>
                </div>

                <Button
                    className="bg-[#C69C2E] hover:bg-[#b08b29] text-white rounded-xl px-6 w-full md:w-auto h-11"
                >
                    + Apply Job
                </Button>
            </div>

            {/* Content */}
            {currentData.length > 0 ? (
                <div className="space-y-4">
                    {currentData.map((item) => (
                        <NegotiationCard
                            key={item.id}
                            id={item.id}
                            type={activeTab}
                            title={`Service Negotiation`}
                            description={item.message || "No message provided"}
                            price={`₦${(item.proposed_price_cents / 100).toLocaleString()}`}
                            status={item.status}
                            date={new Date(item.created_at).toLocaleDateString()}
                            initiator_id={item.initiator_id}
                            receiver_id={item.receiver_id}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                        <Briefcase className="w-8 h-8 text-gray-400" />
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No {activeTab === "outgoing" ? "Outgoing" : "Incoming"} Negotiation
                    </h3>

                    <p className="text-gray-500 text-center mb-8 max-w-sm px-4">
                        You have no {activeTab} negotiation job yet
                    </p>

                    <Button
                        className="bg-white text-[#C69C2E] border border-[#C69C2E] hover:bg-[#C69C2E] hover:text-white transition-colors px-8 py-2 h-auto"
                    >
                        + Apply Job
                    </Button>
                </div>
            )}
        </div>
    );
}
