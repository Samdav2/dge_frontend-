"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kycSchema, type KYCInput } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";
import { useState } from "react";
import { createUserKyc } from "../actions";

interface KYCVerificationFormProps {
    onSuccess: () => void;
}

export function KYCVerificationForm({ onSuccess }: KYCVerificationFormProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        setValue,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<KYCInput>({
        resolver: zodResolver(kycSchema),
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setValue("document", file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const onSubmit = async (data: KYCInput) => {
        try {
            const formData = new FormData();
            formData.append("id_type", data.idType);
            formData.append("id_value", data.idNumber);

            if (data.document instanceof File) {
                formData.append("verification_file", data.document);
            } else {
                setError("root", { message: "Please upload a verification document" });
                return;
            }

            const result = await createUserKyc(formData);

            if (result.success) {
                onSuccess();
            } else {
                setError("root", { message: result.error || "Failed to submit KYC" });
            }
        } catch (error) {
            console.error("KYC submission error:", error);
            setError("root", { message: "An unexpected error occurred" });
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="text-center mb-8">
                <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-[#FFFBF0] rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-[#C69C2E] rounded-full flex items-center justify-center text-white font-bold">
                            <span className="sr-only">User Icon</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                </div>
                <h1 className="text-2xl font-bold mb-2">KYC Verification</h1>
                <p className="text-muted-foreground text-sm">
                    Complete your identity verification to unlock all features.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {errors.root && (
                    <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm text-center">
                        {errors.root.message}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="idType">
                        ID Type
                    </label>
                    <Select onValueChange={(value) => setValue("idType", value)}>
                        <SelectTrigger className="h-12 rounded-xl">
                            <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="passport">Passport</SelectItem>
                            <SelectItem value="national_id">National ID</SelectItem>
                            <SelectItem value="drivers_license">Driver&apos;s License</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.idType && (
                        <p className="text-xs text-red-500">{errors.idType.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium" htmlFor="idNumber">
                        ID Number
                    </label>
                    <Input
                        id="idNumber"
                        placeholder="Enter ID number"
                        {...register("idNumber")}
                        className={`h-12 rounded-xl ${errors.idNumber ? "border-red-500" : ""}`}
                    />
                    {errors.idNumber && (
                        <p className="text-xs text-red-500">{errors.idNumber.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">
                        Upload Document (ID photo)
                    </label>
                    <div className="border-2 border-dashed border-input rounded-xl p-8 text-center hover:bg-accent/50 transition-colors cursor-pointer relative overflow-hidden group">
                        <input
                            type="file"
                            accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={handleFileChange}
                        />
                        {previewUrl ? (
                            <div className="absolute inset-0 w-full h-full">
                                <img
                                    src={previewUrl}
                                    alt="ID Preview"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <p className="text-white font-medium">Click to change</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                                <Upload className="w-8 h-8 text-[#C69C2E]" />
                                <span className="text-sm font-medium">Upload File</span>
                            </div>
                        )}
                    </div>
                    {errors.document && (
                        <p className="text-xs text-red-500">Document is required</p>
                    )}
                </div>

                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        className="flex-1 h-12 rounded-xl border-[#C69C2E] text-[#C69C2E] hover:bg-[#FFFBF0]"
                        onClick={() => window.history.back()}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Verifying..." : "Verify KYC"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
