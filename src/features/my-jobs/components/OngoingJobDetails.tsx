"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Globe, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export function OngoingJobDetails() {
    return (
        <div className="p-4 md:p-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6 md:mb-8">
                <Link
                    href="/dashboard/my-jobs"
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-100 hover:bg-gray-50 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <h1 className="text-xl md:text-2xl font-bold text-gray-900">Services Details</h1>
                <div className="ml-auto text-xs md:text-sm text-gray-500 hidden md:block">
                    <Link href="/dashboard" className="hover:text-gray-900">Home</Link>
                    <span className="mx-2">/</span>
                    <Link href="/dashboard/my-jobs" className="hover:text-gray-900">My job</Link>
                    <span className="mx-2">/</span>
                    <span className="text-[#C69C2E]">Details</span>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 md:gap-8">
                {/* Left Column - Main Info */}
                <div className="xl:col-span-2 space-y-6 md:space-y-8">
                    <div className="bg-white rounded-2xl p-4 border border-gray-100">
                        <div className="relative h-[250px] md:h-[400px] rounded-xl overflow-hidden mb-6">
                            <img
                                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop"
                                alt="Content Creation"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Content Creation</h2>
                                <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-blue-50 text-blue-600">
                                    Hybrid
                                </span>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-gray-400 line-through text-base md:text-lg">₦90,000</span>
                                <span className="text-xl md:text-2xl font-bold text-gray-900">₦85,000</span>
                            </div>
                        </div>

                        <p className="text-sm md:text-base text-gray-500 leading-relaxed mb-6">
                            Fermentum egestas a nec sit scelerisque lobortis aenean feugiat tellus. Aliquam ut auctor morbi sit risus ultrices. Tristique venenatis ornare leo purus egestas. Sodales ut mi id aliquet laoreet. Enim malesuada ac leo eu commodo a pharetra.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-base md:text-lg font-bold text-gray-900">About the Job:</h3>
                            <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                                Fermentum egestas a nec sit scelerisque lobortis aenean feugiat tellus. Aliquam ut auctor morbi sit risus ultrices. Tristique venenatis ornare leo purus egestas. Sodales ut mi id aliquet laoreet. Enim malesuada ac leo eu commodo a pharetra. Vita
                            </p>
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <p className="text-sm text-gray-500">
                                Status: <span className="text-[#C69C2E] font-medium">Pending</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                Applied: <span className="text-gray-900 font-medium">2023-11-25</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right Column - Contact Info */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden">
                                <img
                                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop"
                                    alt="Emeka Chinonso"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Emeka Chinonso</h3>
                                <p className="text-xs text-gray-500">Senior Content Editor</p>
                                <div className="flex text-[#C69C2E] text-xs mt-0.5">
                                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                                    <span className="text-gray-400 ml-1">(4.5)</span>
                                </div>
                            </div>
                        </div>

                        <h4 className="font-bold text-gray-900 mb-4">Contact Information</h4>

                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#C69C2E]/10 flex items-center justify-center shrink-0">
                                    <Globe className="w-4 h-4 text-[#C69C2E]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase">WEBSITE</p>
                                    <p className="text-sm text-gray-900 font-medium break-all">www.catherinemarsh.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#C69C2E]/10 flex items-center justify-center shrink-0">
                                    <Phone className="w-4 h-4 text-[#C69C2E]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase">PHONE</p>
                                    <p className="text-sm text-gray-900 font-medium">+1-202-555-0135</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#C69C2E]/10 flex items-center justify-center shrink-0">
                                    <Mail className="w-4 h-4 text-[#C69C2E]" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 uppercase">EMAIL ADDRESS</p>
                                    <p className="text-sm text-gray-900 font-medium break-all">catherinemarsh@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8">
                            <h4 className="font-bold text-gray-900 mb-4">Social</h4>
                            <div className="flex gap-3">
                                <a href="#" className="w-8 h-8 rounded bg-[#C69C2E]/10 flex items-center justify-center hover:bg-[#C69C2E] hover:text-white transition-colors text-[#C69C2E]">
                                    <Facebook className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-8 h-8 rounded bg-[#C69C2E]/10 flex items-center justify-center hover:bg-[#C69C2E] hover:text-white transition-colors text-[#C69C2E]">
                                    <Twitter className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-8 h-8 rounded bg-[#C69C2E]/10 flex items-center justify-center hover:bg-[#C69C2E] hover:text-white transition-colors text-[#C69C2E]">
                                    <Instagram className="w-4 h-4" />
                                </a>
                                <a href="#" className="w-8 h-8 rounded bg-[#C69C2E]/10 flex items-center justify-center hover:bg-[#C69C2E] hover:text-white transition-colors text-[#C69C2E]">
                                    <Youtube className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
