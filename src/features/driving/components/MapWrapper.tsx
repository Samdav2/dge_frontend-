"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";

// Enhanced Car Icon with premium design
const carIcon = L.divIcon({
    className: 'custom-car-marker',
    html: `
        <div class="car-marker-wrapper">
            <div class="car-pulse"></div>
            <div class="car-icon-container">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/>
                    <circle cx="6.5" cy="16.5" r="2.5"/>
                    <circle cx="16.5" cy="16.5" r="2.5"/>
                </svg>
            </div>
        </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -24],
});

// Location markers
const locationIcon = L.divIcon({
    className: 'location-marker',
    html: `
        <div class="location-marker-wrapper">
            <div class="location-pulse"></div>
            <div class="location-pin"></div>
        </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
});

// Mock route coordinates (pickup to destination)
const routeCoordinates: [number, number][] = [
    [6.222, 7.082], // Start (Ifite-awka)
    [6.223, 7.083],
    [6.224, 7.084],
    [6.225, 7.085],
    [6.226, 7.086],
    [6.227, 7.087], // End (Nnewi)
];

function MapController({ center, bounds }: { center?: [number, number] | null; bounds?: L.LatLngBoundsExpression | null }) {
    const map = useMap();

    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [50, 50], animate: true, duration: 1.5 });
        } else if (center) {
            map.flyTo(center, 14, {
                animate: true,
                duration: 1.5
            });
        }
    }, [center, bounds, map]);

    return null;
}

interface MapWrapperProps {
    center?: [number, number] | null;
    liveDrivers?: { id: string; lat: number; lng: number; details?: any }[];
    trip?: any | null;
    driverLocation?: { lat: number; lng: number } | null;
}

export default function MapWrapper({ center, liveDrivers = [], trip, driverLocation }: MapWrapperProps) {
    // Generate route points if there's an active trip
    const getRoutePoints = (startLat: number, startLng: number, endLat: number, endLng: number) => {
        const points: [number, number][] = [];
        const steps = 15;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            points.push([
                startLat + (endLat - startLat) * t,
                startLng + (endLng - startLng) * t
            ]);
        }
        return points;
    };

    const routeCoords = trip 
        ? getRoutePoints(trip.pickup_lat, trip.pickup_lng, trip.dropoff_lat, trip.dropoff_lng)
        : routeCoordinates;

    // Calculate map bounds for the trip
    const mapBounds = trip
        ? L.latLngBounds([
            [trip.pickup_lat, trip.pickup_lng],
            [trip.dropoff_lat, trip.dropoff_lng]
          ])
        : null;

    // Determine current driver marker position
    const currentDriverPos: [number, number] | null = driverLocation 
        ? [driverLocation.lat, driverLocation.lng]
        : trip && trip.status === 'ACTIVE'
            ? [trip.pickup_lat, trip.pickup_lng] // Fallback to start
            : null;

    return (
        <MapContainer
            center={trip ? [trip.pickup_lat, trip.pickup_lng] : [6.224, 7.084]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={false}
            zoomControl={true}
        >
            <MapController center={center} bounds={mapBounds} />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                subdomains='abcd'
                maxZoom={20}
            />

            {/* Route polyline */}
            {(trip || routeCoords.length > 0) && (
                <Polyline
                    positions={routeCoords}
                    pathOptions={{
                        color: '#C69C2E',
                        weight: 4,
                        opacity: 0.8,
                        dashArray: '10, 10',
                        lineCap: 'round',
                        lineJoin: 'round'
                    }}
                />
            )}

            {/* Start location / Pickup */}
            {trip ? (
                <Marker position={[trip.pickup_lat, trip.pickup_lng]} icon={locationIcon}>
                    <Popup>
                        <div className="text-sm">
                            <div className="font-bold text-gray-900">Pickup Location</div>
                            <div className="text-gray-500">{trip.pickup_address || "Pickup"}</div>
                        </div>
                    </Popup>
                </Marker>
            ) : (
                <Marker position={[6.222, 7.082]} icon={locationIcon}>
                    <Popup>
                        <div className="text-sm">
                            <div className="font-bold text-gray-900">Pickup Location</div>
                            <div className="text-gray-500">Ifite-awka, Anambra State</div>
                        </div>
                    </Popup>
                </Marker>
            )}

            {/* End location / Destination */}
            {trip ? (
                <Marker position={[trip.dropoff_lat, trip.dropoff_lng]} icon={locationIcon}>
                    <Popup>
                        <div className="text-sm">
                            <div className="font-bold text-gray-900">Destination</div>
                            <div className="text-gray-500">{trip.dropoff_address || "Dropoff"}</div>
                        </div>
                    </Popup>
                </Marker>
            ) : (
                <Marker position={[6.227, 7.087]} icon={locationIcon}>
                    <Popup>
                        <div className="text-sm">
                            <div className="font-bold text-gray-900">Destination</div>
                            <div className="text-gray-500">Nnewi, Anambra State</div>
                        </div>
                    </Popup>
                </Marker>
            )}

            {/* Show active trip driver marker */}
            {currentDriverPos && (
                <Marker position={currentDriverPos} icon={carIcon}>
                    <Popup>
                        <div className="text-sm">
                            <div className="font-bold text-gray-900">Your Ride</div>
                            <div className="text-gray-500">En route</div>
                        </div>
                    </Popup>
                </Marker>
            )}

            {/* Show selected location marker if available */}
            {center && (
                <Marker position={center} icon={locationIcon}>
                    <Popup>
                        <div className="text-sm">
                            <div className="font-bold text-gray-900">Selected Location</div>
                        </div>
                    </Popup>
                </Marker>
            )}

            {/* Render other live drivers only when NOT in active trip */}
            {!trip && liveDrivers.map((driver) => (
                <Marker key={driver.id} position={[driver.lat, driver.lng]} icon={carIcon}>
                    <Popup>
                        <div className="text-sm">
                            <div className="font-bold text-gray-900">{driver.details?.name || "Live Driver"}</div>
                            {driver.details && (
                                <div className="text-gray-500">
                                    {driver.details.car_name} {driver.details.car_model}
                                </div>
                            )}
                            <div className="text-[#C69C2E] font-medium mt-1">
                                {driver.details?.rating ? `★ ${driver.details.rating}` : "ID: " + driver.id.slice(0, 8)}
                            </div>
                        </div>
                    </Popup>
                </Marker>
            ))}

            {/* Fallback drivers if no live drivers found (just for demo purposes) */}
            {!trip && liveDrivers.length === 0 && (
                <>
                    <Marker position={[6.225, 7.085]} icon={carIcon}>
                        <Popup>
                            <div className="text-sm">
                                <div className="font-bold text-gray-900">David Johnson</div>
                                <div className="text-gray-500">Toyota Corolla • ABJ-432KD</div>
                                <div className="text-[#C69C2E] font-medium mt-1">4 mins away</div>
                            </div>
                        </Popup>
                    </Marker>
                    <Marker position={[6.220, 7.080]} icon={carIcon}>
                        <Popup>
                            <div className="text-sm">
                                <div className="font-bold text-gray-900">Sophia Turner</div>
                                <div className="text-gray-500">Honda Civic • ABJ-298LM</div>
                                <div className="text-[#C69C2E] font-medium mt-1">6 mins away</div>
                            </div>
                        </Popup>
                    </Marker>
                    <Marker position={[6.230, 7.090]} icon={carIcon}>
                        <Popup>
                            <div className="text-sm">
                                <div className="font-bold text-gray-900">Michael Lee</div>
                                <div className="text-gray-500">Ford Focus • ABJ-156NK</div>
                                <div className="text-[#C69C2E] font-medium mt-1">8 mins away</div>
                            </div>
                        </Popup>
                    </Marker>
                </>
            )}
        </MapContainer>
    );
}

