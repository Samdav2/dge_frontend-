"use client";

import React from "react";
import { Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OngoingJobCard } from "./OngoingJobCard";

// Mock data for ongoing jobs
const MOCK_ONGOING_JOBS = [
    {
        id: "1",
        title: "Digital Marketing",
        description: "Fermentum egestas a nec sit scelerisque lobortis aenean feugiat tellus. Aliquam ut auctor morbi sit risus ultrices.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        time: "Ongoing",
        status: "2023-11-25",
    },
    {
        id: "2",
        title: "Digital Marketing",
        description: "Fermentum egestas a nec sit scelerisque lobortis aenean feugiat tellus. Aliquam ut auctor morbi sit risus ultrices.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        time: "Ongoing",
        status: "2023-11-25",
    },
];

export function OngoingJobsTab() {
    // Toggle this to test empty state
    const hasJobs = true;

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

                <Button
                    className="bg-white text-[#C69C2E] border border-[#C69C2E] hover:bg-[#C69C2E] hover:text-white transition-colors px-8 py-2 h-auto"
                >
                    + Apply Job
                </Button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
            {MOCK_ONGOING_JOBS.map((job) => (
                <OngoingJobCard
                    key={job.id}
                    id={job.id}
                    title={job.title}
                    description={job.description}
                    image={job.image}
                    time={job.time}
                    status={job.status}
                />
            ))}
        </div>
    );
}
