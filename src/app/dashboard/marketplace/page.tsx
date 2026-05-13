"use client";

import React, { useState, useEffect } from "react";
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
import { useServices, useCategories } from "@/features/marketplace/hooks/useMarketplace";
import { useDebounce } from "@/hooks/useDebounce";
import { PostedJobsSidebar } from "@/features/posted-jobs/components/PostedJobsSidebar";

export default function MarketplacePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedType, setSelectedType] = useState<string>("all");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { data: services, isLoading, error } = useServices({
        search: debouncedSearchTerm,
        categoryId: selectedCategory === "all" ? undefined : selectedCategory,
        type: selectedType === "all" ? undefined : selectedType,
    });

    const { data: categories } = useCategories();

    return (
        <div className="space-y-6">
            {/* Page Header */}
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

            {/* Main 2-col layout */}
            <div className="flex gap-6 items-start">
                {/* Left: Services Grid */}
                <div className="flex-1 min-w-0 space-y-6">
                    {/* Filters */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col gap-4">
                        <div className="relative w-full">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <Input
                                placeholder="Search Service, Job Title.."
                                className="pl-10 h-11 bg-gray-50 border-none rounded-xl w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-4 w-full">
                            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                <SelectTrigger className="flex-1 h-11 rounded-xl bg-white border-gray-200">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <SlidersHorizontal className="w-4 h-4 shrink-0" />
                                        <SelectValue placeholder="Category" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories?.map((cat: any) => (
                                        <SelectItem key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="flex-1 h-11 rounded-xl bg-white border-gray-200">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        <SlidersHorizontal className="w-4 h-4 shrink-0" />
                                        <SelectValue placeholder="Service Type" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="physical">Physical</SelectItem>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="hybrid">Hybrid</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Services Grid */}
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
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {services.map((item: any, index: number) => {
                                const service = item.service || item;
                                const profile = item.profile;
                                const user = item.user;
                                const portfolio = item.portfolio || [];

                                const socialLinks = portfolio.find((p: any) => p.website || p.facebook || p.twitter || p.instagram || p.youtube) || {};
                                const avatarUrl = profile?.avatar_url || service.user_picture;
                                const displayAvatar = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(service.username || 'User')}&background=random`;

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
                                            title: profile?.bio ? profile.bio.substring(0, 50) + "..." : "Service Provider",
                                            description: profile?.bio || "No description available.",
                                            phone: profile?.phone || "",
                                            altPhone: "",
                                            website: socialLinks.website || "",
                                            facebook: socialLinks.facebook || "",
                                            youtube: socialLinks.youtube || "",
                                            twitter: socialLinks.twitter || "",
                                            instagram: socialLinks.instagram || "",
                                            reviewsCount: 0,
                                            media: []
                                        }}
                                        category={service.categories?.[0]?.name}
                                        status={service.status}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Right: Posted Jobs Sidebar */}
                <div className="hidden lg:block w-72 xl:w-80 shrink-0">
                    <PostedJobsSidebar />
                </div>
            </div>
        </div>
    );
}

