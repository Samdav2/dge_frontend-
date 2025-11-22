"use client";

import { X } from "lucide-react";

interface ResetPasswordFailureContentProps {
    onRetry: () => void;
}

export function ResetPasswordFailureContent({ onRetry }: ResetPasswordFailureContentProps) {
    return (
        <div className="w-full max-w-md mx-auto text-center">
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-[#FFEBEE] rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#F44336] rounded-full flex items-center justify-center">
                        <X className="w-6 h-6 text-white" strokeWidth={3} />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">Password Reset Failed</h1>

            <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                Something went wrong while resetting your password. Please try again.
            </p>

            <button
                className="text-[#C69C2E] text-sm font-medium hover:underline"
                onClick={onRetry}
            >
                Try again
            </button>
        </div>
    );
}
