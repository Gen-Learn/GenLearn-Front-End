// hooks/useRecentCourses.ts
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { getCourses } from "@/services/courcesService";

export const courseKeys = {
    all: [ "courses" ] as const,
    recent: (page: number, limit: number) =>
        [ ...courseKeys.all, "recent", { page, limit } ] as const,
};

interface UseRecentCoursesOptions {
    page?: number;
    limit?: number;
}

export const useRecentCourses = ({
    page = 1,
    limit = 10,
}: UseRecentCoursesOptions = {}) => {
    return useQuery({
        queryKey: courseKeys.recent(page, limit),
        queryFn: () => getCourses({ page, limit, recent: true }),
        placeholderData: keepPreviousData, // avoids UI flash when paging
    });
};