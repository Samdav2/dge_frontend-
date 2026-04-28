"use client";

import { useEffect, useState } from "react";
import { ServiceDetails } from "@/features/my-jobs/components/ServiceDetails";
import { useParams } from "next/navigation";
import { getService } from "@/features/my-jobs/actions";
import { Loader2 } from "lucide-react";

export default function ServiceDetailsPage() {
    const params = useParams();
    const id = params.id as string;
    const [service, setService] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchService = async () => {
            if (!id) return;

            try {
                const result = await getService(id);
                if (result.success) {
                    // The backend returns { service: { ... }, ... } so we need to extract the service object
                    console.log("Service data fetched:", result.data);
                    setService(result.data.service || result.data);
                } else {
                    setError(result.error || "Failed to fetch service details");
                }
            } catch (err) {
                console.error("Error fetching service:", err);
                setError("An unexpected error occurred");
            } finally {
                setIsLoading(false);
            }
        };

        fetchService();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-[#C69C2E]" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-96 text-red-500">
                {error}
            </div>
        );
    }

    if (!service) {
        return (
            <div className="flex justify-center items-center h-96 text-gray-500">
                Service not found
            </div>
        );
    }

    return <ServiceDetails service={service} />;
}
