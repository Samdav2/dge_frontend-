"use client";

import { Star } from "lucide-react";

interface MarketplaceCardProps {
    title: string;
    description: string;
    price: string;
    category: string;
    author: {
        name: string;
        image: string;
        rating?: number;
    };
    image: string;
    status: "Active" | "Inactive";
    tags?: string[];
}

export function MarketplaceCard({
    title,
    description,
    price,
    category,
    author,
    image,
    status,
    tags
}: MarketplaceCardProps) {
    return (
        <div className="bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#C69C2E] hover:shadow-lg transition-all duration-300 group cursor-pointer">
            <div className="relative h-40 rounded-xl overflow-hidden mb-4">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <span className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-semibold text-[#4CAF50] uppercase tracking-wide">
                        {status}
                    </span>
                </div>
                <div className="absolute bottom-3 left-3 flex gap-1">
                    {tags?.map((tag) => (
                        <span key={tag} className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md text-[10px]">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-gray-900 line-clamp-1">{title}</h3>
                <span className="font-bold text-gray-900">{price}</span>
            </div>

            <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                {description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img src={author.image} alt={author.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{author.name}</span>
                </div>

                {author.rating && (
                    <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#FFB800] text-[#FFB800]" />
                        <span className="text-xs font-medium text-gray-700">{author.rating}</span>
                    </div>
                )}
            </div>
        </div>
    );
}
