"use client";

import React from "react";
import { X, CheckCircle2, AlertCircle, HelpCircle, Info, Loader2 } from "lucide-react";

export type ModalType = "success" | "error" | "warning" | "confirm" | "info" | "loading";

interface StatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: ModalType;
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export default function StatusModal({
    isOpen,
    onClose,
    type,
    title,
    message,
    onConfirm,
    confirmText = "Confirm",
    cancelText = "Cancel"
}: StatusModalProps) {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case "success": return <CheckCircle2 className="text-emerald-500" size={40} />;
            case "error": return <AlertCircle className="text-red-500" size={40} />;
            case "warning": return <AlertCircle className="text-amber-500" size={40} />;
            case "confirm": return <HelpCircle className="text-blue-500" size={40} />;
            case "info": return <Info className="text-slate-500" size={40} />;
            case "loading": return <Loader2 className="text-amber-500 animate-spin" size={40} />;
        }
    };

    const getColors = () => {
        switch (type) {
            case "success": return "bg-emerald-50 text-emerald-700 hover:bg-emerald-100";
            case "error": return "bg-red-50 text-red-700 hover:bg-red-100";
            case "warning": return "bg-amber-50 text-amber-700 hover:bg-amber-100";
            case "confirm": return "bg-[#b68512] text-white hover:bg-[#a07610]";
            default: return "bg-slate-800 text-white hover:bg-slate-900";
        }
    };

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200 select-none">
            <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 border border-slate-100">
                <div className="p-8 flex flex-col items-center text-center">
                    <div className="mb-6 p-4 rounded-3xl bg-slate-50 border border-slate-100 shadow-inner">
                        {getIcon()}
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-800 mb-2 tracking-tight">
                        {title}
                    </h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed max-w-[240px]">
                        {message}
                    </p>
                </div>

                <div className="p-6 bg-slate-50/50 border-t border-slate-50 flex items-center gap-3">
                    {onConfirm ? (
                        <>
                            <button 
                                onClick={onClose}
                                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-2xl font-bold text-xs text-slate-500 hover:bg-slate-100 transition-all active:scale-95"
                            >
                                {cancelText}
                            </button>
                            <button 
                                onClick={() => {
                                    onConfirm();
                                }}
                                className={`flex-1 px-4 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 shadow-lg shadow-slate-200 ${getColors()}`}
                            >
                                {confirmText}
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={onClose}
                            className={`w-full px-4 py-3 rounded-2xl font-bold text-xs transition-all active:scale-95 shadow-lg shadow-slate-200 ${getColors()}`}
                        >
                            Dismiss
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
