"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OngoingJobCard } from "./OngoingJobCard";
import { useMyOngoingJobs } from "../hooks/useMyJobs";
import { Escrow } from "@/types/marketplace";

export function OngoingJobsTab() {
    const { data: escrows, isLoading, error } = useMyOngoingJobs();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl">
                <Loader2 className="w-10 h-10 text-[#C69C2E] animate-spin" />
                <p className="mt-4 text-gray-500 font-medium text-sm md:text-base">Loading ongoing jobs...</p>
            </div>
        );
    }

    const hasJobs = escrows && escrows.length > 0;

    if (!hasJobs) {
        return (
            <div className="flex flex-col items-center justify-center py-8 md:py-20 bg-white rounded-2xl">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No ongoing jobs
                </h3>

                <p className="text-gray-500 text-center mb-8 max-w-sm px-4">
                    You have no ongoing job yet
                </p>

                <Link href="/dashboard/marketplace" passHref>
                    <Button
                        asChild
                        className="bg-white text-[#C69C2E] border border-[#C69C2E] hover:bg-[#C69C2E] hover:text-white transition-colors px-8 py-2 h-auto"
                    >
                        <span>Find a Job</span>
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {escrows.map((escrow: Escrow) => {
                const service = escrow.price_negotiation?.services;
                return (
                    <OngoingJobCard
                        key={escrow.id}
                        id={escrow.id}
                        title={service?.name || "Job Title"}
                        description={service?.description || "No description available"}
                        image={service?.image || ""}
                        time={new Date(escrow.created_at).toLocaleDateString()}
                        status={escrow.status.toUpperCase()}
                    />
                );
            })}
        </div>
    );
}
