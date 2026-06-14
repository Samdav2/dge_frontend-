import React, { useState, useEffect } from "react";
import { MarketplaceCard } from "./MarketplaceCard";
import { listServices } from "../actions";
import { Loader2, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategorySectionProps {
    categoryId: string;
    title: string;
    searchTerm?: string;
    type?: string;
    initialLimit?: number;
}

export function CategorySection({ categoryId, title, searchTerm, type, initialLimit = 10 }: CategorySectionProps) {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Initial fetch when filters or category changes
    useEffect(() => {
        const fetchInitial = async () => {
            setLoading(true);
            setError(null);
            try {
                const result = await listServices({
                    categoryId,
                    search: searchTerm,
                    type: type === "all" ? undefined : type,
                    limit: initialLimit,
                    offset: 0,
                    sortBy: "newest"
                });

                if (result.success && Array.isArray(result.data)) {
                    setServices(result.data);
                    setOffset(initialLimit);
                    setHasMore(result.data.length === initialLimit);
                } else {
                    setError(result.error || "Failed to fetch services");
                }
            } catch (err: any) {
                setError(err.message || "An error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchInitial();
    }, [categoryId, searchTerm, type, initialLimit]);

    const loadMore = async () => {
        if (!hasMore || loadingMore) return;
        setLoadingMore(true);
        try {
            const result = await listServices({
                categoryId,
                search: searchTerm,
                type: type === "all" ? undefined : type,
                limit: initialLimit,
                offset: offset,
                sortBy: "newest"
            });

            if (result.success && Array.isArray(result.data)) {
                setServices(prev => [...prev, ...result.data]);
                setOffset(prev => prev + initialLimit);
                setHasMore(result.data.length === initialLimit);
            }
        } catch (err: any) {
            console.error("Failed to load more:", err);
        } finally {
            setLoadingMore(false);
        }
    };

    if (loading) {
        return (
            <div className="py-12 flex justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#C69C2E]" />
            </div>
        );
    }

    if (error) {
        return null;
    }

    if (services.length === 0) {
        return null; // Don't render the section if no services
    }

    // Determine theme based on category name
    const getThemeForCategory = (name: string) => {
        const lower = name.toLowerCase();
        if (lower.includes('web') || lower.includes('tech')) {
            return {
                bg: "bg-blue-50/50",
                border: "border-blue-100",
                text: "text-blue-900",
                badge: "bg-blue-100 text-blue-700",
                button: "hover:bg-blue-100 text-blue-700 border-blue-200"
            };
        }
        if (lower.includes('design') || lower.includes('art')) {
            return {
                bg: "bg-pink-50/50",
                border: "border-pink-100",
                text: "text-pink-900",
                badge: "bg-pink-100 text-pink-700",
                button: "hover:bg-pink-100 text-pink-700 border-pink-200"
            };
        }
        if (lower.includes('plumb') || lower.includes('home') || lower.includes('build')) {
            return {
                bg: "bg-orange-50/50",
                border: "border-orange-100",
                text: "text-orange-900",
                badge: "bg-orange-100 text-orange-700",
                button: "hover:bg-orange-100 text-orange-700 border-orange-200"
            };
        }
        if (lower.includes('write') || lower.includes('consult')) {
            return {
                bg: "bg-emerald-50/50",
                border: "border-emerald-100",
                text: "text-emerald-900",
                badge: "bg-emerald-100 text-emerald-700",
                button: "hover:bg-emerald-100 text-emerald-700 border-emerald-200"
            };
        }
        return {
            bg: "bg-gray-50/50",
            border: "border-gray-100",
            text: "text-gray-900",
            badge: "bg-gray-200 text-gray-700",
            button: "hover:bg-gray-100 text-gray-700 border-gray-200"
        };
    };

    const theme = getThemeForCategory(title);

    return (
        <div className={`space-y-6 p-6 md:p-8 rounded-[2rem] border ${theme.bg} ${theme.border}`}>
            <div className="flex items-center justify-between">
                <h2 className={`text-xl md:text-2xl font-bold ${theme.text}`}>{title}</h2>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ${theme.badge}`}>
                    {services.length} {services.length === 1 ? 'Service' : 'Services'}
                </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
                {services.map((item: any, index: number) => {
                    const service = item.service || item;
                    const profile = item.profile;
                    const user = item.user;
                    const portfolio = item.portfolio || [];

                    const socialLinks = portfolio.find((p: any) => p.website || p.facebook || p.twitter || p.instagram || p.youtube) || {};
                    const avatarUrl = profile?.avatar_url || service.user_picture;
                    const displayAvatar = avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(service.username || 'User')}&background=random`;

                    const mediaFiles = portfolio.reduce((acc: any[], p: any) => acc.concat(p.media_files || []), []);
                    const reviews = portfolio.reduce((acc: any[], p: any) => acc.concat(p.reviews || []), []);

                    return (
                        <MarketplaceCard
                            key={`${service.id}-${index}`}
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
                                reviewsCount: reviews.length,
                                media: mediaFiles,
                                reviews: reviews
                            }}
                            category={service.categories?.[0]?.name || title}
                            status={service.status}
                        />
                    );
                })}
            </div>

            {hasMore && (
                <div className="flex justify-center pt-4">
                    <Button
                        variant="outline"
                        onClick={loadMore}
                        disabled={loadingMore}
                        className={`rounded-xl px-8 h-12 gap-2 transition-colors ${theme.button}`}
                    >
                        {loadingMore ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <ChevronDown className="w-4 h-4" />
                        )}
                        Load More in {title}
                    </Button>
                </div>
            )}
        </div>
    );
}
