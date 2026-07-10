import { getSingleCource } from "../../services/singleCourceService";
import { useQuery } from "@tanstack/react-query";

export const useGetSingleCource = (id: string) => {
  return useQuery({
    queryKey: [ "course", id ],
    queryFn: () => getSingleCource(id),

    // Cache settings
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30,    // Keep in cache for 30 minutes

    refetchOnWindowFocus: false,
    retry: 2,
    enabled: !!id,
  });
};