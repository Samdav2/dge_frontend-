"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface WithdrawalAmountModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onWithdraw: (amount: string) => void;
}

export function WithdrawalAmountModal({ open, onOpenChange, onWithdraw }: WithdrawalAmountModalProps) {
    const [amount, setAmount] = React.useState("");

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl">
                <div className="p-6">
                    <DialogHeader className="mb-6 flex flex-row items-center justify-between">
                        <div>
                            <DialogTitle className="text-xl font-bold text-gray-900">
                                Make Withdrawal
                            </DialogTitle>
                            <p className="text-sm text-gray-500 mt-1">
                                Enter Amount you wish to withdraw
                            </p>
                        </div>
                    </DialogHeader>

                    <div className="space-y-2 mb-8">
                        <label className="text-sm font-medium text-gray-900">
                            Amount to Withdraw
                        </label>
                        <Input
                            type="text"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="h-12 rounded-xl border-gray-200 focus:border-[#C69C2E] focus:ring-[#C69C2E]"
                        />
                    </div>

                    <Button
                        className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base"
                        onClick={() => onWithdraw(amount)}
                    >
                        Withdraw
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
