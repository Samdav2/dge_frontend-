import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Car, AlertTriangle, CheckCircle, Shield, Star, TrendingUp } from "lucide-react";
import { getDriverProfile, createDriverProfile, updateDriverProfile } from "../actions";

interface DriverProfileFormProps {
    isAccepting?: boolean;
    onToggleAccepting?: (val: boolean) => void;
}

export function DriverProfileForm({ isAccepting, onToggleAccepting }: DriverProfileFormProps = {}) {
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [isExisting, setIsExisting] = useState(false);

    const [formData, setFormData] = useState({
        car_name: "",
        car_model: "",
        plate_number: "",
    });

    const fetchProfile = async () => {
        setIsLoading(true);
        const res = await getDriverProfile();
        if (res.success && res.data) {
            setIsExisting(true);
            setFormData({
                car_name: res.data.car_name || "",
                car_model: res.data.car_model || "",
                plate_number: res.data.plate_number || "",
            });
        } else {
            setIsExisting(false);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccessMessage(null);

        if (!formData.car_name || !formData.car_model || !formData.plate_number) {
            setError("All fields are required.");
            return;
        }

        setIsSubmitting(true);
        try {
            let result;
            if (isExisting) {
                result = await updateDriverProfile(formData);
            } else {
                result = await createDriverProfile(formData);
            }

            if (result.success) {
                setSuccessMessage(isExisting ? "Driver profile updated successfully!" : "Driver profile created successfully!");
                setIsExisting(true);
            } else {
                setError(result.error || "Failed to save driver profile.");
            }
        } catch (err) {
            console.error("Submit driver profile error:", err);
            setError("An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 text-[#C69C2E] animate-spin mx-auto mb-3" />
                    <p className="text-sm text-gray-400">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Quick Stats Cards */}
            {isExisting && (
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { icon: Star, label: 'Rating', value: '4.9', color: '#F59E0B' },
                        { icon: TrendingUp, label: 'Completion', value: '98%', color: '#10B981' },
                        { icon: Shield, label: 'Status', value: 'Active', color: '#3B82F6' },
                    ].map((stat, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                            <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5"
                                style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}20` }}>
                                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                            </div>
                            <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
                            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Profile Form */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Header with accent */}
                <div className="h-1 bg-gradient-to-r from-[#C69C2E] to-[#E5B84D]" />
                <div className="p-6 lg:p-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-[#C69C2E]/10 flex items-center justify-center">
                                    <Car className="w-5 h-5 text-[#C69C2E]" />
                                </div>
                                Vehicle Information
                            </h2>
                            <p className="text-xs text-gray-400 mt-1 ml-[46px]">
                                {isExisting ? 'Update your vehicle details' : 'Set up your driver profile to start earning'}
                            </p>
                        </div>

                        {/* Accept Ride Requests Toggle */}
                        {isExisting && onToggleAccepting && (
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-gray-700">Accepting Rides</span>
                                <button
                                    type="button"
                                    onClick={() => onToggleAccepting(!isAccepting)}
                                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${isAccepting ? 'bg-green-500' : 'bg-gray-200'}`}
                                >
                                    <span className="sr-only">Accept Ride Requests</span>
                                    <span
                                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isAccepting ? 'translate-x-5' : 'translate-x-0'}`}
                                    />
                                </button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="p-3.5 rounded-xl bg-red-50 border border-red-100 text-sm flex items-center gap-2.5">
                            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />
                            <span className="text-red-600 text-xs font-medium">{error}</span>
                        </div>
                    )}
                    
                    {successMessage && (
                        <div className="p-3.5 rounded-xl bg-green-50 border border-green-100 text-sm flex items-center gap-2.5">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                            <span className="text-green-600 text-xs font-medium">{successMessage}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Car Make</label>
                            <Input
                                name="car_name"
                                value={formData.car_name}
                                onChange={handleChange}
                                placeholder="e.g. Toyota"
                                className="h-12 bg-gray-50/80 border-gray-100 rounded-xl text-sm focus:ring-[#C69C2E]/20 focus:border-[#C69C2E]/30"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Car Model</label>
                            <Input
                                name="car_model"
                                value={formData.car_model}
                                onChange={handleChange}
                                placeholder="e.g. Camry"
                                className="h-12 bg-gray-50/80 border-gray-100 rounded-xl text-sm focus:ring-[#C69C2E]/20 focus:border-[#C69C2E]/30"
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Plate Number</label>
                            <Input
                                name="plate_number"
                                value={formData.plate_number}
                                onChange={handleChange}
                                placeholder="e.g. ABC-123-XY"
                                className="h-12 bg-gray-50/80 border-gray-100 rounded-xl text-sm uppercase focus:ring-[#C69C2E]/20 focus:border-[#C69C2E]/30"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full h-12 bg-[#C69C2E] hover:bg-[#b08b29] text-white font-bold text-sm rounded-xl transition-all hover:shadow-lg hover:shadow-[#C69C2E]/20"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    {isExisting ? "Updating..." : "Saving..."}
                                </>
                            ) : (
                                isExisting ? "Update Vehicle Information" : "Save Vehicle Information"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
