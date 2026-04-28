"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, Clock, ShieldCheck, MapPin } from "lucide-react";

interface RideConfirmationProps {
    onBack: () => void;
    onNegotiate: () => void;
    onBook: () => void;
}

export function RideConfirmation({ onBack, onNegotiate, onBook }: RideConfirmationProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
                <h2 className="text-lg font-bold text-gray-900">Confirm Your Ride</h2>
            </div>

            <div className="flex-1 space-y-8">
                {/* Driver Details */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <span className="text-gray-600 font-bold">DJ</span>
                        </div>
                        <span className="font-medium text-gray-900">David Johnson</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Car className="w-4 h-4 text-[#C69C2E]" />
                        <span>Toyota Corolla • ABJ-432KD</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <ShieldCheck className="w-4 h-4 text-[#C69C2E]" />
                        <span>312 successful rides</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                        <Clock className="w-4 h-4 text-[#C69C2E]" />
                        <span>Arrival Time: 4 mins</span>
                    </div>
                </div>

                {/* Route Details */}
                <div>
                    <h3 className="font-bold text-gray-900 mb-4">Destination</h3>
                    <div className="relative flex gap-4">
                        <div className="flex flex-col items-center pt-1">
                            <div className="w-3 h-3 rounded-full bg-[#C69C2E]" />
                            <div className="w-0.5 flex-1 border-l-2 border-dashed border-[#C69C2E]/30 my-1 min-h-[20px]" />
                            <MapPin className="w-4 h-4 text-[#C69C2E]" />
                        </div>
                        <div className="space-y-6 pb-2">
                            <div className="text-sm text-gray-600">Ifite-awka, Anambra State</div>
                            <div className="text-sm text-gray-600">Nnewi, Anambra State</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex gap-4">
                <Button
                    onClick={onBook}
                    className="flex-1 bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base"
                >
                    Book Ride
                </Button>
                <Button
                    variant="outline"
                    onClick={onNegotiate}
                    className="flex-1 border-[#C69C2E] text-[#C69C2E] hover:bg-[#C69C2E]/5 h-12 rounded-xl font-bold text-base"
                >
                    Negotiate
                </Button>
            </div>
        </div>
    );
}
