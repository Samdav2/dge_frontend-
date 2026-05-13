"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getBackendImageUrl } from "@/lib/imageUtils";
import FallbackImage from "@/components/ui/FallbackImage";

interface SubmittedJobCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    status: string;
    appliedDate: string;
    isSubmittedByMe?: boolean;
}

export function SubmittedJobCard({
    id,
    title,
    description,
    image,
    status,
    appliedDate,
    isSubmittedByMe,
}: SubmittedJobCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#C69C2E] hover:shadow-lg transition-all duration-300 h-full flex flex-col">
            <div className="relative h-40 md:h-48 rounded-xl overflow-hidden mb-4 shrink-0">
                <FallbackImage
                    src={getBackendImageUrl(image)}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                {isSubmittedByMe !== undefined && (
                    <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded shadow-sm ${
                            isSubmittedByMe ? "bg-orange-100 text-orange-700" : "bg-blue-100 text-blue-700"
                        }`}>
                            {isSubmittedByMe ? "Submitted by Me" : "For My Approval"}
                        </span>
                    </div>
                )}
            </div>

            <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{title}</h3>

            <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed flex-grow">
                {description}
            </p>

            <div className="space-y-1 mb-4">
                <p className="text-xs text-gray-500">
                    Status: <span className={isSubmittedByMe ? "text-orange-600 font-medium" : "text-blue-600 font-medium"}>{status}</span>
                </p>
                <p className="text-xs text-gray-500">
                    Applied: <span className="text-gray-900 font-medium">{appliedDate}</span>
                </p>
            </div>

            <Link href={`/dashboard/my-jobs/submitted/${id}`} className="w-full">
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
