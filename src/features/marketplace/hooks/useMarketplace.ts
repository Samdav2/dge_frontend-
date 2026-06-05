import { useQuery } from "@tanstack/react-query";
import { listServices, getService, listCategories, ServiceFilters, listPublicServices, getPublicService } from "../actions";

export function useServices(filters: ServiceFilters = {}) {
    return useQuery({
        queryKey: ["services", filters],
        queryFn: async () => {
            const result = await listServices(filters);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
}

export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const result = await listCategories();
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
}

export function useService(id: string) {
    return useQuery({
        queryKey: ["service", id],
        queryFn: async () => {
            if (!id) return null;
            const result = await getService(id);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data as import("@/types/marketplace").ServiceDetailResponse;
        },
        enabled: !!id,
    });
}

export function usePublicServices(filters: ServiceFilters = {}) {
    return useQuery({
        queryKey: ["public_services", filters],
        queryFn: async () => {
            const result = await listPublicServices(filters);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
}

export function usePublicService(id: string) {
    return useQuery({
        queryKey: ["public_service", id],
        queryFn: async () => {
            if (!id) return null;
            const result = await getPublicService(id);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data as import("@/types/marketplace").ServiceDetailResponse;
        },
        enabled: !!id,
    });
}
