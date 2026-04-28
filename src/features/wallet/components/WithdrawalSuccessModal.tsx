"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface WithdrawalSuccessModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function WithdrawalSuccessModal({ open, onOpenChange }: WithdrawalSuccessModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden rounded-3xl">
                <div className="p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
                        <div className="w-10 h-10 rounded-full bg-green-400 flex items-center justify-center text-white">
                            <Check className="w-6 h-6" strokeWidth={3} />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Withdrawal Successful
                    </h2>

                    <p className="text-sm text-gray-500">
                        Your withdrawal was successful wait for approval
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}
