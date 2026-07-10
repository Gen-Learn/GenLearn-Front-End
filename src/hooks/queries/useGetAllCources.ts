// hooks/useGetAllCourses.ts

import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../services/courcesService";

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: [ "courses" ],
    queryFn: getCourses,

    // Cache settings
    staleTime: 1000 * 60 * 10, // 10 minutes
    gcTime: 1000 * 60 * 30,    // Keep in cache for 30 minutes

    refetchOnWindowFocus: false,
    retry: 2,
  });
};