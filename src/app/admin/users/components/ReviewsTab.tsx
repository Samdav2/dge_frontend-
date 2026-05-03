"use client";

import { Star } from "lucide-react";

export default function ReviewsTab() {
    const reviewsList = [
        { person: "Daniel Ibe", rating: 5, message: "Amazing experience! Highly recommended.", date: "09/12/2025" },
        { person: "Martha Dokubo", rating: 4, message: "Friendly team member and great services listed.", date: "09/13/2025" },
        { person: "John Okafor", rating: 5, message: "Flawless communication throughout the negotiations.", date: "09/14/2025" }
    ];

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex flex-col select-none">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight leading-tight select-none">
                    Reviews
                </h3>
                <p className="text-xs text-slate-400 select-none font-medium mt-1">
                    What people are saying about this user
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 select-none">
                {reviewsList.map((review, i) => (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-3.5 select-none hover:scale-[1.01] transition-all cursor-pointer">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 select-none">
                                <div className="w-7 h-7 rounded-full bg-amber-50 text-[#b68512] flex items-center justify-center font-bold text-xs border border-amber-100">
                                    {review.person.split(" ").map(n => n[0]).join("")}
                                </div>
                                <span className="font-bold text-xs text-slate-800 leading-tight">
                                    {review.person}
                                </span>
                            </div>
                            <span className="text-[10px] text-slate-400 font-medium select-none">
                                {review.date}
                            </span>
                        </div>

                        <div className="flex items-center gap-0.5 select-none">
                            {Array.from({ length: 5 }).map((_, sIdx) => (
                                <Star
                                    key={sIdx}
                                    size={13}
                                    className={sIdx < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-100"}
                                />
                            ))}
                        </div>

                        <p className="text-xs text-slate-500 font-medium leading-normal select-none">
                            {review.message}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
