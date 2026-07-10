// hooks/useAnalytics.ts
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { getAnalytics } from "@/services/analyticsService";
import type { Analytics } from "@/types/analyticsModel";

export const analyticsQueryKey = [ "analytics" ] as const;

export const useAnalytics = (
    options?: Omit<UseQueryOptions<Analytics, Error>, "queryKey" | "queryFn">
) => {
    return useQuery<Analytics, Error>({
        queryKey: analyticsQueryKey,
        queryFn: getAnalytics,
        ...options,
    });
};