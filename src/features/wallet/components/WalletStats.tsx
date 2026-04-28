"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Wallet, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";
import { WithdrawalModal } from "./WithdrawalModal";
import { WithdrawalAmountModal } from "./WithdrawalAmountModal";
import { WithdrawalSuccessModal } from "./WithdrawalSuccessModal";
import { getUserWallet } from "../actions";

interface WalletData {
    wallet_type: "earnings" | "deposit";
    balance_cents: number;
    currency: string;
    id: string;
}

export function WalletStats() {
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const [wallets, setWallets] = useState<WalletData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const result = await getUserWallet();
                if (result.success && Array.isArray(result.data)) {
                    setWallets(result.data);
                }
            } catch (error) {
                console.error("Failed to fetch wallet:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWallet();
    }, []);

    const getWalletBalance = (type: "earnings" | "deposit") => {
        const wallet = wallets.find(w => w.wallet_type === type);
        return wallet ? wallet.balance_cents / 100 : 0; // Convert cents to main unit
    };

    const getCurrencySymbol = () => {
        const wallet = wallets[0];
        if (!wallet) return "₦"; // Default
        return wallet.currency === "USD" ? "$" : "₦";
    };

    const earningsBalance = getWalletBalance("earnings");
    const depositBalance = getWalletBalance("deposit");
    const totalBalance = earningsBalance + depositBalance;
    const currencySymbol = getCurrencySymbol();

    const formatAmount = (amount: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: wallets[0]?.currency || 'NGN',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const handleAccountContinue = () => {
        setIsWithdrawModalOpen(false);
        setIsAmountModalOpen(true);
    };

    const handleWithdraw = (amount: string) => {
        console.log("Withdrawing:", amount);
        setIsAmountModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Total Wallet Balance */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center h-[200px] relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#C69C2E]/20" />
                    <div className="mb-2">
                        <span className="px-4 py-1.5 rounded-full bg-[#C69C2E]/10 text-[#C69C2E] text-xs font-bold uppercase tracking-wider">
                            Total Wallet Balance
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">
                        {loading ? "..." : formatAmount(totalBalance)}
                    </h3>

                    {/* Decorative background circle */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#C69C2E]/5 rounded-full blur-2xl group-hover:bg-[#C69C2E]/10 transition-all" />
                </div>

                {/* Earning Wallet Balance */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center h-[200px] relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#C69C2E]/20" />
                    <div className="mb-2">
                        <span className="px-4 py-1.5 rounded-full bg-[#C69C2E]/10 text-[#C69C2E] text-xs font-bold uppercase tracking-wider">
                            Earning Wallet Balance
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                        {loading ? "..." : formatAmount(earningsBalance)}
                    </h3>
                    <Button
                        onClick={() => setIsWithdrawModalOpen(true)}
                        className="w-full max-w-[200px] bg-[#C69C2E] hover:bg-[#b08b29] text-white rounded-xl h-10 text-sm font-medium gap-2"
                    >
                        <ArrowUpFromLine className="w-4 h-4" />
                        Withdraw Earnings
                    </Button>
                </div>

                {/* Funding Wallet */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center h-[200px] relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#C69C2E]/20" />
                    <div className="mb-2">
                        <span className="px-4 py-1.5 rounded-full bg-[#C69C2E]/10 text-[#C69C2E] text-xs font-bold uppercase tracking-wider">
                            Funding Wallet
                        </span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2 mb-6">
                        {loading ? "..." : formatAmount(depositBalance)}
                    </h3>
                    <Button className="w-full max-w-[200px] bg-[#C69C2E] hover:bg-[#b08b29] text-white rounded-xl h-10 text-sm font-medium gap-2">
                        <ArrowDownToLine className="w-4 h-4" />
                        Fund Account
                    </Button>
                </div>
            </div>

            <WithdrawalModal
                open={isWithdrawModalOpen}
                onOpenChange={setIsWithdrawModalOpen}
                onContinue={handleAccountContinue}
            />

            <WithdrawalAmountModal
                open={isAmountModalOpen}
                onOpenChange={setIsAmountModalOpen}
                onWithdraw={handleWithdraw}
            />

            <WithdrawalSuccessModal
                open={isSuccessModalOpen}
                onOpenChange={setIsSuccessModalOpen}
            />
        </>
    );
}
