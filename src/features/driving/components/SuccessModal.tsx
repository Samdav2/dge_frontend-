"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Check, Sparkles } from "lucide-react";

interface SuccessModalProps {
    title: string;
    message: string;
    onClose: () => void;
}

export function SuccessModal({ title, message, onClose }: SuccessModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-sm p-8 flex flex-col items-center text-center shadow-2xl overflow-hidden relative">
                {/* Background decoration */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#C69C2E]/5 to-transparent" />
                
                <div className="relative z-10">
                    {/* Success icon with rings */}
                    <div className="relative mb-6">
                        <div className="w-18 h-18 rounded-2xl bg-gradient-to-br from-[#C69C2E]/20 to-[#C69C2E]/10 flex items-center justify-center mx-auto p-4">
                            <div className="w-12 h-12 rounded-xl bg-[#C69C2E] flex items-center justify-center shadow-lg shadow-[#C69C2E]/25">
                                <Check className="w-6 h-6 text-white" strokeWidth={3} />
                            </div>
                        </div>
                        {/* Decorative sparkle */}
                        <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#C69C2E]/40" />
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                    <p className="text-sm text-gray-400 mb-8 leading-relaxed max-w-[260px]">{message}</p>

                    <Button
                        onClick={onClose}
                        className="w-full h-12 rounded-xl font-bold text-sm bg-[#C69C2E] hover:bg-[#b08b29] text-white transition-all hover:shadow-lg hover:shadow-[#C69C2E]/20"
                    >
                        Done
                    </Button>
                </div>
            </div>
        </div>
    );
}
