import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { listServices, createService, updateService, deleteService } from "../actions";

export function useMyServices() {
    return useQuery({
        queryKey: ["my-services"],
        queryFn: async () => {
            const result = await listServices(true);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
    });
}

export function useCreateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (formData: FormData) => {
            const result = await createService(formData);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-services"] });
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
}

export function useUpdateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, formData }: { id: string; formData: FormData }) => {
            const result = await updateService(id, formData);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result.data;
        },
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["my-services"] });
            queryClient.invalidateQueries({ queryKey: ["services"] });
            queryClient.invalidateQueries({ queryKey: ["service", variables.id] });
        },
    });
}

export function useDeleteService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const result = await deleteService(id);
            if (!result.success) {
                throw new Error(result.error);
            }
            return result;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["my-services"] });
            queryClient.invalidateQueries({ queryKey: ["services"] });
        },
    });
}
