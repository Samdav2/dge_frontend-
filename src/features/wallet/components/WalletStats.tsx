"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, ArrowUpFromLine, RefreshCw, Copy, CheckCircle2, Gift, ChevronRight, TrendingUp } from "lucide-react";
import { WithdrawalModal } from "./WithdrawalModal";
import { WithdrawalAmountModal } from "./WithdrawalAmountModal";
import { DepositModal } from "./DepositModal";
import { getUserWallet, getUserTransactions } from "../actions";
import { useSession } from "next-auth/react";

interface WalletData {
    wallet_type: "earnings" | "deposit";
    balance_cents: number;
    currency: string;
    id: string;
}

interface BankAccount {
    id: string;
    account_number: string;
    account_name: string;
    bank_code: string;
    bank_name: string;
    is_default: boolean;
}

export function WalletStats() {
    const { data: session } = useSession();
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [isAmountModalOpen, setIsAmountModalOpen] = useState(false);
    const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState<BankAccount | null>(null);
    const [copied, setCopied] = useState(false);

    const [wallets, setWallets] = useState<WalletData[]>([]);
    const [referralEarnings, setReferralEarnings] = useState<number>(0);
    const [loading, setLoading] = useState(true);

    const fetchWalletData = useCallback(async () => {
        setLoading(true);
        try {
            const [walletResult, txnResult] = await Promise.all([
                getUserWallet(),
                getUserTransactions()
            ]);
            
            if (walletResult.success && Array.isArray(walletResult.data)) {
                setWallets(walletResult.data);
            }

            if (txnResult.success && Array.isArray(txnResult.data)) {
                const totalRefEarnings = txnResult.data
                    .filter((txn: any) => txn.reference && txn.reference.startsWith("REF-BONUS-") && txn.status === "completed")
                    .reduce((sum: number, txn: any) => sum + (txn.amount_cents / 100), 0);
                setReferralEarnings(totalRefEarnings);
            }

        } catch (error) {
            console.error("Failed to fetch wallet data:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWalletData();
    }, [fetchWalletData]);

    const getWalletBalance = (type: "earnings" | "deposit") => {
        const wallet = wallets.find(w => w.wallet_type === type);
        return wallet ? wallet.balance_cents / 100 : 0;
    };

    const earningsBalance = getWalletBalance("earnings");
    const depositBalance = getWalletBalance("deposit");
    const totalBalance = earningsBalance + depositBalance;

    const formatAmount = (amount: number) =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: wallets[0]?.currency || "NGN",
            minimumFractionDigits: 2,
        }).format(amount);

    const handleAccountContinue = (account: BankAccount) => {
        setSelectedAccount(account);
        setIsWithdrawModalOpen(false);
        setIsAmountModalOpen(true);
    };

    const referralCode = (session?.user as any)?.referral_code || "N/A";

    const copyToClipboard = () => {
        if (referralCode !== "N/A") {
            navigator.clipboard.writeText(referralCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            {/* Main Banking Card Area */}
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-[2rem] p-6 md:p-8 overflow-hidden shadow-2xl border border-gray-800">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C69C2E]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex flex-col gap-1 w-full">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-400 text-sm font-medium tracking-wide uppercase">
                                Total Available Balance
                            </span>
                            <button
                                onClick={fetchWalletData}
                                className="text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all duration-200"
                                title="Refresh Balance"
                            >
                                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mt-1 truncate">
                            {loading ? (
                                <span className="inline-block w-48 h-10 sm:h-12 bg-white/10 animate-pulse rounded-lg" />
                            ) : formatAmount(totalBalance)}
                        </h1>
                    </div>

                    {/* Quick Actions Row */}
                    <div className="flex items-center gap-2 sm:gap-3 w-full md:w-auto">
                        <button
                            onClick={() => setIsDepositModalOpen(true)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 sm:gap-2 bg-[#C69C2E] hover:bg-[#b08b29] text-white px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold transition-all shadow-lg shadow-[#C69C2E]/20"
                        >
                            <ArrowDownToLine className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">Fund</span>
                        </button>
                        <button
                            onClick={() => setIsWithdrawModalOpen(true)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2.5 sm:px-5 sm:py-3.5 rounded-xl sm:rounded-2xl font-semibold backdrop-blur-md border border-white/10 transition-all"
                        >
                            <ArrowUpFromLine className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span className="text-xs sm:text-sm">Withdraw</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Sub-Balances Grid */}
            <div className="grid grid-cols-2 gap-4">
                {/* Funding Wallet Mini Card */}
                <div className="bg-white p-3.5 sm:p-5 rounded-[1rem] sm:rounded-[1.5rem] border border-gray-100 flex flex-col justify-center shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-yellow-50 flex items-center justify-center shrink-0">
                            <ArrowDownToLine className="w-3 h-3 sm:w-4 sm:h-4 text-[#C69C2E]" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider truncate">Funding</span>
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight truncate">
                        {loading ? (
                            <span className="inline-block w-20 sm:w-24 h-6 sm:h-7 bg-gray-100 animate-pulse rounded-lg" />
                        ) : formatAmount(depositBalance)}
                    </h3>
                </div>

                {/* Earnings Wallet Mini Card */}
                <div className="bg-white p-3.5 sm:p-5 rounded-[1rem] sm:rounded-[1.5rem] border border-gray-100 flex flex-col justify-center shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                            <ArrowUpFromLine className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-600" />
                        </div>
                        <span className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-wider truncate">Earnings</span>
                    </div>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold text-gray-900 tracking-tight truncate">
                        {loading ? (
                            <span className="inline-block w-20 sm:w-24 h-6 sm:h-7 bg-gray-100 animate-pulse rounded-lg" />
                        ) : formatAmount(earningsBalance)}
                    </h3>
                </div>
            </div>

            {/* Compact Referral Banner */}
            <div className="bg-gray-50 rounded-[1.5rem] border border-gray-100 p-5 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm mt-2">
                
                <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <div className="flex items-center gap-1.5 text-[#C69C2E] font-bold text-xs uppercase tracking-widest mb-1.5">
                        <TrendingUp className="w-4 h-4" />
                        Refer & Earn
                    </div>
                    <p className="text-sm text-gray-600 max-w-xs">
                        Earn 5% of your friend's first deposit.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    {/* Total Referral Earnings */}
                    <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Total Earnings</span>
                        <div className="text-base sm:text-lg font-extrabold text-emerald-600 bg-emerald-50 px-4 py-2 sm:py-2.5 rounded-xl border border-emerald-100 w-full text-center truncate">
                            {formatAmount(referralEarnings)}
                        </div>
                    </div>

                    {/* Referral Code */}
                    <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1.5">Your Referral Code</span>
                        <div className="flex items-center w-full sm:w-auto border border-gray-200 rounded-xl overflow-hidden bg-white">
                            <div className="px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-xs sm:text-sm md:text-base font-bold text-gray-900 w-full text-center tracking-wider truncate">
                                {referralCode}
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center justify-center shrink-0 h-full px-3 sm:px-4 py-2 sm:py-2.5 transition-colors ${
                                    copied ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-50 hover:bg-gray-100 text-gray-600'
                                }`}
                            >
                                {copied ? <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Copy className="w-4 h-4 sm:w-5 sm:h-5" />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <DepositModal
                open={isDepositModalOpen}
                onOpenChange={setIsDepositModalOpen}
                onSuccess={fetchWalletData}
            />

            <WithdrawalModal
                open={isWithdrawModalOpen}
                onOpenChange={setIsWithdrawModalOpen}
                onContinue={handleAccountContinue}
            />

            <WithdrawalAmountModal
                open={isAmountModalOpen}
                onOpenChange={setIsAmountModalOpen}
                selectedAccount={selectedAccount}
                earningsBalance={earningsBalance}
                onSuccess={fetchWalletData}
            />
        </div>
    );
}
