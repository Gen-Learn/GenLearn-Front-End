import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCourses } from "../../services/courcesService";

interface UseGetAllCoursesParams {
  page?: number;
  limit?: number;
  recent?: boolean;
}

export const useGetAllCourses = ({
  page = 1,
  limit = 9,
  recent,
}: UseGetAllCoursesParams = {}) => {
  return useQuery({
    queryKey: [ "courses", page, limit, recent ],
    queryFn: () => getCourses({ page, limit, recent }),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
    retry: 2,
    // keeps the current page's data visible while the next page loads,
    // instead of flashing the skeleton on every page change
    placeholderData: keepPreviousData,
  });
};