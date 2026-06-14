"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, Clock, ShieldCheck, MapPin, Star, Route, Banknote, ChevronRight } from "lucide-react";

interface RideConfirmationProps {
    driver: { id: string; car_name: string; driver_name: string; distance_km: number };
    tripData: { pickup_address: string; dropoff_address: string; estimated_distance?: number };
    estimatedFare: number;
    onBack: () => void;
    onNegotiate: () => void;
    onBook: () => void;
}

import { getUserWallet } from "@/features/wallet/actions";

export function RideConfirmation({ driver, tripData, estimatedFare, onBack, onNegotiate, onBook }: RideConfirmationProps) {
    const [walletBalance, setWalletBalance] = React.useState<number | null>(null);

    React.useEffect(() => {
        async function fetchWallet() {
            const res = await getUserWallet();
            if (res.success && res.data && res.data.length > 0) {
                const depositWallet = res.data.find((w: any) => w.wallet_type === "deposit");
                if (depositWallet) {
                    setWalletBalance(depositWallet.balance_cents / 100);
                } else {
                    setWalletBalance(0);
                }
            } else {
                setWalletBalance(0);
            }
        }
        fetchWallet();
    }, []);
    const rating = (4.5 + Math.random() * 0.5).toFixed(1);
    const arrivalMin = Math.ceil(driver.distance_km * 2);
    const baseFare = 2000;
    const distanceFare = Math.ceil((tripData.estimated_distance || 0) * 500);
    const serviceFee = Math.ceil((baseFare + distanceFare) * 0.1);
    const totalFare = baseFare + distanceFare + serviceFee;
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
                <div className="p-4 rounded-xl bg-gradient-to-br from-[#C69C2E]/5 to-[#C69C2E]/10 border border-[#C69C2E]/15">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                            <span className="text-sm font-bold text-[#C69C2E]">RD</span>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-sm">{driver.driver_name || "Driver details unavailable"}</h3>
                            <div className="flex items-center gap-2 mt-0.5">
                                <div className="flex items-center gap-0.5">
                                    <Star className="w-3 h-3 text-[#C69C2E] fill-[#C69C2E]" />
                                    <span className="text-[10px] font-semibold text-gray-600">{rating}</span>
                                </div>
                                <span className="text-gray-200 text-xs">•</span>
                                <span className="text-[10px] text-gray-500">Verified</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 text-[10px] text-gray-600 font-medium">
                            <Car className="w-3 h-3 text-[#C69C2E]" />
                            {driver.car_name || "Vehicle info unavailable"}
                        </div>
                        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/80 text-[10px] text-gray-600 font-medium">
                            <Clock className="w-3 h-3 text-blue-500" />
                            Arrives in {arrivalMin} min
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
                                <p className="text-sm text-gray-900 font-medium">{tripData.pickup_address || "Current Location"}</p>
                            </div>
                            <div>
                                <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-wider mb-0.5">Dropoff</p>
                                <p className="text-sm text-gray-900 font-medium">{tripData.dropoff_address || "Selected Destination"}</p>
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
                            <span className="text-gray-700 font-medium">₦{baseFare.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Distance ({(tripData.estimated_distance || 0).toFixed(1)} km)</span>
                            <span className="text-gray-700 font-medium">₦{distanceFare.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Service Fee</span>
                            <span className="text-gray-700 font-medium">₦{serviceFee.toLocaleString()}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between">
                            <span className="text-sm font-bold text-gray-900">Total</span>
                            <span className="text-sm font-bold text-[#C69C2E]">₦{totalFare.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-5 py-4 border-t border-gray-50 bg-white flex gap-3">
                <Button
                    onClick={onBook}
                    disabled={walletBalance !== null && walletBalance < totalFare}
                    className="flex-1 bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#C69C2E]/20 group disabled:opacity-50"
                >
                    {(walletBalance !== null && walletBalance < totalFare) ? "Insufficient Funds" : "Book Ride"}
                    {(walletBalance === null || walletBalance >= totalFare) && <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
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
