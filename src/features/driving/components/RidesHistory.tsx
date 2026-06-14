"use client";

import React, { useState, useEffect } from "react";
import { Trip } from "../types";
import { getMyTripsAsRider, getMyTripsAsDriver } from "../actions";
import { Loader2, Car, User, MapPin, Clock, TrendingUp, Route, Filter, Calendar, Zap } from "lucide-react";

export function RidesHistory() {
    const [roleTab, setRoleTab] = useState<'rider' | 'driver'>('rider');
    const [statusTab, setStatusTab] = useState<'active' | 'past'>('active');
    
    const [riderTrips, setRiderTrips] = useState<Trip[]>([]);
    const [driverTrips, setDriverTrips] = useState<Trip[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            setLoading(true);
            try {
                const [riderRes, driverRes] = await Promise.all([
                    getMyTripsAsRider(),
                    getMyTripsAsDriver()
                ]);

                if (riderRes.success && riderRes.data) {
                    setRiderTrips(riderRes.data);
                }
                
                if (driverRes.success && driverRes.data) {
                    setDriverTrips(driverRes.data);
                }
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, []);

    const formatDate = (isoStr: string | null | undefined) => {
        if (!isoStr) return "—";
        return new Date(isoStr).toLocaleString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const formatCurrency = (amount: number | null | undefined) => {
        if (amount == null) return "—";
        return `₦${amount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
    };

    const getStatusConfig = (status: string) => {
        const upperStatus = status.toUpperCase();
        switch (upperStatus) {
            case 'PENDING': return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', dot: 'bg-amber-400', label: 'Pending' };
            case 'ACTIVE': return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', dot: 'bg-blue-400 animate-pulse', label: 'In Progress' };
            case 'COMPLETED': return { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-100', dot: 'bg-green-400', label: 'Completed' };
            case 'CANCELLED': return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-100', dot: 'bg-red-400', label: 'Cancelled' };
            default: return { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-100', dot: 'bg-gray-400', label: status };
        }
    };

    const displayTrips = roleTab === 'rider' ? riderTrips : driverTrips;
    
    const filteredTrips = displayTrips.filter(trip => {
        const tripStatus = trip.status.toUpperCase();
        if (statusTab === 'active') {
            return ['PENDING', 'ACTIVE', 'EN_ROUTE', 'ARRIVED', 'AWAITING_CONFIRMATION', 'IN_PROGRESS'].includes(tripStatus);
        } else {
            return tripStatus === 'COMPLETED' || tripStatus === 'CANCELLED';
        }
    });

    // Quick stats
    const totalTrips = displayTrips.length;
    const completedTrips = displayTrips.filter(t => t.status.toUpperCase() === 'COMPLETED').length;
    const totalSpent = displayTrips.filter(t => t.status.toUpperCase() === 'COMPLETED').reduce((sum, t) => sum + (t.final_fare ?? t.estimated_fare), 0);
    const totalDistance = displayTrips.filter(t => t.status.toUpperCase() === 'COMPLETED').reduce((sum, t) => sum + t.distance_km, 0);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-[500px] bg-white rounded-2xl border border-gray-100 shadow-sm">
                <div className="relative mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#C69C2E]/10 flex items-center justify-center">
                        <Car className="w-6 h-6 text-[#C69C2E]" />
                    </div>
                    <Loader2 className="absolute -top-1 -right-1 h-5 w-5 animate-spin text-[#C69C2E]" />
                </div>
                <p className="text-sm font-semibold text-gray-900">Loading rides</p>
                <p className="text-xs text-gray-400 mt-1">Fetching your ride history...</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[500px]">
            {/* Header */}
            <div className="border-b border-gray-50 px-5 md:px-6 pt-5 pb-0">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                            <Route className="w-5 h-5 text-[#C69C2E]" />
                            Ride History
                        </h2>
                        <p className="text-xs text-gray-400 mt-0.5">{totalTrips} total ride{totalTrips !== 1 ? 's' : ''}</p>
                    </div>
                </div>

                {/* Quick Stats — Horizontal Scroll on Mobile */}
                <div className="flex gap-2 md:gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4">
                    {[
                        { icon: Car, label: 'Completed', value: `${completedTrips}`, color: '#10B981' },
                        { icon: TrendingUp, label: roleTab === 'rider' ? 'Total Spent' : 'Total Earned', value: formatCurrency(totalSpent), color: '#C69C2E' },
                        { icon: Route, label: 'Distance', value: `${totalDistance.toFixed(0)} km`, color: '#3B82F6' },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-100 flex-shrink-0 min-w-0">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                style={{ background: `${stat.color}10`, border: `1px solid ${stat.color}20` }}>
                                <stat.icon className="h-4 w-4" style={{ color: stat.color }} />
                            </div>
                            <div className="min-w-0">
                                <p className="text-[9px] text-gray-400 font-medium">{stat.label}</p>
                                <p className="text-sm font-bold text-gray-900 truncate">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* Filter Tabs */}
                <div className="flex flex-col md:flex-row justify-between gap-3">
                    {/* Role Toggle */}
                    <div className="flex items-center bg-gray-50 p-1 rounded-xl border border-gray-100 self-start overflow-x-auto max-w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <button
                            onClick={() => setRoleTab('rider')}
                            className={`flex items-center flex-shrink-0 gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                                roleTab === 'rider' 
                                    ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            <User className="h-3.5 w-3.5 flex-shrink-0" />
                            As Passenger
                        </button>
                        <button
                            onClick={() => setRoleTab('driver')}
                            className={`flex items-center flex-shrink-0 gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                                roleTab === 'driver' 
                                    ? 'bg-white text-gray-900 shadow-sm border border-gray-100' 
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            <Car className="h-3.5 w-3.5 flex-shrink-0" />
                            As Driver
                        </button>
                    </div>

                    {/* Status Toggle */}
                    <div className="flex gap-1 bg-gray-50 p-1 rounded-xl border border-gray-100 self-start">
                        <button
                            onClick={() => setStatusTab('active')}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                                statusTab === 'active' 
                                    ? 'bg-[#C69C2E] text-white shadow-sm' 
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            Active
                        </button>
                        <button
                            onClick={() => setStatusTab('past')}
                            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                                statusTab === 'past' 
                                    ? 'bg-[#C69C2E] text-white shadow-sm' 
                                    : 'text-gray-400 hover:text-gray-600'
                            }`}
                        >
                            Past
                        </button>
                    </div>
                </div>
            </div>

            {/* List Content */}
            <div className="flex-1 p-4 md:p-5 overflow-y-auto">
                {filteredTrips.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                        <div className="h-16 w-16 bg-gray-50 rounded-2xl flex items-center justify-center mb-4">
                            <Car className="h-7 w-7 text-gray-300" />
                        </div>
                        <h3 className="text-base font-bold text-gray-900 mb-1">No {statusTab} rides</h3>
                        <p className="text-gray-400 text-xs max-w-[280px]">
                            {roleTab === 'rider' 
                                ? "You haven't requested any rides that match this status." 
                                : "You haven't driven any rides that match this status."}
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {filteredTrips.map(trip => {
                            const statusConfig = getStatusConfig(trip.status);
                            return (
                                <div key={trip.id} className="bg-white rounded-xl p-4 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200">
                                    {/* Top Row */}
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                                                <Calendar className="w-3 h-3" />
                                                {formatDate(trip.requested_at)}
                                            </div>
                                        </div>
                                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider ${statusConfig.bg} ${statusConfig.text} border ${statusConfig.border}`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dot}`} />
                                            {statusConfig.label}
                                        </div>
                                    </div>

                                    {/* Route */}
                                    <div className="relative pl-5 space-y-3 mb-3">
                                        <div className="absolute left-[7px] top-2 bottom-2 w-0.5" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #e5e5e5 0px, #e5e5e5 3px, transparent 3px, transparent 6px)' }} />
                                        
                                        <div className="relative">
                                            <div className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-full border-2 border-[#C69C2E] bg-white" />
                                            <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Pickup</p>
                                            <p className="text-xs text-gray-900 font-medium line-clamp-1">
                                                {trip.pickup_address || `${trip.pickup_lat.toFixed(4)}, ${trip.pickup_lng.toFixed(4)}`}
                                            </p>
                                        </div>
                                        
                                        <div className="relative">
                                            <div className="absolute -left-5 top-1 h-2.5 w-2.5 rounded-sm border-2 border-gray-900 bg-white" />
                                            <p className="text-[9px] text-gray-400 font-semibold uppercase tracking-wider">Dropoff</p>
                                            <p className="text-xs text-gray-900 font-medium line-clamp-1">
                                                {trip.dropoff_address || `${trip.dropoff_lat.toFixed(4)}, ${trip.dropoff_lng.toFixed(4)}`}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bottom Stats */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[10px] text-gray-400 flex items-center gap-1">
                                                <Route className="w-3 h-3" />
                                                {trip.distance_km.toFixed(1)} km
                                            </span>
                                            {trip.surge_multiplier > 1 && (
                                                <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                                                    <Zap className="w-2.5 h-2.5" />
                                                    {trip.surge_multiplier}× surge
                                                </span>
                                            )}
                                            {trip.driver_id && roleTab === 'rider' && (
                                                <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-md font-medium flex items-center gap-1">
                                                    <Car className="w-2.5 h-2.5" />
                                                    Driver assigned
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">
                                            {formatCurrency(trip.final_fare ?? trip.estimated_fare)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
