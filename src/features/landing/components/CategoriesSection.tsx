"use client";

import { useState } from "react";
import {
    Droplet, Wrench, Laptop, Zap, Brush, Truck, Hammer, PaintBucket,
    Wind, Bug, TreePine, ShieldCheck, UtensilsCrossed, Scissors,
    Camera, Car, GraduationCap, Sparkles, Palette, Scale,
    ChevronRight, X
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const SERVICES_PREVIEW = [
    { icon: Droplet, label: "Plumbing", color: "#3B82F6" },
    { icon: Wrench, label: "Repairs", color: "#EF4444" },
    { icon: Laptop, label: "Tech", color: "#8B5CF6" },
    { icon: Zap, label: "Electrical", color: "#F59E0B" },
    { icon: Brush, label: "Cleaning", color: "#10B981" },
    { icon: Truck, label: "Moving", color: "#6366F1" },
    { icon: Hammer, label: "Carpentry", color: "#D97706" },
    { icon: PaintBucket, label: "Painting", color: "#EC4899" },
];

const ALL_SERVICES = [
    { icon: Droplet, label: "Plumbing Services", desc: "Expert pipe & drain solutions", color: "#3B82F6" },
    { icon: Wrench, label: "Appliance Repair", desc: "Fix any home appliance fast", color: "#EF4444" },
    { icon: Laptop, label: "PC & Laptop Repair", desc: "Hardware & software support", color: "#8B5CF6" },
    { icon: Zap, label: "Electrical Work", desc: "Certified electrical services", color: "#F59E0B" },
    { icon: Brush, label: "Cleaning Services", desc: "Deep clean & sanitization", color: "#10B981" },
    { icon: Truck, label: "Moving & Packing", desc: "Stress-free relocations", color: "#6366F1" },
    { icon: Hammer, label: "Carpentry", desc: "Custom woodwork & repairs", color: "#D97706" },
    { icon: PaintBucket, label: "Painting", desc: "Interior & exterior painting", color: "#EC4899" },
    { icon: Wind, label: "HVAC Services", desc: "Heating, cooling & ventilation", color: "#06B6D4" },
    { icon: Bug, label: "Pest Control", desc: "Safe pest elimination", color: "#84CC16" },
    { icon: TreePine, label: "Landscaping", desc: "Garden design & maintenance", color: "#22C55E" },
    { icon: ShieldCheck, label: "Security Systems", desc: "CCTV & alarm installation", color: "#64748B" },
    { icon: UtensilsCrossed, label: "Catering", desc: "Event catering & meals", color: "#F97316" },
    { icon: Scissors, label: "Tailoring", desc: "Custom fits & alterations", color: "#A855F7" },
    { icon: Camera, label: "Photography", desc: "Professional photo & video", color: "#E11D48" },
    { icon: Car, label: "Auto Repair", desc: "Vehicle maintenance & repair", color: "#0EA5E9" },
    { icon: GraduationCap, label: "Tutoring", desc: "Expert academic tutoring", color: "#14B8A6" },
    { icon: Sparkles, label: "Beauty & Spa", desc: "Wellness & beauty services", color: "#F472B6" },
    { icon: Palette, label: "Interior Design", desc: "Transform your living space", color: "#8B5CF6" },
    { icon: Scale, label: "Legal Services", desc: "Trusted legal consultation", color: "#78716C" },
];

export function CategoriesSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <section className="py-12 md:py-16 bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">Your Ecosystem</p>
                    <h2 className="text-2xl md:text-3xl font-bold">Explore Our Services</h2>
                    <p className="text-muted-foreground text-sm mt-2 max-w-sm mx-auto">From home repairs to creative freelancers — every service you need, all in one trusted place.</p>
                </div>

                {/* Icon Grid — 4 columns always */}
                <div className="grid grid-cols-4 gap-3 md:gap-5 max-w-3xl mx-auto">
                    {SERVICES_PREVIEW.map((svc, i) => (
                        <button
                            key={i}
                            className="group flex flex-col items-center gap-2 md:gap-3 cursor-pointer"
                            style={{ animationDelay: `${i * 80}ms` }}
                            onClick={() => setIsModalOpen(true)}
                        >
                            <div
                                className="relative w-14 h-14 md:w-[72px] md:h-[72px] rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                style={{
                                    background: `${svc.color}12`,
                                    border: `1.5px solid ${svc.color}25`,
                                }}
                            >
                                <svc.icon
                                    className="h-5 w-5 md:h-6 md:w-6 transition-transform duration-300 group-hover:scale-110"
                                    style={{ color: svc.color }}
                                />
                                {/* Glow on hover */}
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ boxShadow: `0 0 20px ${svc.color}30, 0 0 40px ${svc.color}15` }}
                                />
                            </div>
                            <span className="text-[10px] md:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center leading-tight">
                                {svc.label}
                            </span>
                        </button>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-8">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground/5 hover:bg-primary/10 border border-border/50 hover:border-primary/30 transition-all duration-300 cursor-pointer"
                    >
                        <span className="text-sm font-semibold text-foreground">View All Services</span>
                        <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </div>

            {/* Services Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-4xl w-[95vw] max-h-[85vh] overflow-y-auto p-0 bg-[#0D0D0D] border border-white/10 rounded-2xl">
                    <DialogHeader className="sticky top-0 z-10 bg-[#0D0D0D]/95 backdrop-blur-md px-6 pt-6 pb-4 border-b border-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <DialogTitle className="text-xl font-bold text-white">All Services</DialogTitle>
                                <DialogDescription className="text-sm text-gray-400 mt-1">
                                    Explore 20+ trusted service categories available across the DGE World ecosystem.
                                </DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* 4-Column Service Grid */}
                    <div className="grid grid-cols-4 gap-2 md:gap-4 p-4 md:p-6">
                        {ALL_SERVICES.map((svc, i) => (
                            <div
                                key={i}
                                className="group flex flex-col items-center gap-1.5 md:gap-3 p-2 md:p-4 rounded-xl hover:bg-white/5 transition-all duration-300 cursor-pointer"
                                style={{ animationDelay: `${i * 40}ms` }}
                            >
                                <div
                                    className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                                    style={{
                                        background: `${svc.color}18`,
                                        border: `1px solid ${svc.color}30`,
                                    }}
                                >
                                    <svc.icon
                                        className="h-4 w-4 md:h-6 md:w-6"
                                        style={{ color: svc.color }}
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-[9px] md:text-xs font-semibold text-white leading-tight">{svc.label}</p>
                                    <p className="text-[7px] md:text-[10px] text-gray-500 mt-0.5 leading-tight hidden md:block">{svc.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
