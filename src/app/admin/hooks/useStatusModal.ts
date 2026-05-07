"use client";

import { useState, useCallback } from "react";
import { ModalType } from "../components/StatusModal";

export function useStatusModal() {
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

    return {
        modalConfig,
        showModal,
        hideModal
    };
}
