"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { NegotiationList } from "./NegotiationList";

export function NegotiationLayout() {
    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="flex flex-row items-center justify-between mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Negotiation</h1>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-[#C69C2E]">Negotiation</span>
                </div>
            </div>

            <NegotiationList />
        </div>
    );
}
