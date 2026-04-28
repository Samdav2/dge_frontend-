"use client";

import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog";

interface AcceptNegotiationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onAccept: () => void;
}

export function AcceptNegotiationModal({ open, onOpenChange, onAccept }: AcceptNegotiationModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px] p-0 overflow-hidden rounded-3xl">
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                        <Check className="w-10 h-10 text-green-500" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                        Accept Negotiation
                    </h2>

                    <p className="text-gray-500 mb-8 text-sm">
                        Are you sure you want to accept this negotiation?
                    </p>

                    <div className="flex gap-4 w-full">
                        <Button
                            onClick={onAccept}
                            className="flex-1 bg-green-500 hover:bg-green-600 text-white h-12 rounded-xl"
                        >
                            Yes, Accept
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
