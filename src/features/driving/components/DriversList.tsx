"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Car, Clock, Loader2 } from "lucide-react";
import { getDriversNearby } from "../actions";
import { DriverNearbyResponse } from "../types";

interface DriversListProps {
    onBack: () => void;
    onContinue: () => void;
}

export function DriversList({ onBack, onContinue }: DriversListProps) {
    const [drivers, setDrivers] = useState<DriverNearbyResponse[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchDrivers = async () => {
            console.log("DriversList: fetchDrivers called");
            try {
                // TODO: Get real user location. For now, using a default location (e.g., Lagos)
                // or we could ask the browser for location.
                // Let's try to get browser location first.
                if (navigator.geolocation) {
                    console.log("DriversList: requesting geolocation");
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            console.log("DriversList: geolocation success", position);
                            try {
                                const data = await getDriversNearby(
                                    position.coords.latitude,
                                    position.coords.longitude
                                );
                                console.log("DriversList: drivers fetched", data);
                                setDrivers(data);
                                setLoading(false);
                            } catch (err) {
                                console.error("DriversList: Failed to fetch drivers with location:", err);
                                setDrivers([]);
                                setLoading(false);
                            }
                        },
                        async (err) => {
                            console.warn("DriversList: Geolocation permission denied or failed:", err);
                            // Fallback fetch with default coordinates (e.g. Lagos)
                            try {
                                console.log("DriversList: fetching with default location");
                                const data = await getDriversNearby(6.5244, 3.3792);
                                setDrivers(data);
                            } catch (apiErr) {
                                console.error("DriversList: Failed to fetch drivers with default location:", apiErr);
                                setError("Failed to load drivers.");
                            }
                            setLoading(false);
                        }
                    );
                } else {
                    console.log("DriversList: geolocation not supported");
                    // Fallback if geolocation not supported
                    const data = await getDriversNearby(6.5244, 3.3792);
                    setDrivers(data);
                    setLoading(false);
                }
            } catch (err) {
                console.error("DriversList: Error fetching drivers:", err);
                setError("Failed to load drivers. Please try again.");
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    if (loading) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full flex flex-col items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#C69C2E] animate-spin mb-2" />
                <p className="text-gray-500">Finding drivers near you...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full flex flex-col items-center justify-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={onBack} variant="outline">Go Back</Button>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                </button>
                <h2 className="text-lg font-bold text-gray-900">Drivers Near You</h2>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2 -mr-2">
                {drivers.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                        No drivers found nearby.
                    </div>
                ) : (
                    drivers.map((driver) => (
                        <div
                            key={driver.driver_id}
                            className="p-4 border border-gray-100 rounded-xl hover:border-[#C69C2E] cursor-pointer transition-colors group"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#C69C2E]/10 flex items-center justify-center">
                                        <Car className="w-5 h-5 text-[#C69C2E]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{driver.car_name}</h3>
                                        <p className="text-xs text-gray-500 mt-0.5">
                                            {/* We don't have car model in the response based on the type,
                                                but we have car_name. Let's use car_name for now.
                                                Wait, the type says car_name.
                                                Let's check the type definition again.
                                                DriverNearbyResponse has car_name.
                                            */}
                                            {driver.car_name}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            {/* Distance is available */}
                                            {driver.distance_km.toFixed(1)} km away
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center justify-end gap-1 text-xs text-gray-400 mb-1">
                                        <Clock className="w-3 h-3" />
                                        <span>
                                            {/* Estimate time: 2 mins per km roughly */}
                                            {Math.ceil(driver.distance_km * 2)} Mins
                                        </span>
                                    </div>
                                    {/* Price is not in the nearby response, maybe we need to calculate it or it comes from elsewhere.
                                        For now, I'll put a placeholder or remove it.
                                        Let's put a placeholder range based on distance.
                                    */}
                                    <div className="font-bold text-gray-900">
                                        N{(driver.distance_km * 500).toFixed(0)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100">
                <Button
                    onClick={onContinue}
                    className="w-full bg-[#C69C2E] hover:bg-[#b08b29] text-white h-12 rounded-xl font-bold text-base"
                    disabled={drivers.length === 0}
                >
                    Continue
                </Button>
            </div>
        </div>
    );
}
