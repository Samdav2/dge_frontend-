"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { getBackendImageUrl } from "@/lib/imageUtils";
import { useState } from "react";
import { ProfilePreviewModal } from "./ProfilePreviewModal";
import FallbackImage from "@/components/ui/FallbackImage";

interface MarketplaceCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    discount: boolean;
    discount_percent: number;
    type: string;
    category?: string;
    author?: {
        name: string;
        image?: string;
        rating?: number;
        email?: string;
        // Extended profile data
        title?: string;
        reviewsCount?: number;
        description?: string;
        phone?: string;
        altPhone?: string;
        website?: string;
        facebook?: string;
        youtube?: string;
        twitter?: string;
        instagram?: string;
        media?: string[];
    };
    image: string;
    status?: string;
    tags?: string[];
}

export function MarketplaceCard({
    id,
    title,
    description,
    price,
    discount,
    discount_percent,
    type,
    category,
    author,
    image,
    status,
    tags
}: MarketplaceCardProps) {
    // Calculate discounted price
    const finalPrice = discount ? price - (price * discount_percent / 100) : price;

    // Format currency
    const formatPrice = (amount: number) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

    const handleProfileClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsProfileModalOpen(true);
    };

    return (
        <>
            <Link href={`/dashboard/marketplace/${id}`}>
                <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#C69C2E] hover:shadow-lg transition-all duration-300 group cursor-pointer h-full flex flex-col">
                    <div className="relative h-40 rounded-xl overflow-hidden mb-4 shrink-0">
                        <FallbackImage
                            src={getBackendImageUrl(image)}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 right-3">
                            <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-semibold text-[#4CAF50] uppercase tracking-wide">
                                {status || "Active"}
                            </span>
                        </div>
                        {discount && (
                            <div className="absolute top-3 left-3">
                                <span className="bg-red-500 text-white px-2 py-1 rounded-md text-[10px] font-bold">
                                    -{discount_percent}%
                                </span>
                            </div>
                        )}
                    </div>


                    <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-gray-900 line-clamp-1">{title}</h3>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium capitalize ${type.toLowerCase() === 'online'
                                ? 'bg-blue-50 text-blue-600'
                                : 'bg-green-50 text-green-600'
                                }`}>
                                {type}
                            </span>
                        </div>
                        <div className="flex flex-col items-end shrink-0">
                            <span className="font-bold text-gray-900">{formatPrice(finalPrice)}</span>
                            {discount && (
                                <span className="text-xs text-gray-400 line-through">
                                    {formatPrice(price)}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-4">
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-2">
                            {description}
                        </p>
                        {category && (
                            <p className="text-xs text-gray-400">
                                Category: <span className="text-gray-600">{category}</span>
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                        {author ? (
                            <div
                                className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded-lg transition-colors"
                                onClick={handleProfileClick}
                            >
                                <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                    {author.image ? (
                                        <FallbackImage src={getBackendImageUrl(author.image)} alt={author.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xs font-bold text-gray-500">{author.name.charAt(0).toUpperCase()}</span>
                                    )}
                                </div>
                                <span className="text-xs font-medium text-gray-700">{author.name}</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <div className="w-6 h-6 rounded-full bg-gray-200" />
                                <span className="text-xs font-medium text-gray-400">Unknown</span>
                            </div>
                        )}

                        {author?.rating !== undefined && (
                            <div className="flex items-center gap-1">
                                <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                                <span className="text-xs font-medium text-gray-700">{author.rating}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link >

            {author && (
                <ProfilePreviewModal
                    isOpen={isProfileModalOpen}
                    onClose={() => setIsProfileModalOpen(false)}
                    user={author}
                />
            )}
        </>
    );
}
