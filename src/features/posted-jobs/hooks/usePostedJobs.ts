import { useQuery } from "@tanstack/react-query";
import { listOpenPostedJobs, getMyPostedJobs, getJobBids } from "../actions";

export function useOpenPostedJobs(params?: { category_id?: string; search?: string }) {
    return useQuery({
        queryKey: ["posted_jobs", "open", params],
        queryFn: async () => {
            const result = await listOpenPostedJobs(params);
            if (!result.success) throw new Error(result.error);
            return result.data ?? [];
        },
    });
}

export function useMyPostedJobs() {
    return useQuery({
        queryKey: ["posted_jobs", "me"],
        queryFn: async () => {
            const result = await getMyPostedJobs();
            if (!result.success) throw new Error(result.error);
            return result.data ?? [];
        },
    });
}

export function useJobBids(jobId: string | null) {
    return useQuery({
        queryKey: ["posted_jobs", "bids", jobId],
        queryFn: async () => {
            const result = await getJobBids(jobId!);
            if (!result.success) throw new Error(result.error);
            return result.data ?? [];
        },
        enabled: !!jobId,
    });
}
