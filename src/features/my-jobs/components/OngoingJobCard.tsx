"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBackendImageUrl } from "@/lib/imageUtils";

interface OngoingJobCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    time: string;
    status: string;
}

export function OngoingJobCard({
    id,
    title,
    description,
    image,
    time,
    status,
}: OngoingJobCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#C69C2E] hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <div className="relative h-40 md:h-48 rounded-xl overflow-hidden mb-4 shrink-0">
                <img
                    src={getBackendImageUrl(image)}
                    alt={title}
                    className="w-full h-full object-cover"
                />
            </div>

            <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>

            <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed flex-grow">
                {description}
            </p>

            <div className="space-y-1 mb-4">
                <p className="text-xs text-gray-500">
                    Time: <span className="text-gray-900 font-medium">{time}</span>
                </p>
                <p className="text-xs text-gray-500">
                    Status: <span className="text-gray-900 font-medium">{status}</span>
                </p>
            </div>

            <Link href={`/dashboard/my-jobs/ongoing/${id}`} className="w-full">
                <Button
                    variant="outline"
                    className="w-full border-[#C69C2E] text-[#C69C2E] hover:bg-[#C69C2E] hover:text-white transition-colors h-11 md:h-10 rounded-xl font-medium"
                >
                    View details
                </Button>
            </Link>
        </div>
    );
}
