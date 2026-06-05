"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { requestWithdrawal } from "../actions";

interface BankAccount {
    id: string;
    account_number: string;
    account_name: string;
    bank_name: string;
}

interface WithdrawalAmountModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    selectedAccount: BankAccount | null;
    earningsBalance: number;  // in Naira
    onSuccess?: () => void;
}

export function WithdrawalAmountModal({
    open,
    onOpenChange,
    selectedAccount,
    earningsBalance,
    onSuccess,
}: WithdrawalAmountModalProps) {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleWithdraw = async () => {
        const amountNum = parseFloat(amount);
        if (!amountNum || amountNum < 100) {
            setError("Minimum withdrawal is ₦100");
            return;
        }
        if (amountNum > earningsBalance) {
            setError(`Insufficient balance. Available: ₦${earningsBalance.toLocaleString()}`);
            return;
        }
        if (!selectedAccount) {
            setError("No bank account selected");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const result = await requestWithdrawal(amountNum, selectedAccount.id);
            if (result.success) {
                setSubmitted(true);
                onSuccess?.();
            } else {
                setError(result.error || "Failed to submit withdrawal");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setAmount("");
        setError("");
        setSubmitted(false);
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl">
                <div className="p-6">
                    {!submitted ? (
                        <>
                            <DialogHeader className="mb-6">
                                <DialogTitle className="text-xl font-bold text-gray-900">Make Withdrawal</DialogTitle>
                                <p className="text-sm text-gray-500 mt-1">
                                    Enter the amount to withdraw to your bank account
                                </p>
                            </DialogHeader>

                            {/* Selected account display */}
                            {selectedAccount && (
                                <div className="bg-gray-50 rounded-xl p-3 mb-5 flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                                        <span className="text-[#C69C2E] text-xs font-bold">
                                            {selectedAccount.bank_name.slice(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-gray-900">{selectedAccount.bank_name}</p>
                                        <p className="text-xs text-gray-400">{selectedAccount.account_name} · {selectedAccount.account_number}</p>
                                    </div>
                                </div>
                            )}

                            <div className="space-y-4 mb-6">
                                <div>
                                    <label className="text-sm font-medium text-gray-900 block mb-2">Amount to Withdraw</label>
                                    <div className="relative">
                                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₦</span>
                                        <Input
                                            type="number"
                                            min={100}
                                            max={earningsBalance}
                                            placeholder="0.00"
                                            value={amount}
                                            onChange={(e) => { setAmount(e.target.value); setError(""); }}
                                            className="pl-8 h-12 rounded-xl border-gray-200 focus:border-[#C69C2E] focus:ring-[#C69C2E]"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-400 mt-1.5">
                                        Available: <span className="font-semibold text-gray-600">₦{earningsBalance.toLocaleString()}</span>
                                    </p>
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-red-600 text-sm">
                                        <AlertCircle className="w-4 h-4 shrink-0" />
                                        {error}
                                    </div>
                                )}

                                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                                    <p className="font-semibold mb-0.5">⏳ Pending Admin Approval</p>
                                    <p>Withdrawal requests are reviewed before funds are released. You'll be notified once approved.</p>
                                </div>
                            </div>

                            <Button
                                onClick={handleWithdraw}
                                disabled={loading || !amount}
                                className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Submit Withdrawal Request"}
                            </Button>
                        </>
                    ) : (
                        /* Success state */
                        <div className="text-center py-6">
                            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
                                <Clock className="w-8 h-8 text-[#C69C2E]" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Request Submitted!</h3>
                            <p className="text-sm text-gray-500 mb-1">
                                Your withdrawal of <span className="font-bold">₦{parseFloat(amount).toLocaleString()}</span> is pending admin approval.
                            </p>
                            <p className="text-xs text-gray-400 mb-6">Funds will be sent to {selectedAccount?.bank_name} once approved.</p>
                            <Button
                                onClick={handleClose}
                                className="bg-[#C69C2E] hover:bg-[#b08b29] text-white h-11 rounded-xl font-bold px-8"
                            >
                                Done
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
