"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Landmark, Plus, Loader2, AlertCircle, CheckCircle2, ChevronDown, Trash2
} from "lucide-react";
import { getBanksList, verifyBankAccount, saveBankAccount, deleteBankAccount, getSavedBankAccounts } from "../actions";

interface Bank {
    name: string;
    code: string;
}

interface BankAccount {
    id: string;
    account_number: string;
    account_name: string;
    bank_code: string;
    bank_name: string;
    is_default: boolean;
}

interface BankAccountModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAccountsUpdated?: (accounts: BankAccount[]) => void;
}

type Step = "list" | "add";

export function BankAccountModal({ open, onOpenChange, onAccountsUpdated }: BankAccountModalProps) {
    const [step, setStep] = useState<Step>("list");
    const [accounts, setAccounts] = useState<BankAccount[]>([]);
    const [banks, setBanks] = useState<Bank[]>([]);
    const [loading, setLoading] = useState(false);
    const [verifying, setVerifying] = useState(false);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Form state
    const [accountNumber, setAccountNumber] = useState("");
    const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
    const [showBankDropdown, setShowBankDropdown] = useState(false);
    const [bankSearch, setBankSearch] = useState("");
    const [verifiedName, setVerifiedName] = useState("");
    const [isDefault, setIsDefault] = useState(false);

    useEffect(() => {
        if (open) {
            fetchAccounts();
            fetchBanks();
        }
    }, [open]);

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                setStep("list");
                resetForm();
            }, 300);
        }
    }, [open]);

    // Auto-verify when account number is 10 digits and bank is selected
    useEffect(() => {
        if (accountNumber.length === 10 && selectedBank) {
            handleVerify();
        }
    }, [accountNumber, selectedBank]);

    const fetchAccounts = async () => {
        setLoading(true);
        try {
            const result = await getSavedBankAccounts();
            if (result.success && Array.isArray(result.data)) {
                setAccounts(result.data);
                onAccountsUpdated?.(result.data);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchBanks = async () => {
        const result = await getBanksList();
        if (result.success && result.data?.banks) {
            setBanks(result.data.banks);
        }
    };

    const resetForm = () => {
        setAccountNumber("");
        setSelectedBank(null);
        setBankSearch("");
        setVerifiedName("");
        setIsDefault(false);
        setError("");
    };

    const handleVerify = async () => {
        if (!selectedBank) return;
        setVerifying(true);
        setVerifiedName("");
        setError("");
        try {
            const result = await verifyBankAccount(accountNumber, selectedBank.code);
            if (result.success) {
                setVerifiedName(result.data.account_name);
            } else {
                setError(result.error || "Could not verify account");
            }
        } finally {
            setVerifying(false);
        }
    };

    const handleSave = async () => {
        if (!selectedBank || !verifiedName) return;
        setSaving(true);
        setError("");
        try {
            const result = await saveBankAccount({
                account_number: accountNumber,
                account_name: verifiedName,
                bank_code: selectedBank.code,
                bank_name: selectedBank.name,
                is_default: isDefault,
            });
            if (result.success) {
                await fetchAccounts();
                setStep("list");
                resetForm();
            } else {
                setError(result.error || "Failed to save account");
            }
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const result = await deleteBankAccount(id);
            if (result.success) {
                const updated = accounts.filter(a => a.id !== id);
                setAccounts(updated);
                onAccountsUpdated?.(updated);
            }
        } finally {
            setDeletingId(null);
        }
    };

    const filteredBanks = banks.filter(b =>
        b.name.toLowerCase().includes(bankSearch.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-3xl">

                {/* ── Accounts List ── */}
                {step === "list" && (
                    <div className="p-6">
                        <DialogHeader className="mb-5">
                            <DialogTitle className="text-xl font-bold text-gray-900">Bank Accounts</DialogTitle>
                            <p className="text-sm text-gray-500">Manage your withdrawal bank accounts</p>
                        </DialogHeader>

                        {loading ? (
                            <div className="flex justify-center py-8">
                                <Loader2 className="w-6 h-6 animate-spin text-[#C69C2E]" />
                            </div>
                        ) : accounts.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                <Landmark className="w-10 h-10 mx-auto mb-3 opacity-30" />
                                <p className="text-sm">No bank accounts saved yet</p>
                            </div>
                        ) : (
                            <div className="space-y-3 mb-4">
                                {accounts.map(acct => (
                                    <div key={acct.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-all">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-[#C69C2E]">
                                                <Landmark className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-gray-900">{acct.bank_name}</p>
                                                <p className="text-xs text-gray-400">{acct.account_name} · {acct.account_number}</p>
                                                {acct.is_default && (
                                                    <span className="text-[10px] font-bold text-[#C69C2E] uppercase">Default</span>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleDelete(acct.id)}
                                            disabled={deletingId === acct.id}
                                            className="text-red-400 hover:text-red-600 transition-colors"
                                        >
                                            {deletingId === acct.id
                                                ? <Loader2 className="w-4 h-4 animate-spin" />
                                                : <Trash2 className="w-4 h-4" />
                                            }
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <Button
                            onClick={() => setStep("add")}
                            className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Bank Account
                        </Button>
                    </div>
                )}

                {/* ── Add Account Form ── */}
                {step === "add" && (
                    <div className="p-6">
                        <DialogHeader className="mb-5">
                            <DialogTitle className="text-xl font-bold text-gray-900">Add Bank Account</DialogTitle>
                            <p className="text-sm text-gray-500">Enter your account details to verify and save</p>
                        </DialogHeader>

                        <div className="space-y-4">
                            {/* Bank selector */}
                            <div className="relative">
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Bank</label>
                                <button
                                    onClick={() => setShowBankDropdown(!showBankDropdown)}
                                    className="w-full flex items-center justify-between h-12 px-4 border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-gray-300 transition-colors"
                                >
                                    <span className={selectedBank ? "font-medium" : "text-gray-400"}>
                                        {selectedBank?.name || "Select your bank"}
                                    </span>
                                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${showBankDropdown ? "rotate-180" : ""}`} />
                                </button>
                                {showBankDropdown && (
                                    <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl max-h-52 overflow-hidden">
                                        <div className="p-2 border-b border-gray-50">
                                            <Input
                                                placeholder="Search banks..."
                                                value={bankSearch}
                                                onChange={(e) => setBankSearch(e.target.value)}
                                                className="h-8 text-sm border-gray-100"
                                                autoFocus
                                            />
                                        </div>
                                        <div className="overflow-y-auto max-h-40">
                                            {filteredBanks.map(b => (
                                                <button
                                                    key={b.code}
                                                    onClick={() => {
                                                        setSelectedBank(b);
                                                        setShowBankDropdown(false);
                                                        setBankSearch("");
                                                        setVerifiedName("");
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-amber-50 hover:text-[#C69C2E] transition-colors"
                                                >
                                                    {b.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Account number */}
                            <div>
                                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">Account Number</label>
                                <div className="relative">
                                    <Input
                                        type="text"
                                        maxLength={10}
                                        value={accountNumber}
                                        onChange={(e) => {
                                            const v = e.target.value.replace(/\D/g, "");
                                            setAccountNumber(v);
                                            setVerifiedName("");
                                            setError("");
                                        }}
                                        placeholder="10-digit account number"
                                        className="h-12 border-gray-200 rounded-xl pr-10"
                                    />
                                    {verifying && (
                                        <Loader2 className="w-4 h-4 animate-spin text-[#C69C2E] absolute right-3 top-1/2 -translate-y-1/2" />
                                    )}
                                    {verifiedName && !verifying && (
                                        <CheckCircle2 className="w-4 h-4 text-green-500 absolute right-3 top-1/2 -translate-y-1/2" />
                                    )}
                                </div>
                            </div>

                            {/* Verified name */}
                            {verifiedName && (
                                <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-100 rounded-xl">
                                    <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                                    <p className="text-sm font-bold text-green-800">{verifiedName}</p>
                                </div>
                            )}

                            {error && (
                                <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl text-red-600 text-sm">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            {/* Default toggle */}
                            {verifiedName && (
                                <label className="flex items-center gap-3 cursor-pointer select-none">
                                    <div
                                        onClick={() => setIsDefault(!isDefault)}
                                        className={`w-10 h-5 rounded-full transition-colors relative ${isDefault ? "bg-[#C69C2E]" : "bg-gray-200"}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full shadow absolute top-0.5 transition-transform ${isDefault ? "translate-x-5" : "translate-x-0.5"}`} />
                                    </div>
                                    <span className="text-sm text-gray-600">Set as default withdrawal account</span>
                                </label>
                            )}

                            <div className="flex gap-3">
                                <Button
                                    variant="outline"
                                    onClick={() => { setStep("list"); resetForm(); }}
                                    className="flex-1 h-12 rounded-xl border-gray-200"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSave}
                                    disabled={saving || !verifiedName}
                                    className="flex-1 h-12 bg-[#C69C2E] hover:bg-[#b08b29] text-white rounded-xl font-bold"
                                >
                                    {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Account"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
