"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, Clock, ShieldCheck, MapPin, Star, Route, Banknote, ChevronRight } from "lucide-react";

interface RideConfirmationProps {
    onBack: () => void;
    onNegotiate: () => void;
    onBook: () => void;
}

export function RideConfirmation({ onBack, onNegotiate, onBook }: RideConfirmationProps) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-5 pb-4 border-b border-gray-50">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 text-gray-500" />
                    </button>
                    <div>
                        <h2 className="text-base font-bold text-gray-900">Confirm Your Ride</h2>
                        <p className="text-[10px] text-gray-400">Review details before booking</p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
                {/* Driver Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#C69C2E]/5 to-[#C69C2E]/10 border border-[#C69C2E]/15">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                            <span className="text-sm font-bold text-[#C69C2E]">DJ</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-sm">David Johnson</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="flex items-center gap-0.5">
                                    <Star className="w-3 h-3 text-[#C69C2E] fill-[#C69C2E]" />
                                    <span className="text-[10px] font-semibold text-gray-600">4.9</span>
                                </div>
                                <span className="text-gray-200 text-xs">•</span>
                                <span className="text-[10px] text-gray-500">312 rides</span>
                            </div>
                        </div>
                        <div className="px-2.5 py-1 rounded-lg bg-green-50 border border-green-100">
                            <span className="text-[9px] font-bold text-green-700 uppercase tracking-wider">Verified</span>
                        </div>
                    </div>

                    {/* Vehicle & ETA chips */}
                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 text-[10px] text-gray-600 font-medium">
                            <Car className="w-3 h-3 text-[#C69C2E]" />
                            Toyota Corolla • ABJ-432KD
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 text-[10px] text-gray-600 font-medium">
                            <Clock className="w-3 h-3 text-blue-500" />
                            Arrives in 4 min
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 text-[10px] text-gray-600 font-medium">
                            <ShieldCheck className="w-3 h-3 text-green-500" />
                            Insured
                        </div>
                    </div>
                </div>

                {/* Route Card */}
                <div className="p-4 rounded-xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Route className="w-4 h-4 text-[#C69C2E]" />
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Trip Route</h3>
                    </div>
                    <div className="relative flex gap-3 ml-1">
                        <div className="flex flex-col items-center pt-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#C69C2E] ring-3 ring-[#C69C2E]/10" />
                            <div className="w-0.5 flex-1 my-1.5 min-h-[24px]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #C69C2E40 0px, #C69C2E40 3px, transparent 3px, transparent 6px)' }} />
                            <div className="w-2.5 h-2.5 rounded-sm bg-gray-900 ring-3 ring-gray-900/10" />
                        </div>
                        <div className="space-y-5 pb-1">
                            <div>
                                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Pickup</p>
                                <p className="text-sm text-gray-900 font-medium">Ifite-awka, Anambra State</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Dropoff</p>
                                <p className="text-sm text-gray-900 font-medium">Nnewi, Anambra State</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fare Summary */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center gap-2 mb-3">
                        <Banknote className="w-4 h-4 text-[#C69C2E]" />
                        <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider">Fare Details</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Base Fare</span>
                            <span className="text-gray-700 font-medium">₦2,000</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Distance (12.4 km)</span>
                            <span className="text-gray-700 font-medium">₦6,200</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Service Fee</span>
                            <span className="text-gray-700 font-medium">₦800</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                            <span className="text-sm font-bold text-gray-900">Total</span>
                            <span className="text-sm font-bold text-[#C69C2E]">₦9,000</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-5 py-4 border-t border-gray-50 bg-white flex gap-3">
                <Button
                    onClick={onBook}
                    className="flex-1 bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#C69C2E]/20 group"
                >
                    Book Ride
                    <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                    variant="outline"
                    onClick={onNegotiate}
                    className="flex-1 border-[#C69C2E]/30 text-[#C69C2E] hover:bg-[#C69C2E]/5 h-12 rounded-xl font-bold text-sm"
                >
                    Negotiate
                </Button>
            </div>
        </div>
    );
}
