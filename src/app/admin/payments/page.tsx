"use client";

import React, { useState, useEffect } from "react";
import { 
    Wallet, 
    ArrowUpFromLine, 
    ArrowDownToLine, 
    Settings, 
    CheckCircle2, 
    XCircle, 
    Loader2, 
    Search,
    Filter,
    MoreVertical,
    Clock,
    AlertCircle,
    Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table";
import { 
    Dialog, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

export default function AdminPaymentsPage() {
    const [settings, setSettings] = useState({
        auto_approve_withdrawals: false,
        screen_deposits: false,
    });
    const [withdrawals, setWithdrawals] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingSettings, setUpdatingSettings] = useState(false);
    
    // Approval/Rejection State
    const [selectedWithdrawal, setSelectedWithdrawal] = useState<any>(null);
    const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
    const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
    const [rejectionReason, setRejectionReason] = useState("");
    const [processingAction, setProcessingAction] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [settingsRes, withdrawalsRes, depositsRes] = await Promise.all([
                fetch("/api/admin/payment-settings"),
                fetch("/api/admin/withdrawals?status=pending"),
                fetch("/api/admin/deposits?status=screened_pending")
            ]);

            if (settingsRes.ok) setSettings(await settingsRes.json());
            if (withdrawalsRes.ok) {
                const data = await withdrawalsRes.json();
                setWithdrawals(data.withdrawals || []);
            }
            if (depositsRes.ok) {
                const data = await depositsRes.json();
                setDeposits(data.deposits || []);
            }
        } catch (error) {
            console.error("Error fetching payment data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleSetting = async (key: string, value: boolean) => {
        setUpdatingSettings(true);
        try {
            const res = await fetch("/api/admin/payment-settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ [key]: value })
            });
            if (res.ok) {
                setSettings(prev => ({ ...prev, [key]: value }));
            }
        } catch (error) {
            console.error("Error updating settings:", error);
        } finally {
            setUpdatingSettings(false);
        }
    };

    const handleWithdrawalAction = async (action: 'approve' | 'reject') => {
        if (!selectedWithdrawal) return;
        setProcessingAction(true);
        try {
            const res = await fetch(`/api/admin/withdrawals?id=${selectedWithdrawal.id}&action=${action}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: action === 'reject' ? JSON.stringify({ reason: rejectionReason }) : undefined
            });

            if (res.ok) {
                setIsApproveModalOpen(false);
                setIsRejectModalOpen(false);
                setRejectionReason("");
                fetchData(); // Refresh list
            }
        } catch (error) {
            console.error(`Error ${action}ing withdrawal:`, error);
        } finally {
            setProcessingAction(false);
        }
    };

    const handleApproveDeposit = async (id: string) => {
        try {
            const res = await fetch(`/api/admin/deposits?id=${id}&action=approve`, {
                method: "POST"
            });
            if (res.ok) {
                fetchData();
            }
        } catch (error) {
            console.error("Error approving deposit:", error);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
        }).format(amount / 100);
    };

    return (
        <div className="p-6 lg:p-10 space-y-8 max-w-[1600px] mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Payment Management</h1>
                    <p className="text-slate-500 mt-1">Configure gateway settings and manage financial operations</p>
                </div>
            </div>

            {/* Settings Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <Settings className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Auto-approve Withdrawals</h3>
                            <p className="text-sm text-slate-500">Bypass manual review for all withdrawal requests</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleToggleSetting('auto_approve_withdrawals', !settings.auto_approve_withdrawals)}
                        disabled={updatingSettings}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.auto_approve_withdrawals ? 'bg-amber-600' : 'bg-slate-200'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.auto_approve_withdrawals ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <Filter className="w-6 h-6" />
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-800">Screen Deposits</h3>
                            <p className="text-sm text-slate-500">Require admin approval before crediting wallets</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => handleToggleSetting('screen_deposits', !settings.screen_deposits)}
                        disabled={updatingSettings}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${settings.screen_deposits ? 'bg-amber-600' : 'bg-slate-200'}`}
                    >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${settings.screen_deposits ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                </div>
            </div>

            {/* Main Tabs */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <Tabs defaultValue="withdrawals" className="w-full">
                    <div className="px-6 py-4 border-b border-slate-50 bg-slate-50/30">
                        <TabsList className="bg-slate-100/50 p-1">
                            <TabsTrigger value="withdrawals" className="data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm px-6">
                                Withdrawal Queue
                                {withdrawals.length > 0 && <Badge className="ml-2 bg-amber-100 text-amber-700 hover:bg-amber-100 border-none">{withdrawals.length}</Badge>}
                            </TabsTrigger>
                            <TabsTrigger value="deposits" className="data-[state=active]:bg-white data-[state=active]:text-amber-600 data-[state=active]:shadow-sm px-6">
                                Deposit Queue
                                {deposits.length > 0 && <Badge className="ml-2 bg-blue-100 text-blue-700 hover:bg-blue-100 border-none">{deposits.length}</Badge>}
                            </TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="withdrawals" className="m-0">
                        <div className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow>
                                        <TableHead className="pl-6 font-bold text-slate-700">User</TableHead>
                                        <TableHead className="font-bold text-slate-700">Amount</TableHead>
                                        <TableHead className="font-bold text-slate-700">Bank Details</TableHead>
                                        <TableHead className="font-bold text-slate-700">Date</TableHead>
                                        <TableHead className="font-bold text-slate-700">Status</TableHead>
                                        <TableHead className="pr-6 text-right font-bold text-slate-700">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-40 text-center">
                                                <div className="flex items-center justify-center gap-2 text-slate-500">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Loading withdrawals...
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : withdrawals.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-40 text-center">
                                                <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                                                    <Clock className="w-10 h-10 opacity-20" />
                                                    <p>No pending withdrawals at the moment</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        withdrawals.map((w: any) => (
                                            <TableRow key={w.id} className="hover:bg-slate-50/50 transition-colors">
                                                <TableCell className="pl-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-800">{w.user_name}</span>
                                                        <span className="text-xs text-slate-500">{w.user_email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-bold text-amber-600">{w.amount}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium">{w.bank_name}</span>
                                                        <span className="text-xs text-slate-500">{w.bank_account_number}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-sm text-slate-500">
                                                    {new Date(w.created_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none capitalize">
                                                        {w.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="pr-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline" 
                                                            className="h-8 border-green-200 text-green-700 hover:bg-green-50"
                                                            onClick={() => {
                                                                setSelectedWithdrawal(w);
                                                                setIsApproveModalOpen(true);
                                                            }}
                                                        >
                                                            Approve
                                                        </Button>
                                                        <Button 
                                                            size="sm" 
                                                            variant="outline" 
                                                            className="h-8 border-red-200 text-red-700 hover:bg-red-50"
                                                            onClick={() => {
                                                                setSelectedWithdrawal(w);
                                                                setIsRejectModalOpen(true);
                                                            }}
                                                        >
                                                            Reject
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>

                    <TabsContent value="deposits" className="m-0">
                        <div className="p-0">
                            <Table>
                                <TableHeader className="bg-slate-50/50">
                                    <TableRow>
                                        <TableHead className="pl-6 font-bold text-slate-700">User</TableHead>
                                        <TableHead className="font-bold text-slate-700">Amount</TableHead>
                                        <TableHead className="font-bold text-slate-700">Reference</TableHead>
                                        <TableHead className="font-bold text-slate-700">Date</TableHead>
                                        <TableHead className="pr-6 text-right font-bold text-slate-700">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {loading ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-40 text-center">
                                                <div className="flex items-center justify-center gap-2 text-slate-500">
                                                    <Loader2 className="w-5 h-5 animate-spin" />
                                                    Loading deposits...
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : deposits.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-40 text-center">
                                                <div className="flex flex-col items-center justify-center gap-2 text-slate-400">
                                                    <ArrowDownToLine className="w-10 h-10 opacity-20" />
                                                    <p>No pending deposits awaiting screening</p>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        deposits.map((d: any) => (
                                            <TableRow key={d.id} className="hover:bg-slate-50/50 transition-colors">
                                                <TableCell className="pl-6 py-4">
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-slate-800">{d.user_name}</span>
                                                        <span className="text-xs text-slate-500">{d.user_email}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-bold text-green-600">{d.amount}</TableCell>
                                                <TableCell className="text-xs font-mono text-slate-500">{d.monnify_reference}</TableCell>
                                                <TableCell className="text-sm text-slate-500">
                                                    {new Date(d.created_at).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="pr-6 text-right">
                                                    <Button 
                                                        size="sm" 
                                                        className="h-8 bg-[#C69C2E] hover:bg-[#b08b29] text-white"
                                                        onClick={() => handleApproveDeposit(d.id)}
                                                    >
                                                        Approve Deposit
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Approval Modal */}
            <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
                <DialogContent className="sm:max-w-[420px] rounded-3xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-green-600" />
                            Approve Withdrawal
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            You are about to release <span className="font-bold text-slate-800">{selectedWithdrawal?.amount}</span> to <span className="font-bold text-slate-800">{selectedWithdrawal?.bank_account_name}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-slate-500">Bank:</span>
                            <span className="font-medium text-slate-700">{selectedWithdrawal?.bank_name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-slate-500">Account:</span>
                            <span className="font-medium text-slate-700">{selectedWithdrawal?.bank_account_number}</span>
                        </div>
                    </div>
                    <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                        <Button variant="outline" className="rounded-xl flex-1 h-11" onClick={() => setIsApproveModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button 
                            className="bg-green-600 hover:bg-green-700 text-white rounded-xl flex-1 h-11"
                            disabled={processingAction}
                            onClick={() => handleWithdrawalAction('approve')}
                        >
                            {processingAction ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Approval"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Rejection Modal */}
            <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
                <DialogContent className="sm:max-w-[420px] rounded-3xl p-6">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold flex items-center gap-2 text-red-600">
                            <XCircle className="w-6 h-6" />
                            Reject Withdrawal
                        </DialogTitle>
                        <DialogDescription className="pt-2">
                            Please provide a reason for rejecting this withdrawal request. This will be visible to the user.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        <textarea 
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="Reason for rejection..."
                            className="w-full h-32 p-3 rounded-2xl border border-slate-200 focus:ring-1 focus:ring-amber-500 focus:border-amber-500 outline-none text-sm resize-none"
                        />
                    </div>
                    <DialogFooter className="mt-6 flex-col sm:flex-row gap-2">
                        <Button variant="outline" className="rounded-xl flex-1 h-11" onClick={() => setIsRejectModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button 
                            className="bg-red-600 hover:bg-red-700 text-white rounded-xl flex-1 h-11"
                            disabled={processingAction || !rejectionReason.trim()}
                            onClick={() => handleWithdrawalAction('reject')}
                        >
                            {processingAction ? <Loader2 className="w-5 h-5 animate-spin" /> : "Confirm Rejection"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
