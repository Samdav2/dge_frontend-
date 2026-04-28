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

export function DrivingLayout() {
    const [activeTab, setActiveTab] = React.useState<'book' | 'booked'>('book');
    const [showDriversList, setShowDriversList] = React.useState(false);
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [showNegotiation, setShowNegotiation] = React.useState(false);
    const [showPayment, setShowPayment] = React.useState(false);
    const [successModal, setSuccessModal] = React.useState<{ title: string; message: string } | null>(null);

    const [mapCenter, setMapCenter] = React.useState<[number, number] | null>(null);

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

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-[calc(100vh-100px)] flex flex-col relative">
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
                        // Reset flow
                        setShowConfirmation(false);
                        setShowDriversList(false);
                    }}
                />
            )}

            <div className="flex flex-row items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Driving</h1>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>Home</span>
                    <span>/</span>
                    <span className="text-[#C69C2E]">Driving</span>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <div className="flex items-center bg-white rounded-lg p-1 border border-gray-100 w-full md:w-auto">
                    <button
                        onClick={() => setActiveTab('book')}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'book'
                            ? 'bg-[#C69C2E] text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Book a Ride
                    </button>
                    <button
                        onClick={() => setActiveTab('booked')}
                        className={`flex-1 md:flex-none px-6 py-2 rounded-md text-sm font-medium transition-all ${activeTab === 'booked'
                            ? 'bg-[#C69C2E] text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        Ride people Booked from me
                    </button>
                </div>

                <div className="hidden md:block flex-1" />

                <Button variant="outline" className="w-full md:w-auto border-[#C69C2E] text-[#C69C2E] hover:bg-[#C69C2E]/5 rounded-lg px-6 h-10">
                    View Ride
                </Button>
            </div>

            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 lg:min-h-0 h-auto lg:h-full">
                <div className="lg:col-span-1 h-auto lg:h-full min-h-0">
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
                <div className="lg:col-span-2 h-[500px] lg:h-full min-h-[500px] block">
                    <MapView center={mapCenter} />
                </div>
            </div>
        </div>
    );
}
