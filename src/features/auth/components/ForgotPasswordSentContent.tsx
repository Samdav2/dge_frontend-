"use client";

import { Send } from "lucide-react";
import { useState, useEffect } from "react";

interface ForgotPasswordSentContentProps {
    email: string;
    onResend: () => void;
}

export function ForgotPasswordSentContent({ email, onResend }: ForgotPasswordSentContentProps) {
    const [timeLeft, setTimeLeft] = useState(15);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    const handleResendClick = () => {
        onResend();
        setTimeLeft(15);
    };

    return (
        <div className="w-full max-w-md mx-auto text-center">
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-[#FFFBF0] rounded-full flex items-center justify-center">
                    <Send className="w-10 h-10 text-primary ml-1 mt-1" />
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">Check your email</h1>

            <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                We&apos;ve sent an email to <span className="font-medium text-foreground">{email}</span>. Password reset instruction will be sent there
            </p>

            <button
                className={`text-sm font-medium ${timeLeft > 0 ? "text-muted-foreground cursor-not-allowed" : "text-primary hover:underline"}`}
                onClick={handleResendClick}
                disabled={timeLeft > 0}
            >
                {timeLeft > 0 ? `Resend email in ${timeLeft}s` : "Resend or change email"}
            </button>
        </div>
    );
}
