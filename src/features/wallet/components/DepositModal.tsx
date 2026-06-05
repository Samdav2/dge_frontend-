"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    ArrowDownToLine, ExternalLink, Copy, CheckCircle2,
    Loader2, AlertCircle, Clock
} from "lucide-react";
import { initiateDeposit } from "../actions";

interface DepositModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSuccess?: () => void;
}

type Step = "amount" | "payment" | "success";

export function DepositModal({ open, onOpenChange, onSuccess }: DepositModalProps) {
    const [step, setStep] = useState<Step>("amount");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [copied, setCopied] = useState(false);
    const [depositData, setDepositData] = useState<{
        payment_link?: string;
        monnify_reference: string;
        amount_naira: number;
        status: string;
        message: string;
    } | null>(null);

    // Reset on close
    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setStep("amount");
                setAmount("");
                setError("");
                setDepositData(null);
            }, 300);
        }
    }, [open]);

    const handleInitiateDeposit = async () => {
        const amountNum = parseFloat(amount);
        if (!amountNum || amountNum < 100) {
            setError("Minimum deposit amount is ₦100");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const result = await initiateDeposit(amountNum);
            if (result.success) {
                setDepositData(result.data);
                setStep("payment");
            } else {
                setError(result.error || "Failed to initiate deposit");
            }
        } catch {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatAmount = (n: number) =>
        new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(n);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-3xl">

                {/* ── Step 1: Amount Entry ── */}
                {step === "amount" && (
                    <div className="p-6">
                        <DialogHeader className="mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-[#C69C2E]/10 flex items-center justify-center mb-3">
                                <ArrowDownToLine className="w-6 h-6 text-[#C69C2E]" />
                            </div>
                            <DialogTitle className="text-xl font-bold text-gray-900">Fund Your Account</DialogTitle>
                            <p className="text-sm text-gray-500 mt-1">Enter the amount you want to deposit via Monnify</p>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
                                    Amount (NGN)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold text-lg">₦</span>
                                    <Input
                                        type="number"
                                        min={100}
                                        value={amount}
                                        onChange={(e) => { setAmount(e.target.value); setError(""); }}
                                        placeholder="0.00"
                                        className="pl-8 h-14 text-xl font-bold border-gray-200 rounded-xl focus:border-[#C69C2E] focus:ring-[#C69C2E]"
                                    />
                                </div>
                                <p className="text-xs text-gray-400 mt-1.5">Minimum deposit: ₦100</p>
                            </div>

                            {/* Quick amount buttons */}
                            <div className="grid grid-cols-4 gap-2">
                                {[1000, 5000, 10000, 50000].map((preset) => (
                                    <button
                                        key={preset}
                                        onClick={() => setAmount(String(preset))}
                                        className={`py-2 text-xs font-bold rounded-lg border transition-all ${
                                            amount === String(preset)
                                                ? "border-[#C69C2E] bg-[#C69C2E]/10 text-[#C69C2E]"
                                                : "border-gray-100 text-gray-500 hover:border-gray-300"
                                        }`}
                                    >
                                        ₦{preset.toLocaleString()}
                                    </button>
                                ))}
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <Button
                                onClick={handleInitiateDeposit}
                                disabled={loading || !amount}
                                className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Continue to Payment"}
                            </Button>
                        </div>
                    </div>
                )}

                {/* ── Step 2: Payment Link / Instructions ── */}
                {step === "payment" && depositData && (
                    <div className="p-6">
                        <DialogHeader className="mb-5">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-3">
                                <Clock className="w-6 h-6 text-[#C69C2E]" />
                            </div>
                            <DialogTitle className="text-xl font-bold text-gray-900">Complete Your Payment</DialogTitle>
                            <p className="text-sm text-gray-500 mt-1">
                                Pay <span className="font-bold text-gray-800">{formatAmount(depositData.amount_naira)}</span> via Monnify
                            </p>
                        </DialogHeader>

                        <div className="space-y-4">
                            {/* Reference */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Payment Reference</p>
                                <div className="flex items-center justify-between gap-2">
                                    <code className="text-sm font-mono font-bold text-gray-800">{depositData.monnify_reference}</code>
                                    <button
                                        onClick={() => handleCopy(depositData.monnify_reference)}
                                        className="text-[#C69C2E] hover:text-[#b08b29] transition-colors"
                                    >
                                        {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Payment status notice */}
                            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-sm text-amber-800">
                                <p className="font-semibold mb-1">How this works</p>
                                <ol className="space-y-1 text-xs list-decimal pl-4 text-amber-700">
                                    <li>Click the button below to open Monnify's secure payment page.</li>
                                    <li>Complete payment using bank transfer or card.</li>
                                    <li>Your wallet will be credited automatically once confirmed.</li>
                                </ol>
                            </div>

                            {depositData.payment_link ? (
                                <a
                                    href={depositData.payment_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    Pay on Monnify
                                </a>
                            ) : (
                                <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-sm text-red-700 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    Payment link unavailable. Contact support with reference: <strong>{depositData.monnify_reference}</strong>
                                </div>
                            )}

                            <button
                                onClick={() => { onOpenChange(false); onSuccess?.(); }}
                                className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-2"
                            >
                                I've completed payment — close
                            </button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
