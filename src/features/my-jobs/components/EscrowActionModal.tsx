"use client";

import React, { useState } from "react";
import { X, Star, Loader2 } from "lucide-react";

interface EscrowActionModalProps {
    isOpen: boolean;
    onClose: () => void;
    actionType: "approve" | "reject";
    onSubmit: (payload: { rating?: number; review_comment?: string; direct_message?: string }) => Promise<void>;
    isLoading: boolean;
}

export function EscrowActionModal({ isOpen, onClose, actionType, onSubmit, isLoading }: EscrowActionModalProps) {
    const [rating, setRating] = useState<number>(5);
    const [reviewComment, setReviewComment] = useState("");
    const [directMessage, setDirectMessage] = useState("");
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (actionType === "approve" && !reviewComment.trim()) {
            setError("A review comment is required to approve.");
            return;
        }

        if (actionType === "reject" && !directMessage.trim()) {
            setError("A message explaining the rejection is required.");
            return;
        }

        try {
            await onSubmit({
                rating: actionType === "approve" ? rating : undefined,
                review_comment: actionType === "approve" ? reviewComment : undefined,
                direct_message: directMessage.trim() ? directMessage : undefined,
            });
        } catch (err: any) {
            setError(err.message || "An error occurred");
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
                    <h2 className="text-xl font-bold text-gray-900">
                        {actionType === "approve" ? "Approve Submission" : "Reject Submission"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                        disabled={isLoading}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-grow">
                    <form id="escrow-action-form" onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                                {error}
                            </div>
                        )}

                        {actionType === "approve" && (
                            <>
                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">Rating</label>
                                    <div className="flex items-center gap-2">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setRating(star)}
                                                className={`transition-colors p-1 ${rating >= star ? 'text-yellow-400' : 'text-gray-200'}`}
                                            >
                                                <Star className="w-8 h-8 fill-current" />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-900 mb-2">
                                        Public Review <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        value={reviewComment}
                                        onChange={(e) => setReviewComment(e.target.value)}
                                        placeholder="Describe your experience working with this provider..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C69C2E]/20 focus:border-[#C69C2E] resize-none h-24 text-sm"
                                        required
                                    />
                                    <p className="text-xs text-gray-500 mt-1">This review will appear on the provider's portfolio.</p>
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-gray-900 mb-2">
                                Message to Provider {actionType === "reject" && <span className="text-red-500">*</span>}
                            </label>
                            <textarea
                                value={directMessage}
                                onChange={(e) => setDirectMessage(e.target.value)}
                                placeholder={actionType === "approve" ? "Send a personal thank you message (optional)" : "Explain why you are rejecting the submission and what needs to be fixed..."}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#C69C2E]/20 focus:border-[#C69C2E] resize-none h-24 text-sm"
                                required={actionType === "reject"}
                            />
                            <p className="text-xs text-gray-500 mt-1">This message will be sent directly to their inbox.</p>
                        </div>
                    </form>
                </div>

                <div className="p-6 border-t border-gray-100 bg-gray-50 shrink-0">
                    <button
                        type="submit"
                        form="escrow-action-form"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-xl font-bold text-white transition-colors flex items-center justify-center gap-2 ${
                            actionType === "approve" 
                                ? "bg-[#C69C2E] hover:bg-[#b08b29]" 
                                : "bg-red-600 hover:bg-red-700"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            actionType === "approve" ? "Approve & Release Payment" : "Reject & Dispute"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
