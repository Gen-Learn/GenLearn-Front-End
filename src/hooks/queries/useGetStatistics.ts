// src/hooks/queries/useGetStatistics.ts
import { useQuery } from "@tanstack/react-query";
import { getStatistics } from "@/services/statisticsService";

export const statisticsKeys = {
    all: [ "statistics" ] as const,
};

export const useGetStatistics = () => {
    return useQuery({
        queryKey: statisticsKeys.all,
        queryFn: () => getStatistics(),
        staleTime: 1000 * 60 * 10, // 10 minutes — homepage stats don't need to be second-fresh
        gcTime: 1000 * 60 * 30,
        refetchOnWindowFocus: false,
    });
};