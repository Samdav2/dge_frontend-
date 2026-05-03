"use client";

import { useState, useRef } from "react";
import { Loader2, Upload } from "lucide-react";
import { uploadPortfolioMedia } from "../actions";
import { PortfolioMedia } from "../types";
import Image from "next/image";

interface PortfolioMediaUploadProps {
    portfolioId: string;
    initialMedia?: PortfolioMedia[];
    onUploadComplete?: (media: PortfolioMedia) => void;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export function PortfolioMediaUpload({ portfolioId, initialMedia = [], onUploadComplete }: PortfolioMediaUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [mediaList, setMediaList] = useState<PortfolioMedia[]>(initialMedia);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("file", file);

            const newMedia = await uploadPortfolioMedia(portfolioId, formData);
            setMediaList((prev) => [...prev, newMedia]);
            if (onUploadComplete) {
                onUploadComplete(newMedia);
            }
        } catch (err) {
            console.error("Upload failed:", err);
            setError("Failed to upload media. Please try again.");
        } finally {
            setIsUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };

    const handleUploadClick = () => {
        if (!isUploading && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Portfolio Media</h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {mediaList.map((media) => {
                    const mediaSrc = media.s3_key.startsWith('http') 
                        ? media.s3_key 
                        : media.s3_key.startsWith('/') 
                            ? `${BASE_URL}${media.s3_key}` 
                            : `${BASE_URL}/${media.s3_key}`;

                    return (
                        <div key={media.id} className="relative aspect-video bg-muted rounded-lg overflow-hidden border">
                            {media.media_type?.startsWith('image') ? (
                                <Image
                                    src={mediaSrc}
                                    alt="Portfolio Media"
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <video
                                    src={mediaSrc}
                                    controls
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                    );
                })}

                <button
                    type="button"
                    onClick={handleUploadClick}
                    className="relative aspect-video bg-muted/50 rounded-lg border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors flex flex-col items-center justify-center cursor-pointer"
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isUploading}
                    />
                    {isUploading ? (
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : (
                        <>
                            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                            <span className="text-sm text-muted-foreground">Upload Media</span>
                        </>
                    )}
                </button>
            </div>

            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
