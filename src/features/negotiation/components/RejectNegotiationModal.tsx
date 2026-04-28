"use client";

import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

interface RejectNegotiationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onReject: () => void;
}

export function RejectNegotiationModal({ open, onOpenChange, onReject }: RejectNegotiationModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden rounded-3xl">
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
                        <X className="w-10 h-10 text-red-500" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Reject Negotiation
                    </h2>

                    <p className="text-gray-500 mb-8 text-sm">
                        Are you sure you want to reject this negotiation?
                    </p>

                    <div className="flex gap-4 w-full">
                        <Button
                            onClick={onReject}
                            className="flex-1 bg-red-500 hover:bg-red-600 text-white h-12 rounded-xl"
                        >
                            Yes, Reject
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="flex-1 border-[#C69C2E] text-[#C69C2E] hover:bg-[#C69C2E] hover:text-white h-12 rounded-xl"
                        >
                            No, Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
