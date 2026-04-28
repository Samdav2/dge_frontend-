"use client";

import React, { useState, useEffect } from "react";
import { MapPin } from "lucide-react";
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

    // We can track coordinates if needed for the map or ride request
    const [pickupCoords, setPickupCoords] = useState<{ lat: number, lon: number } | null>(null);
    const [destinationCoords, setDestinationCoords] = useState<{ lat: number, lon: number } | null>(null);

    useEffect(() => {
        // Auto-detect user location on mount
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setPickupCoords({ lat: latitude, lon: longitude });

                    // Update map center to user location initially
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
                    }
                },
                (error) => {
                    console.warn("Geolocation failed:", error);
                }
            );
        }
    }, []);

    const handlePickupSelect = (lat: number, lon: number, displayName: string) => {
        setPickupCoords({ lat, lon });
        setPickupLocation(displayName);
        if (onLocationSelect) {
            onLocationSelect(lat, lon);
        }
    };

    const handleDestinationSelect = (lat: number, lon: number, displayName: string) => {
        setDestinationCoords({ lat, lon });
        setDestinationLocation(displayName);
        // Optionally move map to destination or fit bounds
        if (onLocationSelect) {
            onLocationSelect(lat, lon);
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 h-auto lg:h-full flex flex-col">
            <h2 className="text-lg font-bold text-gray-900 mb-8">Request A Ride</h2>

            <div className="flex-1">
                <div className="relative flex gap-4">
                    {/* Connector Line */}
                    <div className="flex flex-col items-center pt-3">
                        <div className="w-3 h-3 rounded-full bg-[#C69C2E]" />
                        <div className="w-0.5 flex-1 border-l-2 border-dashed border-[#C69C2E]/30 my-1" />
                        <MapPin className="w-5 h-5 text-[#C69C2E]" />
                    </div>

                    <div className="flex-1 space-y-6 pb-8">
                        <div>
                            <LocationInput
                                placeholder="Your location"
                                className="h-12 bg-gray-50 border-gray-100 rounded-xl"
                                value={pickupLocation}
                                onChange={setPickupLocation}
                                onLocationSelect={handlePickupSelect}
                            />
                        </div>
                        <div>
                            <LocationInput
                                placeholder="Enter Destination"
                                className="h-12 bg-gray-50 border-gray-100 rounded-xl"
                                value={destinationLocation}
                                onChange={setDestinationLocation}
                                onLocationSelect={handleDestinationSelect}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Button
                onClick={() => {
                    console.log("RideRequestForm: See Available Drivers clicked", { pickupCoords, destinationCoords });
                    onSubmit();
                }}
                className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base mt-auto"
            >
                See Available Drivers
            </Button>
        </div>
    );
}
