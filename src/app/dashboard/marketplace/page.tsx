"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useCategories } from "@/features/marketplace/hooks/useMarketplace";
import { useDebounce } from "@/hooks/useDebounce";
import { CategorySection } from "@/features/marketplace/components/CategorySection";
import { SpecialSection } from "@/features/marketplace/components/SpecialSection";

export default function MarketplacePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedType, setSelectedType] = useState<string>("all");

    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const { data: categories, isLoading: categoriesLoading } = useCategories();

    // If user is searching or filtering, we might want to just show the CategorySections
    // that match, or a flat list. For this design, we will show special sections only if no active search/filters.
    const isFiltering = debouncedSearchTerm !== "" || selectedCategory !== "all" || selectedType !== "all";

    return (
        <div className="space-y-8 md:space-y-12 pb-12 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Marketplace</h1>
                    <p className="text-gray-500 mt-1">Discover top-rated services and talented professionals.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-medium bg-gray-100/80 px-4 py-2 rounded-full w-fit">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-[#C69C2E]">Marketplace</span>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 md:p-5 rounded-[1.5rem] shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-4 items-center sticky top-24 z-30 backdrop-blur-xl bg-white/80">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        placeholder="Search for any service..."
                        className="pl-12 h-12 bg-gray-50/50 border-gray-200 rounded-xl w-full text-base focus-visible:ring-[#C69C2E]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex flex-row gap-2 sm:gap-4 w-full lg:w-auto">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl bg-white border-gray-200 focus:ring-[#C69C2E]">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <SlidersHorizontal className="w-4 h-4 shrink-0 text-[#C69C2E]" />
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
                        <SelectTrigger className="w-full sm:w-48 h-12 rounded-xl bg-white border-gray-200 focus:ring-[#C69C2E]">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <SlidersHorizontal className="w-4 h-4 shrink-0 text-[#C69C2E]" />
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

            {categoriesLoading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="w-10 h-10 animate-spin text-[#C69C2E]" />
                    <p className="text-gray-500 font-medium">Loading marketplace...</p>
                </div>
            ) : (
                <div className="space-y-12 md:space-y-16">
                    
                    {/* Special Sections (Only show if not heavily filtering) */}
                    {!isFiltering && (
                        <div className="space-y-8">
                            <SpecialSection 
                                title="Top Trending Services" 
                                subtitle="Most Popular" 
                                sortBy="trending" 
                                limit={4} 
                                icon="trending" 
                                theme="blue" 
                            />
                            
                            <SpecialSection 
                                title="Most Affordable & High Quality" 
                                subtitle="Best Value" 
                                sortBy="affordable" 
                                limit={4} 
                                icon="zap" 
                                theme="gold" 
                            />
                        </div>
                    )}

                    {/* Categories Sections */}
                    <div className="space-y-12">
                        {categories?.filter((cat: any) => selectedCategory === "all" || cat.id === selectedCategory).map((cat: any) => (
                            <CategorySection 
                                key={cat.id} 
                                categoryId={cat.id} 
                                title={cat.name} 
                                searchTerm={debouncedSearchTerm} 
                                type={selectedType} 
                                initialLimit={8} 
                            />
                        ))}
                    </div>

                    {categories?.length === 0 && (
                        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No Categories Found</h3>
                            <p className="text-gray-500">The marketplace is currently empty.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

