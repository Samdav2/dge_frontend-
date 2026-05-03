"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Briefcase, Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { getUserPortfolio, createUserPortfolio, updateUserPortfolio, uploadPortfolioMedia } from "@/features/portfolio/actions";
import { UserPortfolio, PortfolioMedia } from "@/features/portfolio/types";
import { getBackendImageUrl } from "@/lib/imageUtils";

interface UploadedFile {
    file?: File;
    preview: string;
    isExisting?: boolean;
    media?: PortfolioMedia;
}

export function PortfolioSettings() {
    const photoInputRef = useRef<HTMLInputElement>(null);
    const videoInputRef = useRef<HTMLInputElement>(null);

    // Form state
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [portfolio, setPortfolio] = useState<UserPortfolio | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [website, setWebsite] = useState("");
    const [facebook, setFacebook] = useState("");
    const [youtube, setYoutube] = useState("");
    const [twitter, setTwitter] = useState("");
    const [instagram, setInstagram] = useState("");

    // Media state
    const [photos, setPhotos] = useState<UploadedFile[]>([]);
    const [videos, setVideos] = useState<UploadedFile[]>([]);
    const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
    const [isUploadingVideo, setIsUploadingVideo] = useState(false);
    const [pendingPhotoFiles, setPendingPhotoFiles] = useState<File[]>([]);
    const [pendingVideoFiles, setPendingVideoFiles] = useState<File[]>([]);

    // Load existing portfolio
    useEffect(() => {
        async function loadPortfolio() {
            try {
                const data = await getUserPortfolio();
                if (data) {
                    setPortfolio(data);
                    setTitle(data.title || "");
                    setDescription(data.description || "");
                    setCategory(data.category || "");
                    setWebsite(data.website || "");
                    setFacebook(data.facebook || "");
                    setYoutube(data.youtube || "");
                    setTwitter(data.twitter || "");
                    setInstagram(data.instagram || "");

                    // Load existing media
                    if (data.media && data.media.length > 0) {
                        const existingPhotos: UploadedFile[] = [];
                        const existingVideos: UploadedFile[] = [];

                        data.media.forEach((media) => {
                            const url = getBackendImageUrl(media.s3_key);
                            if (media.media_type === 'image') {
                                existingPhotos.push({ preview: url, isExisting: true, media });
                            } else if (media.media_type === 'video') {
                                existingVideos.push({ preview: url, isExisting: true, media });
                            }
                        });

                        setPhotos(existingPhotos);
                        setVideos(existingVideos);
                    }
                }
            } catch (error) {
                console.error("Failed to load portfolio:", error);
            } finally {
                setIsLoading(false);
            }
        }
        loadPortfolio();
    }, []);

    const handlePhotoUploadClick = () => {
        if (photos.length + pendingPhotoFiles.length < 3 && photoInputRef.current) {
            photoInputRef.current.click();
        }
    };

    const handleVideoUploadClick = () => {
        if (videos.length + pendingVideoFiles.length < 3 && videoInputRef.current) {
            videoInputRef.current.click();
        }
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (photos.length >= 3) {
            alert("You can only upload up to 3 photos");
            return;
        }

        const preview = URL.createObjectURL(file);
        setPhotos((prev) => [...prev, { file, preview }]);
        setPendingPhotoFiles((prev) => [...prev, file]);

        if (photoInputRef.current) {
            photoInputRef.current.value = "";
        }
    };

    const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (videos.length >= 3) {
            alert("You can only upload up to 3 videos");
            return;
        }

        const preview = URL.createObjectURL(file);
        setVideos((prev) => [...prev, { file, preview }]);
        setPendingVideoFiles((prev) => [...prev, file]);

        if (videoInputRef.current) {
            videoInputRef.current.value = "";
        }
    };

    const removePhoto = (index: number) => {
        setPhotos((prev) => {
            const newPhotos = [...prev];
            const removed = newPhotos[index];
            if (!removed.isExisting && removed.preview) {
                URL.revokeObjectURL(removed.preview);
            }
            if (removed.file) {
                setPendingPhotoFiles((files) => files.filter((f) => f !== removed.file));
            }
            newPhotos.splice(index, 1);
            return newPhotos;
        });
    };

    const removeVideo = (index: number) => {
        setVideos((prev) => {
            const newVideos = [...prev];
            const removed = newVideos[index];
            if (!removed.isExisting && removed.preview) {
                URL.revokeObjectURL(removed.preview);
            }
            if (removed.file) {
                setPendingVideoFiles((files) => files.filter((f) => f !== removed.file));
            }
            newVideos.splice(index, 1);
            return newVideos;
        });
    };

    const handleSubmit = async () => {
        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        setIsSaving(true);

        try {
            let savedPortfolio: UserPortfolio;

            const portfolioData = {
                title,
                description: description || undefined,
                category: category || undefined,
                website: website || undefined,
                facebook: facebook || undefined,
                youtube: youtube || undefined,
                twitter: twitter || undefined,
                instagram: instagram || undefined,
            };

            if (portfolio) {
                // Update existing portfolio
                savedPortfolio = await updateUserPortfolio(portfolioData);
            } else {
                // Create new portfolio
                savedPortfolio = await createUserPortfolio(portfolioData);
            }

            setPortfolio(savedPortfolio);

            // Upload pending media files
            const allPendingFiles = [...pendingPhotoFiles, ...pendingVideoFiles];

            for (const file of allPendingFiles) {
                try {
                    setIsUploadingPhoto(true);
                    setIsUploadingVideo(true);

                    const formData = new FormData();
                    formData.append("file", file);

                    await uploadPortfolioMedia(savedPortfolio.id, formData);
                } catch (uploadError) {
                    console.error("Failed to upload media:", uploadError);
                }
            }

            // Clear pending files after upload
            setPendingPhotoFiles([]);
            setPendingVideoFiles([]);
            setIsUploadingPhoto(false);
            setIsUploadingVideo(false);

            // Fetch updated portfolio to get newly uploaded media
            const freshPortfolio = await getUserPortfolio();
            if (freshPortfolio) {
                setPortfolio(freshPortfolio);
                if (freshPortfolio.media && freshPortfolio.media.length > 0) {
                    const existingPhotos: UploadedFile[] = [];
                    const existingVideos: UploadedFile[] = [];

                    freshPortfolio.media.forEach((media) => {
                        const url = getBackendImageUrl(media.s3_key);
                        if (media.media_type === 'image') {
                            existingPhotos.push({ preview: url, isExisting: true, media });
                        } else if (media.media_type === 'video') {
                            existingVideos.push({ preview: url, isExisting: true, media });
                        }
                    });

                    setPhotos(existingPhotos);
                    setVideos(existingVideos);
                }
            }

            alert("Portfolio saved successfully!");
        } catch (error) {
            console.error("Failed to save portfolio:", error);
            alert("Failed to save portfolio. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 text-[#C69C2E] animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Hidden File Inputs */}
            <input
                ref={photoInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
            />
            <input
                ref={videoInputRef}
                type="file"
                accept="video/*"
                className="hidden"
                onChange={handleVideoChange}
            />

            {/* Portfolio Icon */}
            <div className="flex flex-col items-center justify-center py-8">
                <div className="w-16 h-16 rounded-full bg-[#C69C2E] flex items-center justify-center mb-4 shadow-lg shadow-[#C69C2E]/20">
                    <Briefcase className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-sm font-bold text-gray-900">Portfolio</h2>
                <p className="text-xs text-gray-500">Update your portfolio and setup your portfolio.</p>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Title <span className="text-red-500">*</span></label>
                    <Input
                        placeholder="Enter Title"
                        className="h-12 bg-white border-gray-200 rounded-xl"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Description</label>
                    <Textarea
                        placeholder="Enter Description"
                        className="min-h-[120px] bg-white border-gray-200 rounded-xl resize-none"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Recent Work Picture</label>
                    <p className="text-xs text-gray-500 mb-2">You can only upload three photos</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Display uploaded photos */}
                        {photos.map((photo, index) => (
                            <div key={index} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group">
                                <Image
                                    src={photo.preview}
                                    alt={`Uploaded photo ${index + 1}`}
                                    fill
                                    className="object-cover"
                                    unoptimized={photo.isExisting}
                                />
                                <button
                                    type="button"
                                    onClick={() => removePhoto(index)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                                {!photo.isExisting && (
                                    <div className="absolute bottom-2 left-2 bg-yellow-500/80 text-white text-xs px-2 py-1 rounded">
                                        Pending
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* Upload button - only show if less than 3 photos */}
                        {photos.length < 3 && (
                            <button
                                type="button"
                                onClick={handlePhotoUploadClick}
                                disabled={isUploadingPhoto}
                                className="aspect-square border-2 border-dashed border-[#C69C2E]/40 rounded-xl flex flex-col items-center justify-center bg-[#C69C2E]/5 cursor-pointer hover:bg-[#C69C2E]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploadingPhoto ? (
                                    <Loader2 className="w-6 h-6 text-[#C69C2E] animate-spin" />
                                ) : (
                                    <>
                                        <Upload className="w-6 h-6 text-[#C69C2E] mb-2" />
                                        <span className="text-xs text-gray-500">Upload Photo</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Recent Work Video</label>
                    <p className="text-xs text-gray-500 mb-2">You can only upload three videos</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {/* Display uploaded videos */}
                        {videos.map((video, index) => (
                            <div key={index} className="aspect-square bg-gray-100 rounded-xl overflow-hidden relative group">
                                <video
                                    src={video.preview}
                                    className="object-cover w-full h-full"
                                    muted
                                />
                                <button
                                    type="button"
                                    onClick={() => removeVideo(index)}
                                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4 text-white" />
                                </button>
                                <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                    {video.isExisting ? "Video" : "Pending"}
                                </div>
                            </div>
                        ))}
                        {/* Upload button - only show if less than 3 videos */}
                        {videos.length < 3 && (
                            <button
                                type="button"
                                onClick={handleVideoUploadClick}
                                disabled={isUploadingVideo}
                                className="aspect-square border-2 border-dashed border-[#C69C2E]/40 rounded-xl flex flex-col items-center justify-center bg-[#C69C2E]/5 cursor-pointer hover:bg-[#C69C2E]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploadingVideo ? (
                                    <Loader2 className="w-6 h-6 text-[#C69C2E] animate-spin" />
                                ) : (
                                    <>
                                        <Upload className="w-6 h-6 text-[#C69C2E] mb-2" />
                                        <span className="text-xs text-gray-500 text-center px-2">Upload Video</span>
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Category</label>
                    <Select value={category} onValueChange={setCategory}>
                        <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl">
                            <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="design">Design</SelectItem>
                            <SelectItem value="marketing">Marketing</SelectItem>
                            <SelectItem value="writing">Writing</SelectItem>
                            <SelectItem value="consulting">Consulting</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Social Profiles Section */}
                <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900">Social Profiles</h3>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Website</label>
                        <Input
                            placeholder="https://yourwebsite.com"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Facebook</label>
                            <Input
                                placeholder="Facebook Profile URL"
                                className="h-12 bg-white border-gray-200 rounded-xl"
                                value={facebook}
                                onChange={(e) => setFacebook(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">YouTube</label>
                            <Input
                                placeholder="YouTube Channel URL"
                                className="h-12 bg-white border-gray-200 rounded-xl"
                                value={youtube}
                                onChange={(e) => setYoutube(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">X (Twitter)</label>
                            <Input
                                placeholder="X (Twitter) Profile URL"
                                className="h-12 bg-white border-gray-200 rounded-xl"
                                value={twitter}
                                onChange={(e) => setTwitter(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-900">Instagram</label>
                            <Input
                                placeholder="Instagram Profile URL"
                                className="h-12 bg-white border-gray-200 rounded-xl"
                                value={instagram}
                                onChange={(e) => setInstagram(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <Button
                    className="w-full h-12 bg-[#C69C2E] hover:bg-[#b08b29] text-white font-bold rounded-xl mt-4"
                    onClick={handleSubmit}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        portfolio ? "Update Portfolio" : "Create Portfolio"
                    )}
                </Button>
            </div>
        </div>
    );
}
