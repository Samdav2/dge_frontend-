"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface SuccessModalProps {
    title: string;
    message: string;
    onClose: () => void;
}

export function SuccessModal({ title, message, onClose }: SuccessModalProps) {
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-8 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#C69C2E]/10 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-[#C69C2E]" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                <p className="text-gray-500 mb-8">{message}</p>

                <Button
                    onClick={onClose}
                    className="w-full h-12 rounded-xl font-bold text-base bg-[#C69C2E] hover:bg-[#b08b29] text-white"
                >
                    Done
                </Button>
            </div>
        </div>
    );
}
