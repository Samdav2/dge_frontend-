"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Landmark, Plus, Loader2, AlertCircle } from "lucide-react";
import { getSavedBankAccounts } from "../actions";
import { BankAccountModal } from "./BankAccountModal";

interface BankAccount {
    id: string;
    account_number: string;
    account_name: string;
    bank_code: string;
    bank_name: string;
    is_default: boolean;
}

interface WithdrawalModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onContinue: (account: BankAccount) => void;
}

export function WithdrawalModal({ open, onOpenChange, onContinue }: WithdrawalModalProps) {
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [selectedId, setSelectedId] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showBankAccountModal, setShowBankAccountModal] = useState(false);

    useEffect(() => {
        if (open) {
            fetchAccounts();
        }
    }, [open]);

    const fetchAccounts = async () => {
        setLoading(true);
        setError("");
        try {
            const result = await getSavedBankAccounts();
            if (result.success && Array.isArray(result.data)) {
                setAccounts(result.data);
                // Auto-select default
                const def = result.data.find((a: BankAccount) => a.is_default);
                if (def) setSelectedId(def.id);
                else if (result.data.length > 0) setSelectedId(result.data[0].id);
            } else {
                setError(result.error || "Could not load bank accounts");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleContinue = () => {
        const account = accounts.find(a => a.id === selectedId);
        if (!account) {
            setError("Please select a bank account");
            return;
        }
        onContinue(account);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-3xl">
                    <div className="p-6">
                        <DialogHeader className="mb-4">
                            <DialogTitle className="text-xl font-bold text-gray-900">
                                Withdrawal Option
                            </DialogTitle>
                            <p className="text-sm text-gray-500 mt-1">
                                Select the account to withdraw earnings to
                            </p>
                        </DialogHeader>

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-[#C69C2E]" />
                            </div>
                        ) : accounts.length === 0 ? (
                            <div className="text-center py-6">
                                <Landmark className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                                <p className="text-sm text-gray-500 mb-4">No bank accounts saved yet</p>
                                <Button
                                    onClick={() => setShowBankAccountModal(true)}
                                    className="bg-[#C69C2E] hover:bg-[#b08b29] text-white rounded-xl h-10 text-sm font-medium gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Bank Account
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-3 mb-6">
                                {accounts.map((account) => (
                                    <div
                                        key={account.id}
                                        className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                                            selectedId === account.id
                                                ? "border-[#C69C2E] bg-[#C69C2E]/5"
                                                : "border-gray-100 hover:border-gray-200"
                                        }`}
                                        onClick={() => setSelectedId(account.id)}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#FDF8E9] flex items-center justify-center text-[#C69C2E]">
                                                <Landmark className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-gray-900 text-sm">{account.bank_name}</h4>
                                                <p className="text-xs text-gray-500 mt-0.5">
                                                    {account.account_name} <span className="text-gray-300">•</span> {account.account_number}
                                                </p>
                                                {account.is_default && (
                                                    <span className="text-[10px] font-bold text-[#C69C2E] uppercase">Default</span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="relative flex items-center justify-center">
                                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                                                selectedId === account.id ? "border-[#C69C2E]" : "border-gray-300"
                                            }`}>
                                                {selectedId === account.id && (
                                                    <div className="w-2.5 h-2.5 rounded-full bg-[#C69C2E]" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Add new account link */}
                                <button
                                    onClick={() => setShowBankAccountModal(true)}
                                    className="flex items-center gap-2 text-sm text-[#C69C2E] hover:text-[#b08b29] font-medium py-1 transition-colors"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add another account
                                </button>
                            </div>
                        )}

                        {error && (
                            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-red-600 text-sm mb-4">
                                <AlertCircle className="w-4 h-4 shrink-0" />
                                {error}
                            </div>
                        )}

                        {accounts.length > 0 && (
                            <Button
                                className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base"
                                onClick={handleContinue}
                            >
                                Continue
                            </Button>
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <BankAccountModal
                open={showBankAccountModal}
                onOpenChange={setShowBankAccountModal}
                onAccountsUpdated={(updated) => {
                    setAccounts(updated);
                    if (updated.length > 0 && !selectedId) {
                        const def = updated.find(a => a.is_default) || updated[0];
                        setSelectedId(def.id);
                    }
                }}
            />
        </>
    );
}
