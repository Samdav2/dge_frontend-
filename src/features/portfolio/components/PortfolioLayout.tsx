import { ReactNode } from "react";

interface PortfolioLayoutProps {
    children: ReactNode;
}

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}
