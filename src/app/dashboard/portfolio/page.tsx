import { PortfolioSetupForm } from "@/features/portfolio/components/PortfolioSetupForm";
import { PortfolioLayout } from "@/features/portfolio/components/PortfolioLayout";

export default function PortfolioPage() {
    return (
        <PortfolioLayout>
            <PortfolioSetupForm />
        </PortfolioLayout>
    );
}
