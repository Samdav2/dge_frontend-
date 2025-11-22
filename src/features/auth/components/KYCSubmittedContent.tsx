"use client";

import { Check } from "lucide-react";
import Link from "next/link";

export function KYCSubmittedContent() {
    return (
        <div className="w-full max-w-md mx-auto text-center">
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-[#FFFBF0] rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-[#C69C2E] rounded-full flex items-center justify-center">
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    </div>
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">KYC Verification Submitted</h1>

            <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                Your KYC verification has been submitted and is currently in progress. We will notify you once the review is complete.
            </p>

            <Link
                href="/login"
                className="text-[#C69C2E] text-sm font-medium hover:underline"
            >
                Login to your account
            </Link>
        </div>
    );
}
