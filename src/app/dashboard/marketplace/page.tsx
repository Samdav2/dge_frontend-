"use client";

import { MarketplaceCard } from "@/features/marketplace/components/MarketplaceCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useServices } from "@/features/marketplace/hooks/useMarketplace";

export default function MarketplacePage() {
    const { data: services, isLoading, error } = useServices(false);

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Marketplace</h1>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-[#C69C2E]">Marketplace</span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col gap-4">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search Service, Job Title.."
                        className="pl-10 h-11 bg-gray-50 border-none rounded-xl w-full"
                    />
                </div>
                <div className="flex gap-4 w-full">
                    <Select>
                        <SelectTrigger className="flex-1 h-11 rounded-xl bg-white border-gray-200">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <SlidersHorizontal className="w-4 h-4 shrink-0" />
                                <SelectValue placeholder="Category" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="digital">Digital</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="technical">Technical</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select>
                        <SelectTrigger className="flex-1 h-11 rounded-xl bg-white border-gray-200">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <SlidersHorizontal className="w-4 h-4 shrink-0" />
                                <SelectValue placeholder="Service Type" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="online">Online</SelectItem>
                            <SelectItem value="offline">Offline</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Grid */}
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-[#C69C2E]" />
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-64 text-red-500">
                    {(error as Error).message || "Failed to fetch services"}
                </div>
            ) : !services || services.length === 0 ? (
                <div className="flex justify-center items-center h-64 text-gray-500">
                    No services found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((item: any, index: number) => {
                        // Handle both old and new response structures for backward compatibility
                        const service = item.service || item;
                        const profile = item.profile;
                        const user = item.user;
                        const portfolio = item.portfolio || [];

                        // Extract social links from the first portfolio item that has them, or default to empty
                        const socialLinks = portfolio.find((p: any) => p.website || p.facebook || p.twitter || p.instagram || p.youtube) || {};

                        // Generate random avatar if no avatar_url is provided
                        // Using ui-avatars.com for reliable random avatars based on username
                        const avatarUrl = profile?.avatar_url || service.user_picture;
                        const displayAvatar = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(service.username || 'User')}&background=random`;

                        // Debug logging
                        if (!avatarUrl) {
                            console.log(`[Marketplace] No avatar_url for ${service.username}, using fallback: ${displayAvatar}`);
                        }

                        return (
                            <MarketplaceCard
                                key={service.id || index}
                                id={service.id}
                                title={service.name}
                                description={service.description}
                                price={service.price}
                                discount={service.discount}
                                discount_percent={service.discount_percent}
                                type={service.type}
                                image={service.image}
                                author={{
                                    name: service.username,
                                    image: displayAvatar,
                                    rating: service.upvotes,
                                    email: user?.email || service.user_id,
                                    // Extended profile data
                                    title: profile?.bio ? profile.bio.substring(0, 50) + "..." : "Service Provider", // Use bio as title/tagline
                                    description: profile?.bio || "No description available.",
                                    phone: profile?.phone || "",
                                    altPhone: "", // Not in new response
                                    website: socialLinks.website || "",
                                    facebook: socialLinks.facebook || "",
                                    youtube: socialLinks.youtube || "",
                                    twitter: socialLinks.twitter || "",
                                    instagram: socialLinks.instagram || "",
                                    reviewsCount: 0, // Not in new response
                                    media: [] // Not in new response
                                }}
                                category={service.categories?.[0]?.name}
                                status={service.status}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
