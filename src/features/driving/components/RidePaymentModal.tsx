"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X, Wallet, AlertTriangle, ShieldCheck } from "lucide-react";

interface RidePaymentModalProps {
    onClose: () => void;
    onPayment: () => void;
}

export function RidePaymentModal({ onClose, onPayment }: RidePaymentModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md relative shadow-2xl overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-[#C69C2E] to-[#E5B84D]" />

                <div className="p-6">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-5 p-2 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                        <X className="w-4 h-4 text-gray-400" />
                    </button>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl bg-[#C69C2E]/10 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-[#C69C2E]" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Confirm Payment</h2>
                            <p className="text-xs text-gray-400">Review and pay for your ride</p>
                        </div>
                    </div>

                    <div className="space-y-5">
                        {/* Amount Card */}
                        <div className="p-4 rounded-xl bg-gradient-to-br from-[#C69C2E]/5 to-[#C69C2E]/10 border border-[#C69C2E]/15">
                            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Amount to Pay</p>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-lg bg-[#008751] flex items-center justify-center">
                                        <span className="text-white text-[10px] font-bold">₦</span>
                                    </div>
                                    <span className="text-xs font-medium text-gray-500">Nigerian Naira</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">₦17,000</span>
                            </div>
                        </div>

                        {/* Wallet Balance */}
                        <div className="flex items-center justify-between p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-2">
                                <Wallet className="w-4 h-4 text-gray-400" />
                                <span className="text-xs text-gray-500 font-medium">Wallet Balance</span>
                            </div>
                            <span className="text-sm font-bold text-gray-900">₦70,000</span>
                        </div>

                        {/* Insufficient funds warning (conditional) */}
                        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-50 border border-amber-100">
                            <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-700 leading-relaxed">
                                Sufficient balance available. Payment will be deducted from your wallet.
                            </p>
                        </div>

                        {/* Security note */}
                        <div className="flex items-center gap-2 text-[10px] text-gray-400">
                            <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                            <span>Your payment is secured and encrypted</span>
                        </div>

                        <Button
                            onClick={onPayment}
                            className="w-full h-12 rounded-xl font-bold text-sm bg-[#C69C2E] hover:bg-[#b08b29] text-white transition-all hover:shadow-lg hover:shadow-[#C69C2E]/20"
                        >
                            Confirm & Pay ₦17,000
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
