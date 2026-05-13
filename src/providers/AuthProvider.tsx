"use client";

import { SessionProvider, useSession, signOut } from "next-auth/react";
import React, { useEffect } from "react";

function SessionErrorHandler({ children }: { children: React.ReactNode }) {
    const { data: session } = useSession();

    useEffect(() => {
        if ((session as any)?.error === "RefreshAccessTokenError") {
            // Force sign out if refresh token fails
            signOut({ callbackUrl: "/login" });
        }
    }, [session]);

    return <>{children}</>;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <SessionErrorHandler>
                {children}
            </SessionErrorHandler>
        </SessionProvider>
    );
}
