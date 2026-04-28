"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface RidePaymentModalProps {
    onClose: () => void;
    onPayment: () => void;
}

export function RidePaymentModal({ onClose, onPayment }: RidePaymentModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                <h2 className="text-xl font-bold text-gray-900 mb-6">Make payment</h2>

                <div className="space-y-6">
                    <div>
                        <label className="text-sm font-medium text-gray-900 mb-2 block">Amount</label>
                        <div className="h-14 border border-gray-100 rounded-xl flex items-center px-4 justify-between bg-white">
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-[#008751] flex items-center justify-center">
                                    <div className="w-3 h-3 bg-white rounded-full" />
                                </div>
                                <span className="text-sm font-medium text-gray-500">(NGN)</span>
                            </div>
                            <span className="text-lg font-bold text-gray-900">₦ 17,000</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Wallet Balance: <span className="text-gray-900">₦70,000</span>
                        </p>
                    </div>

                    <p className="text-sm text-red-500">
                        You don't have sufficient funds
                    </p>

                    <Button
                        onClick={onPayment}
                        className="w-full h-12 rounded-xl font-bold text-base bg-[#C69C2E] hover:bg-[#b08b29] text-white"
                    >
                        Make payment
                    </Button>
                </div>
            </div>
        </div>
    );
}
