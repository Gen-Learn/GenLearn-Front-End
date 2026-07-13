// hooks/useGetAllCourses.ts
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../services/courcesService";

export const useGetAllCourses = () => {
  return useQuery({
    queryKey: [ "courses" ],
    queryFn: () => getCourses(), // wrap it — don't pass getCourses directly
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
  });
};