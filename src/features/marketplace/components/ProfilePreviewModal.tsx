"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Star, Phone, Mail, Play } from "lucide-react";
import { getBackendImageUrl } from "@/lib/imageUtils";

interface ProfilePreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: {
        name: string;
        image?: string;
        rating?: number;
        // Mock data fields that would come from a real profile
        title?: string;
        reviewsCount?: number;
        description?: string;
        phone?: string;
        altPhone?: string;
        email?: string;
        media?: string[];
        website?: string;
        facebook?: string;
        youtube?: string;
        twitter?: string;
        instagram?: string;
    };
}

import { Globe, Facebook, Youtube, Twitter, Instagram } from "lucide-react";

export function ProfilePreviewModal({ isOpen, onClose, user }: ProfilePreviewModalProps) {
    // Mock data if not provided
    const mockData = {
        title: "Author, Narrator, Voice Artist, Editor",
        reviewsCount: 203,
        description: "Fermentum egestas a nec sit scelerisque lobortis aenean feugiat tellus. Aliquam ut auctor morbi sit risus ultrices. Tristique venenatis ornare leo purus egestas. Sodales ut mi id aliquet laoreet. Enim malesuada ac leo eu commodo a pharetra.",
        phone: "+1-202-555-0141",
        altPhone: "+1-202-555-0141",
        email: "esther.howard@gmail.com",
        media: [
            "/mock-media-1.jpg", // These would be real URLs in production
            "/mock-media-2.jpg",
            "/mock-media-3.jpg"
        ],
        website: "www.estherhoward.com",
        facebook: "https://facebook.com",
        youtube: "https://youtube.com",
        twitter: "https://twitter.com",
        instagram: "https://instagram.com"
    };

    const displayUser = {
        ...mockData,
        ...user,
        // Ensure we prioritize passed values even if they are empty strings (except undefined)
        title: user.title || mockData.title,
        description: user.description || mockData.description,
        phone: user.phone || mockData.phone,
        email: user.email || mockData.email,
        website: user.website || mockData.website,
        facebook: user.facebook || mockData.facebook,
        twitter: user.twitter || mockData.twitter,
        instagram: user.instagram || mockData.instagram,
        youtube: user.youtube || mockData.youtube,
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="fixed right-0 top-0 z-50 h-full w-[725px] translate-x-0 translate-y-0 border-l bg-white p-0 shadow-2xl duration-300 data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 left-auto rounded-l-2xl rounded-r-none sm:max-w-[725px]">
                <div className="h-full overflow-y-auto p-6">
                    <div className="flex justify-between items-center mb-6">
                        {/* Close button is handled by DialogContent default close button, but we can customize or hide it if needed.
                            The design shows a custom header "Profile Preview" and a close button.
                            DialogContent usually adds a close button. Let's rely on that or hide it and add our own if strictly needed.
                            For now, we'll add the header text.
                         */}
                        <DialogTitle className="text-xl font-bold text-gray-900">Profile Preview</DialogTitle>
                    </div>

                    <div className="flex flex-col items-center text-center mb-8">
                        <div className="w-24 h-24 rounded-full overflow-hidden bg-blue-100 mb-4 border-4 border-white shadow-sm">
                            {displayUser.image ? (
                                <img src={getBackendImageUrl(displayUser.image)} alt={displayUser.name} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-blue-500">
                                    {displayUser.name.charAt(0).toUpperCase()}
                                </div>
                            )}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">{displayUser.name}</h2>
                        <p className="text-gray-500 text-sm mb-2">{displayUser.title}</p>
                        <div className="flex items-center gap-1 mb-4">
                            <div className="flex">
                                {[1, 2, 3, 4].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#FFB800] text-[#FFB800]" />
                                ))}
                                <Star className="w-4 h-4 fill-gray-200 text-gray-200" />
                            </div>
                            <span className="text-sm font-medium text-gray-900 ml-1">{displayUser.rating || 4.0}</span>
                            <span className="text-sm text-gray-400">({displayUser.reviewsCount})</span>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-3">
                            {displayUser.website && (
                                <a href={displayUser.website} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#C69C2E] hover:text-white transition-colors">
                                    <Globe className="w-4 h-4" />
                                </a>
                            )}
                            {displayUser.facebook && (
                                <a href={displayUser.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#1877F2] hover:text-white transition-colors">
                                    <Facebook className="w-4 h-4" />
                                </a>
                            )}
                            {displayUser.twitter && (
                                <a href={displayUser.twitter} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors">
                                    <Twitter className="w-4 h-4" />
                                </a>
                            )}
                            {displayUser.instagram && (
                                <a href={displayUser.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#E4405F] hover:text-white transition-colors">
                                    <Instagram className="w-4 h-4" />
                                </a>
                            )}
                            {displayUser.youtube && (
                                <a href={displayUser.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-[#FF0000] hover:text-white transition-colors">
                                    <Youtube className="w-4 h-4" />
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {displayUser.description}
                            </p>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#C69C2E]/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-[#C69C2E]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">ALT PHONE</p>
                                        <p className="text-sm font-medium text-gray-900">{displayUser.altPhone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#C69C2E]/10 flex items-center justify-center shrink-0">
                                        <Phone className="w-4 h-4 text-[#C69C2E]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">PHONE</p>
                                        <p className="text-sm font-medium text-gray-900">{displayUser.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-[#C69C2E]/10 flex items-center justify-center shrink-0">
                                        <Mail className="w-4 h-4 text-[#C69C2E]" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">EMAIL ADDRESS</p>
                                        <p className="text-sm font-medium text-gray-900">{displayUser.email}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Media</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {/* Using placeholder colors/gradients for mock media since we don't have real images */}
                                <div className="aspect-square rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 overflow-hidden relative group cursor-pointer">
                                    {/* Mock content */}
                                </div>
                                <div className="aspect-square rounded-xl bg-black overflow-hidden relative group cursor-pointer">
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                                            <Play className="w-3 h-3 text-black fill-black ml-0.5" />
                                        </div>
                                    </div>
                                </div>
                                <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-400 to-gray-600 overflow-hidden relative group cursor-pointer">
                                    {/* Mock content */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
