import { useQuery } from "@tanstack/react-query";
import { listServices, getService } from "../actions";

export function useServices(onlyMine: boolean = false) {
    return useQuery({
        queryKey: ["services", { onlyMine }],
        queryFn: async () => {
            const result = await listServices({ onlyMine });
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
