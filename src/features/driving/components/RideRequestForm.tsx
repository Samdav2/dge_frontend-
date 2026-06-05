"use client";

import React, { useState, useEffect } from "react";
import { MapPin, Navigation2, Clock, Shield, Sparkles, ArrowRight, Locate } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LocationInput } from "./LocationInput";
import { reverseGeocode } from "../actions";

interface RideRequestFormProps {
    onSubmit: () => void;
    onLocationSelect?: (lat: number, lon: number) => void;
}

export function RideRequestForm({ onSubmit, onLocationSelect }: RideRequestFormProps) {
    const [pickupLocation, setPickupLocation] = useState("");
    const [destinationLocation, setDestinationLocation] = useState("");
    const [pickupCoords, setPickupCoords] = useState<{ lat: number, lon: number } | null>(null);
    const [destinationCoords, setDestinationCoords] = useState<{ lat: number, lon: number } | null>(null);
    const [isLocating, setIsLocating] = useState(false);

    useEffect(() => {
        if (navigator.geolocation) {
            setIsLocating(true);
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setPickupCoords({ lat: latitude, lon: longitude });
                    if (onLocationSelect) {
                        onLocationSelect(latitude, longitude);
                    }
                    try {
                        const address = await reverseGeocode(latitude, longitude);
                        if (address) {
                            setPickupLocation(address);
                        } else {
                            setPickupLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
                        }
                    } catch (error) {
                        console.error("Failed to reverse geocode:", error);
                    } finally {
                        setIsLocating(false);
                    }
                },
                (error) => {
                    console.warn("Geolocation failed:", error);
                    setIsLocating(false);
                }
            );
        }
    }, []);

    const handlePickupSelect = (lat: number, lon: number, displayName: string) => {
        setPickupCoords({ lat, lon });
        setPickupLocation(displayName);
        if (onLocationSelect) onLocationSelect(lat, lon);
    };

    const handleDestinationSelect = (lat: number, lon: number, displayName: string) => {
        setDestinationCoords({ lat, lon });
        setDestinationLocation(displayName);
        if (onLocationSelect) onLocationSelect(lat, lon);
    };

    const estimatedDistance = pickupCoords && destinationCoords
        ? (Math.sqrt(Math.pow(pickupCoords.lat - destinationCoords.lat, 2) + Math.pow(pickupCoords.lon - destinationCoords.lon, 2)) * 111).toFixed(1)
        : null;

    const estimatedTime = estimatedDistance ? Math.ceil(parseFloat(estimatedDistance) * 2.5) : null;
    const estimatedFare = estimatedDistance ? Math.ceil(parseFloat(estimatedDistance) * 500) : null;

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm h-auto lg:h-full flex flex-col overflow-hidden">
            {/* Form Header */}
            <div className="px-5 pt-5 pb-4 border-b border-gray-50">
                <div className="flex items-center justify-between mb-1">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[#C69C2E]/10 flex items-center justify-center">
                            <Navigation2 className="w-4 h-4 text-[#C69C2E]" />
                        </div>
                        Request a Ride
                    </h2>
                    {isLocating && (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#C69C2E] font-medium animate-pulse">
                            <Locate className="w-3 h-3" />
                            Locating...
                        </div>
                    )}
                </div>
                <p className="text-xs text-gray-400 ml-10">Enter your pickup and destination</p>
            </div>

            {/* Route Inputs */}
            <div className="flex-1 px-5 py-5">
                <div className="relative flex gap-3">
                    {/* Visual Route Connector */}
                    <div className="flex flex-col items-center pt-4 gap-0">
                        <div className="relative">
                            <div className="w-3.5 h-3.5 rounded-full bg-[#C69C2E] ring-4 ring-[#C69C2E]/10" />
                            <div className="absolute inset-0 w-3.5 h-3.5 rounded-full bg-[#C69C2E] animate-ping opacity-30" />
                        </div>
                        <div className="w-0.5 flex-1 bg-gradient-to-b from-[#C69C2E]/40 via-[#C69C2E]/20 to-[#C69C2E]/40 my-1.5 min-h-[32px]" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #C69C2E40 0px, #C69C2E40 4px, transparent 4px, transparent 8px)' }} />
                        <div className="relative">
                            <MapPin className="w-4.5 h-4.5 text-[#C69C2E]" />
                        </div>
                    </div>

                    {/* Input Fields */}
                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Pickup</label>
                            <LocationInput
                                placeholder="Your current location"
                                className="h-12 bg-gray-50/80 border-gray-100 rounded-xl text-sm focus:ring-[#C69C2E]/20 focus:border-[#C69C2E]/30 transition-all"
                                value={pickupLocation}
                                onChange={setPickupLocation}
                                onLocationSelect={handlePickupSelect}
                            />
                        </div>
                        <div>
                            <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5 block">Destination</label>
                            <LocationInput
                                placeholder="Where are you going?"
                                className="h-12 bg-gray-50/80 border-gray-100 rounded-xl text-sm focus:ring-[#C69C2E]/20 focus:border-[#C69C2E]/30 transition-all"
                                value={destinationLocation}
                                onChange={setDestinationLocation}
                                onLocationSelect={handleDestinationSelect}
                            />
                        </div>
                    </div>
                </div>

                {/* Trip Estimate (shows when both locations set) */}
                {estimatedDistance && (
                    <div className="mt-5 p-3.5 rounded-xl bg-gradient-to-r from-[#C69C2E]/5 to-[#C69C2E]/10 border border-[#C69C2E]/10">
                        <div className="flex items-center gap-1.5 mb-2.5">
                            <Sparkles className="w-3 h-3 text-[#C69C2E]" />
                            <span className="text-[10px] font-semibold text-[#C69C2E] uppercase tracking-wider">Trip Estimate</span>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div>
                                <p className="text-[10px] text-gray-400 mb-0.5">Distance</p>
                                <p className="text-sm font-bold text-gray-900">{estimatedDistance} km</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 mb-0.5">Est. Time</p>
                                <p className="text-sm font-bold text-gray-900">{estimatedTime} min</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-400 mb-0.5">Est. Fare</p>
                                <p className="text-sm font-bold text-[#C69C2E]">₦{estimatedFare?.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Safety & Trust Badges */}
                <div className="mt-5 flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                        <Shield className="w-3 h-3 text-green-500" />
                        <span>Verified drivers</span>
                    </div>
                    <div className="w-px h-3 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                        <Clock className="w-3 h-3 text-blue-500" />
                        <span>Live tracking</span>
                    </div>
                </div>
            </div>

            {/* CTA Button */}
            <div className="px-5 pb-5">
                <Button
                    onClick={() => {
                        console.log("RideRequestForm: See Available Drivers clicked", { pickupCoords, destinationCoords });
                        onSubmit();
                    }}
                    className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-13 rounded-xl font-bold text-sm mt-auto relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-[#C69C2E]/20"
                >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                        See Available Drivers
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                </Button>
            </div>
        </div>
    );
}
