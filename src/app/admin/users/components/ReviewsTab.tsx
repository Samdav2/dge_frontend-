"use client";

import { useEffect, useState } from "react";
import { Star, Loader2, AlertCircle } from "lucide-react";

interface Review {
    id: string; person: string; rating: number; message: string; date: string;
}

export default function ReviewsTab({ userId }: { userId: string }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/admin/platform-users/${userId}?tab=reviews`)
            .then(r => r.json()).then(d => setReviews(Array.isArray(d) ? d : []))
            .catch(e => setError(e.message)).finally(() => setLoading(false));
    }, [userId]);

    if (loading) return <div className="flex items-center justify-center py-16"><Loader2 size={24} className="animate-spin text-slate-300" /></div>;
    if (error) return <div className="flex flex-col items-center py-12 gap-2"><AlertCircle size={20} className="text-red-300" /><p className="text-xs text-slate-400">{error}</p></div>;

    return (
        <div className="space-y-6 flex-1 flex flex-col select-none animate-fade-in pt-2">
            <div className="flex flex-col">
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">Reviews</h3>
                <p className="text-xs text-slate-400 font-medium mt-1">What people are saying about this user</p>
            </div>

            {reviews.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-10">No reviews yet</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {reviews.map(review => (
                        <div key={review.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.01)] space-y-3.5 hover:scale-[1.01] transition-all cursor-pointer">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 rounded-full bg-amber-50 text-[#b68512] flex items-center justify-center font-bold text-xs border border-amber-100">
                                        {review.person.slice(0, 2).toUpperCase()}
                                    </div>
                                    <span className="font-bold text-xs text-slate-800 leading-tight">{review.person}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star key={i} size={13} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-slate-200 fill-slate-100"} />
                                ))}
                            </div>
                            <p className="text-xs text-slate-500 font-medium leading-normal">{review.message || "No comment"}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
