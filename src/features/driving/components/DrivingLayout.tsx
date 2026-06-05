"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RideRequestForm } from "./RideRequestForm";
import { DriversList } from "./DriversList";
import { MapView } from "./MapViewComponent";
import { RideConfirmation } from "./RideConfirmation";
import { RideNegotiationModal } from "./RideNegotiationModal";
import { RidePaymentModal } from "./RidePaymentModal";
import { SuccessModal } from "./SuccessModal";
import { DriverProfileForm } from "./DriverProfileForm";
import { RidesHistory } from "./RidesHistory";
import { getUserKyc } from "@/features/profile/actions";
import {
    Loader2, Car, Navigation, Clock, History, UserCircle,
    Sparkles, Shield, TrendingUp, Zap, MapPin
} from "lucide-react";

export function DrivingLayout() {
    const [activeTab, setActiveTab] = React.useState<'book' | 'booked' | 'profile' | 'rides'>('book');
    const [isDriverVerified, setIsDriverVerified] = React.useState(false);
    const [isLoadingKyc, setIsLoadingKyc] = React.useState(true);
    const [showDriversList, setShowDriversList] = React.useState(false);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [showNegotiation, setShowNegotiation] = React.useState(false);
    const [showPayment, setShowPayment] = React.useState(false);
    const [successModal, setSuccessModal] = React.useState<{ title: string; message: string } | null>(null);
    const [mapCenter, setMapCenter] = React.useState<[number, number] | null>(null);
    const [currentTime, setCurrentTime] = React.useState(new Date());

    React.useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    React.useEffect(() => {
        const checkKyc = async () => {
            setIsLoadingKyc(true);
            const res = await getUserKyc();
            if (res.success && res.data) {
                if (res.data.id_document_type === 'drivers_license' && res.data.status === 'verified') {
                    setIsDriverVerified(true);
                }
            }
            setIsLoadingKyc(false);
        };
        checkKyc();
    }, []);

    const handleNegotiationSubmit = () => {
        setShowNegotiation(false);
        setSuccessModal({
            title: "Negotiation Sent",
            message: "Your negotiation request has been sent to the driver."
        });
    };

    const handlePayment = () => {
        setShowPayment(false);
        setSuccessModal({
            title: "Payment Successful",
            message: "Your ride has been successfully booked."
        });
    };

    const handleLocationSelect = (lat: number, lon: number) => {
        setMapCenter([lat, lon]);
    };

    const tabs = [
        { key: 'book' as const, label: 'Book a Ride', icon: Car, desc: 'Find nearby drivers' },
        { key: 'booked' as const, label: 'Incoming Rides', icon: Navigation, desc: 'Rides booked from you' },
        ...(isDriverVerified ? [{ key: 'profile' as const, label: 'Driver Profile', icon: UserCircle, desc: 'Vehicle details' }] : []),
    ];

    const getGreeting = () => {
        const hour = currentTime.getHours();
        if (hour < 12) return 'Good Morning';
        if (hour < 17) return 'Good Afternoon';
        return 'Good Evening';
    };

    return (
        <div className="min-h-[calc(100vh-100px)] flex flex-col relative -mt-4 md:-mt-8 -mx-4 md:-mx-8 w-[calc(100%+2rem)] md:w-[calc(100%+4rem)] overflow-hidden">
            {/* Modals */}
            {showNegotiation && (
                <RideNegotiationModal
                    onClose={() => setShowNegotiation(false)}
                    onSubmit={handleNegotiationSubmit}
                />
            )}
            {showPayment && (
                <RidePaymentModal
                    onClose={() => setShowPayment(false)}
                    onPayment={handlePayment}
                />
            )}
            {successModal && (
                <SuccessModal
                    title={successModal.title}
                    message={successModal.message}
                    onClose={() => {
                        setSuccessModal(null);
                        setShowConfirmation(false);
                        setShowDriversList(false);
                    }}
                />
            )}

            {/* Premium Header Banner */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#0D0D0D] via-[#1a1710] to-[#0D0D0D] px-4 md:px-8 pt-6 pb-8 md:pt-8 md:pb-10">
                {/* Ambient particles */}
                <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full bg-[#C69C2E]/8 blur-[100px]" />
                <div className="absolute bottom-0 left-1/4 w-[200px] h-[200px] rounded-full bg-[#C69C2E]/5 blur-[80px]" />
                
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-20" style={{
                    backgroundImage: 'linear-gradient(rgba(198,156,46,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(198,156,46,0.05) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />

                <div className="relative z-10">
                    {/* Top bar */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <p className="text-[#C69C2E] text-xs font-semibold tracking-widest uppercase mb-1">{getGreeting()}</p>
                            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                                <div className="w-9 h-9 rounded-xl bg-[#C69C2E]/15 border border-[#C69C2E]/25 flex items-center justify-center">
                                    <Car className="w-5 h-5 text-[#C69C2E]" />
                                </div>
                                DGE Rides
                            </h1>
                        </div>
                        <div className="hidden md:flex items-center gap-3">
                            {/* Live time */}
                            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                <Clock className="h-3.5 w-3.5 text-[#C69C2E]" />
                                <span className="text-xs font-mono text-white/70">
                                    {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                                </span>
                            </div>
                            <Button
                                onClick={() => setActiveTab('rides')}
                                variant="outline"
                                className="border-[#C69C2E]/30 text-[#C69C2E] hover:bg-[#C69C2E]/10 rounded-xl px-5 h-9 text-xs font-semibold bg-transparent"
                            >
                                <History className="h-3.5 w-3.5 mr-2" />
                                Ride History
                            </Button>
                        </div>
                    </div>

                    {/* Quick Stats Row */}
                    <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
                        {[
                            { icon: Zap, label: 'Avg. Match', value: '28s', color: '#F59E0B' },
                            { icon: Shield, label: 'Safety Score', value: '99.2%', color: '#10B981' },
                            { icon: TrendingUp, label: 'Surge', value: '1.0×', color: '#3B82F6' },
                        ].map((stat, i) => (
                            <div key={i} className="flex items-center gap-2 md:gap-3 px-3 py-2.5 md:px-4 md:py-3 rounded-xl bg-white/[0.04] border border-white/[0.06] backdrop-blur-sm">
                                <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${stat.color}15`, border: `1px solid ${stat.color}25` }}>
                                    <stat.icon className="h-3.5 w-3.5 md:h-4 md:w-4" style={{ color: stat.color }} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] md:text-[11px] text-white/40 font-medium truncate">{stat.label}</p>
                                    <p className="text-sm md:text-base font-bold text-white">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Tab Navigation — Mobile App Style */}
                    <div className="flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-1">
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.key;
                            return (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex items-center gap-2.5 px-4 md:px-5 py-2.5 md:py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer ${
                                        isActive
                                            ? 'bg-[#C69C2E] text-white shadow-lg shadow-[#C69C2E]/25'
                                            : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/5'
                                    }`}
                                >
                                    <tab.icon className="h-4 w-4" />
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                        {/* Mobile Ride History button */}
                        <button
                            onClick={() => setActiveTab('rides')}
                            className={`md:hidden flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 flex-shrink-0 cursor-pointer ${
                                activeTab === 'rides'
                                    ? 'bg-[#C69C2E] text-white shadow-lg shadow-[#C69C2E]/25'
                                    : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 border border-white/5'
                            }`}
                        >
                            <History className="h-4 w-4" />
                            <span>History</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 p-4 md:p-6 bg-gray-50">
                {activeTab === 'rides' ? (
                    <div className="h-full animate-in fade-in duration-300">
                        <RidesHistory />
                    </div>
                ) : activeTab === 'profile' ? (
                    <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
                        <DriverProfileForm />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-full">
                        {/* Left Panel — Form / Drivers / Confirmation */}
                        <div className="lg:col-span-1 h-auto lg:h-[calc(100vh-380px)] min-h-0 animate-in slide-in-from-left duration-300">
                            {showConfirmation ? (
                                <RideConfirmation
                                    onBack={() => setShowConfirmation(false)}
                                    onNegotiate={() => setShowNegotiation(true)}
                                    onBook={() => setShowPayment(true)}
                                />
                            ) : showDriversList ? (
                                (() => {
                                    console.log("DrivingLayout: Rendering DriversList");
                                    return (
                                        <DriversList
                                            onBack={() => setShowDriversList(false)}
                                            onContinue={() => setShowConfirmation(true)}
                                        />
                                    );
                                })()
                            ) : (
                                <RideRequestForm
                                    onSubmit={() => {
                                        console.log("DrivingLayout: RideRequestForm submitted");
                                        setShowDriversList(true);
                                    }}
                                    onLocationSelect={handleLocationSelect}
                                />
                            )}
                        </div>

                        {/* Right Panel — Map */}
                        <div className="lg:col-span-2 h-[400px] md:h-[500px] lg:h-[calc(100vh-380px)] min-h-[350px] animate-in slide-in-from-right duration-300">
                            <MapView center={mapCenter} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
