"use client";

import React, { useState, useRef } from "react";
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
import { Image as ImageIcon, Loader2 } from "lucide-react";
import { updateProfile } from "../actions";

export function PersonalSettings() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState({
        bio: "",
        first_name: "",
        last_name: "",
        phone: "",
        date_of_birth: "",
        gender: "",
        country: "",
        state: "",
        city: "",
        address_line1: "",
        address_line2: "",
        postal_code: "",
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);
        setIsSubmitting(true);

        try {
            const submitData = new FormData();

            Object.entries(formData).forEach(([key, value]) => {
                if (value) submitData.append(key, value);
            });

            if (avatarFile) {
                submitData.append("avatar_file", avatarFile);
            }

            const result = await updateProfile(submitData);

            if (result.success) {
                setSuccess(true);
            } else {
                setError(result.error || "Failed to update profile");
            }
        } catch (err) {
            console.error("Submit error:", err);
            setError("An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center justify-center py-8">
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleAvatarChange}
                    accept="image/*"
                    className="hidden"
                />
                <div
                    onClick={handleAvatarClick}
                    className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-4 border border-gray-100 cursor-pointer hover:border-[#C69C2E] transition-colors overflow-hidden"
                >
                    {avatarPreview ? (
                        <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <ImageIcon className="w-8 h-8 text-gray-300" />
                    )}
                </div>
                <button
                    type="button"
                    onClick={handleAvatarClick}
                    className="text-sm font-medium text-gray-900 hover:text-[#C69C2E] transition-colors"
                >
                    Upload personal profile photo
                </button>
            </div>

            {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-500 text-sm text-center">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-3 rounded-lg bg-green-50 text-green-600 text-sm text-center">
                    Profile updated successfully!
                </div>
            )}

            {/* Form Fields */}
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Bio</label>
                    <Textarea
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Enter Bio"
                        className="min-h-[100px] bg-white border-gray-200 rounded-xl resize-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">First Name</label>
                        <Input
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            placeholder="First name"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Last Name</label>
                        <Input
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            placeholder="Last name"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Phone Number</label>
                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="Enter phone number"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Date of Birth</label>
                        <Input
                            name="date_of_birth"
                            type="date"
                            value={formData.date_of_birth}
                            onChange={handleInputChange}
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Gender</label>
                    <Select value={formData.gender} onValueChange={(v) => handleSelectChange("gender", v)}>
                        <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Country</label>
                    <Select value={formData.country} onValueChange={(v) => handleSelectChange("country", v)}>
                        <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl">
                            <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Nigeria">Nigeria</SelectItem>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">State</label>
                        <Input
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">City</label>
                        <Input
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Address Line 1</label>
                        <Input
                            name="address_line1"
                            value={formData.address_line1}
                            onChange={handleInputChange}
                            placeholder="Address"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-900">Address Line 2 (optional)</label>
                        <Input
                            name="address_line2"
                            value={formData.address_line2}
                            onChange={handleInputChange}
                            placeholder="Address"
                            className="h-12 bg-white border-gray-200 rounded-xl"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Postal Code</label>
                    <Input
                        name="postal_code"
                        value={formData.postal_code}
                        onChange={handleInputChange}
                        placeholder="Enter Postal"
                        className="h-12 bg-white border-gray-200 rounded-xl"
                    />
                </div>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-[#C69C2E] hover:bg-[#b08b29] text-white font-bold rounded-xl mt-4"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        "Update"
                    )}
                </Button>
            </div>
        </form>
    );
}
