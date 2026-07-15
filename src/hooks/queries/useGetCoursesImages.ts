// hooks/queries/useGetCoursesImages.ts
import { useEffect, useRef } from "react";
import { useQueries } from "@tanstack/react-query";
import axiosInstance from "@/services/axios";
import Course from "@/types/coursesModel";

interface CourseImageMap {
  [ courseId: string ]: string;
}

export const useGetCoursesImages = (courses: Course[] = []) => {
  const createdUrlsRef = useRef<Set<string>>(new Set());

  const coursesWithImages = courses.filter((c) => c.imageUrl);

  const results = useQueries({
    queries: coursesWithImages.map((course) => ({
      // keyed per course, not per page — a course fetched on page 2 stays
      // cached even after you go back to page 1 and forward again
      queryKey: [ "course-image", course.id, course.imageUrl ],
      queryFn: async (): Promise<string> => {
        const response = await axiosInstance.get(course.imageUrl!, {
          responseType: "blob",
        });
        const url = URL.createObjectURL(response.data);
        createdUrlsRef.current.add(url);
        return url;
      },
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 30,
      refetchOnWindowFocus: false,
    })),
  });

  const courseImages: CourseImageMap = {};
  let loadingImages = false;

  results.forEach((result, i) => {
    const course = coursesWithImages[ i ];
    if (result.data) courseImages[ course.id ] = result.data;
    if (result.isLoading) loadingImages = true;
  });

  // Revoke every blob URL this hook instance created, once the courses
  // page unmounts entirely (not on every page change — cache still needs
  // the URLs alive while the user pages back and forth).
  useEffect(() => {
    return () => {
      createdUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      createdUrlsRef.current.clear();
    };
  }, []);

  return {
    courseImages,
    loadingImages,
    errorGettingImages: results.find((r) => r.error)?.error ?? null,
  };
};