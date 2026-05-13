"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateServiceModal } from "./CreateServiceModal";
import { DeleteServiceModal } from "./DeleteServiceModal";
import { getBackendImageUrl } from "@/lib/imageUtils";
import FallbackImage from "@/components/ui/FallbackImage";
import { useRouter } from "next/navigation";
import { useDeleteService } from "../hooks/useMyJobs";

interface ServiceDetailsProps {
    service: {
        id: string;
        name: string;
        description: string;
        price: number;
        discount: boolean;
        discount_percent: number;
        type: string;
        image: string;
        status: string;
        categories: { id: string; name: string }[];
        meta_tags?: string;
        keywords?: string;
    };
}

export function ServiceDetails({ service }: ServiceDetailsProps) {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const router = useRouter();
    const deleteServiceMutation = useDeleteService();

    const handleDelete = async () => {
        try {
            await deleteServiceMutation.mutateAsync(service.id);
            setIsDeleteModalOpen(false);
            router.push("/dashboard/my-jobs");
        } catch (error) {
            console.error("Failed to delete service:", error);
            // You might want to show an error toast here
        }
    };

    // Calculate discounted price
    const discountedPrice = service.discount
        ? service.price - (service.price * service.discount_percent / 100)
        : service.price;

    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
                <Link
                    href="/dashboard/my-jobs"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Services Details</h1>
                <div className="ml-auto text-xs md:text-sm text-gray-500 hidden md:block">
                    <Link href="/dashboard" className="hover:text-gray-900">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/dashboard/my-jobs" className="hover:text-gray-900">My job</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#C69C2E]">Details</span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* Left Column - Main Info */}
                <div className="xl:col-span-2 space-y-6 md:space-y-8">
                    <div className="bg-white rounded-2xl p-4 border border-gray-100">
                        <div className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden mb-6">
                            <FallbackImage
                                src={getBackendImageUrl(service.image)}
                                alt={service.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                            <h2 className="text-xl md:text-2xl font-bold text-gray-900">{service.name}</h2>
                            <div className="flex items-center gap-3">
                                {service.discount && (
                                    <span className="text-gray-400 line-through text-base md:text-lg">
                                        ₦{service.price.toLocaleString()}
                                    </span>
                                )}
                                <span className="text-xl md:text-2xl font-bold text-gray-900">
                                    ₦{(discountedPrice || 0).toLocaleString()}
                                </span>
                            </div>
                        </div>



                        {/* Assuming description is used for both short and long for now, or add more fields if available */}
                        <div className="space-y-4">
                            <h3 className="text-base md:text-lg font-bold text-gray-900">About the Job:</h3>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed whitespace-pre-wrap">
                                {service.description}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Details & Actions */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100">
                        <div className="space-y-6 text-sm md:text-base">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Discount</span>
                                <span className="font-medium text-gray-900">{service.discount ? "Yes" : "No"}</span>
                            </div>
                            {service.discount && (
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-500">Discount Percentage</span>
                                    <span className="font-medium text-gray-900">{service.discount_percent}%</span>
                                </div>
                            )}
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Service Type</span>
                                <span className="font-medium text-gray-900 capitalize">{service.type}</span>
                            </div>
                            <div className="flex justify-between items-start">
                                <span className="text-gray-500">Keywords</span>
                                <div className="flex flex-wrap gap-1 justify-end max-w-[200px]">
                                    {(service.keywords || service.meta_tags || "None").split(',').map((keyword, index) => (
                                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                                            {keyword.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Category</span>
                                <span className="font-medium text-gray-900">
                                    {service.categories?.[0]?.name || "Uncategorized"}
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mt-8">
                            <Button
                                onClick={() => setIsEditModalOpen(true)}
                                className="flex-1 bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl gap-2"
                            >
                                <Edit className="w-4 h-4" />
                                Edit Service
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="flex-1 border-red-500 text-red-500 hover:bg-red-50 h-12 rounded-xl gap-2"
                                disabled={deleteServiceMutation.isPending}
                            >
                                <Trash2 className="w-4 h-4" />
                                {deleteServiceMutation.isPending ? "Deleting..." : "Delete Service"}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <CreateServiceModal
                open={isEditModalOpen}
                onOpenChange={setIsEditModalOpen}
                mode="edit"
                serviceToEdit={service}
            />

            <DeleteServiceModal
                open={isDeleteModalOpen}
                onOpenChange={setIsDeleteModalOpen}
                onDelete={handleDelete}
            />
        </div>
    );
}
