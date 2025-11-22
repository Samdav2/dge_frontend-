"use client";

import { MarketplaceCard } from "@/features/marketplace/components/MarketplaceCard";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SERVICES = [
    {
        title: "Digital Marketing",
        description: "Make requests drives real traffic. Impressive results always on demand and proven. Excellent service and great results.",
        price: "₦70,000",
        category: "Digital Skill",
        author: {
            name: "Nneji Christian",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop",
        },
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        status: "Active" as const,
        tags: ["Online"]
    },
    {
        title: "Content Creation",
        description: "Expert content creation services. High quality articles, blogs, and social media posts tailored to your brand.",
        price: "₦50,000",
        category: "Creative Skill",
        author: {
            name: "Okoro Ifeoma",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
            rating: 4.9
        },
        image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=2074&auto=format&fit=crop",
        status: "Active" as const,
        tags: ["Learn"]
    },
    {
        title: "Social Media Management",
        description: "Total organic integer ago aliquet. Efficitur diam ut venenatis tellus in metus. Mi bibendum neque egestas congue quisque egestas diam in arcu cursus.",
        price: "₦70,000",
        category: "Marketing Skill",
        author: {
            name: "Emeka Chinedu",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
        },
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
        status: "Active" as const,
        tags: ["Social"]
    },
    {
        title: "Content Creation",
        description: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.",
        price: "₦80,000",
        category: "Creative Skill",
        author: {
            name: "Adaobi Nwoye",
            image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop",
        },
        image: "https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1974&auto=format&fit=crop",
        status: "Active" as const,
        tags: ["Work"]
    },
    {
        title: "SEO Optimization",
        description: "Aliquam erat volutpat. Ut ageris est nec nunc viverra, eget suscipit eros tincidunt. Nulla facilisi. Etiam gravida felis eget velit dignissim.",
        price: "₦90,000",
        category: "Technical Skill",
        author: {
            name: "Chijioke Ugo",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
        },
        image: "https://images.unsplash.com/photo-1571786256017-aee7a0c009b6?q=80&w=2080&auto=format&fit=crop",
        status: "Active" as const,
        tags: ["On-Site"]
    },
    {
        title: "Digital Marketing",
        description: "Fusce tempor ligula a libero involut, non vulputate metus porttitor. In euismod, justo a bibendum finibus, nunc purus fringilla neque, quis ullamcorper justo elit at est.",
        price: "₦100,000",
        category: "Marketing Skill",
        author: {
            name: "Sarah Onuoha",
            image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1887&auto=format&fit=crop",
        },
        image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=2070&auto=format&fit=crop",
        status: "Active" as const,
        tags: ["Product"]
    }
];

export default function MarketplacePage() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SERVICES.map((service, index) => (
                    <MarketplaceCard key={index} {...service} />
                ))}
            </div>
        </div>
    );
}
