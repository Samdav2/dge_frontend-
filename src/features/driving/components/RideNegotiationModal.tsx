"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";

interface RideNegotiationModalProps {
    onClose: () => void;
    onSubmit: () => void;
}

export function RideNegotiationModal({ onClose, onSubmit }: RideNegotiationModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-2">Make Negotiation</h2>
                <p className="text-sm text-gray-500 mb-6">
                    Et integer in purus feugiat viverra maecenas nunc tortor consectetur. Tortor in nunc orci iaculis neque. Non sed habitant eu nullam ultricies elit.
                </p>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Initial Price</label>
                        <div className="h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center px-4 text-gray-900 font-medium">
                            ₦85,000
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Negotiation Price</label>
                        <Input
                            type="number"
                            placeholder="Enter negotiation price"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Message (Optional)</label>
                        <Textarea
                            placeholder="Enter message"
                            className="min-h-[120px] bg-white border-gray-200 rounded-xl resize-none"
                        />
                    </div>
                </div>

                <div className="flex gap-4 mt-8">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="flex-1 h-12 rounded-xl font-bold text-base border-[#C69C2E] text-[#C69C2E] hover:bg-[#C69C2E]/5"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="flex-1 h-12 rounded-xl font-bold text-base bg-[#C69C2E] hover:bg-[#b08b29] text-white"
                    >
                        Make Negotiation
                    </Button>
                </div>
            </div>
        </div>
    );
}
