"use client";

import { Send } from "lucide-react";

export function VerifyEmailContent() {
    return (
        <div className="w-full max-w-md mx-auto text-center">
            <div className="flex justify-center mb-8">
                <div className="w-24 h-24 bg-[#FFFBF0] rounded-full flex items-center justify-center">
                    <Send className="w-10 h-10 text-primary ml-1 mt-1" />
                </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">Check your email</h1>

            <p className="text-muted-foreground text-sm mb-8 leading-relaxed max-w-xs mx-auto">
                We&apos;ve sent an email to <span className="font-medium text-foreground">example@gmail.com</span>, it is important to verify your email address to guarantee the best performance from DGE
            </p>

            <button
                className="text-primary text-sm font-medium hover:underline"
                onClick={() => console.log("Resend email")}
            >
                Resend email
            </button>
        </div>
    );
}
