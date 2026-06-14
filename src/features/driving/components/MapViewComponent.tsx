"use client";

import React from "react";
import dynamic from "next/dynamic";

const MapWrapper = dynamic(() => import("./MapWrapper"), {
    ssr: false,
    loading: () => (
        <div className="bg-gray-100 h-full w-full flex items-center justify-center">
            <p className="text-gray-500">Loading Map...</p>
        </div>
    ),
});

export function MapView({ 
    center, 
    liveDrivers = [],
    trip = null,
    driverLocation = null
}: { 
    center?: [number, number] | null; 
    liveDrivers?: {id: string; lat: number; lng: number; details?: any}[];
    trip?: any | null;
    driverLocation?: { lat: number; lng: number } | null;
}) {
    return (
        <div className="bg-gray-100 rounded-2xl overflow-hidden h-full min-h-[300px] md:min-h-[500px] relative z-0">
            <MapWrapper 
                center={center} 
                liveDrivers={liveDrivers} 
                trip={trip}
                driverLocation={driverLocation}
            />
        </div>
    );
}
