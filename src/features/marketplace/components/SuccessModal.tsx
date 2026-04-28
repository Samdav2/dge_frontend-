"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    actionLabel?: string;
}

export function SuccessModal({ isOpen, onClose, title, message, actionLabel = "Apply" }: SuccessModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[400px] p-8 rounded-3xl flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <div className="w-8 h-8 rounded-full bg-[#4CAF50] flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-500 text-sm mb-6">{message}</p>

                {/* The design shows buttons in the background, but usually a success modal might have a close button or auto-close.
                    The provided image shows the modal overlaying the page.
                    I'll add a close button or just let the user click outside/close icon.
                    Wait, the image doesn't show a button inside the modal, just the content.
                    I'll stick to the content shown. */}
            </DialogContent>
        </Dialog>
    );
}
