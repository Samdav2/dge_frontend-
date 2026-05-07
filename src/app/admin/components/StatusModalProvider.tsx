"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";
import StatusModal, { ModalType } from "./StatusModal";

interface StatusModalContextType {
    showModal: (config: {
        type: ModalType;
        title: string;
        message: string;
        onConfirm?: () => void;
        confirmText?: string;
        cancelText?: string;
    }) => void;
    hideModal: () => void;
}

const StatusModalContext = createContext<StatusModalContextType | undefined>(undefined);

export function StatusModalProvider({ children }: { children: ReactNode }) {
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        type: ModalType;
        title: string;
        message: string;
        onConfirm?: () => void;
        confirmText?: string;
        cancelText?: string;
    }>({
        isOpen: false,
        type: "info",
        title: "",
        message: ""
    });

    const showModal = useCallback((config: {
        type: ModalType;
        title: string;
        message: string;
        onConfirm?: () => void;
        confirmText?: string;
        cancelText?: string;
    }) => {
        setModalConfig({ ...config, isOpen: true });
    }, []);

    const hideModal = useCallback(() => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));
    }, []);

    return (
        <StatusModalContext.Provider value={{ showModal, hideModal }}>
            {children}
            <StatusModal 
                {...modalConfig} 
                onClose={hideModal} 
            />
        </StatusModalContext.Provider>
    );
}

export function useStatusModal() {
    const context = useContext(StatusModalContext);
    if (!context) {
        throw new Error("useStatusModal must be used within a StatusModalProvider");
    }
    return context;
}
