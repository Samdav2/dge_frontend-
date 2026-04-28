"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";

interface WithdrawalModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onContinue: () => void;
}

const ACCOUNTS = [
    {
        id: "1",
        bankName: "United Bank For Africa",
        accountName: "Chinemerem Christian Nnaji",
        accountNumber: "2195968189",
    },
    {
        id: "2",
        bankName: "United Bank For Africa",
        accountName: "Chinemerem Christian Nnaji",
        accountNumber: "2195968189",
    },
];

export function WithdrawalModal({ open, onOpenChange, onContinue }: WithdrawalModalProps) {
    const [selectedAccount, setSelectedAccount] = useState<string>(ACCOUNTS[0].id);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl">
                <div className="p-6">
                    <DialogHeader className="mb-4">
                        <DialogTitle className="text-xl font-bold text-gray-900">
                            Withdrawal Option
                        </DialogTitle>
                        <p className="text-sm text-gray-500 mt-1">
                            Select Account you want to withdraw to..
                        </p>
                    </DialogHeader>

                    <div className="space-y-3 mb-6">
                        {ACCOUNTS.map((account) => (
                            <div
                                key={account.id}
                                className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${selectedAccount === account.id
                                    ? "border-[#C69C2E] bg-[#C69C2E]/5"
                                    : "border-gray-100 hover:border-gray-200"
                                    }`}
                                onClick={() => setSelectedAccount(account.id)}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[#FDF8E9] flex items-center justify-center text-[#C69C2E]">
                                        <Landmark className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-gray-900 text-sm">{account.bankName}</h4>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {account.accountName} <span className="text-gray-300">•</span> {account.accountNumber}
                                        </p>
                                    </div>
                                </div>
                                <div className="relative flex items-center justify-center">
                                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedAccount === account.id
                                        ? "border-[#C69C2E]"
                                        : "border-gray-300"
                                        }`}>
                                        {selectedAccount === account.id && (
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#C69C2E]" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button
                        className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base"
                        onClick={onContinue}
                    >
                        Continue
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
