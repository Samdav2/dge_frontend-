"use client";

import React from "react";
import Link from "next/link";
import { Briefcase, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { SubmittedJobCard } from "./SubmittedJobCard";
import { useMySubmittedJobs } from "../hooks/useMyJobs";
import { WorkSubmission } from "@/types/marketplace";

export function SubmittedJobsTab() {
    const { data: submissions, isLoading } = useMySubmittedJobs();

    const { data: session } = useSession();

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl">
                <Loader2 className="w-10 h-10 text-[#C69C2E] animate-spin" />
                <p className="mt-4 text-gray-500 font-medium text-sm md:text-base">Loading submitted jobs...</p>
            </div>
        );
    }

    const hasJobs = submissions && submissions.length > 0;

    if (!hasJobs) {
        return (
            <div className="flex flex-col items-center justify-center py-8 md:py-20 bg-white rounded-2xl">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                    <Briefcase className="w-8 h-8 text-gray-400" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Submitted Jobs
                </h3>

                <p className="text-gray-500 text-center mb-8 max-w-sm px-4">
                    You have no submitted job yet
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
            {submissions.map((sub: WorkSubmission) => {
                const isSubmittedByMe = session?.user?.id === sub.user_id;
                
                return (
                    <SubmittedJobCard
                        key={sub.id}
                        id={sub.id}
                        title={sub.service?.name || "Job Title"}
                        description={sub.service?.description || "No description available"}
                        image={sub.service?.image || ""}
                        status={isSubmittedByMe ? "SUBMITTED BY ME" : "FOR MY APPROVAL"}
                        isSubmittedByMe={isSubmittedByMe}
                        appliedDate={new Date(sub.created_at).toLocaleDateString()}
                    />
                );
            })}
        </div>
    );
}
