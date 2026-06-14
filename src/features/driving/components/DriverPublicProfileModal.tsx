"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Star, Car, Shield, Navigation, Calendar, Award, MessageSquare, Loader2, User, AlertTriangle } from "lucide-react";
import { getDriverPublicProfile } from "../actions";

interface DriverPublicProfileModalProps {
    driverId: string;
    onClose: () => void;
}

export function DriverPublicProfileModal({ driverId, onClose }: DriverPublicProfileModalProps) {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<"reviews" | "rides">("reviews");

    useEffect(() => {
        async function fetchProfile() {
            setLoading(true);
            setError(null);
            try {
                const res = await getDriverPublicProfile(driverId);
                if (res.success) {
                    setProfile(res.data);
                } else {
                    setError(res.error || "Failed to load driver profile.");
                }
            } catch (err) {
                console.error("Error fetching public driver profile:", err);
                setError("Network error occurred.");
            } finally {
                setLoading(false);
            }
        }
        if (driverId) {
            fetchProfile();
        }
    }, [driverId]);

    // Calculate average rating
    const avgRating = React.useMemo(() => {
        if (!profile || !profile.reviews || profile.reviews.length === 0) return 5.0;
        const total = profile.reviews.reduce((sum: number, r: any) => sum + r.rating, 0);
        return (total / profile.reviews.length).toFixed(1);
    }, [profile]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg relative shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
                {/* Top accent bar */}
                <div className="h-1 bg-gradient-to-r from-[#C69C2E] to-[#E5B84D]" />

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-5 p-2 hover:bg-gray-50 rounded-xl transition-colors z-10"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-12 space-y-4 min-h-[300px]">
                        <Loader2 className="w-8 h-8 text-[#C69C2E] animate-spin" />
                        <p className="text-sm font-semibold text-gray-600">Fetching driver details...</p>
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[300px] space-y-4">
                        <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900">Failed to load profile</h3>
                        <p className="text-xs text-gray-400 max-w-[280px]">{error}</p>
                        <Button onClick={onClose} className="bg-[#C69C2E] hover:bg-[#b08b29]">Close</Button>
                    </div>
                ) : (
                    <>
                        {/* Header Summary */}
                        <div className="p-6 pb-4 border-b border-gray-100 bg-gray-50/50">
                            <div className="flex items-start gap-4">
                                {/* Avatar */}
                                <div className="w-16 h-16 rounded-2xl bg-[#C69C2E]/10 border border-[#C69C2E]/15 flex items-center justify-center overflow-hidden flex-shrink-0">
                                    {profile.driver_avatar ? (
                                        <img
                                            src={profile.driver_avatar}
                                            alt={profile.driver_name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <Car className="w-8 h-8 text-[#C69C2E]" />
                                    )}
                                </div>

                                {/* Identity & Car */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2 className="text-lg font-bold text-gray-900 truncate">{profile.driver_name}</h2>
                                        <div className="flex items-center gap-0.5 bg-[#C69C2E]/10 px-2 py-0.5 rounded-full flex-shrink-0">
                                            <Star className="w-3 h-3 text-[#C69C2E] fill-[#C69C2E]" />
                                            <span className="text-[10px] font-bold text-[#C69C2E]">{avgRating}</span>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500 mb-2 flex items-center gap-1 font-medium">
                                        <Car className="w-3.5 h-3.5 text-gray-400" />
                                        {profile.car_name} {profile.car_model} • <span className="font-semibold text-gray-700">{profile.plate_number}</span>
                                    </p>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-semibold bg-green-50 text-green-700 border border-green-100">
                                            <Shield className="w-2.5 h-2.5" />
                                            Verified Driver
                                        </span>
                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-semibold bg-amber-50 text-amber-700 border border-amber-100 uppercase">
                                            <Award className="w-2.5 h-2.5" />
                                            {profile.rank}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Stat counts */}
                            <div className="grid grid-cols-2 gap-4 mt-5 p-3 rounded-xl bg-white border border-gray-100 shadow-sm text-center">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Completed Rides</p>
                                    <p className="text-lg font-bold text-gray-900 mt-0.5">{profile.successful_rides}</p>
                                </div>
                                <div className="border-l border-gray-100">
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Total Service Rides</p>
                                    <p className="text-lg font-bold text-gray-900 mt-0.5">{profile.total_rides}</p>
                                </div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 px-6">
                            <button
                                onClick={() => setActiveTab("reviews")}
                                className={`py-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                                    activeTab === "reviews"
                                        ? "border-[#C69C2E] text-[#C69C2E]"
                                        : "border-transparent text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                <MessageSquare className="w-3.5 h-3.5" />
                                Reviews ({profile.reviews?.length || 0})
                            </button>
                            <button
                                onClick={() => setActiveTab("rides")}
                                className={`py-3 ml-6 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                                    activeTab === "rides"
                                        ? "border-[#C69C2E] text-[#C69C2E]"
                                        : "border-transparent text-gray-400 hover:text-gray-600"
                                }`}
                            >
                                <Navigation className="w-3.5 h-3.5" />
                                Completed History ({profile.completed_trips?.length || 0})
                            </button>
                        </div>

                        {/* Tab Content */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {activeTab === "reviews" ? (
                                !profile.reviews || profile.reviews.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-xs text-gray-400">No reviews received yet.</p>
                                    </div>
                                ) : (
                                    profile.reviews.map((r: any) => (
                                        <div key={r.id} className="p-3.5 rounded-xl border border-gray-100 space-y-2.5 hover:shadow-sm transition-all duration-200 bg-white">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <div className="w-6 h-6 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-150">
                                                        {r.reviewer_avatar ? (
                                                            <img src={r.reviewer_avatar} alt={r.reviewer_name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <User className="w-3 h-3 text-gray-400" />
                                                        )}
                                                    </div>
                                                    <span className="text-xs font-bold text-gray-800">{r.reviewer_name}</span>
                                                </div>
                                                <div className="flex items-center gap-0.5">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <Star
                                                            key={star}
                                                            className={`w-3 h-3 ${
                                                                star <= r.rating ? "text-[#C69C2E] fill-[#C69C2E]" : "text-gray-200"
                                                            }`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <p className="text-xs text-gray-600 leading-relaxed font-normal bg-gray-50/50 p-2 rounded-lg border border-gray-50">{r.comment}</p>
                                            <div className="flex items-center justify-end text-[9px] text-gray-400 font-medium">
                                                <Calendar className="w-2.5 h-2.5 mr-1" />
                                                {new Date(r.created_at).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </div>
                                        </div>
                                    ))
                                )
                            ) : (
                                !profile.completed_trips || profile.completed_trips.length === 0 ? (
                                    <div className="text-center py-12">
                                        <p className="text-xs text-gray-400">No rides completed yet.</p>
                                    </div>
                                ) : (
                                    profile.completed_trips.map((t: any) => (
                                        <div key={t.id} className="p-3.5 rounded-xl border border-gray-100 hover:shadow-sm transition-all duration-200 space-y-2 bg-white">
                                            <div className="flex items-center justify-between">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-semibold bg-green-50 text-green-700 border border-green-100">
                                                    Completed
                                                </span>
                                                <span className="text-[10px] text-gray-400 font-semibold">{t.distance_km.toFixed(1)} km</span>
                                            </div>
                                            <div className="space-y-1.5">
                                                <div className="flex items-start gap-2 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                                                    <p className="text-gray-600 truncate"><span className="font-semibold text-gray-800">From:</span> {t.pickup_address || "Pickup Address"}</p>
                                                </div>
                                                <div className="flex items-start gap-2 text-xs">
                                                    <div className="w-1.5 h-1.5 rounded-full bg-[#C69C2E] mt-1.5 flex-shrink-0" />
                                                    <p className="text-gray-600 truncate"><span className="font-semibold text-gray-800">To:</span> {t.dropoff_address || "Dropoff Address"}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-end text-[9px] text-gray-400 pt-1 border-t border-gray-50 font-medium">
                                                <Calendar className="w-2.5 h-2.5 mr-1" />
                                                {new Date(t.completed_at).toLocaleDateString(undefined, {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </div>
                                        </div>
                                    ))
                                )
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-4 border-t border-gray-100 bg-gray-50/50 flex justify-end">
                            <Button
                                onClick={onClose}
                                className="bg-[#C69C2E] hover:bg-[#b08b29] text-white px-6 h-10 rounded-xl font-bold text-xs"
                            >
                                Close Profile
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
